import { EmailTemplateProps } from "../types/emailTemplate.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addEmailtemplate(relData: EmailTemplateProps) {
  const response = await api.post(ROUTE.EMAIL_TEMPLATE.ADD, { ...relData });
  return response.data;
}

export async function fetchEmailtemplate() {
  const response = await api.get(ROUTE.EMAIL_TEMPLATE.GET);
  return response.data;
}

export async function updateEmailtemplate(data: EmailTemplateProps) {
  const { id, ...restProps } = data;
  const response = await api.put(`${ROUTE.EMAIL_TEMPLATE.PUT}/${id}`, {
    ...restProps,
  });
  return response.data;
}

export async function deleteEmailtemplate(id: number) {
  const response = await api.delete(`${ROUTE.EMAIL_TEMPLATE.DELETE}/${id}`);
  return response.data;
}
