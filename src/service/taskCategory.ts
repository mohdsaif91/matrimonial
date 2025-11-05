import { LeadStatusProps } from "../types/leadStatus.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addTaskCategory(data: LeadStatusProps) {
  const response = await api.post(ROUTE.TASK_CATEGORY.ADD, { ...data });
  return response.data;
}

export async function fetchTaskCategory() {
  const response = await api.get(ROUTE.TASK_CATEGORY.GET);
  return response.data;
}

export async function updateTaskCategory(data: LeadStatusProps) {
  const { status, id, name } = data;
  const response = await api.put(`${ROUTE.TASK_CATEGORY.UPDATE}/${id}`, {
    status,
    name,
  });
  return response.data;
}

export async function deleteTaskCategory(id: number) {
  const response = await api.delete(`${ROUTE.TASK_CATEGORY.DELETE}/${id}`);
  return response.data;
}
