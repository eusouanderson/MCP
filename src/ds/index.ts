import endpoints from './paths/index.json' with { type: 'json' };

const URL_DS: string = process.env.URL_DS || 'https://hmg-ds.dmcview.com.br/components/';

const designSystemData = async (endpoint: string) => {
  try {
    const response = await fetch(`${URL_DS}/${endpoint}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar ${endpoint}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getAllDesignSystemData = async () => {
  return Promise.all(endpoints.map(designSystemData));
};

export { designSystemData, endpoints, getAllDesignSystemData };
