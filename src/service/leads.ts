import { LeadProps, LeadsProps } from "../types/leads.js";
import { buildQueryParams } from "../util/ClientUtils.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addLead(data: LeadsProps) {
  const response = await api.post(ROUTE.LEAD.ADD, { ...data });
  return response.data;
}

export async function fetchLead(filter: any) {
  const queryString = buildQueryParams(filter);
  const url = queryString ? `${ROUTE.LEAD.GET}?${queryString}` : ROUTE.LEAD.GET;
  const response = await api.get(url);
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

export async function addLeadsFollowUp(data: LeadProps) {
  const response = await api.post(ROUTE.LEAD.ADD_FOLLOW_UP, { ...data });
  return response.data;
}

export async function fetchLeadsFollowUp() {
  const response = await api.get(ROUTE.LEAD.GET_FOLLOW_UP);
  return response.data;
}

export async function updateLeadsFollowUp(data: LeadProps) {
  const { id, ...resprops } = data;
  const response = await api.put(`${ROUTE.LEAD.UPDATE_FOLLOW_UP}/${id}`, {
    ...resprops,
  });
  return response.data;
}

export async function deleteLeadsFollowUp(id: number) {
  const response = await api.delete(`${ROUTE.LEAD.DELETE_FOLLOW_UP}/${id}`);
  return response.data;
}

export async function assigneLeads({
  selected,
  selectedAssignedTo,
}: {
  selected: any[];
  selectedAssignedTo: string;
}) {
  const sendObj = {
    lead_ids: selected,
    assign_to: selectedAssignedTo,
  };
  const response = await api.put(`${ROUTE.LEAD.ASSIGN_LEADS}`, { ...sendObj });
  return response.data;
}
