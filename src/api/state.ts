import { StateProps } from "../types/state";
import api from "./axios";
import { ROUTE } from "./route";

export async function addState(relData: StateProps) {
  const response = await api.post(ROUTE.STATE.ADD, { ...relData });
  return response.data;
}

export async function fetchState() {
  const response = await api.get(ROUTE.STATE.GET);
  return response.data;
}

export async function updateState(data: StateProps) {
  const { name, status, country_id, id } = data;
  const response = await api.put(`${ROUTE.STATE.UPDATE}/${id}`, {
    name,
    status,
    country_id,
  });
  return response.data;
}

export async function deleteState(id: number) {
  const response = await api.delete(`${ROUTE.STATE.DELETE}/${id}`);
  return response.data;
}
