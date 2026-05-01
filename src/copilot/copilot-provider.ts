import {
  ChatCompletionResponse,
  CopilotMessage,
  CopilotModelInfo,
  CopilotProviderOptions,
  CopilotRunInput,
  Logger,
  ResponsesApiResponse,
} from './interfaces.js';
import { fetchModels } from './models.js';

const assertHttpOk = async (response: Response, endpoint: string): Promise<void> => {
  if (response.ok) return;
  const body = await response.text();
  throw new Error(
    `Copilot ${endpoint} falhou com status ${response.status}: ${body.slice(0, 500)}`
  );
};

const extractResponsesText = (json: ResponsesApiResponse): string | undefined => {
  if (json.output_text && json.output_text.trim().length > 0) {
    return json.output_text.trim();
  }

  const fromOutput = json.output
    ?.flatMap((item) => item.content || [])
    .filter((part) => part.type === 'output_text' || part.type === 'text')
    .map((part) => part.text || '')
    .join('\n')
    .trim();

  if (fromOutput && fromOutput.length > 0) {
    return fromOutput;
  }

  return undefined;
};

class CopilotProvider {
  private baseURL: string;
  private fetcher: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  private logger: Logger;

  constructor(options: CopilotProviderOptions) {
    this.baseURL = options.baseURL;
    this.fetcher = options.fetcher;
    this.logger = options.logger || console;
  }

  async chat(model: string, input: CopilotRunInput): Promise<string> {
    this.logger.info(`Executando chat.completions no Copilot para modelo ${model}`);
    const response = await this.fetcher(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: input.messages,
        temperature: input.temperature ?? 0.2,
        max_tokens: input.maxOutputTokens,
      }),
    });

    await assertHttpOk(response, 'chat.completions');
    const json = (await response.json()) as ChatCompletionResponse;
    const content = json.choices?.[0]?.message?.content?.trim();
    if (!content) {
      throw new Error('Copilot chat.completions retornou resposta sem texto.');
    }

    return content;
  }

  async responses(model: string, input: CopilotRunInput): Promise<string> {
    this.logger.info(`Executando responses API no Copilot para modelo ${model}`);
    const response = await this.fetcher(`${this.baseURL}/responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        model,
        input: input.messages,
        temperature: input.temperature ?? 0.2,
        max_output_tokens: input.maxOutputTokens,
      }),
    });

    await assertHttpOk(response, 'responses');
    const json = (await response.json()) as ResponsesApiResponse;
    const content = extractResponsesText(json);
    if (!content) {
      throw new Error('Copilot responses retornou resposta sem texto.');
    }

    return content;
  }

  async models(): Promise<CopilotModelInfo[]> {
    return fetchModels(this.baseURL, {
      fetcher: this.fetcher,
      logger: this.logger,
    });
  }
}

export { CopilotProvider };
export type { CopilotMessage, CopilotProviderOptions };
