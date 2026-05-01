import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockReadFile = vi.hoisted(() => vi.fn());
const mockWriteFile = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));
const mockMkdir = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));

vi.mock('node:fs/promises', () => ({
  readFile: mockReadFile,
  writeFile: mockWriteFile,
  mkdir: mockMkdir,
}));

import { CopilotAuthManager, createCopilotAuthManager, normalizeDomain } from '../auth.js';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
  vi.useRealTimers();
});

describe('normalizeDomain', () => {
  it('removes protocol and trailing slash', () => {
    expect(normalizeDomain('https://github.com/')).toBe('github.com');
    expect(normalizeDomain('http://ghe.example.com/')).toBe('ghe.example.com');
  });
});

describe('CopilotAuthManager', () => {
  it('returns valid cached token without refreshing', async () => {
    mockReadFile.mockResolvedValueOnce(
      JSON.stringify({
        accessToken: 'cached-token',
        refreshToken: 'refresh-token',
        expiresAt: Date.now() + 60_000,
      })
    );

    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json' });
    const token = await manager.getValidAccessToken();

    expect(token).toBe('cached-token');
  });

  it('starts device flow when auth record does not exist', async () => {
    mockReadFile.mockRejectedValueOnce(new Error('ENOENT'));

    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json' });
    const flowSpy = vi.spyOn(manager, 'authorizeDeviceCodeFlow').mockResolvedValueOnce({
      accessToken: 'new-token',
      refreshToken: 'new-refresh',
      expiresAt: Date.now() + 3600_000,
      tokenType: 'bearer',
    });

    const token = await manager.getValidAccessToken();
    expect(token).toBe('new-token');
    expect(flowSpy).toHaveBeenCalledOnce();
  });

  it('refreshes expired token successfully', async () => {
    mockReadFile.mockResolvedValueOnce(
      JSON.stringify({
        accessToken: 'old-token',
        refreshToken: 'refresh-token',
        expiresAt: Date.now() - 60_000,
        enterpriseUrl: 'https://github.com',
      })
    );

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            access_token: 'refreshed-token',
            refresh_token: 'refreshed-refresh',
            expires_in: 3600,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      )
    );

    const logger = { info: vi.fn(), warn: vi.fn(), error: vi.fn() };
    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json', logger });

    const token = await manager.getValidAccessToken();

    expect(token).toBe('refreshed-token');
    expect(mockWriteFile).toHaveBeenCalled();
  });

  it('falls back to device flow when refresh token is missing', async () => {
    mockReadFile.mockResolvedValueOnce(
      JSON.stringify({
        accessToken: 'old-token',
        expiresAt: Date.now() - 60_000,
      })
    );

    const logger = { info: vi.fn(), warn: vi.fn(), error: vi.fn() };
    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json', logger });
    const flowSpy = vi.spyOn(manager, 'authorizeDeviceCodeFlow').mockResolvedValueOnce({
      accessToken: 'device-flow-token',
      refreshToken: 'rf',
      expiresAt: Date.now() + 3600_000,
      tokenType: 'bearer',
    });

    const token = await manager.getValidAccessToken();

    expect(token).toBe('device-flow-token');
    expect(logger.warn).toHaveBeenCalled();
    expect(flowSpy).toHaveBeenCalledOnce();
  });

  it('falls back to device flow when refresh response has no access_token', async () => {
    mockReadFile.mockResolvedValueOnce(
      JSON.stringify({
        accessToken: 'old-token',
        refreshToken: 'refresh-token',
        expiresAt: Date.now() - 60_000,
      })
    );

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce(
        new Response(JSON.stringify({ error: 'invalid_grant' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )
    );

    const logger = { info: vi.fn(), warn: vi.fn(), error: vi.fn() };
    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json', logger });
    const flowSpy = vi.spyOn(manager, 'authorizeDeviceCodeFlow').mockResolvedValueOnce({
      accessToken: 'device-flow-token',
      refreshToken: 'rf',
      expiresAt: Date.now() + 3600_000,
      tokenType: 'bearer',
    });

    const token = await manager.getValidAccessToken();

    expect(token).toBe('device-flow-token');
    expect(flowSpy).toHaveBeenCalledOnce();
  });
});

