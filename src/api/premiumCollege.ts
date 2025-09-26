import { CountryProps } from "../types/country";
import api from "./axios";
import { ROUTE } from "./route";

export async function addPremiumCollege(relData: CountryProps) {
  const response = await api.post(ROUTE.PREMIUM_COLLEGE.ADD, { ...relData });
  return response.data;
}

export async function fetchPremiumCollege() {
  const response = await api.get(ROUTE.PREMIUM_COLLEGE.GET);
  return response.data;
}

export async function updatePremiumCollege(data: CountryProps) {
  const { name, status, id } = data;
  const response = await api.put(`${ROUTE.PREMIUM_COLLEGE.UPDATE}/${id}`, {
    name,
    status,
  });
  return response.data;
}

export async function deletePremiumCollege(id: number) {
  const response = await api.delete(`${ROUTE.PREMIUM_COLLEGE.DELETE}/${id}`);
  return response.data;
}
