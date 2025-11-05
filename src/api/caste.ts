import { ReligionProps } from "../types/religion.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addCasteAPI(relData: ReligionProps) {
  const response = await api.post(ROUTE.CASTE.ADD, { ...relData });
  return response.data;
}

export async function fetchCasteAPI() {
  const response = await api.get(ROUTE.CASTE.GET);
  return response.data;
}

export async function updateCasteAPI(data: ReligionProps) {
  const { name, status, id, religion_id } = data;
  const response = await api.put(`${ROUTE.CASTE.UPDATE}/${id}`, {
    name,
    status,
    religion_id,
  });
  return response.data;
}

export async function deleteCasteAPI(id: number) {
  const response = await api.delete(`${ROUTE.CASTE.DELETE}/${id}`);
  return response.data;
}

export async function fetchSubCasteByRelIdAPI(id: number) {
  const response = await api.delete(`${ROUTE.CASTE.GET}/${id}`);
  return response.data;
}