describe('authorizeDeviceCodeFlow', () => {
  const makeDeviceCodeResponse = (overrides = {}) =>
    new Response(
      JSON.stringify({
        device_code: 'dc1',
        user_code: 'ABCD-1234',
        verification_uri: 'https://github.com/login/device',
        expires_in: 300,
        interval: 5,
        ...overrides,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  const makeTokenResponse = (body: object) =>
    new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  beforeEach(() => vi.useFakeTimers());

  it('succeeds and saves record on first token poll', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(makeDeviceCodeResponse())
        .mockResolvedValueOnce(
          makeTokenResponse({
            access_token: 'flow-token',
            refresh_token: 'flow-refresh',
            expires_in: 3600,
          })
        )
    );

    const logger = { info: vi.fn(), warn: vi.fn(), error: vi.fn() };
    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json', logger });

    const flowPromise = manager.authorizeDeviceCodeFlow();
    await vi.runAllTimersAsync();
    const result = await flowPromise;

    expect(result.accessToken).toBe('flow-token');
    expect(mockWriteFile).toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalled();
  });

  it('retries on authorization_pending then succeeds', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(makeDeviceCodeResponse())
        .mockResolvedValueOnce(makeTokenResponse({ error: 'authorization_pending' }))
        .mockResolvedValueOnce(
          makeTokenResponse({
            access_token: 'pending-token',
            refresh_token: 'rf',
            expires_in: 3600,
          })
        )
    );

    const logger = { info: vi.fn(), warn: vi.fn(), error: vi.fn() };
    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json', logger });

    const flowPromise = manager.authorizeDeviceCodeFlow();
    await vi.runAllTimersAsync();
    const result = await flowPromise;

    expect(result.accessToken).toBe('pending-token');
  });

  it('backs off on slow_down then succeeds', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(makeDeviceCodeResponse())
        .mockResolvedValueOnce(makeTokenResponse({ error: 'slow_down' }))
        .mockResolvedValueOnce(
          makeTokenResponse({ access_token: 'slow-token', refresh_token: 'rf', expires_in: 3600 })
        )
    );

    const logger = { info: vi.fn(), warn: vi.fn(), error: vi.fn() };
    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json', logger });

    const flowPromise = manager.authorizeDeviceCodeFlow();
    await vi.runAllTimersAsync();
    const result = await flowPromise;

    expect(result.accessToken).toBe('slow-token');
  });

  it('throws on unknown OAuth error', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(makeDeviceCodeResponse())
        .mockResolvedValueOnce(makeTokenResponse({ error: 'access_denied' }))
    );

    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json' });

    const flowPromise = manager.authorizeDeviceCodeFlow();
    const assertion = expect(flowPromise).rejects.toThrow(
      'Falha no OAuth Device Flow: access_denied'
    );
    await vi.runAllTimersAsync();
    await assertion;
  });

  it('throws when timeout expires waiting for authorization', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(makeDeviceCodeResponse({ expires_in: 5, interval: 5 }))
        .mockResolvedValue(makeTokenResponse({ error: 'authorization_pending' }))
    );

    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json' });

    const flowPromise = manager.authorizeDeviceCodeFlow();
    const assertion = expect(flowPromise).rejects.toThrow('Tempo esgotado');
    await vi.runAllTimersAsync();
    await assertion;
  });

  it('throws when device code request returns non-ok status (covers parseJsonOrThrow error path)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce(new Response('Unauthorized', { status: 401 }))
    );

    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json' });

    await expect(manager.authorizeDeviceCodeFlow()).rejects.toThrow(
      'Solicitacao do device code falhou com status 401'
    );
  });
});

