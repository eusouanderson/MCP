import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const selectQueue = vi.hoisted(() => [] as Array<string>);
const inputQueue = vi.hoisted(() => [] as Array<string>);

const mockMkdir = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));
const mockReadFile = vi.hoisted(() => vi.fn());
const mockWriteFile = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));

const mockSuccess = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));
const mockMessage = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));
const mockDivider = vi.hoisted(() => vi.fn());
const mockError = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));
const mockLoadingStop = vi.hoisted(() => vi.fn());
const mockLoading = vi.hoisted(() => vi.fn(() => ({ stop: mockLoadingStop })));

const mockFetchModels = vi.hoisted(() => vi.fn());
const mockDownloadFigmaSvgs = vi.hoisted(() => vi.fn());
const mockListSvgFilesInDirectory = vi.hoisted(() => vi.fn());
const mockIsValidSvgPath = vi.hoisted(() => vi.fn());
const mockRunPipeline = vi.hoisted(() => vi.fn());
const mockGetValidAccessToken = vi.hoisted(() => vi.fn());

vi.mock('boxen', () => ({
  default: (text: string) => text,
}));

vi.mock('chalk', () => ({
  default: {
    bold: { cyan: (s: string) => s },
    gray: (s: string) => s,
    cyan: (s: string) => s,
    green: (s: string) => s,
  },
}));

vi.mock('enquirer', () => ({
  default: {
    Select: class {
      run(): Promise<string> {
        const value = selectQueue.shift();
        if (typeof value === 'undefined') {
          throw new Error('Select queue vazia');
        }
        return Promise.resolve(value);
      }
    },
    Input: class {
      run(): Promise<string> {
        const value = inputQueue.shift();
        if (typeof value === 'undefined') {
          throw new Error('Input queue vazia');
        }
        return Promise.resolve(value);
      }
    },
  },
}));

vi.mock('node:fs/promises', () => ({
  mkdir: mockMkdir,
  readFile: mockReadFile,
  writeFile: mockWriteFile,
}));

vi.mock('./animations/index.js', () => ({
  divider: mockDivider,
  loading: mockLoading,
  message: mockMessage,
  success: mockSuccess,
  error: mockError,
}));

vi.mock('./copilot/provider.js', () => ({
  copilotRuntime: {
    auth: {
      getValidAccessToken: mockGetValidAccessToken,
    },
    fetchModels: mockFetchModels,
  },
}));

vi.mock('./integrations/figma.js', () => ({
  downloadFigmaSvgs: mockDownloadFigmaSvgs,
}));

vi.mock('./integrations/svg-upload.js', () => ({
  listSvgFilesInDirectory: mockListSvgFilesInDirectory,
  isValidSvgPath: mockIsValidSvgPath,
}));

vi.mock('./mcp/pipeline.js', () => ({
  runPipeline: mockRunPipeline,
}));

