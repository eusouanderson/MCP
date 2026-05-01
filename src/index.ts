#!/usr/bin/env node

import boxen from 'boxen';
import chalk from 'chalk';
import 'dotenv/config';
import enquirer from 'enquirer';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { divider, error, loading, message, success } from './animations/index.js';
import { CopilotModelInfo } from './copilot/interfaces.js';
import { copilotRuntime } from './copilot/provider.js';
import { downloadFigmaSvgs } from './integrations/figma.js';
import { isValidSvgPath, listSvgFilesInDirectory } from './integrations/svg-upload.js';
import { PipelineStage, runPipeline } from './mcp/pipeline.js';

const { Input, Select, Confirm } = enquirer as any;

type MainMenuChoice = 'generate' | 'configure-llm' | 'configure-secrets' | 'configure-all' | 'exit';
type RuntimeSecretKey = 'FIGMA_TOKEN';
type RuntimeSecrets = Partial<Record<RuntimeSecretKey, string>>;

const DEFAULT_RUNTIME_SECRETS_PATH = path.resolve(
  process.env.HOME || process.cwd(),
  '.mcp-frontend',
  'secrets.json'
);

const stageMessages: Record<PipelineStage, string> = {
  'read-sdd': 'Lendo SDD...',
  'process-svg': 'Processando arquivo SVG...',
  'upload-svg': 'Copiando SVG para src/svg...',
  'build-context': 'Construindo contexto...',
  'build-prompt': 'Gerando prompt...',
  'call-llm': 'Chamando LLM...',
  'save-file': 'Salvando arquivo...',
};

const getConfiguredModel = (): string => process.env.COPILOT_MODEL || 'gpt-5-mini';

const printHeader = (): void => {
  const title = `${chalk.bold.cyan('MCP Frontend CLI')}\n${chalk.gray('Geracao de template Vue a partir de SDD + SVG')}`;
  console.log(boxen(title, { borderStyle: 'round', borderColor: 'cyan', padding: 1 }));
};

const askMainMenuChoice = async (): Promise<MainMenuChoice> => {
  const choice = (await new Select({
    name: 'mainMenu',
    message: 'Menu principal',
    choices: [
      {
        name: 'generate',
        message: 'Gerar template Vue',
        hint: 'Fluxo principal',
      },
      {
        name: 'configure-llm',
        message: `Configurar IA (${getConfiguredModel()})`,
        hint: 'Ajustar modelo padrao',
      },
      {
        name: 'configure-secrets',
        message: 'Configurar tokens e segredos',
        hint: 'FIGMA_TOKEN (apenas para Figma)',
      },
      {
        name: 'configure-all',
        message: 'Configurar tudo antes de gerar',
        hint: 'Modelo + Tokens',
      },
      {
        name: 'exit',
        message: 'Sair',
        hint: 'Fechar o CLI',
      },
    ],
  }).run()) as MainMenuChoice;

  return choice;
};

const askSvgSelection = async (svgDir: string): Promise<string> => {
  const svgFiles = await listSvgFilesInDirectory(svgDir);
  if (svgFiles.length === 0) {
    throw new Error(
      `Nenhum arquivo .svg encontrado em: ${svgDir}. Adicione um SVG nessa pasta e rode novamente.`
    );
  }

  const selectedFile = (await new Select({
    name: 'svgSelection',
    message: 'Selecione o arquivo SVG',
    choices: svgFiles.map((filePath) => ({
      name: filePath,
      message: path.basename(filePath),
    })),
  }).run()) as string;

  return selectedFile;
};

const askSourceType = async (): Promise<'local' | 'figma' | 'back'> => {
  const choice = (await new Select({
    name: 'sourceType',
    message: 'Escolha a fonte do SVG',
    choices: [
      {
        name: 'local',
        message: 'Usar SVG local da pasta src/svg',
      },
      {
        name: 'figma',
        message: 'Baixar de um link do Figma',
      },
      {
        name: 'back',
        message: '↩ Voltar ao menu principal',
      },
    ],
  }).run()) as 'local' | 'figma' | 'back';

  return choice;
};

