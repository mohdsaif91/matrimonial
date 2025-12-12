import { WhatsAppKeyProps } from "../types/whatsAppKey.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addWhatsAppKey(relData: WhatsAppKeyProps) {
  const response = await api.post(ROUTE.WHATSAPP_KEY.ADD, { ...relData });
  return response.data;
}

export async function fetchWhatsAppKey() {
  const response = await api.get(ROUTE.WHATSAPP_KEY.GET);
  return response.data;
}

export async function updateWhatsAppKey(data: WhatsAppKeyProps) {
  const {
    assigned_id,
    assigned_type,
    config,
    phone_number,
    token,
    whatsapp_provider,
    name,
    status,
    id,
  } = data;
  const response = await api.put(`${ROUTE.WHATSAPP_KEY.UPDATE}/${id}`, {
    assigned_id,
    assigned_type,
    config,
    phone_number,
    token,
    whatsapp_provider,
    name,
    status,
  });
  return response.data;
}

export async function deleteWhatsAppKey(id: number) {
  const response = await api.delete(`${ROUTE.WHATSAPP_KEY.DELETE}/${id}`);
  return response.data;
}
