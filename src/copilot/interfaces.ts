import { CopilotAuthManager } from './auth.js';

type Logger = Pick<Console, 'info' | 'warn' | 'error'>;

type OAuthDeviceCodeResponse = {
  device_code: string;
  user_code: string;
  verification_uri: string;
  expires_in: number;
  interval: number;
};

type OAuthTokenResponse = {
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
  error?: string;
  interval?: number;
};

type CopilotAuthRecord = {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  tokenType: 'bearer';
  enterpriseUrl?: string;
};

type CopilotAuthManagerOptions = {
  authFilePath?: string;
  enterpriseUrl?: string;
  clientId?: string;
  logger?: Logger;
};

type CopilotModelApiItem = {
  id: string;
  name: string;
  model_picker_enabled: boolean;
  supported_endpoints?: string[];
  policy?: {
    state?: string;
  };
  capabilities: {
    family: string;
    limits: {
      max_context_window_tokens: number;
      max_output_tokens: number;
      max_prompt_tokens: number;
    };
    supports: {
      streaming: boolean;
      tool_calls: boolean;
      adaptive_thinking?: boolean;
      reasoning_effort?: string[];
      max_thinking_budget?: number;
      min_thinking_budget?: number;
      vision?: boolean;
      structured_outputs?: boolean;
    };
  };
};

type CopilotModelsApiResponse = {
  data: CopilotModelApiItem[];
};

type CopilotModelInfo = {
  id: string;
  name: string;
  family: string;
  endpoints: string[];
  limits: {
    contextTokens: number;
    outputTokens: number;
    promptTokens: number;
  };
  capabilities: {
    chat: boolean;
    reasoning: boolean;
    streaming: boolean;
    toolCalls: boolean;
    vision: boolean;
    structuredOutputs: boolean;
  };
};

type CacheEntry = {
  expiresAt: number;
  value: CopilotModelInfo[];
};

type CopilotMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type CopilotRunInput = {
  messages: CopilotMessage[];
  temperature?: number;
  maxOutputTokens?: number;
};

type CopilotProviderOptions = {
  baseURL: string;
  fetcher: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  logger?: Logger;
};

type ChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

type ResponsesApiResponse = {
  output_text?: string;
  output?: Array<{
    type?: string;
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
};

type CopilotFetchOptions = {
  auth: CopilotAuthManager;
  maxRetries?: number;
  retryDelayMs?: number;
  retryStatusCodes?: number[];
  userAgent?: string;
  logger?: Logger;
};

export type {
  CacheEntry,
  ChatCompletionResponse,
  CopilotAuthManagerOptions,
  CopilotAuthRecord,
  CopilotFetchOptions,
  CopilotMessage,
  CopilotModelApiItem,
  CopilotModelInfo,
  CopilotModelsApiResponse,
  CopilotProviderOptions,
  CopilotRunInput,
  Logger,
  OAuthDeviceCodeResponse,
  OAuthTokenResponse,
  ResponsesApiResponse,
};
