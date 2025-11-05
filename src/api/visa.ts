import { QualificationProps } from "../types/qualification.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addVisaAPI(relData: QualificationProps) {
  const response = await api.post(ROUTE.VISA.ADD, { ...relData });
  return response.data;
}

export async function fetchVisaAPI() {
  const response = await api.get(ROUTE.VISA.GET);
  return response.data;
}

export async function updateVisaAPI(data: QualificationProps) {
  const { name, status, id } = data;
  const response = await api.put(`${ROUTE.VISA.UPDATE}/${id}`, {
    name,
    status,
  });
  return response.data;
}

export async function deleteVisaAPI(id: number) {
  const response = await api.delete(`${ROUTE.VISA.DELETE}/${id}`);
  return response.data;
}
