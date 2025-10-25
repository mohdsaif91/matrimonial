import {
  Client,
  ClientModuleField,
  FormSubmitProps,
  ImageSubmitProps,
  UpdateFormSubmitProps,
} from "../types/client";
import api from "./axios";
import { ROUTE } from "./route";

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

export async function fetchClientList(pageNumber: number) {
  const response = await api.get(`${ROUTE.CLIENTS.GET}?page=${pageNumber}`);
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
