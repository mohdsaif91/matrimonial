import { CountryProps } from "../types/country";
import api from "./axios";
import { ROUTE } from "./route";

export async function addClientFormModule(relData: CountryProps) {
  const response = await api.post(ROUTE.COUNTRY.ADD, { ...relData });
  return response.data;
}

export async function fetchClientFormModule() {
  const response = await api.get(ROUTE.COUNTRY.GET);
  return response.data;
}

export async function updateClientFormModule(data: CountryProps) {
  const { name, status, id } = data;
  const response = await api.put(`${ROUTE.COUNTRY.UPDATE}/${id}`, {
    name,
    status,
  });
  return response.data;
}

export async function deleteClientFormModule(id: number) {
  const response = await api.delete(`${ROUTE.COUNTRY.DELETE}/${id}`);
  return response.data;
}
