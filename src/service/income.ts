import { IncomeProps } from "../types/income.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addIncome(data: IncomeProps) {
  const response = await api.post(ROUTE.INCOME.ADD, { ...data });
  return response.data;
}

export async function fetchIncome() {
  const response = await api.get(ROUTE.INCOME.GET);
  return response.data;
}

export async function updateIncome(data: IncomeProps) {
  const { status, id, amount, type } = data;
  const response = await api.put(`${ROUTE.INCOME.UPDATE}/${id}`, {
    status,
    amount,
    type,
  });
  return response.data;
}

export async function deleteIncome(id: number) {
  const response = await api.delete(`${ROUTE.INCOME.DELETE}/${id}`);
  return response.data;
}

export async function fetchSubCasteByRelIdAPI(id: number) {
  const response = await api.delete(`${ROUTE.INCOME.GET}/${id}`);
  return response.data;
}
