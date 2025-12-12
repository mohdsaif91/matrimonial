import { LeadStatusProps } from "../types/leadStatus.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addMembershipType(data: LeadStatusProps) {
  const response = await api.post(ROUTE.MEMBERSHIP_TYPE.ADD, { ...data });
  return response.data;
}

export async function fetchMembershipType() {
  const response = await api.get(ROUTE.MEMBERSHIP_TYPE.GET);
  return response.data;
}

export async function updateMembershipType(data: LeadStatusProps) {
  const { status, id, name } = data;
  const response = await api.put(`${ROUTE.MEMBERSHIP_TYPE.UPDATE}/${id}`, {
    status,
    name,
  });
  return response.data;
}

export async function deleteMembershipType(id: number) {
  const response = await api.delete(`${ROUTE.MEMBERSHIP_TYPE.DELETE}/${id}`);
  return response.data;
}
