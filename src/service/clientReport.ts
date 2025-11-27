import api from "./axios";
import { ROUTE } from "./route";

export async function getClientReportById(id?: string, day?: string) {
  const response = await api.get(`${ROUTE.CLIENT_REPORT.GET}/${id}`);
  return response.data;
}
