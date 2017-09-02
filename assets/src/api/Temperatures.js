import { API } from '../constants/Api'

export const getTemperatures = async _ => {
  const data = await window.fetch(`${API.URL}temperatures`)
  return data.json()
}
