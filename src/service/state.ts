import { StateProps } from "../types/state.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

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
