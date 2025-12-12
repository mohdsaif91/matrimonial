import api from "./axios";
import { ROUTE } from "./route";

export async function getAttendenceReport(data: string) {
  const response = await api.get(`${ROUTE.ATTENDANC_REPORT.GET}?year=${data}`);
  return response.data;
}

export async function getLoggedInUser() {
  const response = await api.get(`${ROUTE.ATTENDANC_REPORT.LOGGED_IN_USER}`);
  return response.data;
}

export async function getLoggedOutUser() {
  const response = await api.get(`${ROUTE.ATTENDANC_REPORT.LOGGED_OUT_USER}`);
  return response.data;
}
