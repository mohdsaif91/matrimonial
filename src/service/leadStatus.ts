import { LeadStatusProps } from "../types/leadStatus.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addLeadStatus(data: LeadStatusProps) {
  const response = await api.post(ROUTE.LEAD_STATUS.ADD, { ...data });
  return response.data;
}

export async function fetchLeadStatus() {
  const response = await api.get(ROUTE.LEAD_STATUS.GET);
  return response.data;
}

export async function updateLeadStatus(data: LeadStatusProps) {
  const { status, id, name } = data;
  const response = await api.put(`${ROUTE.LEAD_STATUS.UPDATE}/${id}`, {
    status,
    name,
  });
  return response.data;
}

export async function deleteLeadStatus(id: number) {
  const response = await api.delete(`${ROUTE.LEAD_STATUS.DELETE}/${id}`);
  return response.data;
}

export async function fetchSubCasteByRelIdAPI(id: number) {
  const response = await api.delete(`${ROUTE.LEAD_STATUS.GET}/${id}`);
  return response.data;
}
