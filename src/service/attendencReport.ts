import api from "./axios";
import { ROUTE } from "./route";

export async function getAttendenceReport(data: string) {
  let additionalUrl = "";
  const response = await api.get(`${ROUTE.ATTENDANC_REPORT.GET}?year=${data}`);
  return response.data;
}
