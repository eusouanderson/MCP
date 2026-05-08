/**
 * API não-interativa do MCP_Frontend
 * Permite uso programático sem CLI interativo
 */

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { downloadFigmaSvgs } from '../integrations/figma.js';
import { ensureSddFile } from '../mcp/sdd-generator.js';
import { runPipeline } from '../mcp/pipeline.js';
import type { PipelineResult, RunPipelineOptions } from '../mcp/interfaces.js';

export interface GenerateFromFigmaOptions {
  figmaUrl: string;
  figmaToken: string;
  outputDir?: string;
  outputFileName?: string;
  useDesignSystem?: boolean;
  llmModel?: string;
  onProgress?: (message: string) => void;
}

export interface GenerateFromLocalSvgOptions {
  svgFilePath: string;
  outputDir?: string;
  outputFileName?: string;
  useDesignSystem?: boolean;
  llmModel?: string;
  onProgress?: (message: string) => void;
}

export interface McpFrontendApiResult {
  success: boolean;
  outputFilePath?: string;
  template?: string;
  error?: string;
}

/**
 * Gera componente Vue a partir de URL do Figma
 */
export async function generateFromFigma(
  options: GenerateFromFigmaOptions
): Promise<McpFrontendApiResult> {
  try {
    const {
      figmaUrl,
      figmaToken,
      outputDir = './output',
      outputFileName,
      useDesignSystem = false,
      llmModel,
      onProgress,
    } = options;

    // Garantir diretórios
    const svgDir = path.resolve(process.cwd(), 'src/svg');
    await mkdir(svgDir, { recursive: true });
    await mkdir(outputDir, { recursive: true });

    // Download SVGs do Figma
    onProgress?.('Baixando designs do Figma...');
    const downloadedSvgs = await downloadFigmaSvgs(figmaUrl, figmaToken);

    if (!downloadedSvgs || downloadedSvgs.length === 0) {
      return {
        success: false,
        error: 'Nenhum SVG foi baixado do Figma',
      };
    }

    // Usar o primeiro SVG baixado
    const svgFilePath = downloadedSvgs[0];
    onProgress?.(`SVG baixado: ${svgFilePath}`);

    // Garantir SDD
    onProgress?.('Verificando Software Design Document...');
    const { sddPath } = await ensureSddFile();

    // Executar pipeline
    onProgress?.('Gerando componente Vue...');
    const pipelineOptions: RunPipelineOptions = {
      sddPath,
      svgFilePath,
      outputDir,
      outputFileName,
      useDesignSystem,
      llmModel,
      hooks: {
        onProgress,
      },
    };

    const result = await runPipeline(pipelineOptions);

    return {
      success: true,
      outputFilePath: result.outputFilePath,
      template: result.template,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Gera componente Vue a partir de SVG local
 */
export async function generateFromLocalSvg(
  options: GenerateFromLocalSvgOptions
): Promise<McpFrontendApiResult> {
  try {
    const {
      svgFilePath,
      outputDir = './output',
      outputFileName,
      useDesignSystem = false,
      llmModel,
      onProgress,
    } = options;

    // Garantir diretórios
    await mkdir(outputDir, { recursive: true });

    // Garantir SDD
    onProgress?.('Verificando Software Design Document...');
    const { sddPath } = await ensureSddFile();

    // Executar pipeline
    onProgress?.('Gerando componente Vue...');
    const pipelineOptions: RunPipelineOptions = {
      sddPath,
      svgFilePath,
      outputDir,
      outputFileName,
      useDesignSystem,
      llmModel,
      hooks: {
        onProgress,
      },
    };

    const result = await runPipeline(pipelineOptions);

    return {
      success: true,
      outputFilePath: result.outputFilePath,
      template: result.template,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: message,
    };
  }
}
