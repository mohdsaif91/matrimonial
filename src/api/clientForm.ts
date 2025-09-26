import { ClientFormItem } from "../types/form";
import api from "./axios";
import { ROUTE } from "./route";

export async function addFormItem(formItem: ClientFormItem) {
  const response = await api.post(ROUTE.ADD_FORM_ITEM.POST, { ...formItem });
  return response.data;
}

export async function fetchFormItem() {
  const response = await api.get(ROUTE.ADD_FORM_ITEM.GET);
  return response.data;
}

export async function fetchFormItemById(id: number) {
  const response = await api.get(`${ROUTE.ADD_FORM_ITEM.GET}/${id}`);
  return response.data;
}

export async function updateFormItem(data: ClientFormItem) {
  const { name, status, id } = data;
  const response = await api.put(`${ROUTE.ADD_FORM_ITEM.UPDATE}/${id}`, {
    name,
    status,
  });
  return response.data;
}

export async function deleteFormItem(id: number) {
  const response = await api.delete(`${ROUTE.ADD_FORM_ITEM.DELETE}/${id}`);
  return response.data;
}
