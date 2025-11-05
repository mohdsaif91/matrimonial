import { CountryProps } from "../types/country.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addCountry(relData: CountryProps) {
  const response = await api.post(ROUTE.COUNTRY.ADD, { ...relData });
  return response.data;
}

export async function fetchCountry() {
  const response = await api.get(ROUTE.COUNTRY.GET);
  return response.data;
}

export async function updateCountry(data: CountryProps) {
  const { name, status, id } = data;
  const response = await api.put(`${ROUTE.COUNTRY.UPDATE}/${id}`, {
    name,
    status,
  });
  return response.data;
}

export async function deleteCountry(id: number) {
  const response = await api.delete(`${ROUTE.COUNTRY.DELETE}/${id}`);
  return response.data;
}

export async function fetchSubCasteByRelIdAPI(id: number) {
  const response = await api.delete(`${ROUTE.COUNTRY.GET}/${id}`);
  return response.data;
}
