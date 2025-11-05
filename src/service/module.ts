import { ModuleProps, UpdateModuleProps } from "../types/module.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addModuleAPI(module: ModuleProps) {
  const response = await api.post(ROUTE.MODULE.ADD, { ...module });
  return response.data;
}

export async function fetchModule() {
  const response = await api.get(ROUTE.MODULE.GET);
  return response.data;
}

export async function fetchModuleById(id: number) {
  const response = await api.get(`${ROUTE.MODULE.GET}/${id}`);
  return response.data;
}

export async function updatemoduleAPI(data: UpdateModuleProps) {
  const { id, name, permission, slug } = data;
  const response = await api.put(`${ROUTE.MODULE.UPDATE}/${id}`, {
    name,
    permission,
    slug,
  });
  return response.data;
}

export async function deleteModuleAPI(id: number) {
  const response = await api.delete(`${ROUTE.MODULE.DELETE}/${id}`);
  return response.data;
}
