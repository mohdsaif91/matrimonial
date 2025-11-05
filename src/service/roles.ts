import { RoleProps } from "../types/roles.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export const getPermissionData = async () => {
  const response = await api.get(ROUTE.PERMISSION.GET);
  return response.data;
};

export async function addRole(roleData: RoleProps) {
  const response = await api.post(ROUTE.ROLE.ADD, { ...roleData });
  return response.data;
}

export async function fetchRole() {
  const response = await api.get(ROUTE.ROLE.GET);
  return response.data;
}

export async function updateRole(roleData: RoleProps) {
  const { name, status, id, permissions, role_for } = roleData;
  const response = await api.put(`${ROUTE.ROLE.UPDATE}/${id}`, {
    name,
    status,
    permissions,
    role_for,
  });
  return response.data;
}

export async function deleteRole(id: string) {
  const response = await api.delete(`${ROUTE.ROLE.DELETE}/${id}`);
  return response.data;
}
