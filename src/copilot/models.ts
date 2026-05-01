import {
  CacheEntry,
  CopilotModelApiItem,
  CopilotModelInfo,
  CopilotModelsApiResponse,
  Logger,
} from './interfaces.js';

const MODELS_CACHE = new Map<string, CacheEntry>();
const INFLIGHT = new Map<string, Promise<CopilotModelInfo[]>>();
const CACHE_TTL_MS = 5 * 60 * 1000;

const toModelInfo = (model: CopilotModelApiItem): CopilotModelInfo => {
  const supports = model.capabilities.supports;
  const hasReasoning =
    Boolean(supports.adaptive_thinking) ||
    Boolean(supports.reasoning_effort && supports.reasoning_effort.length > 0) ||
    typeof supports.max_thinking_budget === 'number' ||
    typeof supports.min_thinking_budget === 'number';

  return {
    id: model.id,
    name: model.name,
    family: model.capabilities.family,
    endpoints: model.supported_endpoints || [],
    limits: {
      contextTokens: model.capabilities.limits.max_context_window_tokens,
      outputTokens: model.capabilities.limits.max_output_tokens,
      promptTokens: model.capabilities.limits.max_prompt_tokens,
    },
    capabilities: {
      chat: true,
      reasoning: hasReasoning,
      streaming: supports.streaming,
      toolCalls: supports.tool_calls,
      vision: Boolean(supports.vision),
      structuredOutputs: Boolean(supports.structured_outputs),
    },
  };
};

const parseResponse = async (response: Response): Promise<CopilotModelsApiResponse> => {
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Falha ao buscar modelos (${response.status}): ${body.slice(0, 400)}`);
  }

  const data = (await response.json()) as Partial<CopilotModelsApiResponse>;
  if (!Array.isArray(data.data)) {
    throw new Error('Resposta invalida do endpoint /models (campo data ausente).');
  }

  return { data: data.data as CopilotModelApiItem[] };
};

const fetchModels = async (
  baseURL: string,
  deps: {
    fetcher?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
    forceRefresh?: boolean;
    logger?: Logger;
  } = {}
): Promise<CopilotModelInfo[]> => {
  const logger = deps.logger || console;
  const now = Date.now();
  const cached = MODELS_CACHE.get(baseURL);

  if (!deps.forceRefresh && cached && cached.expiresAt > now) {
    return cached.value;
  }

  const running = INFLIGHT.get(baseURL);
  if (running) {
    return running;
  }

  const currentFetch = (async () => {
    logger.info(`Buscando modelos dinamicos do Copilot em ${baseURL}/models`);
    const response = await (deps.fetcher || fetch)(`${baseURL}/models`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const json = await parseResponse(response);
    const enabled = json.data.filter(
      (item) => item.model_picker_enabled && item.policy?.state !== 'disabled'
    );
    const mapped = enabled.map(toModelInfo);

    MODELS_CACHE.set(baseURL, {
      value: mapped,
      expiresAt: Date.now() + CACHE_TTL_MS,
    });

    return mapped;
  })();

  INFLIGHT.set(baseURL, currentFetch);

  try {
    return await currentFetch;
  } finally {
    INFLIGHT.delete(baseURL);
  }
};

export { CACHE_TTL_MS, fetchModels };
