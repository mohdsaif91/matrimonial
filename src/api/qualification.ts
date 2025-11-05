import { QualificationProps } from "../types/qualification.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addQualificationAPI(relData: QualificationProps) {
  const response = await api.post(ROUTE.QUALIFICATION.ADD, { ...relData });
  return response.data;
}

export async function fetchQualificationAPI() {
  const response = await api.get(ROUTE.QUALIFICATION.GET);
  return response.data;
}

export async function updateQualificationAPI(data: QualificationProps) {
  const { name, status, id } = data;
  const response = await api.put(`${ROUTE.QUALIFICATION.UPDATE}/${id}`, {
    name,
    status,
  });
  return response.data;
}

export async function deleteQualificationAPI(id: number) {
  const response = await api.delete(`${ROUTE.QUALIFICATION.DELETE}/${id}`);
  return response.data;
}
