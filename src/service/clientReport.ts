import { buildQueryParams } from "../util/ClientUtils";
import api from "./axios";
import { ROUTE } from "./route";

export async function getClientReportById(filter: any) {
  const { profile_id, ...restProps } = filter;
  const url = buildQueryParams(restProps);
  console.log(url, " <>? ");

  const response = await api.get(
    `${ROUTE.CLIENT_REPORT.GET}/${profile_id}${url !== "" ? `&${url}` : ""}`
  );
  return response.data;
}
