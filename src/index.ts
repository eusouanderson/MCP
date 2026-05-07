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
import { ensureSddFile } from './mcp/sdd-generator.js';

const { Input, Select } = enquirer as any;

type MainMenuChoice =
  | 'generate'
  | 'configure-llm'
  | 'configure-figma-token'
  | 'reconnect-copilot'
  | 'exit';
type SourceTypeChoice = 'local' | 'figma' | 'back';
type FigmaTokenErrorChoice = 'retry-with-new-token' | 'back';
type RuntimeSecretKey = 'COPILOT_TOKEN' | 'FIGMA_TOKEN';
type RuntimeSecrets = Partial<Record<RuntimeSecretKey, string>>;
const BACK_SENTINEL = '__back__';

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

const getConfiguredModel = (): string => process.env.COPILOT_MODEL || '';

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
        name: 'configure-figma-token',
        message: 'Atualizar token do Figma',
        hint: 'Salvar novo FIGMA_TOKEN',
      },
      {
        name: 'reconnect-copilot',
        message: 'Refazer conexao com Copilot',
        hint: 'Renovar autenticacao agora',
      },
      {
        name: 'exit',
        message: 'Sair',
        hint: 'Encerrar CLI',
      },
    ],
  }).run()) as MainMenuChoice;

  return choice;
};

const askInputOrBack = async (
  menuMessage: string,
  inputMessage: string,
  initial?: string
): Promise<string | typeof BACK_SENTINEL> => {
  const action = (await new Select({
    name: 'inputAction',
    message: menuMessage,
    choices: [
      {
        name: 'enter',
        message: 'Informar valor',
      },
      {
        name: BACK_SENTINEL,
        message: 'Voltar',
        hint: 'Retornar ao menu principal',
      },
    ],
  }).run()) as 'enter' | typeof BACK_SENTINEL;

  if (action === BACK_SENTINEL) {
    return BACK_SENTINEL;
  }

  const value = (await new Input({
    name: 'inputValue',
    message: inputMessage,
    initial,
  }).run()) as string;

  return value.trim();
};

const askSvgSelection = async (svgDir: string): Promise<string | typeof BACK_SENTINEL> => {
  const svgFiles = await listSvgFilesInDirectory(svgDir);
  if (svgFiles.length === 0) {
    throw new Error(
      `Nenhum arquivo .svg encontrado em: ${svgDir}. Adicione um SVG nessa pasta e rode novamente.`
    );
  }

  const selectedFile = (await new Select({
    name: 'svgSelection',
    message: 'Selecione o arquivo SVG',
    choices: [
      ...svgFiles.map((filePath) => ({
        name: filePath,
        message: path.basename(filePath),
      })),
      {
        name: BACK_SENTINEL,
        message: 'Voltar',
        hint: 'Retornar ao menu principal',
      },
    ],
  }).run()) as string | typeof BACK_SENTINEL;

  return selectedFile;
};

const askSourceType = async (): Promise<SourceTypeChoice> => {
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
        message: 'Voltar',
        hint: 'Retornar ao menu principal',
      },
    ],
  }).run()) as SourceTypeChoice;

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

const askModelSelection = async (
  models: CopilotModelInfo[]
): Promise<string | typeof BACK_SENTINEL> => {
  if (models.length === 0) {
    throw new Error('Nenhum modelo disponivel foi retornado pelo Copilot.');
  }

  const defaultModel = process.env.COPILOT_MODEL || models[0]?.id || 'gpt-5-mini';

  const choices = [
    ...models.map((model) => {
      const defaultSuffix = model.id === defaultModel ? ' [padrao]' : '';
      return {
        name: model.id,
        message: `${formatModelLabel(model)} - ${model.id}${defaultSuffix}`,
      };
    }),
    {
      name: BACK_SENTINEL,
      message: 'Voltar',
      hint: 'Retornar ao menu principal',
    },
  ];

  const selectedModel = (await new Select({
    name: 'llmModel',
    message: 'Escolha o modelo de IA',
    choices,
    initial: Math.max(
      models.findIndex((model) => model.id === defaultModel),
      0
    ),
  }).run()) as string | typeof BACK_SENTINEL;

  return selectedModel;
};

