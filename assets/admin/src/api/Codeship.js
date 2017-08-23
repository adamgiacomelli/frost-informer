import { API } from '../constants/Api';

export const getCodeshipState = async _ => {
  const data = await window.fetch(`${API.CODESHIP_URL}`);
  return data.json();
};
