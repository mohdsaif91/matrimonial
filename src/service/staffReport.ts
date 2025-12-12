import api from "./axios";
import { ROUTE } from "./route";
import { buildQueryParams } from "../util/ClientUtils";

export async function fetchStaffReport(filter: any) {
  const fixedUrl = ROUTE.STAFF_REPORT.GET;
  let url = "";
  if (filter) {
    url = `${fixedUrl}?${buildQueryParams(filter)}`;
  } else {
    url = fixedUrl;
  }
  const response = await api.get(`${url}`);
  return response.data;
}
