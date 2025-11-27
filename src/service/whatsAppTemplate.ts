import { WhatsApptemplateProps } from "../types/whatsAppTemplate.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addWhatsAppTemplate(relData: WhatsApptemplateProps) {
  const response = await api.post(ROUTE.WHATSAPP_TEMPLATE.ADD, { ...relData });
  return response.data;
}

export async function fetchWhatsAppTemplate() {
  const response = await api.get(ROUTE.WHATSAPP_TEMPLATE.GET);
  return response.data;
}

export async function updateWhatsAppTemplate(data: WhatsApptemplateProps) {
  const { id, ...restProps } = data;
  const response = await api.put(`${ROUTE.WHATSAPP_TEMPLATE.PUT}/${id}`, {
    ...restProps,
  });
  return response.data;
}

export async function deleteWhatsAppTemplate(id: number) {
  const response = await api.delete(`${ROUTE.WHATSAPP_TEMPLATE.DELETE}/${id}`);
  return response.data;
}
