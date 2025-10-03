import { Client } from "../types/client";
import api from "./axios";
import { ROUTE } from "./route";

export async function AddClientApi(clientData: Client) {
  const response = await api.post(ROUTE.ADD_CLIENT_ROUTE, clientData);
  return response.data;
}

export async function fetchSourcedFrom() {
  const response = await api.get(ROUTE.PROFILE_SOURCE.GET);
  return response.data;
}
