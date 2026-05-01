import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('node:fs/promises', () => ({
  readFile: vi.fn(),
  writeFile: vi.fn().mockResolvedValue(undefined),
  mkdir: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../integrations/svg-upload.js', () => ({
  uploadSvgFromFile: vi.fn().mockResolvedValue([{ name: 'MyIcon', path: 'src/svg/my-icon.svg' }]),
}));

vi.mock('../../llm/llm-client.js', () => ({
  generateTemplate: vi.fn().mockResolvedValue('<template><div>Hello World</div></template>'),
}));

import { mkdir, readFile } from 'node:fs/promises';
import { generateTemplate } from '../../llm/llm-client.js';
import { runPipeline } from '../pipeline.js';

const BASE_OPTIONS = {
  sddPath: 'src/docs/sdd.json',
  svgFilePath: 'src/svg/icon.svg',
  outputDir: 'output',
};

describe('runPipeline', () => {
  beforeEach(() => {
    vi.mocked(readFile).mockResolvedValue(
      JSON.stringify({ title: 'Test SDD', components: [] }) as any
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns a PipelineResult with outputFilePath, template and assets', async () => {
    const result = await runPipeline(BASE_OPTIONS);

    expect(result.outputFilePath).toContain('generated-template.vue');
    expect(result.template).toContain('<div>Hello World</div>');
    expect(result.assets).toHaveLength(1);
    expect(result.assets[0].name).toBe('MyIcon');
  });

  it('calls all pipeline stages in hooks.onStage', async () => {
    const stages: string[] = [];

    await runPipeline({ ...BASE_OPTIONS, hooks: { onStage: (s) => stages.push(s) } });

    expect(stages).toContain('read-sdd');
    expect(stages).toContain('upload-svg');
    expect(stages).toContain('build-context');
    expect(stages).toContain('build-prompt');
    expect(stages).toContain('call-llm');
    expect(stages).toContain('save-file');
  });

  it('uses custom outputFileName when provided', async () => {
    const result = await runPipeline({ ...BASE_OPTIONS, outputFileName: 'custom-output.vue' });
    expect(result.outputFilePath).toContain('custom-output.vue');
  });

  it('passes llmModel to generateTemplate', async () => {
    await runPipeline({ ...BASE_OPTIONS, llmModel: 'gpt-4' });
    expect(vi.mocked(generateTemplate)).toHaveBeenCalledWith(expect.any(String), 'gpt-4');
  });

  it('wraps EACCES error with a friendly message', async () => {
    const eaccesError = Object.assign(new Error('Permission denied'), { code: 'EACCES' });
    vi.mocked(mkdir).mockRejectedValueOnce(eaccesError);

    await expect(runPipeline({ ...BASE_OPTIONS, outputDir: '/root/forbidden' })).rejects.toThrow(
      'Sem permissao para escrever'
    );
  });

  it('strips markdown code fences from LLM output', async () => {
    vi.mocked(generateTemplate).mockResolvedValueOnce(
      '```vue\n<template><span>Stripped</span></template>\n```'
    );

    const result = await runPipeline(BASE_OPTIONS);

    expect(result.template).not.toContain('```');
    expect(result.template).toContain('<span>Stripped</span>');
  });

  it('extracts inner content from <template> tags in LLM output', async () => {
    vi.mocked(generateTemplate).mockResolvedValueOnce(
      '<template><section id="main">Content</section></template>'
    );

    const result = await runPipeline(BASE_OPTIONS);
    expect(result.template).toBe('<section id="main">Content</section>');
  });

  it('returns full content when LLM output has no <template> tags (line 21)', async () => {
    vi.mocked(generateTemplate).mockResolvedValueOnce('<div>No template tags</div>');

    const result = await runPipeline(BASE_OPTIONS);
    expect(result.template).toBe('<div>No template tags</div>');
  });

  it('re-throws non-EACCES Error instances as-is (line 40 true branch)', async () => {
    const genericError = new Error('disk full');
    vi.mocked(mkdir).mockRejectedValueOnce(genericError);

    await expect(runPipeline(BASE_OPTIONS)).rejects.toThrow('disk full');
  });

  it('wraps non-Error non-EACCES thrown values in a new Error (line 40 false branch)', async () => {
    vi.mocked(mkdir).mockRejectedValueOnce('string-error-value' as any);

    await expect(runPipeline(BASE_OPTIONS)).rejects.toThrow('string-error-value');
  });
});
