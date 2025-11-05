import { OccupationProps } from "../types/occupation.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addOccupationAPI(relData: OccupationProps) {
  const response = await api.post(ROUTE.OCCUPATION.ADD, { ...relData });
  return response.data;
}

export async function fetchOccupationAPI() {
  const response = await api.get(ROUTE.OCCUPATION.GET);
  return response.data;
}

export async function updateOccupationAPI(data: OccupationProps) {
  const { name, status, id } = data;
  const response = await api.put(`${ROUTE.OCCUPATION.UPDATE}/${id}`, {
    name,
    status,
  });
  return response.data;
}

export async function deleteOccupationAPI(id: number) {
  const response = await api.delete(`${ROUTE.OCCUPATION.DELETE}/${id}`);
  return response.data;
}

export async function addSubOccupationAPI(relData: OccupationProps) {
  const response = await api.post(ROUTE.SUB_OCCUPATION.ADD, { ...relData });
  return response.data;
}

export async function fetchSubOccupationAPI() {
  const response = await api.get(ROUTE.SUB_OCCUPATION.GET);
  return response.data;
}

export async function updateSubOccupationAPI(data: OccupationProps) {
  const { name, status, id } = data;
  const response = await api.put(`${ROUTE.SUB_OCCUPATION.UPDATE}/${id}`, {
    name,
    status,
  });
  return response.data;
}

export async function deleteSubOccupationAPI(id: number) {
  const response = await api.delete(`${ROUTE.SUB_OCCUPATION.DELETE}/${id}`);
  return response.data;
}