const formatModelLabel = (model: CopilotModelInfo): string => {
  const capabilities: string[] = [];

  if (model.capabilities.reasoning) {
    capabilities.push('reasoning');
  }

  if (model.capabilities.vision) {
    capabilities.push('vision');
  }

  return capabilities.length > 0 ? `${model.name} (${capabilities.join(', ')})` : model.name;
};

const askModelSelection = async (models: CopilotModelInfo[]): Promise<string> => {
  if (models.length === 0) {
    throw new Error('Nenhum modelo disponivel foi retornado pelo Copilot.');
  }

  const defaultModel = process.env.COPILOT_MODEL || models[0]?.id || 'gpt-5-mini';

  const choices = models.map((model) => {
    const defaultSuffix = model.id === defaultModel ? ' [padrao]' : '';
    return {
      name: model.id,
      message: `${formatModelLabel(model)} - ${model.id}${defaultSuffix}`,
    };
  });

  const selectedModel = (await new Select({
    name: 'llmModel',
    message: 'Escolha o modelo de IA',
    choices,
    initial: Math.max(
      models.findIndex((model) => model.id === defaultModel),
      0
    ),
  }).run()) as string;

  return selectedModel;
};

const askOutputDir = async (defaultOutputDir: string): Promise<string> => {
  const outputValue = (await new Input({
    name: 'outputDir',
    message: 'Caminho de saida',
    initial: defaultOutputDir,
  }).run()) as string;

  return path.resolve(outputValue.trim() || defaultOutputDir);
};

const askConfirm = async (messageText: string, initial = true): Promise<boolean> => {
  return (await new Confirm({ name: 'confirm', message: messageText, initial }).run()) as boolean;
};

const showSummary = async (items: Record<string, string>): Promise<void> => {
  const lines = Object.entries(items).map(([key, value]) => `${chalk.cyan(key)}: ${chalk.cyan(value)}`);
  console.log(
    boxen(lines.join('\n'), {
      borderColor: 'magenta',
      padding: 1,
      margin: 1,
      borderStyle: 'round',
    })
  );
};

const parseCliOutputDir = (): string | undefined => {
  const args = process.argv
    .slice(2)
    .map((value) => value.trim())
    .filter(Boolean);
  if (args.length === 0) {
    return undefined;
  }

  const inlineOutputArg = args.find((arg) => arg.startsWith('--output='));
  if (inlineOutputArg) {
    const value = inlineOutputArg.slice('--output='.length).trim();
    return value ? path.resolve(value) : undefined;
  }

  const outputFlagIndex = args.findIndex((arg) => arg === '--output' || arg === '-o');
  if (outputFlagIndex >= 0) {
    const value = args[outputFlagIndex + 1]?.trim();
    if (value && !value.startsWith('-')) {
      return path.resolve(value);
    }
    return undefined;
  }

  const firstArg = args[0];
  if (firstArg.startsWith('-')) {
    return undefined;
  }

  return path.resolve(firstArg);
};

const askFigmaUrl = async (): Promise<string> => {
  const figmaUrl = (await new Input({
    name: 'figmaUrl',
    message: 'Cole o link do Figma',
  }).run()) as string;

  return figmaUrl.trim();
};

const askTokenValue = async (label: string): Promise<string | 'back'> => {
  const token = (await new Input({
    name: `${label}Token`,
    message: `Informe o token do ${label} (ou deixe vazio para voltar)`,
  }).run()) as string;

  return token.trim();
};

const askAssetSelection = async (assets: { name: string; path: string }[]): Promise<string> => {
  const selectedPath = (await new Select({
    name: 'downloadedSvg',
    message: 'Selecione qual SVG usar',
    choices: assets.map((asset) => ({
      name: asset.path,
      message: asset.name,
    })),
  }).run()) as string;

  return selectedPath;
};

