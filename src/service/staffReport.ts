import moment from "moment";
import api from "./axios";
import { ROUTE } from "./route";

export async function fetchStaffReport(filter: {
  day: string;
  fromDate: string | Date;
  toDate: string | Date;
}) {
  const fixedUrl = ROUTE.STAFF_REPORT.GET;
  let url = "";
  let urlFormDate = "";
  let urlToDate = "";
  if (filter.day && filter.day !== "") {
    url = `/filter=${filter.day}`;
  }
  if (filter.fromDate && filter.fromDate !== "") {
    urlFormDate = `/start_date=${moment(filter.fromDate).format("YYYY/MM/DD")}`;
  }

  if (filter.toDate && filter.toDate !== "") {
    urlToDate = `/to_date=${moment(filter.toDate).format("YYYY/MM/DD")}`;
  }
  const response = await api.get(`${fixedUrl}${url}${urlFormDate}${urlToDate}`);
  return response.data;
}
