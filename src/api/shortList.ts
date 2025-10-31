import { ShortListProps } from "../types/shortList";
import api from "./axios";
import { ROUTE } from "./route";

export async function addShortList(relData: ShortListProps) {
  const response = await api.post(ROUTE.SHORT_LIST.ADD, { ...relData });
  return response.data;
}

export async function fetchShortList(status: string) {
  const response = await api.get(`${ROUTE.SHORT_LIST.GET}/${status}`);
  return response.data;
}

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
