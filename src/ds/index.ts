import endpoints from './paths/index.json' with { type: 'json' };

const URL_DS: string = process.env.URL_DS || 'https://hmg-ds.dmcview.com.br/components/';
const DS_DEBUG = process.env.DS_DEBUG === '1';

const preview = (value: string, max = 160): string =>
  value.length > max ? `${value.slice(0, max)}...` : value;

const debugLog = (...args: unknown[]) => {
  if (DS_DEBUG) {
    console.log(...args);
  }
};

const debugWarn = (...args: unknown[]) => {
  if (DS_DEBUG) {
    console.warn(...args);
  }
};

const designSystemData = async (endpoint: string) => {
  try {
    const response = await fetch(`${URL_DS}/${endpoint}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar ${endpoint}`);
    }

    if (typeof response.text !== 'function') {
      debugLog(`Resposta gerada, ${response.status} ${response.statusText} endpoint=${endpoint}`);
      return await response.json();
    }

    const contentType = response.headers?.get?.('content-type') ?? '';
    const bodyText = await response.text();
    debugLog(`Resposta gerada, ${response.status} ${response.statusText} endpoint=${endpoint}`);

    try {
      return JSON.parse(bodyText);
    } catch {
      if (!contentType.toLowerCase().includes('application/json')) {
        debugWarn(
          `Resposta DS ignorada (nao JSON) para ${endpoint}. content-type=${contentType || 'desconhecido'} body=${preview(bodyText)}`
        );
        return null;
      }

      debugWarn(
        `Falha ao parsear JSON do endpoint ${endpoint}. content-type=${contentType} body=${preview(bodyText)}`
      );
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getAllDesignSystemData = async () => {
  return Promise.all(endpoints.map(designSystemData));
};

export { designSystemData, endpoints, getAllDesignSystemData };
