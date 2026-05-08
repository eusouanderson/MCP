/**
 * Testes para a API não-interativa
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateFromFigma, generateFromLocalSvg } from './index.js';

// Mock dos módulos dependentes
vi.mock('../integrations/figma.js', () => ({
  downloadFigmaSvgs: vi.fn(() => Promise.resolve(['src/svg/test.svg'])),
}));

vi.mock('../mcp/sdd-generator.js', () => ({
  ensureSddFile: vi.fn(() => Promise.resolve({ sddPath: 'src/docs/sdd.json', created: false })),
}));

vi.mock('../mcp/pipeline.js', () => ({
  runPipeline: vi.fn(() =>
    Promise.resolve({
      outputFilePath: 'output/TestComponent.vue',
      template: '<template><div>Test</div></template>',
      assets: [],
    })
  ),
}));

describe('API não-interativa', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('generateFromFigma', () => {
    it('deve gerar componente a partir do Figma com sucesso', async () => {
      const result = await generateFromFigma({
        figmaUrl: 'https://www.figma.com/file/test/Design',
        figmaToken: 'figd_test_token',
        outputDir: './output',
        outputFileName: 'TestComponent',
        useDesignSystem: true,
        llmModel: 'gpt-5.3-codex',
      });

      expect(result.success).toBe(true);
      expect(result.outputFilePath).toBe('output/TestComponent.vue');
      expect(result.template).toContain('<template>');
      expect(result.error).toBeUndefined();
    });

    it('deve chamar onProgress com mensagens de progresso', async () => {
      const onProgress = vi.fn();

      await generateFromFigma({
        figmaUrl: 'https://www.figma.com/file/test/Design',
        figmaToken: 'figd_test_token',
        onProgress,
      });

      expect(onProgress).toHaveBeenCalledWith(expect.stringContaining('Baixando'));
      expect(onProgress).toHaveBeenCalledWith(expect.stringContaining('SVG'));
      expect(onProgress).toHaveBeenCalledWith(expect.stringContaining('Gerando'));
    });

    it('deve retornar erro quando download do Figma falhar', async () => {
      const { downloadFigmaSvgs } = await import('../integrations/figma.js');
      vi.mocked(downloadFigmaSvgs).mockResolvedValueOnce([]);

      const result = await generateFromFigma({
        figmaUrl: 'https://www.figma.com/file/invalid/Design',
        figmaToken: 'figd_test_token',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('Nenhum SVG foi baixado');
    });

    it('deve capturar exceções e retornar erro', async () => {
      const { downloadFigmaSvgs } = await import('../integrations/figma.js');
      vi.mocked(downloadFigmaSvgs).mockRejectedValueOnce(new Error('API Error'));

      const result = await generateFromFigma({
        figmaUrl: 'https://www.figma.com/file/test/Design',
        figmaToken: 'figd_invalid_token',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('API Error');
    });

    it('deve usar valores padrão para opções opcionais', async () => {
      const { runPipeline } = await import('../mcp/pipeline.js');

      await generateFromFigma({
        figmaUrl: 'https://www.figma.com/file/test/Design',
        figmaToken: 'figd_test_token',
      });

      expect(runPipeline).toHaveBeenCalledWith(
        expect.objectContaining({
          outputDir: './output',
          useDesignSystem: false,
        })
      );
    });
  });

  describe('generateFromLocalSvg', () => {
    it('deve gerar componente a partir de SVG local com sucesso', async () => {
      const result = await generateFromLocalSvg({
        svgFilePath: 'src/svg/test.svg',
        outputDir: './output',
        outputFileName: 'TestComponent',
        useDesignSystem: false,
        llmModel: 'gpt-5.3-codex',
      });

      expect(result.success).toBe(true);
      expect(result.outputFilePath).toBe('output/TestComponent.vue');
      expect(result.template).toContain('<template>');
      expect(result.error).toBeUndefined();
    });

    it('deve chamar onProgress com mensagens de progresso', async () => {
      const onProgress = vi.fn();

      await generateFromLocalSvg({
        svgFilePath: 'src/svg/test.svg',
        onProgress,
      });

      expect(onProgress).toHaveBeenCalledWith(expect.stringContaining('Verificando'));
      expect(onProgress).toHaveBeenCalledWith(expect.stringContaining('Gerando'));
    });

    it('deve capturar exceções e retornar erro', async () => {
      const { runPipeline } = await import('../mcp/pipeline.js');
      vi.mocked(runPipeline).mockRejectedValueOnce(new Error('Pipeline Error'));

      const result = await generateFromLocalSvg({
        svgFilePath: 'src/svg/test.svg',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('Pipeline Error');
    });

    it('deve usar valores padrão para opções opcionais', async () => {
      const { runPipeline } = await import('../mcp/pipeline.js');

      await generateFromLocalSvg({
        svgFilePath: 'src/svg/test.svg',
      });

      expect(runPipeline).toHaveBeenCalledWith(
        expect.objectContaining({
          outputDir: './output',
          useDesignSystem: false,
        })
      );
    });
  });
});
