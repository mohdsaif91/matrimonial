import { ShortListProps } from "../types/shortList.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addShortList(relData: ShortListProps) {
  const response = await api.post(ROUTE.SHORT_LIST.ADD, { ...relData });
  return response.data;
}

export async function fetchShortList(status: string) {
  const response = await api.get(`${ROUTE.SHORT_LIST.GET}/${status}`);
  return response.data;
}

export async function getPendingRequestByClientId(
  clientId: any,
  status: string | null
) {
  const response = await api.get(
    `${ROUTE.SHORT_LIST.GET}/client/${clientId}?status=${status}`
  );
  return response.data;
}

export async function approveShortlist(obj: {
  status: string;
  shortlist_id: string;
}) {
  const response = await api.put(`${ROUTE.SHORT_LIST.APPROVE_REJECT}`, {
    ...obj,
  });
  return response.data;
}
export async function rejectShortlist() {}

export async function updateShortList(data: ShortListProps) {
  //   const { name, status, country_id, id } = data;
  //   const response = await api.put(`${ROUTE.SHORT_LIST.UPDATE}/${id}`, {
  //     name,
  //     status,
  //     country_id,
  //   });
  //   return response.data;
}

export async function deleteShortList(id: number) {
  const response = await api.delete(`${ROUTE.SHORT_LIST.DELETE}/${id}`);
  return response.data;
}
