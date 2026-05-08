import { describe, expect, it, vi } from 'vitest';
import { createCopilotFetch } from '../fetch.js';

const createResponse = (status: number, body = 'ok'): Response =>
  new Response(body, {
    status,
    headers: { 'Content-Type': 'text/plain' },
  });

describe('createCopilotFetch', () => {
  it('adds authorization and copilot headers', async () => {
    const auth = {
      getValidAccessToken: vi.fn().mockResolvedValue('token-123'),
      refreshAccessToken: vi.fn().mockResolvedValue('token-456'),
    };

    const fetchSpy = vi.fn().mockResolvedValue(createResponse(200));
    vi.stubGlobal('fetch', fetchSpy);

    const wrappedFetch = createCopilotFetch({ auth, maxRetries: 0 });
    await wrappedFetch('https://api.githubcopilot.com/models');

    const call = fetchSpy.mock.calls[0];
    const headers = new Headers(call[1].headers as HeadersInit);

    expect(headers.get('Authorization')).toBe('Bearer token-123');
    expect(headers.get('User-Agent')).toContain('mcp-frontend-copilot');
    expect(headers.get('Openai-Intent')).toBe('conversation-edits');
  });

  it('refreshes token on 401 and retries once', async () => {
    const auth = {
      getValidAccessToken: vi.fn().mockResolvedValue('token-123'),
      refreshAccessToken: vi.fn().mockResolvedValue('token-new'),
    };

    const fetchSpy = vi
      .fn()
      .mockResolvedValueOnce(createResponse(401, 'expired'))
      .mockResolvedValueOnce(createResponse(200, 'ok'));
    vi.stubGlobal('fetch', fetchSpy);

    const wrappedFetch = createCopilotFetch({ auth, maxRetries: 0 });
    const response = await wrappedFetch('https://api.githubcopilot.com/chat/completions');

    expect(response.status).toBe(200);
    expect(auth.refreshAccessToken).toHaveBeenCalledOnce();
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it('throws explicit auth error when refresh retry also returns 401', async () => {
    const auth = {
      getValidAccessToken: vi.fn().mockResolvedValue('token-123'),
      refreshAccessToken: vi.fn().mockResolvedValue('token-new'),
    };

    const fetchSpy = vi
      .fn()
      .mockResolvedValueOnce(createResponse(401, 'expired'))
      .mockResolvedValueOnce(createResponse(401, 'still expired'));
    vi.stubGlobal('fetch', fetchSpy);

    const wrappedFetch = createCopilotFetch({ auth, maxRetries: 0 });

    await expect(wrappedFetch('https://api.githubcopilot.com/chat/completions')).rejects.toThrow(
      'Falha de autenticacao Copilot (401)'
    );
  });

  it('retries retryable status codes with exponential backoff', async () => {
    vi.useFakeTimers();
    const auth = {
      getValidAccessToken: vi.fn().mockResolvedValue('token-123'),
      refreshAccessToken: vi.fn().mockResolvedValue('token-new'),
    };

    const fetchSpy = vi
      .fn()
      .mockResolvedValueOnce(createResponse(503, 'unavailable'))
      .mockResolvedValueOnce(createResponse(200, 'ok'));
    vi.stubGlobal('fetch', fetchSpy);

    const wrappedFetch = createCopilotFetch({ auth, maxRetries: 2, retryDelayMs: 1 });
    const promise = wrappedFetch('https://api.githubcopilot.com/models');

    await vi.runAllTimersAsync();
    const response = await promise;

    expect(response.status).toBe(200);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it('retries on network error (TypeError) then succeeds (lines 4,83-87)', async () => {
    vi.useFakeTimers();
    const auth = {
      getValidAccessToken: vi.fn().mockResolvedValue('token-123'),
      refreshAccessToken: vi.fn().mockResolvedValue('token-new'),
    };

    const fetchSpy = vi
      .fn()
      .mockRejectedValueOnce(new TypeError('fetch failed'))
      .mockResolvedValueOnce(createResponse(200, 'ok'));
    vi.stubGlobal('fetch', fetchSpy);

    const wrappedFetch = createCopilotFetch({ auth, maxRetries: 2, retryDelayMs: 1 });
    const promise = wrappedFetch('https://api.githubcopilot.com/models');

    await vi.runAllTimersAsync();
    const response = await promise;

    expect(response.status).toBe(200);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it('throws non-retryable network error immediately (maxRetries=0)', async () => {
    const auth = {
      getValidAccessToken: vi.fn().mockResolvedValue('token-123'),
      refreshAccessToken: vi.fn().mockResolvedValue('token-new'),
    };

    const fetchSpy = vi.fn().mockRejectedValueOnce(new TypeError('network down'));
    vi.stubGlobal('fetch', fetchSpy);

    const wrappedFetch = createCopilotFetch({ auth, maxRetries: 0 });

    await expect(wrappedFetch('https://api.githubcopilot.com/models')).rejects.toThrow(
      'network down'
    );
  });

  it('uses default maxRetries=2 when not specified (line 23 branch)', async () => {
    vi.useFakeTimers();
    const auth = {
      getValidAccessToken: vi.fn().mockResolvedValue('token-123'),
      refreshAccessToken: vi.fn().mockResolvedValue('token-new'),
    };

    const fetchSpy = vi
      .fn()
      .mockResolvedValueOnce(createResponse(503, 'fail1'))
      .mockResolvedValueOnce(createResponse(503, 'fail2'))
      .mockResolvedValueOnce(createResponse(200, 'ok'));
    vi.stubGlobal('fetch', fetchSpy);

    // no maxRetries → defaults to 2
    const wrappedFetch = createCopilotFetch({ auth });
    const promise = wrappedFetch('https://api.githubcopilot.com/models');

    await vi.runAllTimersAsync();
    const response = await promise;

    expect(response.status).toBe(200);
    expect(fetchSpy).toHaveBeenCalledTimes(3); // 1 original + 2 retries
    vi.useRealTimers();
  });

  it(
    'aborts request and logs warning when timeout is reached (lines 47-48)',
    { timeout: 1000 },
    async () => {
      const auth = {
        getValidAccessToken: vi.fn().mockResolvedValue('token-123'),
        refreshAccessToken: vi.fn().mockResolvedValue('token-new'),
      };

      const logger = {
        warn: vi.fn(),
      };

      // Create a promise that listens to abort signal
      const fetchSpy = vi.fn().mockImplementation((url, init) => {
        return new Promise((resolve, reject) => {
          init.signal?.addEventListener('abort', () => {
            reject(new DOMException('The operation was aborted', 'AbortError'));
          });
        });
      });
      vi.stubGlobal('fetch', fetchSpy);

      const wrappedFetch = createCopilotFetch({
        auth,
        logger,
        timeoutMs: 50, // Very short timeout
        maxRetries: 0,
      });

      await expect(wrappedFetch('https://api.githubcopilot.com/models')).rejects.toThrow(
        'The operation was aborted'
      );

      // Verify the warning was logged
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining('Timeout de 50ms atingido. Abortando requisição...')
      );

      vi.unstubAllGlobals();
    }
  );

  it(
    'aborts retry request when timeout is reached during 401 retry (line 67)',
    { timeout: 1000 },
    async () => {
      const auth = {
        getValidAccessToken: vi.fn().mockResolvedValue('token-123'),
        refreshAccessToken: vi.fn().mockResolvedValue('token-refreshed'),
      };

      // First request returns 401, second request listens to abort signal
      const fetchSpy = vi
        .fn()
        .mockResolvedValueOnce(createResponse(401, 'expired'))
        .mockImplementationOnce((url, init) => {
          return new Promise((resolve, reject) => {
            init.signal?.addEventListener('abort', () => {
              reject(new DOMException('The operation was aborted', 'AbortError'));
            });
          });
        });
      vi.stubGlobal('fetch', fetchSpy);

      const wrappedFetch = createCopilotFetch({
        auth,
        timeoutMs: 50, // Short timeout
        maxRetries: 0,
      });

      await expect(wrappedFetch('https://api.githubcopilot.com/models')).rejects.toThrow(
        'The operation was aborted'
      );

      // Verify both requests were made (original + retry after 401)
      expect(fetchSpy).toHaveBeenCalledTimes(2);
      expect(auth.refreshAccessToken).toHaveBeenCalledOnce();

      vi.unstubAllGlobals();
    }
  );

  it('retries on AbortError (timeout) then succeeds', async () => {
    vi.useFakeTimers();
    const auth = {
      getValidAccessToken: vi.fn().mockResolvedValue('token-123'),
      refreshAccessToken: vi.fn().mockResolvedValue('token-new'),
    };

    const abortError = new DOMException('The operation was aborted', 'AbortError');
    const fetchSpy = vi
      .fn()
      .mockRejectedValueOnce(abortError)
      .mockResolvedValueOnce(createResponse(200, 'ok'));
    vi.stubGlobal('fetch', fetchSpy);

    const wrappedFetch = createCopilotFetch({ auth, maxRetries: 2, retryDelayMs: 1 });
    const promise = wrappedFetch('https://api.githubcopilot.com/models');

    await vi.runAllTimersAsync();
    const response = await promise;

    expect(response.status).toBe(200);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });
});
