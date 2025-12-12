import { ReligionProps } from "../types/religion.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addReligion(relData: ReligionProps) {
  const response = await api.post(ROUTE.RELIGION.ADD, { ...relData });
  return response.data;
}

export async function fetchReligion() {
  const response = await api.get(ROUTE.RELIGION.GET);
  return response.data;
}

export async function updateReligion(data: ReligionProps) {
  const { name, status, id } = data;
  const response = await api.put(`${ROUTE.RELIGION.UPDATE}/${id}`, {
    name,
    status,
  });
  return response.data;
}

export async function deleteReligionAPI(id: number) {
  const response = await api.delete(`${ROUTE.RELIGION.UPDATE}/${id}`);
  return response.data;
}
