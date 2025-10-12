import { Client, FormSubmitProps } from "../types/client";
import api from "./axios";
import { ROUTE } from "./route";

export async function AddClientApi(clientData: FormSubmitProps) {
  const response = await api.post(ROUTE.CLIENTS.POST, clientData);
  return response.data;
}

export async function fetchClientList() {
  const response = await api.get(ROUTE.CLIENTS.GET);
  return response.data;
}

export async function fetchSourcedFrom() {
  const response = await api.get(ROUTE.PROFILE_SOURCE.GET);
  return response.data;
}
