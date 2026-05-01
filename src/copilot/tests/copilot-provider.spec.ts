import { describe, expect, it, vi } from 'vitest';
import { CopilotProvider } from '../copilot-provider.js';

const buildProvider = (
  fetcher: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
) =>
  new CopilotProvider({
    baseURL: 'https://api.githubcopilot.com',
    fetcher,
    logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
  });

describe('CopilotProvider', () => {
  it('chat() returns first choice text', async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue(
        new Response(
          JSON.stringify({ choices: [{ message: { content: '  resposta do chat  ' } }] }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      );

    const provider = buildProvider(fetcher);
    const output = await provider.chat('gpt-5-mini', {
      messages: [{ role: 'user', content: 'oi' }],
    });

    expect(output).toBe('resposta do chat');
  });

  it('chat() throws when response body has no content', async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ choices: [{ message: { content: '' } }] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const provider = buildProvider(fetcher);

    await expect(
      provider.chat('gpt-5-mini', { messages: [{ role: 'user', content: 'oi' }] })
    ).rejects.toThrow('resposta sem texto');
  });

  it('responses() uses output_text when available', async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ output_text: '  texto final  ' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const provider = buildProvider(fetcher);
    const output = await provider.responses('gpt-5', {
      messages: [{ role: 'user', content: 'oi' }],
    });

    expect(output).toBe('texto final');
  });

  it('responses() falls back to output content parts', async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          output: [
            {
              content: [
                { type: 'output_text', text: 'linha 1' },
                { type: 'text', text: 'linha 2' },
              ],
            },
          ],
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    );

    const provider = buildProvider(fetcher);
    const output = await provider.responses('gpt-5', {
      messages: [{ role: 'user', content: 'oi' }],
    });

    expect(output).toContain('linha 1');
    expect(output).toContain('linha 2');
  });

  it('throws with endpoint context on non-2xx response', async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue(
        new Response('boom', { status: 500, headers: { 'Content-Type': 'text/plain' } })
      );

    const provider = buildProvider(fetcher);

    await expect(
      provider.responses('gpt-5', { messages: [{ role: 'user', content: 'oi' }] })
    ).rejects.toThrow('Copilot responses falhou com status 500');
  });

  it('responses() throws when extractResponsesText returns undefined (empty output)', async () => {
    // no output_text, empty output array → extractResponsesText returns undefined (line 36)
    // then responses() throws (line 96)
    const fetcher = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ output: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const provider = buildProvider(fetcher);

    await expect(
      provider.responses('gpt-5', { messages: [{ role: 'user', content: 'oi' }] })
    ).rejects.toThrow('Copilot responses retornou resposta sem texto.');
  });

  it('models() delegates to fetchModels (line 103)', async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
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
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    );

    const provider = buildProvider(fetcher);
    const models = await provider.models();

    expect(models.length).toBeGreaterThan(0);
    expect(models[0].id).toBe('gpt-5-mini');
  });

  it('uses console logger when no logger option provided (line 47 branch)', async () => {
    // construct without logger → hits `options.logger || console`
    const fetcher = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ choices: [{ message: { content: 'ok' } }] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );
    const provider = new CopilotProvider({ baseURL: 'https://api.githubcopilot.com', fetcher });
    const output = await provider.chat('gpt-5-mini', {
      messages: [{ role: 'user', content: 'hi' }],
    });
    expect(output).toBe('ok');
  });

  it('extractResponsesText handles output item with no content field (line 26 branch)', async () => {
    // output item has no content → `item.content || []` uses []
    const fetcher = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ output: [{ type: 'message' }] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );
    const provider = buildProvider(fetcher);
    await expect(
      provider.responses('gpt-5', { messages: [{ role: 'user', content: 'oi' }] })
    ).rejects.toThrow('resposta sem texto');
  });

  it('extractResponsesText handles content part with no text field (line 28 branch)', async () => {
    // part has no text → `part.text || ''` uses ''
    const fetcher = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          output: [{ content: [{ type: 'output_text' }] }],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    );
    const provider = buildProvider(fetcher);
    await expect(
      provider.responses('gpt-5', { messages: [{ role: 'user', content: 'oi' }] })
    ).rejects.toThrow('resposta sem texto');
  });
});
