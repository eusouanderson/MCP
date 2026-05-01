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
    const result = await designSystemData();

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
    const result = await designSystemData();

    expect(result).toEqual({ colors: ['red', 'blue'] });
    expect(mockFetch).toHaveBeenCalledWith('https://custom-ds.com/api/tokens.json');

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
    const result = await designSystemData();

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
    const result = await designSystemData();

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
    const result = await designSystemData();

    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

    consoleErrorSpy.mockRestore();
    vi.unstubAllGlobals();
  });
});