const saveEnvVar = async (key: string, value: string): Promise<void> => {
  const envPath = path.resolve(process.cwd(), '.env');
  let envContent = '';

  try {
    envContent = await readFile(envPath, 'utf8');
  } catch (error) {
    if (!(error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT')) {
      throw error;
    }
  }

  const line = `${key}=${value}`;
  const hasTrailingNewline = envContent.endsWith('\n');

  const keyRegex = new RegExp(`^${key}=.*$`, 'm');
  if (keyRegex.test(envContent)) {
    envContent = envContent.replace(keyRegex, line);
  } else {
    envContent =
      envContent.length === 0 ? line : `${envContent}${hasTrailingNewline ? '' : '\n'}${line}`;
  }

  await writeFile(envPath, `${envContent}${envContent.endsWith('\n') ? '' : '\n'}`, 'utf8');
};

const loadRuntimeSecrets = async (): Promise<RuntimeSecrets> => {
  const raw = await readFile(DEFAULT_RUNTIME_SECRETS_PATH, 'utf8').catch(() => undefined);
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw) as RuntimeSecrets;
    return parsed;
  } catch {
    return {};
  }
};

const saveRuntimeSecrets = async (updates: RuntimeSecrets): Promise<void> => {
  const current = await loadRuntimeSecrets();
  const merged: RuntimeSecrets = { ...current, ...updates };
  await mkdir(path.dirname(DEFAULT_RUNTIME_SECRETS_PATH), { recursive: true });
  await writeFile(DEFAULT_RUNTIME_SECRETS_PATH, `${JSON.stringify(merged, null, 2)}\n`, 'utf8');
};

const isProduction = (): boolean => process.env.NODE_ENV === 'production';

const persistSecret = async (key: RuntimeSecretKey, value: string): Promise<void> => {
  if (isProduction()) {
    await saveRuntimeSecrets({ [key]: value });
  } else {
    await saveEnvVar(key, value);
  }

  process.env[key] = value;
};

const resolveSecretFromStore = async (key: RuntimeSecretKey): Promise<string | undefined> => {
  const fromEnv = process.env[key]?.trim();
  if (fromEnv) return fromEnv;

  if (!isProduction()) return undefined;

  const secrets = await loadRuntimeSecrets();
  const fromStore = secrets[key]?.trim();
  if (fromStore) {
    process.env[key] = fromStore;
  }
  return fromStore;
};

const ensureCopilotConnection = async (): Promise<void> => {
  divider('Conexao Copilot');

  const authLoading = loading('Autenticando no Copilot...');
  try {
    await copilotRuntime.auth.getValidAccessToken();
    authLoading.stop();
    await success('Copilot autenticado com sucesso.');
  } catch (exception) {
    authLoading.stop();
    throw exception;
  }
};

const ensureFigmaToken = async (): Promise<void> => {
  const existing = await resolveSecretFromStore('FIGMA_TOKEN');
  if (existing) {
    return;
  }

  divider('Configuracao de Tokens');
  await message('FIGMA_TOKEN nao encontrado.');

  const token = await askTokenValue('Figma');
  if (!token) {
    throw new Error('Token do Figma invalido.');
  }

  await persistSecret('FIGMA_TOKEN', token);
  await success('FIGMA_TOKEN configurado com sucesso.');
};

const saveConfiguredModel = async (model: string): Promise<void> => {
  await saveEnvVar('COPILOT_MODEL', model);
  process.env.COPILOT_MODEL = model;
};

const configureLlmModel = async (): Promise<boolean> => {
  divider('Configuracao IA');
  const modelsLoading = loading('Buscando modelos de IA...');
  const models = await copilotRuntime.fetchModels();
  modelsLoading.stop();
  const selectedModel = await askModelSelection(models);
  await saveConfiguredModel(selectedModel);
  await success(`Modelo salvo: ${selectedModel}`);
  return true;
};

const configureFigmaToken = async (): Promise<boolean> => {
  divider('Configuracao FIGMA');
  await message('Vamos configurar seu FIGMA_TOKEN.');
  const token = await askTokenValue('Figma');
  if (!token || token === 'back') {
    await message('Voltando ao menu principal...');
    return false;
  }
  await persistSecret('FIGMA_TOKEN', token);
  await success('FIGMA_TOKEN configurado com sucesso.');
  return true;
};

