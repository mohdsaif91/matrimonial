import { ManageUserProps } from "../types/manageUser";
import api from "./axios";
import { ROUTE } from "./route";

export async function addManageUserAPI(relData: ManageUserProps) {
  const response = await api.post(ROUTE.MANAGE_USER.ADD, { ...relData });
  return response.data;
}

export async function fetchManageUserAPI() {
  const response = await api.get(ROUTE.MANAGE_USER.GET);
  return response.data;
}

export async function updateManageUserAPI(data: ManageUserProps) {
  const {
    name,
    status,
    id,
    email,
    gender,
    password,
    password_confirmation,
    phone,
    role_id,
  } = data;
  const response = await api.put(`${ROUTE.MANAGE_USER.UPDATE}/${id}`, {
    name,
    status,
    email,
    gender,
    password,
    password_confirmation,
    phone,
    role_id,
  });
  return response.data;
}

export async function deleteManageUserAPI(id: number) {
  const response = await api.delete(`${ROUTE.MANAGE_USER.DELETE}/${id}`);
  return response.data;
}
