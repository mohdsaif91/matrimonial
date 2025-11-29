import { TaskFollowUpProps } from "../types/taskFollowUp.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addTaskFollowUp(data: TaskFollowUpProps) {
  const response = await api.post(ROUTE.TASK_FOLLOW_UP.ADD, { ...data });
  return response.data;
}

export async function fetchTaskFollowUp() {
  const response = await api.get(ROUTE.TASK_FOLLOW_UP.GET);
  return response.data;
}

export async function updateTaskFollowUp(data: TaskFollowUpProps) {
  const { id, ...resprops } = data;
  const response = await api.put(`${ROUTE.TASK_FOLLOW_UP.PUT}/${id}`, {
    ...resprops,
  });
  return response.data;
}

export async function deleteTaskFollowUp(id: number) {
  const response = await api.delete(`${ROUTE.TASK_FOLLOW_UP.DELETE}/${id}`);
  return response.data;
}

export async function fetchSubCasteByRelIdAPI(id: number) {
  const response = await api.delete(`${ROUTE.TASK_FOLLOW_UP.GET}/${id}`);
  return response.data;
}
