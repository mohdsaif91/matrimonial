import { Login } from "../types/auth.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function loginApi(credentials: Login) {
  const formData = new FormData();
  formData.append("email", credentials.email);
  formData.append("password", credentials.password);
  const response = await api.post(ROUTE.LOGIN_ROUTE, { ...credentials });
  return response.data;
}

export async function markAttendenceCheckIN() {
  const response = await api.post(ROUTE.MARK_ATTENDENC.CHECK_IN);
  return response.data;
}

export async function markAttendenceCheckOut() {
  const response = await api.post(ROUTE.MARK_ATTENDENC.CHECK_OUT);
  return response.data;
}
