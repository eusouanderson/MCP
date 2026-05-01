import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockRunModel = vi.hoisted(() => vi.fn());

vi.mock('../../copilot/provider.js', () => ({
  copilotRuntime: {
    runModel: mockRunModel,
  },
}));

import { generateTemplate } from '../llm-client.js';

describe('generateTemplate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('uses explicit model when provided', async () => {
    mockRunModel.mockResolvedValueOnce('<div>ok</div>');

    const output = await generateTemplate('PROMPT', 'gpt-5');

    expect(output).toBe('<div>ok</div>');
    expect(mockRunModel).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: expect.arrayContaining([
          expect.objectContaining({ role: 'system' }),
          expect.objectContaining({ role: 'user', content: 'PROMPT' }),
        ]),
        temperature: 0,
      }),
      'gpt-5'
    );
  });

  it('uses COPILOT_MODEL from env when model arg is not provided', async () => {
    process.env.COPILOT_MODEL = 'gpt-5-mini';
    mockRunModel.mockResolvedValueOnce('<div>env</div>');

    const output = await generateTemplate('PROMPT');

    expect(output).toBe('<div>env</div>');
    expect(mockRunModel).toHaveBeenCalledWith(expect.any(Object), 'gpt-5-mini');
  });

  it('uses default model when no arg and no env', async () => {
    delete process.env.COPILOT_MODEL;
    mockRunModel.mockResolvedValueOnce('<div>default</div>');

    const output = await generateTemplate('PROMPT');

    expect(output).toBe('<div>default</div>');
    expect(mockRunModel).toHaveBeenCalledWith(expect.any(Object), 'gpt-5-mini');
  });

  it('throws when model returns empty content', async () => {
    mockRunModel.mockResolvedValueOnce('');

    await expect(generateTemplate('PROMPT', 'gpt-5-mini')).rejects.toThrow(
      'A LLM nao retornou conteudo'
    );
  });
});
