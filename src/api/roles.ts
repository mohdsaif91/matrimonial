import api from "./axios";
import { ROUTE } from "./route";

export const getPermissionData = async () => {
  const response = await api.get(ROUTE.PERMISSION.GET);
  return response.data;
};
