import { Client } from "../types/client";
import api from "./axios";
import { ROUTE } from "./route";

export async function AddClientApi(clientData: Client) {
  console.log(clientData, " <<< clientData");

  const response = await api.post(ROUTE.ADD_CLIENT_ROUTE, clientData);
  return response.data;
}

export async function fetchSourcedFrom() {
  const response = await api.get("https://jsonplaceholder.typicode.com/users");
  return response.data;
}