describe('refreshAccessToken direct call', () => {
  it('returns static COPILOT_TOKEN without touching auth file', async () => {
    process.env.COPILOT_TOKEN = 'static-refresh-token';

    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json' });
    const token = await manager.refreshAccessToken();

    expect(token).toBe('static-refresh-token');
    expect(mockReadFile).not.toHaveBeenCalled();

    delete process.env.COPILOT_TOKEN;
  });

  it('starts device flow when no auth record exists', async () => {
    mockReadFile.mockRejectedValueOnce(new Error('ENOENT'));

    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json' });
    const flowSpy = vi.spyOn(manager, 'authorizeDeviceCodeFlow').mockResolvedValueOnce({
      accessToken: 'direct-device-token',
      refreshToken: 'rf',
      expiresAt: Date.now() + 3600_000,
      tokenType: 'bearer',
    });

    const token = await manager.refreshAccessToken();

    expect(token).toBe('direct-device-token');
    expect(flowSpy).toHaveBeenCalledOnce();
  });
});

describe('getAuthRecord', () => {
  it('returns auth record when file exists', async () => {
    mockReadFile.mockResolvedValueOnce(
      JSON.stringify({
        accessToken: 'stored-token',
        refreshToken: 'stored-refresh',
        expiresAt: Date.now() + 60_000,
      })
    );

    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json' });
    const record = await manager.getAuthRecord();

    expect(record?.accessToken).toBe('stored-token');
  });

  it('returns undefined when no auth file', async () => {
    mockReadFile.mockRejectedValueOnce(new Error('ENOENT'));

    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json' });
    const record = await manager.getAuthRecord();

    expect(record).toBeUndefined();
  });
});

describe('getValidAccessToken static token path', () => {
  it('returns static COPILOT_TOKEN immediately', async () => {
    process.env.COPILOT_TOKEN = 'static-valid-token';

    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json' });
    const token = await manager.getValidAccessToken();

    expect(token).toBe('static-valid-token');
    expect(mockReadFile).not.toHaveBeenCalled();

    delete process.env.COPILOT_TOKEN;
  });
});

describe('createCopilotAuthManager', () => {
  it('creates a CopilotAuthManager instance with options', () => {
    const manager = createCopilotAuthManager({ authFilePath: '/tmp/auth.json' });
    expect(manager).toBeInstanceOf(CopilotAuthManager);
  });
});

describe('CopilotAuthManager default path (line 56 branch)', () => {
  it('uses DEFAULT_AUTH_FILE_PATH when no authFilePath option provided', async () => {
    mockReadFile.mockRejectedValueOnce(new Error('ENOENT'));

    // no authFilePath → hits DEFAULT_AUTH_FILE_PATH branch
    const manager = new CopilotAuthManager({});
    const flowSpy = vi.spyOn(manager, 'authorizeDeviceCodeFlow').mockResolvedValueOnce({
      accessToken: 'default-path-token',
      refreshToken: 'rf',
      expiresAt: Date.now() + 3600_000,
      tokenType: 'bearer',
    });

    const token = await manager.getValidAccessToken();
    expect(token).toBe('default-path-token');
    expect(flowSpy).toHaveBeenCalledOnce();
  });
});

describe('loadAuthRecord cache hit (line 69 branch)', () => {
  it('returns cached record on second call without re-reading file', async () => {
    mockReadFile.mockResolvedValueOnce(
      JSON.stringify({
        accessToken: 'cached-once',
        refreshToken: 'rf',
        expiresAt: Date.now() + 60_000,
      })
    );

    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json' });

    // first call loads from file
    const first = await manager.getAuthRecord();
    // second call hits this.cache (line 69 branch)
    const second = await manager.getAuthRecord();

    expect(first?.accessToken).toBe('cached-once');
    expect(second?.accessToken).toBe('cached-once');
    // readFile should only be called once despite two getAuthRecord calls
    expect(mockReadFile).toHaveBeenCalledTimes(1);
  });
});

