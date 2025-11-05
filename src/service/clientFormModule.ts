import { ClientModuleProps } from "../types/clientModule.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addClientFormModule(relData: ClientModuleProps) {
  const response = await api.post(ROUTE.CLIENT_MODULE.ADD, { ...relData });
  return response.data;
}

export async function fetchClientFormModule() {
  const response = await api.get(ROUTE.CLIENT_MODULE.GET);
  return response.data;
}

export async function updateClientFormModule(data: ClientModuleProps) {
  const { name, status, slug, id } = data;
  const response = await api.put(`${ROUTE.CLIENT_MODULE.UPDATE}/${id}`, {
    name,
    status,
    slug,
  });
  return response.data;
}

export async function deleteClientFormModule(id: number) {
  const response = await api.delete(`${ROUTE.CLIENT_MODULE.DELETE}/${id}`);
  return response.data;
}

export async function fetchClientModuleById(id: string) {
  const response = await api.get(`${ROUTE.CLIENT_MODULE.GET}/${id}`);
  return response.data;
}
