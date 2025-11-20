import { WhatsAppProviderProps } from "../types/whatsAppProvider.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addWhatsAppProvider(relData: WhatsAppProviderProps) {
  const response = await api.post(ROUTE.WHATSAPP_PROVIDER.ADD, { ...relData });
  return response.data;
}

export async function fetchWhatsAppProvider() {
  const response = await api.get(ROUTE.WHATSAPP_PROVIDER.GET);
  return response.data;
}

export async function updateWhatsAppProvider(data: WhatsAppProviderProps) {
  const { base_url, base_url_with_file, name, status, id } = data;
  const response = await api.put(`${ROUTE.WHATSAPP_PROVIDER.UPDATE}/${id}`, {
    base_url,
    base_url_with_file,
    name,
    status,
  });
  return response.data;
}

export async function deleteWhatsAppProvider(id: number) {
  const response = await api.delete(`${ROUTE.WHATSAPP_PROVIDER.DELETE}/${id}`);
  return response.data;
}
