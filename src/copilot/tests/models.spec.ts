import { describe, expect, it, vi } from 'vitest';
import { fetchModels } from '../models.js';

describe('fetchModels', () => {
  it('maps and filters only enabled models', async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            id: 'gpt-5',
            name: 'GPT-5',
            model_picker_enabled: true,
            policy: { state: 'enabled' },
            supported_endpoints: ['chat.completions'],
            capabilities: {
              family: 'gpt',
              supports: {
                streaming: true,
                tool_calls: true,
                structured_outputs: true,
                vision: false,
                adaptive_thinking: true,
                reasoning_effort: [],
              },
              limits: {
                max_context_window_tokens: 128000,
                max_output_tokens: 8192,
                max_prompt_tokens: 8000,
              },
            },
          },
          {
            id: 'disabled-model',
            name: 'Disabled',
            model_picker_enabled: false,
            policy: { state: 'disabled' },
            supported_endpoints: [],
            capabilities: {
              family: 'other',
              supports: { streaming: false, tool_calls: false },
              limits: {
                max_context_window_tokens: 1,
                max_output_tokens: 1,
                max_prompt_tokens: 1,
              },
            },
          },
        ],
      }),
    });

    const models = await fetchModels('https://api.githubcopilot.com', {
      fetcher,
      forceRefresh: true,
    });

    expect(models).toHaveLength(1);
    expect(models[0].id).toBe('gpt-5');
    expect(models[0].capabilities.reasoning).toBe(true);
  });

  it('throws when response is not ok', async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => 'Server error',
    });

    await expect(
      fetchModels('https://api.githubcopilot.com', { fetcher, forceRefresh: true })
    ).rejects.toThrow('Falha ao buscar modelos (500)');
  });

  it('throws when response shape is invalid', async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ foo: 'bar' }),
    });

    await expect(
      fetchModels('https://api.githubcopilot.com', { fetcher, forceRefresh: true })
    ).rejects.toThrow('campo data ausente');
  });

  it('uses cached value when forceRefresh is false', async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [
            {
              id: 'gpt-5-mini',
              name: 'GPT-5 Mini',
              model_picker_enabled: true,
              policy: { state: 'enabled' },
              supported_endpoints: ['chat.completions'],
              capabilities: {
                family: 'gpt',
                supports: { streaming: true, tool_calls: true },
                limits: {
                  max_context_window_tokens: 128000,
                  max_output_tokens: 4096,
                  max_prompt_tokens: 4000,
                },
              },
            },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [] }),
      });

    const baseURL = 'https://cache-test.example';
    const first = await fetchModels(baseURL, { fetcher, forceRefresh: true });
    const second = await fetchModels(baseURL, { fetcher });

    expect(first).toHaveLength(1);
    expect(second).toHaveLength(1);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('deduplicates concurrent inflight requests (line 74)', async () => {
    const baseURL = 'https://inflight-test.example';
    let resolveFirst!: (v: unknown) => void;
    const firstCallPromise = new Promise((res) => {
      resolveFirst = res;
    });

    const fetcher = vi.fn().mockReturnValueOnce(
      firstCallPromise.then(() => ({
        ok: true,
        json: async () => ({
          data: [
            {
              id: 'inflight-model',
              name: 'Inflight',
              model_picker_enabled: true,
              policy: { state: 'enabled' },
              supported_endpoints: [],
              capabilities: {
                family: 'gpt',
                supports: { streaming: false, tool_calls: false },
                limits: {
                  max_context_window_tokens: 1,
                  max_output_tokens: 1,
                  max_prompt_tokens: 1,
                },
              },
            },
          ],
        }),
      }))
    );

    // launch two concurrent fetches — second should return the INFLIGHT promise (line 74)
    const p1 = fetchModels(baseURL, { fetcher, forceRefresh: true });
    const p2 = fetchModels(baseURL, { fetcher });

    resolveFirst(undefined);
    const [r1, r2] = await Promise.all([p1, p2]);

    expect(r1).toHaveLength(1);
    expect(r2).toHaveLength(1);
    // fetcher only called once despite two concurrent calls
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('uses [] when model has no supported_endpoints (line 25 branch)', async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            id: 'no-endpoints-model',
            name: 'No Endpoints',
            model_picker_enabled: true,
            policy: { state: 'enabled' },
            // no supported_endpoints field → hits `|| []`
            capabilities: {
              family: 'gpt',
              supports: { streaming: false, tool_calls: false },
              limits: {
                max_context_window_tokens: 1000,
                max_output_tokens: 500,
                max_prompt_tokens: 800,
              },
            },
          },
        ],
      }),
    });

    const models = await fetchModels('https://api.githubcopilot.com/no-ep', {
      fetcher,
      forceRefresh: true,
    });

    expect(models[0].endpoints).toEqual([]);
  });

  it('falls back to global fetch when no fetcher provided (line 79 branch)', async () => {
    const globalFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            id: 'global-fetch-model',
            name: 'Global Fetch',
            model_picker_enabled: true,
            policy: { state: 'enabled' },
            supported_endpoints: [],
            capabilities: {
              family: 'gpt',
              supports: { streaming: false, tool_calls: false },
              limits: {
                max_context_window_tokens: 1000,
                max_output_tokens: 500,
                max_prompt_tokens: 800,
              },
            },
          },
        ],
      }),
    });
    vi.stubGlobal('fetch', globalFetch);

    // no fetcher → uses global fetch (line 79 `|| fetch`)
    const models = await fetchModels('https://api.githubcopilot.com/global', {
      forceRefresh: true,
    });

    expect(globalFetch).toHaveBeenCalled();
    expect(models[0].id).toBe('global-fetch-model');
    vi.unstubAllGlobals();
  });
});
