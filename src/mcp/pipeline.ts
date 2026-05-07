import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { buildScriptSetup, extractUsedDsComponents, fetchDsComponents } from '../ds/resolver.js';
import { uploadSvgFromFile } from '../integrations/svg-upload.js';
import { generateTemplate } from '../llm/llm-client.js';
import { buildContext, SddData } from './context-builder.js';
import {
  ExtractedSections,
  PipelineResult,
  PipelineStage,
  RunPipelineOptions,
} from './interfaces.js';
import { buildPrompt } from './prompt-builder.js';

const extractSections = (raw: string): ExtractedSections => {
  const cleanRaw = raw
    .trim()
    .replace(/^```[a-zA-Z]*\n?/g, '')
    .replace(/```$/g, '')
    .trim();

  const templateMatch = cleanRaw.match(/<template>([\s\S]*)<\/template>/i);
  const scriptMatch = cleanRaw.match(/<script\b[^>]*>([\s\S]*)<\/script>/i);

  const fallbackBody = cleanRaw
    .replace(/^<template>\s*/i, '')
    .replace(/\s*<\/template>[\s\S]*$/i, '')
    .trim();

  return {
    templateBody: templateMatch?.[1]?.trim() ?? fallbackBody,
    scriptBody: scriptMatch?.[1]?.trim() ?? '',
  };
};

const createVueFileContent = (templateBody: string, scriptSetup?: string): string => {
  if (scriptSetup) {
    return `${scriptSetup}\n\n<template>\n${templateBody}\n</template>\n`;
  }
  return `<template>\n${templateBody}\n</template>\n`;
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

  let dsComponents = undefined;
  if (options.useDesignSystem) {
    options.hooks?.onProgress?.('Buscando componentes do design system...');
    dsComponents = await fetchDsComponents(['form', 'icon', 'feedback']);
  }

  options.hooks?.onStage?.('build-context');
  const context = buildContext(sdd, assets, dsComponents);

  options.hooks?.onStage?.('build-prompt');
  const prompt = buildPrompt(context);

  const forceDsUsageSuffix = `
ATENCAO FINAL (OBRIGATORIO):
- O modo Design System esta ATIVO.
- O output final deve usar componentes de "@comercti/vue-components" e/ou "@comercti/icons-hmg" quando houver equivalencia visual.
- Nao retorne o SVG bruto como resultado final.
- Inclua <script setup lang="ts"> com imports reais dos componentes usados.
`;

  options.hooks?.onStage?.('call-llm');
  let llmResult = await generateTemplate(prompt, options.llmModel);

  let { templateBody, scriptBody } = extractSections(llmResult);
  if (options.useDesignSystem && dsComponents && dsComponents.length > 0) {
    const usedInFirstPass = extractUsedDsComponents(templateBody, dsComponents);
    const scriptHasDsImports = /@comercti\/(vue-components|icons-hmg)/.test(scriptBody);

    if (usedInFirstPass.length === 0 && !scriptHasDsImports) {
      options.hooks?.onProgress?.(
        'Primeira resposta sem componentes DS detectados. Reforcando prompt e tentando novamente...'
      );
      llmResult = await generateTemplate(`${prompt}\n${forceDsUsageSuffix}`, options.llmModel);
      ({ templateBody, scriptBody } = extractSections(llmResult));
    }
  }

  let scriptSetup: string | undefined;
  if (options.useDesignSystem && dsComponents && dsComponents.length > 0) {
    const usedComponents = extractUsedDsComponents(templateBody, dsComponents);
    if (scriptBody && scriptBody.includes('@comercti')) {
      scriptSetup = `<script setup lang="ts">\n${scriptBody}\n</script>`;
    } else if (usedComponents.length > 0) {
      scriptSetup = buildScriptSetup(usedComponents);
    }
  }

  const vueFileContent = createVueFileContent(templateBody, scriptSetup);

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

