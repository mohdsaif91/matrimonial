import { FormSubmitProps } from "../types/client";
import { ClientResponseProps } from "../types/clientResponse";
import api from "./axios";
import { ROUTE } from "./route";

export async function AddCleintResponse(clientResData: ClientResponseProps) {
  const response = await api.post(ROUTE.CLIENT_RESPONSE.ADD, clientResData);
  return response.data;
}

export async function fetchClientResponse() {
  const response = await api.get(`${ROUTE.CLIENT_RESPONSE.GET}`);
  return response.data;
}

export async function deleteClientResponse(id: number) {
  const response = await api.delete(`${ROUTE.CLIENT_RESPONSE.DELETE}/${id}`);
  return response.data;
}

export async function updateClientResponse(data: FormSubmitProps) {
  const { client_id, form_fields } = data;
  const response = await api.put(
    `${ROUTE.CLIENT_RESPONSE.UPDATE}/${client_id}`,
    {
      form_fields: { ...form_fields },
    }
  );
  return response.data;
}
