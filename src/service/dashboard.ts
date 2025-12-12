import api from "./axios";
import { ROUTE } from "./route";

export async function getDashboard() {
  const response = await api.get(ROUTE.DASHBOARD.GET);
  return response.data;
}