const askOutputDir = async (defaultOutputDir: string): Promise<string | typeof BACK_SENTINEL> => {
  const outputValue = await askInputOrBack(
    'Definir caminho de saida',
    'Caminho de saida',
    defaultOutputDir
  );
  if (outputValue === BACK_SENTINEL) {
    return BACK_SENTINEL;
  }

  return path.resolve(outputValue || defaultOutputDir);
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

const askFigmaUrl = async (): Promise<string | typeof BACK_SENTINEL> => {
  return askInputOrBack('Link do Figma', 'Cole o link do Figma');
};

const askTokenValue = async (label: string): Promise<string | typeof BACK_SENTINEL> => {
  return askInputOrBack(`Token do ${label}`, `Informe o token do ${label}`);
};

const askAssetSelection = async (
  assets: { name: string; path: string }[]
): Promise<string | typeof BACK_SENTINEL> => {
  const selectedPath = (await new Select({
    name: 'downloadedSvg',
    message: 'Selecione qual SVG usar',
    choices: [
      ...assets.map((asset) => ({
        name: asset.path,
        message: asset.name,
      })),
      {
        name: BACK_SENTINEL,
        message: 'Voltar',
        hint: 'Retornar ao menu principal',
      },
    ],
  }).run()) as string | typeof BACK_SENTINEL;

  return selectedPath;
};

const askInvalidFigmaTokenAction = async (): Promise<FigmaTokenErrorChoice> => {
  const choice = (await new Select({
    name: 'figmaTokenErrorAction',
    message: 'Token do Figma invalido. O que deseja fazer?',
    choices: [
      {
        name: 'retry-with-new-token',
        message: 'Informar novo token e tentar novamente',
      },
      {
        name: 'back',
        message: 'Voltar ao menu principal',
      },
    ],
  }).run()) as FigmaTokenErrorChoice;

  return choice;
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

  const staticToken = await resolveSecretFromStore('COPILOT_TOKEN');
  if (staticToken) {
    await success('Token estatico do Copilot encontrado.');
    return;
  }

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

const ensureFigmaToken = async (): Promise<boolean> => {
  const existing = await resolveSecretFromStore('FIGMA_TOKEN');
  if (existing) {
    return true;
  }

  divider('Configuracao de Tokens');
  await message('FIGMA_TOKEN nao encontrado.');

  const token = await askTokenValue('Figma');
  if (token === BACK_SENTINEL) {
    return false;
  }

  if (!token) {
    throw new Error('Token do Figma invalido.');
  }

  await persistSecret('FIGMA_TOKEN', token);
  await success('FIGMA_TOKEN configurado com sucesso.');
  return true;
};

const forceUpdateFigmaToken = async (): Promise<boolean> => {
  divider('Atualizacao do token Figma');
  const token = await askTokenValue('Figma');
  if (token === BACK_SENTINEL) {
    return false;
  }

  if (!token) {
    throw new Error('Token do Figma invalido.');
  }

  await persistSecret('FIGMA_TOKEN', token);
  await success('FIGMA_TOKEN atualizado com sucesso.');
  return true;
};

const isInvalidFigmaTokenError = (exception: unknown): boolean => {
  const errorMessage = exception instanceof Error ? exception.message : String(exception);
  const hasStatus403 = errorMessage.includes('Falha na API do Figma (403)');
  const hasInvalidTokenText = /invalid token/i.test(errorMessage);

  return hasStatus403 && hasInvalidTokenText;
};

const saveConfiguredModel = async (model: string): Promise<void> => {
  await saveEnvVar('COPILOT_MODEL', model);
  process.env.COPILOT_MODEL = model;
};

const configureLlmModel = async (): Promise<void> => {
  divider('Configuracao IA');
  const modelsLoading = loading('Buscando modelos de IA...');
  const models = await copilotRuntime.fetchModels();
  modelsLoading.stop();
  const selectedModel = await askModelSelection(models);
  if (selectedModel === BACK_SENTINEL) {
    await message('Voltando ao menu principal...');
    return;
  }

  await saveConfiguredModel(selectedModel);
  await success(`Modelo salvo: ${selectedModel}`);
};

const reconnectCopilot = async (): Promise<void> => {
  divider('Reconexao Copilot');

  const reconnectLoading = loading('Refazendo autenticacao com Copilot...');
  try {
    await copilotRuntime.auth.refreshAccessToken();
    await copilotRuntime.fetchModels();
    reconnectLoading.stop();
    await success('Conexao com Copilot refeita com sucesso.');
  } catch (exception) {
    reconnectLoading.stop();
    const msg = exception instanceof Error ? exception.message : String(exception);
    await error(`Nao foi possivel refazer a conexao com Copilot: ${msg}`);
  }
};

const run = async (): Promise<void> => {
  let activeLoading: ReturnType<typeof loading> | undefined;

  try {
    printHeader();
    divider('Inicio');
    await ensureCopilotConnection();

    mainLoop: while (true) {
      const menuChoice = await askMainMenuChoice();

      if (menuChoice === 'exit') {
        divider('Encerrando');
        await message('CLI finalizado por solicitacao do usuario.');
        break;
      }

      if (menuChoice === 'configure-llm') {
        await configureLlmModel();
        continue;
      }

      if (menuChoice === 'configure-figma-token') {
        const updated = await forceUpdateFigmaToken();
        if (!updated) {
          await message('Voltando ao menu principal...');
        }
        continue;
      }

      if (menuChoice === 'reconnect-copilot') {
        await reconnectCopilot();
        continue;
      }

      const defaultOutputDir = path.resolve(process.cwd(), 'output');
      const outputDirFromCli = parseCliOutputDir();
      const outputDir = outputDirFromCli ?? (await askOutputDir(defaultOutputDir));
      if (outputDir === BACK_SENTINEL) {
        await message('Voltando ao menu principal...');
        continue;
      }

      if (outputDirFromCli) {
        await message(`Caminho de saida via CLI: ${outputDir}`);
      }
      const llmModel = getConfiguredModel();
      await message(`IA configurada: ${llmModel}`);

      const sourceType = await askSourceType();
      if (sourceType === 'back') {
        await message('Voltando ao menu principal...');
        continue;
      }

      divider(sourceType === 'local' ? 'Origem Local' : 'Origem Figma');
      const assetsDir = path.resolve(process.cwd(), 'src');
      let svgFilePath: string;

      if (sourceType === 'local') {
        const svgDir = path.resolve(process.cwd(), 'src/svg');
        svgFilePath = await askSvgSelection(svgDir);
        if (svgFilePath === BACK_SENTINEL) {
          await message('Voltando ao menu principal...');
          continue;
        }

        if (!isValidSvgPath(svgFilePath)) {
          throw new Error(
            'Arquivo SVG invalido. Informe um caminho para arquivo com extensao .svg.'
          );
        }
      } else {
        while (true) {
          const hasToken = await ensureFigmaToken();
          if (!hasToken) {
            await message('Voltando ao menu principal...');
            continue mainLoop;
          }

          const figmaUrl = await askFigmaUrl();
          if (figmaUrl === BACK_SENTINEL) {
            await message('Voltando ao menu principal...');
            continue mainLoop;
          }

          activeLoading = loading('Baixando SVGs do Figma...');

          try {
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
              if (svgFilePath === BACK_SENTINEL) {
                await message('Voltando ao menu principal...');
                continue mainLoop;
              }
            }

            break;
          } catch (exception) {
            activeLoading?.stop();

            if (!isInvalidFigmaTokenError(exception)) {
              throw exception;
            }

            await error('Falha na API do Figma: token invalido (403).');
            const action = await askInvalidFigmaTokenAction();
            if (action === 'back') {
              await message('Voltando ao menu principal...');
              continue mainLoop;
            }

            const tokenUpdated = await forceUpdateFigmaToken();
            if (!tokenUpdated) {
              await message('Voltando ao menu principal...');
              continue mainLoop;
            }
          }
        }
      }

      const sddPath = path.resolve(process.cwd(), 'src/docs/sdd.json');
      const sddResult = await ensureSddFile(process.cwd(), sddPath);
      if (sddResult.created) {
        await message(
          'SDD inicial gerado automaticamente a partir da estrutura do projeto. Modo padrao: template-only.'
        );
      }

      const result = await runPipeline({
        sddPath: sddResult.sddPath,
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
    }
  } catch (exception) {
    activeLoading?.stop();
    const message = exception instanceof Error ? exception.message : String(exception);
    await error(`Falha no pipeline: ${message}`);
    process.exitCode = 1;
  }
};

void run();
