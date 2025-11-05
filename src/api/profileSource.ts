import { ProfileSourceProps } from "../types/profileSource.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addProfileSource(relData: ProfileSourceProps) {
  const response = await api.post(ROUTE.PROFILE_SOURCE.ADD, { ...relData });
  return response.data;
}

export async function fetchProfileSource() {
  const response = await api.get(ROUTE.PROFILE_SOURCE.GET);
  return response.data;
}

export async function updateProfileSource(data: ProfileSourceProps) {
  const { name, status, phone, type, id } = data;
  const response = await api.put(`${ROUTE.PROFILE_SOURCE.UPDATE}/${id}`, {
    name,
    status,
    phone,
    type,
  });
  return response.data;
}

export async function deleteProfileSource(id: number) {
  const response = await api.delete(`${ROUTE.PROFILE_SOURCE.UPDATE}/${id}`);
  return response.data;
}
