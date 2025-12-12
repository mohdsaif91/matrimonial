import { InteractionProps } from "../types/interaction.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addInteraction(data: InteractionProps) {
  const response = await api.post(ROUTE.INTERACTION.ADD, { ...data });
  return response.data;
}

export async function fetchInteraction() {
  const response = await api.get(ROUTE.INTERACTION.GET);
  return response.data;
}

export async function updateInteraction(data: InteractionProps) {
  const { id, interactable_type, interaction_with_client, remarks } = data;
  const response = await api.put(`${ROUTE.INTERACTION.PUT}/${id}`, {
    interactable_type,
    interaction_with_client,
    remarks,
  });
  return response.data;
}

export async function deleteInteraction(id: number) {
  const response = await api.delete(`${ROUTE.INTERACTION.DELETE}/${id}`);
  return response.data;
}

export async function fetchSubCasteByRelIdAPI(id: number) {
  const response = await api.delete(`${ROUTE.INTERACTION.GET}/${id}`);
  return response.data;
}
