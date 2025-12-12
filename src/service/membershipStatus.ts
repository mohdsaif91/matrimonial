import { LeadStatusProps } from "../types/leadStatus.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addMembershipStatus(data: LeadStatusProps) {
  const response = await api.post(ROUTE.MEMBERSHIP_STATUS.ADD, { ...data });
  return response.data;
}

export async function fetchMembershipStatus() {
  const response = await api.get(ROUTE.MEMBERSHIP_STATUS.GET);
  return response.data;
}

export async function updateMembershipStatus(data: LeadStatusProps) {
  const { status, id, name } = data;
  const response = await api.put(`${ROUTE.MEMBERSHIP_STATUS.UPDATE}/${id}`, {
    status,
    name,
  });
  return response.data;
}

export async function deleteMembershipStatus(id: number) {
  const response = await api.delete(`${ROUTE.MEMBERSHIP_STATUS.DELETE}/${id}`);
  return response.data;
}
