import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('designSystemData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    delete process.env.URL_DS;
  });

  it('uses default URL when URL_DS is not defined', async () => {
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({ version: '1.0' }),
    });

    vi.stubGlobal('fetch', mockFetch);

    const { designSystemData } = await import('../index.js');
    const result = await designSystemData('ce-button.json');

    expect(result).toEqual({ version: '1.0' });
    // Quando URL_DS não está definido, usa o valor padrão no módulo
    expect(mockFetch).toHaveBeenCalledWith(expect.any(String));

    vi.unstubAllGlobals();
  });

  it('fetches and returns design system data successfully', async () => {
    process.env.URL_DS = 'https://custom-ds.com/api/tokens.json';

    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({ colors: ['red', 'blue'] }),
    });

    vi.stubGlobal('fetch', mockFetch);

    const { designSystemData } = await import('../index.js');
    const result = await designSystemData('ce-button.json');

    expect(result).toEqual({ colors: ['red', 'blue'] });
    expect(mockFetch).toHaveBeenCalledWith('https://custom-ds.com/api/tokens.json/ce-button.json');

    vi.unstubAllGlobals();
  });

  it('returns null when response is not ok', async () => {
    process.env.URL_DS = 'https://design-system.example.com/data.json';

    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: false,
    });

    vi.stubGlobal('fetch', mockFetch);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { designSystemData } = await import('../index.js');
    const result = await designSystemData('ce-button.json');

    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

    consoleErrorSpy.mockRestore();
    vi.unstubAllGlobals();
  });

  it('returns null when fetch throws an error', async () => {
    process.env.URL_DS = 'https://design-system.example.com/data.json';

    const mockFetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

    vi.stubGlobal('fetch', mockFetch);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { designSystemData } = await import('../index.js');
    const result = await designSystemData('ce-button.json');

    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

    consoleErrorSpy.mockRestore();
    vi.unstubAllGlobals();
  });

  it('returns null and logs error when JSON parsing fails', async () => {
    process.env.URL_DS = 'https://design-system.example.com/data.json';

    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockRejectedValueOnce(new Error('Invalid JSON')),
    });

    vi.stubGlobal('fetch', mockFetch);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { designSystemData } = await import('../index.js');
    const result = await designSystemData('ce-button.json');

    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

    consoleErrorSpy.mockRestore();
    vi.unstubAllGlobals();
  });

  it('returns data when response.text is not a function', async () => {
    process.env.URL_DS = 'https://design-system.example.com/data.json';

    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: vi.fn().mockResolvedValueOnce({ data: 'test' }),
      text: undefined, // Simulate response.text not being a function
    });

    vi.stubGlobal('fetch', mockFetch);
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { designSystemData } = await import('../index.js');
    const result = await designSystemData('ce-button.json');

    expect(result).toEqual({ data: 'test' });
    expect(consoleLogSpy).not.toHaveBeenCalled(); // DS_DEBUG is not enabled

    consoleLogSpy.mockRestore();
    vi.unstubAllGlobals();
  });

  it('handles non-JSON response with correct warning', async () => {
    process.env.URL_DS = 'https://design-system.example.com/data.json';
    process.env.DS_DEBUG = '1';

    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      text: vi.fn().mockResolvedValueOnce('<html>Not JSON</html>'),
      headers: {
        get: vi.fn().mockReturnValueOnce('text/html'),
      },
    });

    vi.stubGlobal('fetch', mockFetch);
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { designSystemData } = await import('../index.js');
    const result = await designSystemData('ce-button.json');

    expect(result).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Resposta DS ignorada (nao JSON)')
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Resposta gerada')
    );

    consoleWarnSpy.mockRestore();
    consoleLogSpy.mockRestore();
    delete process.env.DS_DEBUG;
    vi.unstubAllGlobals();
  });

  it('handles JSON parse failure with application/json content-type', async () => {
    process.env.URL_DS = 'https://design-system.example.com/data.json';
    process.env.DS_DEBUG = '1';

    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      text: vi.fn().mockResolvedValueOnce('{invalid json}'),
      headers: {
        get: vi.fn().mockReturnValueOnce('application/json'),
      },
    });

    vi.stubGlobal('fetch', mockFetch);
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { designSystemData } = await import('../index.js');
    const result = await designSystemData('ce-button.json');

    expect(result).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Falha ao parsear JSON do endpoint')
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Resposta gerada')
    );

    consoleWarnSpy.mockRestore();
    consoleLogSpy.mockRestore();
    delete process.env.DS_DEBUG;
    vi.unstubAllGlobals();
  });

  it('parses valid JSON from text response successfully', async () => {
    process.env.URL_DS = 'https://design-system.example.com/data.json';
    process.env.DS_DEBUG = '1';

    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      text: vi.fn().mockResolvedValueOnce('{"colors": ["red", "blue"]}'),
      headers: {
        get: vi.fn().mockReturnValueOnce('application/json'),
      },
    });

    vi.stubGlobal('fetch', mockFetch);
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { designSystemData } = await import('../index.js');
    const result = await designSystemData('ce-button.json');

    expect(result).toEqual({ colors: ['red', 'blue'] });
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Resposta gerada')
    );

    consoleLogSpy.mockRestore();
    delete process.env.DS_DEBUG;
    vi.unstubAllGlobals();
  });

  it('handles response with missing content-type header', async () => {
    process.env.URL_DS = 'https://design-system.example.com/data.json';
    process.env.DS_DEBUG = '1';

    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      text: vi.fn().mockResolvedValueOnce('not json'),
      headers: {
        get: vi.fn().mockReturnValueOnce(null),
      },
    });

    vi.stubGlobal('fetch', mockFetch);
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { designSystemData } = await import('../index.js');
    const result = await designSystemData('ce-button.json');

    expect(result).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('content-type=desconhecido')
    );

    consoleWarnSpy.mockRestore();
    delete process.env.DS_DEBUG;
    vi.unstubAllGlobals();
  });
});

