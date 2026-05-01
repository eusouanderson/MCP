import { CopilotFetchOptions } from './interfaces.js';

const isNetworkError = (error: unknown): boolean => {
  return error instanceof TypeError;
};

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const shouldRetryStatus = (status: number, retryStatusCodes: number[]): boolean => {
  return retryStatusCodes.includes(status);
};

const canRetryBody = (body: RequestInit['body']): boolean => {
  return !(typeof ReadableStream !== 'undefined' && body instanceof ReadableStream);
};

const cloneHeaders = (headers?: HeadersInit): Headers => {
  return new Headers(headers || {});
};

const createCopilotFetch = (options: CopilotFetchOptions) => {
  const logger = options.logger || console;
  const maxRetries = options.maxRetries ?? 2;
  const retryDelayMs = options.retryDelayMs ?? 600;
  const retryStatusCodes = options.retryStatusCodes ?? [408, 425, 429, 500, 502, 503, 504];
  const userAgent = options.userAgent || 'mcp-frontend-copilot/1.0';

  return async (input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> => {
    const replayable = canRetryBody(init.body);
    let attempt = 0;

    while (true) {
      const token = await options.auth.getValidAccessToken();
      const headers = cloneHeaders(init.headers);
      headers.set('Authorization', `Bearer ${token}`);
      headers.set('User-Agent', userAgent);
      headers.set('Openai-Intent', 'conversation-edits');

      try {
        const response = await fetch(input, {
          ...init,
          headers,
        });

        if (response.status === 401) {
          logger.warn('Token invalido/expirado recebido (401). Tentando refresh imediato...');
          const refreshedToken = await options.auth.refreshAccessToken();
          const retryHeaders = cloneHeaders(init.headers);
          retryHeaders.set('Authorization', `Bearer ${refreshedToken}`);
          retryHeaders.set('User-Agent', userAgent);
          retryHeaders.set('Openai-Intent', 'conversation-edits');

          const retryResponse = await fetch(input, {
            ...init,
            headers: retryHeaders,
          });

          if (retryResponse.status !== 401) {
            return retryResponse;
          }

          const body = await retryResponse.text();
          throw new Error(`Falha de autenticacao Copilot (401): ${body.slice(0, 300)}`);
        }

        if (
          attempt < maxRetries &&
          replayable &&
          shouldRetryStatus(response.status, retryStatusCodes)
        ) {
          const waitMs = retryDelayMs * 2 ** attempt;
          logger.warn(
            `HTTP ${response.status}. Retry ${attempt + 1}/${maxRetries} em ${waitMs}ms.`
          );
          attempt += 1;
          await delay(waitMs);
          continue;
        }

        return response;
      } catch (error) {
        if (attempt < maxRetries && replayable && isNetworkError(error)) {
          const waitMs = retryDelayMs * 2 ** attempt;
          logger.warn(`Falha de rede. Retry ${attempt + 1}/${maxRetries} em ${waitMs}ms.`);
          attempt += 1;
          await delay(waitMs);
          continue;
        }

        throw error;
      }
    }
  };
};

export { createCopilotFetch };
export type { CopilotFetchOptions };
