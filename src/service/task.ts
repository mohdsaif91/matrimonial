import moment from "moment";
import { TaskProps } from "../types/task.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addTask(data: TaskProps) {
  const response = await api.post(ROUTE.TASK.ADD, { ...data });
  return response.data;
}
// category_id: "",
//   task_priority: "",
//   assign_to: "",
//   scheduled_date_from: "",
//   scheduled_date_to: "",
export async function fetchTask(filter) {
  let url = "?";
  if (filter.category_id !== "" && filter.category_id) {
    url = `${url}category_id=${filter.category_id}&`;
  }
  if (filter.task_priority !== "" && filter.task_priority) {
    url = `${url}task_priority=${filter.task_priority}&`;
  }
  if (filter.assign_to !== "" && filter.assign_to) {
    url = `${url}assign_to=${filter.assign_to}&`;
  }
  if (filter.scheduled_date_from !== "" && filter.scheduled_date_from) {
    url = `${url}scheduled_date_from=${moment(
      filter.scheduled_date_from
    ).format("YYYY-MM-DD")}&`;
  }
  if (filter.scheduled_date_to !== "" && filter.scheduled_date_to) {
    url = `${url}scheduled_date_to=${moment(filter.scheduled_date_to).format(
      "YYYY-MM-DD"
    )}&`;
  }
  const response = await api.get(`${ROUTE.TASK.GET}${url}`);
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

export async function fetchTaskByClientId(filter, clientID) {
  let url = "";
  if (filter.category_id !== "" && filter.category_id) {
    url = `${url}category_id=${filter.category_id}&`;
  }
  if (filter.task_priority !== "" && filter.task_priority) {
    url = `${url}task_priority=${filter.task_priority}&`;
  }
  if (filter.assign_to !== "" && filter.assign_to) {
    url = `${url}assign_to=${filter.assign_to}&`;
  }
  if (filter.scheduled_date_from !== "" && filter.scheduled_date_from) {
    url = `${url}scheduled_date_from=${moment(
      filter.scheduled_date_from
    ).format("YYYY-MM-DD")}&`;
  }
  if (filter.scheduled_date_to !== "" && filter.scheduled_date_to) {
    url = `${url}scheduled_date_to=${moment(filter.scheduled_date_to).format(
      "YYYY-MM-DD"
    )}&`;
  }
  const response = await api.get(`${ROUTE.TASK.GET}?client=${clientID}&${url}`);
  return response.data;
}
