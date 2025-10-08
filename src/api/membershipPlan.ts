import { LeadStatusProps } from "../types/leadStatus";
import api from "./axios";
import { ROUTE } from "./route";

export async function addMembershipPlan(data: LeadStatusProps) {
  const response = await api.post(ROUTE.MEMBERSHIP_STATUS.ADD, { ...data });
  return response.data;
}

export async function fetchMembershipPlan() {
  const response = await api.get(ROUTE.MEMBERSHIP_STATUS.GET);
  return response.data;
}

export async function updateMembershipPlan(data: LeadStatusProps) {
  const { status, id, name } = data;
  const response = await api.put(`${ROUTE.MEMBERSHIP_STATUS.UPDATE}/${id}`, {
    status,
    name,
  });
  return response.data;
}

export async function deleteMembershipPlan(id: number) {
  const response = await api.delete(`${ROUTE.MEMBERSHIP_STATUS.DELETE}/${id}`);
  return response.data;
}
