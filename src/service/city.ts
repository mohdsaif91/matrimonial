import { CountryProps } from "../types/country.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addCity(relData: CountryProps) {
  const response = await api.post(ROUTE.CITY.ADD, { ...relData });
  return response.data;
}

export async function fetchCity() {
  const response = await api.get(ROUTE.CITY.GET);
  return response.data;
}

export async function updateCity(data: CountryProps) {
  const { name, status, id } = data;
  const response = await api.put(`${ROUTE.CITY.UPDATE}/${id}`, {
    name,
    status,
  });
  return response.data;
}

export async function deleteCity(id: number) {
  const response = await api.delete(`${ROUTE.CITY.DELETE}/${id}`);
  return response.data;
}
