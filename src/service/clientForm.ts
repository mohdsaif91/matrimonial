import { ClientFormItem } from "../types/form.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

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
  const {
    status,
    client_module_id,
    display_name,
    div_css,
    field_name,
    field_type,
    required,
    validation,
    view_in_pdf,
    id,
    show_in_advance_search,
    show_in_common,
  } = data;
  const response = await api.put(`${ROUTE.ADD_FORM_ITEM.UPDATE}/${id}`, {
    status,
    client_module_id,
    display_name,
    div_css,
    field_name,
    field_type,
    required,
    validation,
    view_in_pdf,
    show_in_advance_search,
    show_in_common,
  });
  return response.data;
}

export async function deleteFormItem(id: number) {
  const response = await api.delete(`${ROUTE.ADD_FORM_ITEM.DELETE}/${id}`);
  return response.data;
}
