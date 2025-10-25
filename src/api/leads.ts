import { LeadsProps } from "../types/leads";
import api from "./axios";
import { ROUTE } from "./route";

export async function addLead(data: LeadsProps) {
  const response = await api.post(ROUTE.LEAD.ADD, { ...data });
  return response.data;
}

export async function fetchLead() {
  const response = await api.get(ROUTE.LEAD.GET);
  return response.data;
}

export async function updateLead(data: LeadsProps) {
  const {
    id,
    address,
    alternate_phone,
    assign_to,
    budget_from,
    budget_to,
    city_id,
    contact_person_name,
    country_id,
    email,
    lead_name,
    looking_for,
    other_details,
    phone,
    profile_source_id,
    relation_with_lead,
    state_id,
    status,
  } = data;

  const response = await api.put(`${ROUTE.LEAD.UPDATE}/${id}`, {
    address,
    alternate_phone,
    assign_to,
    budget_from,
    budget_to,
    city_id,
    contact_person_name,
    country_id,
    email,
    lead_name,
    looking_for,
    other_details,
    phone,
    profile_source_id,
    relation_with_lead,
    state_id,
    status,
  });
  return response.data;
}

export async function deleteLead(id: number) {
  const response = await api.delete(`${ROUTE.LEAD.DELETE}/${id}`);
  return response.data;
}
