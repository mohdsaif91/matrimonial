import { PaymentProps } from "../types/payment.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function fetchPayments() {
  const response = await api.get(ROUTE.PAYMENT.GET);
  return response.data;
}

export async function fetchPaymentByClientId(id: string) {
  const response = await api.get(`${ROUTE.PAYMENT.GET}/${id}`);
  return response.data;
}

export async function addPayment(data: PaymentProps) {
  const response = await api.post(`${ROUTE.PAYMENT.ADD}`, { ...data });
  return response.data;
}

export async function updatePayment(data: PaymentProps) {
  const response = await api.put(`${ROUTE.PAYMENT.PUT}`, { ...data });
  return response.data;
}
