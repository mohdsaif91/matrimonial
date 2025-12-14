import { Login, ResetPasswordProps } from "../types/auth.js";
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

export async function getUserDataById(id: string) {
  const response = await api.get(`${ROUTE.MANAGE_USER.GET_USER_BY_ID}/${id}`);
  return response.data;
}

export async function receiveEmailForResetPassword(email: string) {
  const response = await api.post(`${ROUTE.FORGET_PASSWORD.F_P}`, { email });
  return response.data;
}

export async function resetPassword(data: ResetPasswordProps) {
  const response = await api.post(`${ROUTE.FORGET_PASSWORD.RESET_PASSWORD}`, {
    ...data,
  });
  return response.data;
}
