import { LeadStatusProps } from "../types/leadStatus.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addMembershipPlan(data: LeadStatusProps) {
  const response = await api.post(ROUTE.MEMBERSHIP_PLAN.ADD, { ...data });
  return response.data;
}

export async function fetchMembershipPlan() {
  const response = await api.get(ROUTE.MEMBERSHIP_PLAN.GET);
  return response.data;
}

export async function updateMembershipPlan(data: LeadStatusProps) {
  const { status, id, name } = data;
  const response = await api.put(`${ROUTE.MEMBERSHIP_PLAN.UPDATE}/${id}`, {
    status,
    name,
  });
  return response.data;
}

export async function deleteMembershipPlan(id: number) {
  const response = await api.delete(`${ROUTE.MEMBERSHIP_PLAN.DELETE}/${id}`);
  return response.data;
}