describe('CLI index', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    selectQueue.length = 0;
    inputQueue.length = 0;
    process.exitCode = 0;
    process.argv = ['node', 'index.js'];
    delete process.env.COPILOT_MODEL;
    delete process.env.NODE_ENV;
    process.env.COPILOT_TOKEN = 'test-copilot-token';
    process.env.FIGMA_TOKEN = 'test-figma-token';
    mockGetValidAccessToken.mockResolvedValue('oauth-token');
    mockReadFile.mockRejectedValue(Object.assign(new Error('ENOENT'), { code: 'ENOENT' }));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('runs configure-llm flow and persists model in .env', async () => {
    selectQueue.push('configure-llm', 'gpt-5');
    mockFetchModels.mockResolvedValueOnce([
      {
        id: 'gpt-5',
        name: 'GPT-5',
        capabilities: { reasoning: true, vision: false },
      },
    ]);

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockFetchModels).toHaveBeenCalledOnce();
      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.stringContaining('.env'),
        expect.stringContaining('COPILOT_MODEL=gpt-5'),
        'utf8'
      );
      expect(mockSuccess).toHaveBeenCalledWith(expect.stringContaining('Modelo salvo: gpt-5'));
    });
  });

  it('runs local svg generation flow and calls pipeline', async () => {
    process.env.COPILOT_MODEL = 'gpt-5-mini';

    selectQueue.push('generate', 'local', '/tmp/project/src/svg/icon.svg');
    inputQueue.push('./output');

    mockListSvgFilesInDirectory.mockResolvedValueOnce(['/tmp/project/src/svg/icon.svg']);
    mockIsValidSvgPath.mockReturnValueOnce(true);
    mockRunPipeline.mockResolvedValueOnce({
      outputFilePath: '/tmp/project/output/generated-template.vue',
      assets: [{ name: 'Icon', path: 'src/svg/icon.svg' }],
      template: '<div />',
    });

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockRunPipeline).toHaveBeenCalledOnce();
      expect(mockSuccess).toHaveBeenCalledWith(
        expect.stringContaining('Template Vue gerado com sucesso')
      );
    });
  });

  it('fails when local selected SVG is invalid', async () => {
    selectQueue.push('generate', 'local', '/tmp/project/src/svg/icon.svg');
    inputQueue.push('./output');

    mockListSvgFilesInDirectory.mockResolvedValueOnce(['/tmp/project/src/svg/icon.svg']);
    mockIsValidSvgPath.mockReturnValueOnce(false);

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockError).toHaveBeenCalledWith(expect.stringContaining('Arquivo SVG invalido'));
      expect(process.exitCode).toBe(1);
    });
  });

  it('runs figma flow with single asset', async () => {
    selectQueue.push('generate', 'figma');
    inputQueue.push('./output', 'https://www.figma.com/design/KEY/file?node-id=1-1');

    mockDownloadFigmaSvgs.mockResolvedValueOnce([{ name: 'Button', path: 'src/svg/button.svg' }]);
    mockRunPipeline.mockResolvedValueOnce({
      outputFilePath: '/tmp/project/output/generated-template.vue',
      assets: [{ name: 'Button', path: 'src/svg/button.svg' }],
      template: '<div />',
    });

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockDownloadFigmaSvgs).toHaveBeenCalledOnce();
      expect(mockRunPipeline).toHaveBeenCalledWith(
        expect.objectContaining({ svgFilePath: 'src/svg/button.svg' })
      );
    });
  });

  it('handles figma flow with multiple assets and selection', async () => {
    selectQueue.push('generate', 'figma', 'src/svg/two.svg');
    inputQueue.push('./output', 'https://www.figma.com/design/KEY/file?node-id=1-1');

    mockDownloadFigmaSvgs.mockResolvedValueOnce([
      { name: 'One', path: 'src/svg/one.svg' },
      { name: 'Two', path: 'src/svg/two.svg' },
    ]);
    mockRunPipeline.mockResolvedValueOnce({
      outputFilePath: '/tmp/project/output/generated-template.vue',
      assets: [{ name: 'Two', path: 'src/svg/two.svg' }],
      template: '<div />',
    });

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockRunPipeline).toHaveBeenCalledWith(
        expect.objectContaining({ svgFilePath: 'src/svg/two.svg' })
      );
    });
  });

  it('fails when figma returns no assets', async () => {
    selectQueue.push('generate', 'figma');
    inputQueue.push('./output', 'https://www.figma.com/design/KEY/file?node-id=1-1');

    mockDownloadFigmaSvgs.mockResolvedValueOnce([]);

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockError).toHaveBeenCalledWith(
        expect.stringContaining('Nenhum SVG foi baixado do Figma')
      );
      expect(process.exitCode).toBe(1);
    });
  });

  it('fails when local svg directory has no .svg files', async () => {
    selectQueue.push('generate', 'local');
    inputQueue.push('./output');

    mockListSvgFilesInDirectory.mockResolvedValueOnce([]);

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockError).toHaveBeenCalledWith(
        expect.stringContaining('Nenhum arquivo .svg encontrado')
      );
      expect(process.exitCode).toBe(1);
    });
  });

  it('fails configure-llm when Copilot returns no models', async () => {
    selectQueue.push('configure-llm');
    mockFetchModels.mockResolvedValueOnce([]);

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockError).toHaveBeenCalledWith(
        expect.stringContaining('Nenhum modelo disponivel foi retornado pelo Copilot')
      );
      expect(process.exitCode).toBe(1);
    });
  });

  it('rethrows non-ENOENT readFile error while saving model', async () => {
    selectQueue.push('configure-llm', 'gpt-5-vision');
    mockFetchModels.mockResolvedValueOnce([
      {
        id: 'gpt-5-vision',
        name: 'GPT-5 Vision',
        capabilities: { reasoning: false, vision: true },
      },
    ]);
    mockReadFile.mockRejectedValueOnce(Object.assign(new Error('EACCES'), { code: 'EACCES' }));

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockError).toHaveBeenCalledWith(expect.stringContaining('Falha no pipeline: EACCES'));
      expect(process.exitCode).toBe(1);
    });
  });

  it('replaces existing COPILOT_MODEL and runs figma/pipeline progress callbacks', async () => {
    selectQueue.push('configure-llm', 'gpt-5-vision');
    mockFetchModels.mockResolvedValueOnce([
      {
        id: 'gpt-5-vision',
        name: 'GPT-5 Vision',
        capabilities: { reasoning: false, vision: true },
      },
    ]);
    mockReadFile.mockResolvedValueOnce('FOO=bar\nCOPILOT_MODEL=old-model\n');

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.stringContaining('.env'),
        expect.stringContaining('COPILOT_MODEL=gpt-5-vision'),
        'utf8'
      );
    });

    vi.resetModules();
    vi.clearAllMocks();
    selectQueue.length = 0;
    inputQueue.length = 0;

    process.env.COPILOT_MODEL = 'gpt-5-mini';
    selectQueue.push('generate', 'figma');
    inputQueue.push('./output', 'https://www.figma.com/design/KEY/file?node-id=1-1');

    mockDownloadFigmaSvgs.mockImplementationOnce(async (options: any) => {
      options.onProgress?.('baixando...');
      return [{ name: 'Button', path: 'src/svg/button.svg' }];
    });
    mockRunPipeline.mockImplementationOnce(async (options: any) => {
      options.hooks?.onStage?.('read-sdd');
      options.hooks?.onProgress?.('copiando');
      return {
        outputFilePath: '/tmp/project/output/generated-template.vue',
        assets: [{ name: 'Button', path: 'src/svg/button.svg' }],
        template: '<div />',
      };
    });

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockLoading).toHaveBeenCalledWith('Processando...');
      expect(mockLoading).toHaveBeenCalledWith('Lendo SDD...');
      expect(mockLoading).toHaveBeenCalledWith('Copiando SVG para src/svg...');
    });
  });

  it('uses default output dir when output input is empty', async () => {
    process.env.COPILOT_MODEL = 'gpt-5-mini';
    selectQueue.push('generate', 'local', '/tmp/project/src/svg/icon.svg');
    inputQueue.push('   ');

    mockListSvgFilesInDirectory.mockResolvedValueOnce(['/tmp/project/src/svg/icon.svg']);
    mockIsValidSvgPath.mockReturnValueOnce(true);
    mockRunPipeline.mockResolvedValueOnce({
      outputFilePath: '/tmp/project/output/generated-template.vue',
      assets: [{ name: 'Icon', path: 'src/svg/icon.svg' }],
      template: '<div />',
    });

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockRunPipeline).toHaveBeenCalledWith(
        expect.objectContaining({ outputDir: expect.stringContaining('/output') })
      );
    });
  });

  it('uses positional CLI arg as output dir and skips output prompt', async () => {
    process.env.COPILOT_MODEL = 'gpt-5-mini';
    const originalArgv = process.argv;
    process.argv = ['node', 'index.js', '.'];

    selectQueue.push('generate', 'local', '/tmp/project/src/svg/icon.svg');

    mockListSvgFilesInDirectory.mockResolvedValueOnce(['/tmp/project/src/svg/icon.svg']);
    mockIsValidSvgPath.mockReturnValueOnce(true);
    mockRunPipeline.mockResolvedValueOnce({
      outputFilePath: '/tmp/project/generated-template.vue',
      assets: [{ name: 'Icon', path: 'src/svg/icon.svg' }],
      template: '<div />',
    });

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockRunPipeline).toHaveBeenCalledWith(
        expect.objectContaining({ outputDir: expect.stringContaining('/MCP_Frontend') })
      );
      expect(mockMessage).toHaveBeenCalledWith(
        expect.stringContaining('Caminho de saida via CLI:')
      );
    });

    process.argv = originalArgv;
  });

  it('appends COPILOT_MODEL when .env has content without trailing newline', async () => {
    selectQueue.push('configure-llm', 'gpt-5-mini');
    mockFetchModels.mockResolvedValueOnce([
      {
        id: 'gpt-5-mini',
        name: 'GPT-5 Mini',
        capabilities: { reasoning: false, vision: false },
      },
    ]);
    mockReadFile.mockResolvedValueOnce('FOO=bar');

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.stringContaining('.env'),
        'FOO=bar\nCOPILOT_MODEL=gpt-5-mini\n',
        'utf8'
      );
    });
  });

  it('handles non-Error exception values in run catch', async () => {
    selectQueue.push('generate', 'local', '/tmp/project/src/svg/icon.svg');
    inputQueue.push('./output');

    mockListSvgFilesInDirectory.mockResolvedValueOnce(['/tmp/project/src/svg/icon.svg']);
    mockIsValidSvgPath.mockReturnValueOnce(true);
    mockRunPipeline.mockRejectedValueOnce('pipeline-string-error');

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockError).toHaveBeenCalledWith(
        expect.stringContaining('Falha no pipeline: pipeline-string-error')
      );
      expect(process.exitCode).toBe(1);
    });
  });

  it('falls back to gpt-5-mini when model id is missing in configure flow', async () => {
    selectQueue.push('configure-llm', 'chosen-model');
    mockFetchModels.mockResolvedValueOnce([
      {
        id: undefined,
        name: 'Model Without Id',
        capabilities: { reasoning: false, vision: false },
      } as any,
    ]);

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.stringContaining('.env'),
        expect.stringContaining('COPILOT_MODEL=chosen-model'),
        'utf8'
      );
      expect(mockSuccess).toHaveBeenCalledWith(
        expect.stringContaining('Modelo salvo: chosen-model')
      );
    });
  });

  it('appends model without extra blank line when .env already ends with newline', async () => {
    selectQueue.push('configure-llm', 'gpt-5-mini');
    mockFetchModels.mockResolvedValueOnce([
      {
        id: 'gpt-5-mini',
        name: 'GPT-5 Mini',
        capabilities: { reasoning: false, vision: false },
      },
    ]);
    mockReadFile.mockResolvedValueOnce('FOO=bar\n');

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.stringContaining('.env'),
        'FOO=bar\nCOPILOT_MODEL=gpt-5-mini\n',
        'utf8'
      );
    });
  });

  it('authenticates with OAuth when static COPILOT_TOKEN is missing', async () => {
    delete process.env.COPILOT_TOKEN;
    selectQueue.push('configure-llm', 'gpt-5-mini');
    mockFetchModels.mockResolvedValueOnce([
      {
        id: 'gpt-5-mini',
        name: 'GPT-5 Mini',
        capabilities: { reasoning: false, vision: false },
      },
    ]);

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockGetValidAccessToken).toHaveBeenCalledOnce();
      expect(mockSuccess).toHaveBeenCalledWith(expect.stringContaining('Copilot autenticado'));
    });
  });

  it('fails fast when OAuth authentication fails', async () => {
    delete process.env.COPILOT_TOKEN;
    mockGetValidAccessToken.mockRejectedValueOnce(new Error('oauth-failed'));

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockError).toHaveBeenCalledWith(expect.stringContaining('oauth-failed'));
      expect(process.exitCode).toBe(1);
    });
  });

  it('asks for FIGMA_TOKEN when missing in non-production and saves it in .env', async () => {
    delete process.env.FIGMA_TOKEN;
    selectQueue.push('generate', 'figma');
    inputQueue.push(
      './output',
      'figma-token-value',
      'https://www.figma.com/design/KEY/file?node-id=1-1'
    );

    mockDownloadFigmaSvgs.mockResolvedValueOnce([{ name: 'Button', path: 'src/svg/button.svg' }]);
    mockRunPipeline.mockResolvedValueOnce({
      outputFilePath: '/tmp/project/output/generated-template.vue',
      assets: [{ name: 'Button', path: 'src/svg/button.svg' }],
      template: '<div />',
    });

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockMessage).toHaveBeenCalledWith(
        expect.stringContaining('FIGMA_TOKEN nao encontrado')
      );
      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.stringContaining('.env'),
        expect.stringContaining('FIGMA_TOKEN=figma-token-value'),
        'utf8'
      );
    });
  });

  it('uses --output=... argument as output directory', async () => {
    process.argv = ['node', 'index.js', '--output=./custom-out'];
    selectQueue.push('generate', 'local', '/tmp/project/src/svg/icon.svg');

    mockListSvgFilesInDirectory.mockResolvedValueOnce(['/tmp/project/src/svg/icon.svg']);
    mockIsValidSvgPath.mockReturnValueOnce(true);
    mockRunPipeline.mockResolvedValueOnce({
      outputFilePath: '/tmp/project/custom-out/generated-template.vue',
      assets: [{ name: 'Icon', path: 'src/svg/icon.svg' }],
      template: '<div />',
    });

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockRunPipeline).toHaveBeenCalledWith(
        expect.objectContaining({ outputDir: expect.stringContaining('/custom-out') })
      );
    });
  });

  it('falls back to prompt when --output= is empty', async () => {
    process.argv = ['node', 'index.js', '--output=   '];
    selectQueue.push('generate', 'local', '/tmp/project/src/svg/icon.svg');
    inputQueue.push('./inline-empty-out');

    mockListSvgFilesInDirectory.mockResolvedValueOnce(['/tmp/project/src/svg/icon.svg']);
    mockIsValidSvgPath.mockReturnValueOnce(true);
    mockRunPipeline.mockResolvedValueOnce({
      outputFilePath: '/tmp/project/inline-empty-out/generated-template.vue',
      assets: [{ name: 'Icon', path: 'src/svg/icon.svg' }],
      template: '<div />',
    });

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockRunPipeline).toHaveBeenCalledWith(
        expect.objectContaining({ outputDir: expect.stringContaining('/inline-empty-out') })
      );
    });
  });

  it('falls back to prompt when --output flag has invalid value', async () => {
    process.argv = ['node', 'index.js', '--output', '-x'];
    selectQueue.push('generate', 'local', '/tmp/project/src/svg/icon.svg');
    inputQueue.push('./prompt-out');

    mockListSvgFilesInDirectory.mockResolvedValueOnce(['/tmp/project/src/svg/icon.svg']);
    mockIsValidSvgPath.mockReturnValueOnce(true);
    mockRunPipeline.mockResolvedValueOnce({
      outputFilePath: '/tmp/project/prompt-out/generated-template.vue',
      assets: [{ name: 'Icon', path: 'src/svg/icon.svg' }],
      template: '<div />',
    });

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockRunPipeline).toHaveBeenCalledWith(
        expect.objectContaining({ outputDir: expect.stringContaining('/prompt-out') })
      );
    });
  });

  it('persists FIGMA_TOKEN in runtime secrets for production with invalid secrets file', async () => {
    process.env.NODE_ENV = 'production';
    delete process.env.FIGMA_TOKEN;
    selectQueue.push('generate', 'figma');
    inputQueue.push(
      './output',
      'prod-figma-token',
      'https://www.figma.com/design/KEY/file?node-id=1-1'
    );

    mockReadFile.mockImplementation(async (filePath: any) => {
      if (String(filePath).includes('secrets.json')) {
        return '{not-json';
      }
      throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
    });

    mockDownloadFigmaSvgs.mockResolvedValueOnce([{ name: 'Button', path: 'src/svg/button.svg' }]);
    mockRunPipeline.mockResolvedValueOnce({
      outputFilePath: '/tmp/project/output/generated-template.vue',
      assets: [{ name: 'Button', path: 'src/svg/button.svg' }],
      template: '<div />',
    });

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockMkdir).toHaveBeenCalled();
      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.stringContaining('secrets.json'),
        expect.stringContaining('"FIGMA_TOKEN": "prod-figma-token"'),
        'utf8'
      );
    });
  });

  it('uses cwd for runtime secrets when HOME is missing and existing secrets file is absent', async () => {
    process.env.NODE_ENV = 'production';
    const originalHome = process.env.HOME;
    process.env.HOME = '';
    delete process.env.FIGMA_TOKEN;
    selectQueue.push('generate', 'figma');
    inputQueue.push(
      './output',
      'prod-no-home-token',
      'https://www.figma.com/design/KEY/file?node-id=1-1'
    );

    mockReadFile.mockImplementation(async (_filePath: any) => {
      throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
    });

    mockDownloadFigmaSvgs.mockResolvedValueOnce([{ name: 'Button', path: 'src/svg/button.svg' }]);
    mockRunPipeline.mockResolvedValueOnce({
      outputFilePath: '/tmp/project/output/generated-template.vue',
      assets: [{ name: 'Button', path: 'src/svg/button.svg' }],
      template: '<div />',
    });

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.stringContaining('/.mcp-frontend/secrets.json'),
        expect.stringContaining('"FIGMA_TOKEN": "prod-no-home-token"'),
        'utf8'
      );
    });

    process.env.HOME = originalHome;
  });

  it('uses --output <dir> flag form as output directory', async () => {
    process.argv = ['node', 'index.js', '--output', './flag-out'];
    selectQueue.push('generate', 'local', '/tmp/project/src/svg/icon.svg');

    mockListSvgFilesInDirectory.mockResolvedValueOnce(['/tmp/project/src/svg/icon.svg']);
    mockIsValidSvgPath.mockReturnValueOnce(true);
    mockRunPipeline.mockResolvedValueOnce({
      outputFilePath: '/tmp/project/flag-out/generated-template.vue',
      assets: [{ name: 'Icon', path: 'src/svg/icon.svg' }],
      template: '<div />',
    });

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockRunPipeline).toHaveBeenCalledWith(
        expect.objectContaining({ outputDir: expect.stringContaining('/flag-out') })
      );
    });
  });

  it('falls back to prompt when first CLI arg is an unknown flag', async () => {
    process.argv = ['node', 'index.js', '-x'];
    selectQueue.push('generate', 'local', '/tmp/project/src/svg/icon.svg');
    inputQueue.push('./fallback-out');

    mockListSvgFilesInDirectory.mockResolvedValueOnce(['/tmp/project/src/svg/icon.svg']);
    mockIsValidSvgPath.mockReturnValueOnce(true);
    mockRunPipeline.mockResolvedValueOnce({
      outputFilePath: '/tmp/project/fallback-out/generated-template.vue',
      assets: [{ name: 'Icon', path: 'src/svg/icon.svg' }],
      template: '<div />',
    });

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockRunPipeline).toHaveBeenCalledWith(
        expect.objectContaining({ outputDir: expect.stringContaining('/fallback-out') })
      );
    });
  });

  it('loads COPILOT_TOKEN from production secrets store', async () => {
    process.env.NODE_ENV = 'production';
    delete process.env.COPILOT_TOKEN;
    selectQueue.push('configure-llm', 'gpt-5-mini');
    mockFetchModels.mockResolvedValueOnce([
      {
        id: 'gpt-5-mini',
        name: 'GPT-5 Mini',
        capabilities: { reasoning: false, vision: false },
      },
    ]);

    mockReadFile.mockImplementation(async (filePath: any) => {
      if (String(filePath).includes('secrets.json')) {
        return JSON.stringify({ COPILOT_TOKEN: 'copilot-from-store' });
      }
      throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
    });

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockGetValidAccessToken).not.toHaveBeenCalled();
      expect(mockSuccess).toHaveBeenCalledWith(
        expect.stringContaining('Token estatico do Copilot encontrado.')
      );
    });
  });

  it('fails when FIGMA_TOKEN prompt returns empty value', async () => {
    delete process.env.FIGMA_TOKEN;
    selectQueue.push('generate', 'figma');
    inputQueue.push('./output', '   ');

    await import('./index.js');

    await vi.waitFor(() => {
      expect(mockError).toHaveBeenCalledWith(expect.stringContaining('Token do Figma invalido'));
      expect(process.exitCode).toBe(1);
    });
  });
});
