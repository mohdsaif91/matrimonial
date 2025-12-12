import { ReligionProps } from "../types/religion.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addSubCasteAPI(relData: ReligionProps) {
  const response = await api.post(ROUTE.SUB_CASTE.ADD, { ...relData });
  return response.data;
}

export async function fetchSubCasteAPI() {
  const response = await api.get(ROUTE.SUB_CASTE.GET);
  return response.data;
}

export async function updateSubCasteAPI(data: ReligionProps) {
  const { name, status, id, religion_id } = data;
  const response = await api.put(`${ROUTE.SUB_CASTE.UPDATE}/${id}`, {
    name,
    status,
    religion_id,
  });
  return response.data;
}

export async function deleteSubCasteAPI(id: number) {
  const response = await api.delete(`${ROUTE.SUB_CASTE.DELETE}/${id}`);
  return response.data;
}
