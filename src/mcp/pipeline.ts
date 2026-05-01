import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { uploadSvgFromFile } from '../integrations/svg-upload.js';
import { generateTemplate } from '../llm/llm-client.js';
import { buildContext, SddData } from './context-builder.js';
import { PipelineResult, PipelineStage, RunPipelineOptions } from './interfaces.js';
import { buildPrompt } from './prompt-builder.js';

interface ExtractedSections {
  templateBody: string;
  scriptBody: string;
}

const extractSections = (raw: string): ExtractedSections => {
  const cleanRaw = raw
    .trim()
    .replace(/^```[a-zA-Z]*\n?/g, '')
    .replace(/```$/g, '')
    .trim();

  // Greedy: captura do primeiro <template> ao ultimo </template>
  const templateMatch = cleanRaw.match(/<template>([\s\S]*)<\/template>/i);
  // Greedy: captura do primeiro <script> ao ultimo </script>
  const scriptMatch = cleanRaw.match(/<script\b[^>]*>([\s\S]*)<\/script>/i);

  // Fallback: remove tags <template> e </template> caso o LLM nao gerou corretamente
  const fallbackBody = cleanRaw
    .replace(/^<template>\s*/i, '')
    .replace(/\s*<\/template>[\s\S]*$/i, '')
    .trim();

  return {
    templateBody: templateMatch?.[1]?.trim() ?? fallbackBody,
    scriptBody: scriptMatch?.[1]?.trim() ?? '',
  };
};

const createVueFileContent = (templateBody: string, scriptBody: string): string => {
  const script = scriptBody || '// sem variaveis';
  return `<template>\n${templateBody}\n</template>\n\n<script setup>\n${script}\n</script>\n`;
};

const toFriendlyWriteError = (error: unknown, outputDir: string): Error => {
  if (
    error &&
    typeof error === 'object' &&
    'code' in error &&
    (error as NodeJS.ErrnoException).code === 'EACCES'
  ) {
    return new Error(
      `Sem permissao para escrever em '${outputDir}'. Use um caminho dentro do projeto, por exemplo './output'.`
    );
  }

  return error instanceof Error ? error : new Error(String(error));
};

const runPipeline = async (options: RunPipelineOptions): Promise<PipelineResult> => {
  options.hooks?.onStage?.('read-sdd');
  const sddRaw = await readFile(options.sddPath, 'utf8');
  const sdd = JSON.parse(sddRaw) as SddData;

  options.hooks?.onStage?.('process-svg');
  options.hooks?.onStage?.('upload-svg');
  const assets = await uploadSvgFromFile({
    svgFilePath: options.svgFilePath,
    assetsDir: options.assetsDir,
    onProgress: options.hooks?.onProgress,
  });

  options.hooks?.onStage?.('build-context');
  const context = buildContext(sdd, assets);

  options.hooks?.onStage?.('build-prompt');
  const prompt = buildPrompt(context);

  options.hooks?.onStage?.('call-llm');
  const llmResult = await generateTemplate(prompt, options.llmModel);

  const { templateBody, scriptBody } = extractSections(llmResult);
  const vueFileContent = createVueFileContent(templateBody, scriptBody);

  options.hooks?.onStage?.('save-file');
  const outputFileName = options.outputFileName ?? 'generated-template.vue';
  const outputFilePath = path.resolve(options.outputDir, outputFileName);

  try {
    await mkdir(options.outputDir, { recursive: true });
    await writeFile(outputFilePath, vueFileContent, 'utf8');
  } catch (error) {
    throw toFriendlyWriteError(error, options.outputDir);
  }

  return {
    outputFilePath,
    template: templateBody,
    assets,
  };
};

export { runPipeline };
export type { PipelineResult, PipelineStage, RunPipelineOptions };
