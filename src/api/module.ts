import { ModuleProps, UpdateModuleProps } from "../types/module";
import api from "./axios";
import { ROUTE } from "./route";

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
  console.log(data);
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