describe('authorizeDeviceCodeFlow missing expires_in (line 168 branch)', () => {
  beforeEach(() => vi.useFakeTimers());

  it('uses fallback 3600 when token response has no expires_in', async () => {
    const makeDeviceCodeResp = () =>
      new Response(
        JSON.stringify({
          device_code: 'dc1',
          user_code: 'ABCD-1234',
          verification_uri: 'https://github.com/login/device',
          expires_in: 300,
          interval: 5,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );

    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(makeDeviceCodeResp())
        // no expires_in in token response → triggers `|| 3600` branch (line 168)
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ access_token: 'no-exp-token', refresh_token: 'rf' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        )
    );

    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json' });
    const flowPromise = manager.authorizeDeviceCodeFlow();
    await vi.runAllTimersAsync();
    const result = await flowPromise;

    expect(result.accessToken).toBe('no-exp-token');
  });
});

describe('refreshAccessToken missing refresh_token / expires_in (lines 221-222 branches)', () => {
  it('falls back to record.refreshToken and uses 3600 when response omits both', async () => {
    mockReadFile.mockResolvedValueOnce(
      JSON.stringify({
        accessToken: 'old-token',
        refreshToken: 'original-refresh',
        expiresAt: Date.now() - 60_000,
      })
    );

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce(
        new Response(
          // no refresh_token, no expires_in → both `|| record.refreshToken` and `|| 3600` branches
          JSON.stringify({ access_token: 'renewed-token' }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      )
    );

    const logger = { info: vi.fn(), warn: vi.fn(), error: vi.fn() };
    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json', logger });
    const token = await manager.getValidAccessToken();

    expect(token).toBe('renewed-token');
    // saved with original refreshToken preserved
    const savedJson = JSON.parse(mockWriteFile.mock.calls[0][1] as string);
    expect(savedJson.refreshToken).toBe('original-refresh');
  });

  it('uses fallback 3600 when refresh response omits expires_in (line 186 branch)', async () => {
    mockReadFile.mockResolvedValueOnce(
      JSON.stringify({
        accessToken: 'old',
        refreshToken: 'rf',
        expiresAt: Date.now() - 60_000,
      })
    );

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce(
        new Response(
          // access_token present, refresh_token present, no expires_in → `|| 3600` on line 186/222
          JSON.stringify({ access_token: 'new-tok', refresh_token: 'new-rf' }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      )
    );

    const logger = { info: vi.fn(), warn: vi.fn(), error: vi.fn() };
    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json', logger });
    const token = await manager.getValidAccessToken();

    expect(token).toBe('new-tok');
    expect(mockWriteFile).toHaveBeenCalled();
  });
});

describe('loadAuthRecord missing fields (line 69 branch)', () => {
  it('returns undefined when parsed JSON has no accessToken', async () => {
    mockReadFile.mockResolvedValueOnce(
      JSON.stringify({ expiresAt: Date.now() + 60_000 }) // no accessToken
    );

    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json' });
    const record = await manager.getAuthRecord();

    expect(record).toBeUndefined();
  });

  it('returns undefined when parsed JSON has no expiresAt', async () => {
    mockReadFile.mockResolvedValueOnce(
      JSON.stringify({ accessToken: 'tok' }) // no expiresAt
    );

    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json' });
    const record = await manager.getAuthRecord();

    expect(record).toBeUndefined();
  });
});

describe('authorizeDeviceCodeFlow erro desconhecido (line 186 branch)', () => {
  beforeEach(() => vi.useFakeTimers());

  it('throws with "erro desconhecido" when token response has no error field', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(
          new Response(
            JSON.stringify({
              device_code: 'dc1',
              user_code: 'ABCD-1234',
              verification_uri: 'https://github.com/login/device',
              expires_in: 300,
              interval: 5,
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
          )
        )
        // token response with no access_token AND no error → hits `|| 'erro desconhecido'`
        .mockResolvedValueOnce(
          new Response(JSON.stringify({}), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        )
    );

    const manager = new CopilotAuthManager({ authFilePath: '/tmp/auth.json' });
    const flowPromise = manager.authorizeDeviceCodeFlow();
    const assertion = expect(flowPromise).rejects.toThrow('erro desconhecido');
    await vi.runAllTimersAsync();
    await assertion;
  });
});
