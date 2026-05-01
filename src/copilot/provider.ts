import { createCopilotAuthManager, normalizeDomain } from './auth.js';
import { CopilotProvider } from './copilot-provider.js';
import { createCopilotFetch } from './fetch.js';
import { CopilotRunInput } from './interfaces.js';
import { fetchModels } from './models.js';

type Logger = Pick<Console, 'info' | 'warn' | 'error'>;

type RuntimeCopilotProviderOptions = {
  enterpriseUrl?: string;
  logger?: Logger;
};

type RunMode = 'chat' | 'responses';

const resolveBaseURL = (enterpriseUrl?: string): string => {
  if (enterpriseUrl) {
    return `https://copilot-api.${normalizeDomain(enterpriseUrl)}`;
  }

  return 'https://api.githubcopilot.com';
};

function resolveMode(model: string): RunMode {
  if (model.startsWith('gpt-5') && model !== 'gpt-5-mini') {
    return 'responses';
  }
  return 'chat';
}

const createRuntimeCopilotProvider = (options: RuntimeCopilotProviderOptions = {}) => {
  const logger = options.logger || console;
  const enterpriseUrl = options.enterpriseUrl || process.env.COPILOT_ENTERPRISE_URL;
  const baseURL = resolveBaseURL(enterpriseUrl);

  const auth = createCopilotAuthManager({
    enterpriseUrl,
    logger,
  });

  const fetcher = createCopilotFetch({
    auth,
    logger,
  });

  const provider = new CopilotProvider({
    baseURL,
    fetcher,
    logger,
  });

  return {
    baseURL,
    auth,
    chat: (model: string, input: CopilotRunInput): Promise<string> => provider.chat(model, input),
    responses: (model: string, input: CopilotRunInput): Promise<string> =>
      provider.responses(model, input),
    fetchModels: (): Promise<Awaited<ReturnType<typeof fetchModels>>> =>
      fetchModels(baseURL, {
        fetcher,
        logger,
      }),
    resolveMode,
    async runModel(input: CopilotRunInput, model: string): Promise<string> {
      const mode = resolveMode(model);
      logger.info(`Modo resolvido para ${model}: ${mode}`);

      if (mode === 'responses') {
        return provider.responses(model, input);
      }

      return provider.chat(model, input);
    },
  };
};

const copilotRuntime = createRuntimeCopilotProvider();

export { copilotRuntime, createRuntimeCopilotProvider, resolveBaseURL, resolveMode };
export type { RunMode, RuntimeCopilotProviderOptions };
