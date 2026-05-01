type LlmRequestMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type { LlmRequestMessage };
