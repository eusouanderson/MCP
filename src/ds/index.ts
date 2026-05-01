const URL_DS: string = process.env.URL_DS || '';
import { IResponse } from './interfaces.js';

const designSystemData = async () => {
  try {
    const response = await fetch(URL_DS);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados');
    }
    const data: IResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { designSystemData };
