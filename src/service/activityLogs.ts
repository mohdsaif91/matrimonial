import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function fetchActivityLog() {
  const response = await api.get(`${ROUTE.ACTIVITY_LOG.GET}`);
  return response.data;
}

export async function fetchActivityLogById(id: string) {
  const response = await api.get(`${ROUTE.ACTIVITY_LOG.GET}/${id}`);
  return response.data;
}
