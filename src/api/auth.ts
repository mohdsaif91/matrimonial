import { Login } from "../types/auth";
import api from "./axios";
import { ROUTE } from "./route";

export async function loginApi(credentials: Login) {
  const formData = new FormData();
  formData.append("email", credentials.email);
  formData.append("password", credentials.password);
  const response = await api.post(ROUTE.LOGIN_ROUTE, { ...credentials });
  return response.data;
}