describe('getAllDesignSystemData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    delete process.env.URL_DS;
  });

  it('fetches data for all endpoints', async () => {
    process.env.URL_DS = 'https://design-system.example.com';

    const mockFetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValueOnce({ component: 'button' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValueOnce({ component: 'input' }),
      });

    vi.stubGlobal('fetch', mockFetch);

    const { getAllDesignSystemData, endpoints } = await import('../index.js');
    const result = await getAllDesignSystemData();

    expect(result).toHaveLength(endpoints.length);
    expect(mockFetch).toHaveBeenCalledTimes(endpoints.length);

    vi.unstubAllGlobals();
  });

  it('returns null for failed endpoints while continuing others', async () => {
    process.env.URL_DS = 'https://design-system.example.com';

    const mockFetch = vi.fn()
      .mockResolvedValueOnce({
        ok: false,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValueOnce({ component: 'input' }),
      });

    vi.stubGlobal('fetch', mockFetch);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { getAllDesignSystemData } = await import('../index.js');
    const result = await getAllDesignSystemData();

    expect(result[0]).toBeNull();
    expect(result[1]).toEqual({ component: 'input' });
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
    vi.unstubAllGlobals();
  });
});

describe('preview function coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    delete process.env.URL_DS;
  });

  it('truncates long response body in non-JSON warning when DS_DEBUG is enabled', async () => {
    process.env.URL_DS = 'https://design-system.example.com/data.json';
    process.env.DS_DEBUG = '1';

    const longHtmlBody = '<html>' + 'x'.repeat(200) + '</html>';
    
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      text: vi.fn().mockResolvedValueOnce(longHtmlBody),
      headers: {
        get: vi.fn().mockReturnValueOnce('text/html'),
      },
    });

    vi.stubGlobal('fetch', mockFetch);
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { designSystemData } = await import('../index.js');
    const result = await designSystemData('ce-button.json');

    expect(result).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('...')
    );

    consoleWarnSpy.mockRestore();
    delete process.env.DS_DEBUG;
    vi.unstubAllGlobals();
  });

  it('does not truncate short response body in warning', async () => {
    process.env.URL_DS = 'https://design-system.example.com/data.json';
    process.env.DS_DEBUG = '1';

    const shortBody = '<html>short</html>';
    
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      text: vi.fn().mockResolvedValueOnce(shortBody),
      headers: {
        get: vi.fn().mockReturnValueOnce('text/html'),
      },
    });

    vi.stubGlobal('fetch', mockFetch);
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { designSystemData } = await import('../index.js');
    const result = await designSystemData('ce-button.json');

    expect(result).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('<html>short</html>')
    );
    expect(consoleWarnSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('...')
    );

    consoleWarnSpy.mockRestore();
    delete process.env.DS_DEBUG;
    vi.unstubAllGlobals();
  });

  it('truncates long invalid JSON in parse failure warning', async () => {
    process.env.URL_DS = 'https://design-system.example.com/data.json';
    process.env.DS_DEBUG = '1';

    const longInvalidJson = '{invalid json with very long content: ' + 'x'.repeat(200) + '}';
    
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      text: vi.fn().mockResolvedValueOnce(longInvalidJson),
      headers: {
        get: vi.fn().mockReturnValueOnce('application/json'),
      },
    });

    vi.stubGlobal('fetch', mockFetch);
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { designSystemData } = await import('../index.js');
    const result = await designSystemData('ce-button.json');

    expect(result).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('...')
    );

    consoleWarnSpy.mockRestore();
    delete process.env.DS_DEBUG;
    vi.unstubAllGlobals();
  });

  it('handles non-JSON response without DS_DEBUG (no warning logged)', async () => {
    process.env.URL_DS = 'https://design-system.example.com/data.json';
    delete process.env.DS_DEBUG;

    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      text: vi.fn().mockResolvedValueOnce('<html>Not JSON</html>'),
      headers: {
        get: vi.fn().mockReturnValueOnce('text/html'),
      },
    });

    vi.stubGlobal('fetch', mockFetch);
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { designSystemData } = await import('../index.js');
    const result = await designSystemData('ce-button.json');

    expect(result).toBeNull();
    expect(consoleWarnSpy).not.toHaveBeenCalled();

    consoleWarnSpy.mockRestore();
    vi.unstubAllGlobals();
  });
});