const configureAll = async (): Promise<boolean> => {
  divider('Configuracao Completa');
  
  const llmConfigured = await configureLlmModel();
  if (!llmConfigured) return false;
  
  const figmaConfigured = await configureFigmaToken();
  if (!figmaConfigured) return false;
  
  await success('Configuracao completa realizada com sucesso.');
  return true;
};

const run = async (): Promise<void> => {
  let activeLoading: ReturnType<typeof loading> | undefined;

  try {
    printHeader();
    divider('Inicio');
    await ensureCopilotConnection();

    const menuChoice = await askMainMenuChoice();
    if (menuChoice === 'configure-llm') {
      await configureLlmModel();
      return;
    }

    if (menuChoice === 'configure-secrets') {
      const configured = await configureFigmaToken();
      if (!configured) {
        return;
      }
      return;
    }

    if (menuChoice === 'configure-all') {
      const configured = await configureAll();
      if (!configured) {
        return;
      }
      return;
    }

    if (menuChoice === 'exit') {
      await message('Saindo do MCP Frontend CLI. Ate a proxima!');
      return;
    }

    const defaultOutputDir = path.resolve(process.cwd(), 'output');
    const outputDirFromCli = parseCliOutputDir();
    const outputDir = outputDirFromCli ?? (await askOutputDir(defaultOutputDir));
    if (outputDirFromCli) {
      await message(`Caminho de saida via CLI: ${outputDir}`);
    }
    const llmModel = getConfiguredModel();
    await message(`IA configurada: ${llmModel}`);

    const sourceType = await askSourceType();
    if (sourceType === 'back') {
      await message('Retornando ao menu principal. Execute o CLI novamente para continuar.');
      return;
    }
    divider(sourceType === 'local' ? 'Origem Local' : 'Origem Figma');
    const assetsDir = path.resolve(process.cwd(), 'src');
    let svgFilePath: string;

    if (sourceType === 'local') {
      const svgDir = path.resolve(process.cwd(), 'src/svg');
      svgFilePath = await askSvgSelection(svgDir);

      if (!isValidSvgPath(svgFilePath)) {
        throw new Error('Arquivo SVG invalido. Informe um caminho para arquivo com extensao .svg.');
      }
    } else {
      await ensureFigmaToken();
      const figmaUrl = await askFigmaUrl();
      activeLoading = loading('Baixando SVGs do Figma...');

      const assets = await downloadFigmaSvgs({
        figmaUrl,
        assetsDir,
        onProgress: (message) => {
          activeLoading?.stop();
          console.log(message);
          activeLoading = loading('Processando...');
        },
      });

      activeLoading?.stop();

      if (assets.length === 0) {
        throw new Error('Nenhum SVG foi baixado do Figma.');
      }

      if (assets.length === 1) {
        svgFilePath = assets[0].path;
      } else {
        svgFilePath = await askAssetSelection(assets);
      }
    }

    await showSummary({
      'Diretorio de saida': outputDir,
      'Modelo IA': llmModel,
      'Fonte do SVG': sourceType === 'local' ? 'SVG local' : 'Figma',
      'SVG selecionado': svgFilePath,
    });

    const sddPath = path.resolve(process.cwd(), 'src/docs/sdd.json');

    const result = await runPipeline({
      sddPath,
      svgFilePath,
      outputDir,
      assetsDir,
      llmModel,
      hooks: {
        onStage: (stage) => {
          activeLoading?.stop();
          activeLoading = loading(stageMessages[stage]);
        },
        onProgress: (message) => {
          activeLoading?.stop();
          console.log(message);
          activeLoading = loading(stageMessages['upload-svg']);
        },
      },
    });

    activeLoading?.stop();
    divider('Resultado');
    await success(`Template Vue gerado com sucesso em: ${result.outputFilePath}`);
    await message(`Componentes processados: ${result.assets.length}`);
  } catch (exception) {
    activeLoading?.stop();
    const message = exception instanceof Error ? exception.message : String(exception);
    await error(`Falha no pipeline: ${message}`);
    process.exitCode = 1;
  }
};

void run();
