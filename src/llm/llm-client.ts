import 'dotenv/config';
import { copilotRuntime } from '../copilot/provider.js';
import { LlmRequestMessage } from './interface.js';

const generateTemplate = async (prompt: string, model?: string): Promise<string> => {
  const selectedModel = model || process.env.COPILOT_MODEL || 'gpt-5-mini';

  const messages: LlmRequestMessage[] = [
    {
      role: 'system',
      content:
        'Voce gera codigo Vue com foco em templates limpos e semanticos. Siga estritamente as regras fornecidas.',
    },
    {
      role: 'user',
      content: prompt,
    },
  ];

  const content = await copilotRuntime.runModel(
    {
      messages,
      temperature: 0,
    },
    selectedModel
  );

  if (!content) {
    throw new Error('A LLM nao retornou conteudo para o template.');
  }

  return content;
};

export { generateTemplate };
