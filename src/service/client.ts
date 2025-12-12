import { FormSubmitProps, SendProfileProps } from "../types/client.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function AddClientApi(clientData: FormSubmitProps) {
  const response = await api.post(ROUTE.CLIENTS.POST, clientData);
  return response.data;
}

export async function AddClientImageApi(imageObject: any) {
  const response = await api.post(ROUTE.CLIENTS.IMAGEPOST, imageObject, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function fetchClientList(pageNumber: number, pageCount: number) {
  const response = await api.get(
    `${ROUTE.CLIENTS.GET}?page=${pageNumber}&page_count=${pageCount}`
  );
  return response.data;
}

export async function fetchClientById(id: string) {
  const response = await api.get(`${ROUTE.CLIENTS.GET}/${id}`);
  return response.data;
}

export async function fetchOppClientList(client_id: string | number) {
  const response = await api.get(
    `${ROUTE.CLIENTS.OPP_CLIENT_SEARCH}?client_id=${client_id}`
  );
  return response.data;
}

export async function fetchClientByFilters(filter: any) {
  const response = await api.post(`${ROUTE.CLIENTS.SEARCH}`, { ...filter });
  return response.data;
}

export async function deleteClientList(id: number) {
  const response = await api.delete(`${ROUTE.CLIENTS.DELETE}/${id}`);
  return response.data;
}

export async function fetchSourcedFrom() {
  const response = await api.get(ROUTE.PROFILE_SOURCE.GET);
  return response.data;
}

export async function updateClient(data: FormSubmitProps) {
  const { client_id, form_fields } = data;
  const response = await api.put(`${ROUTE.CLIENTS.UPDATE}/${client_id}`, {
    form_fields: { ...form_fields },
  });
  return response.data;
}

export async function sendProfile(data: SendProfileProps) {
  const response = await api.post(`${ROUTE.CLIENTS.SHARE_PROFILE}`, {
    ...data,
  });
  return response.data;
}
