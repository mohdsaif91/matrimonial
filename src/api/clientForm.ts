import { ClientFormItem } from "../types/form";
import api from "./axios";
import { ROUTE } from "./route";

export async function addFormItem(formItem: ClientFormItem) {
  const response = await api.post(ROUTE.ADD_FORM_ITEM, { ...formItem });
  return response.data;
}
