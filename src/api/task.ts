import { LeadStatusProps } from "../types/leadStatus";
import { TaskProps } from "../types/task";
import api from "./axios";
import { ROUTE } from "./route";

export async function addTask(data: TaskProps) {
  const response = await api.post(ROUTE.TASK.ADD, { ...data });
  return response.data;
}

export async function fetchTask() {
  const response = await api.get(ROUTE.TASK.GET);
  return response.data;
}

export async function updateTask(data: TaskProps) {
  const { id, title, task_category_id, assigned_to, scheduled_on, priority } =
    data;

  const response = await api.put(`${ROUTE.TASK.UPDATE}/${id}`, {
    title,
    task_category_id,
    assigned_to,
    scheduled_on,
    priority,
  });
  return response.data;
}

export async function deleteTask(id: number) {
  const response = await api.delete(`${ROUTE.TASK.DELETE}/${id}`);
  return response.data;
}
