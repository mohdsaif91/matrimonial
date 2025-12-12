import moment from "moment";
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
  const { id, ...restprops } = data;
  const response = await api.put(`${ROUTE.PAYMENT.PUT}/${id}`, {
    ...restprops,
  });
  return response.data;
}

export async function deletePayment({
  id,
  client_id,
}: {
  id: string;
  client_id: string;
}) {
  const response = await api.delete(`${ROUTE.PAYMENT.DELETE}/${id}`, {
    data: {
      client_id: parseInt(client_id),
    },
  });
  return response.data;
}

export async function fetchPaymentReport(filter) {
  let url = "";
  if (filter && filter !== "" && typeof filter === "string") {
    url = `date_filter=${filter}`;
  } else {
    if (filter.fromDate && filter.fromDate !== "") {
      url = `${url}&custom_start_date=${moment(filter.fromDate).format(
        "yyyy-MM-DD"
      )}&`;
    }
    if (filter.toDate && filter.toDate !== "") {
      url = `${url}&custom_end_date=${moment(filter.toDate).format(
        "yyyy-MM-DD"
      )}&`;
    }
  }
  const response = await api.get(`${ROUTE.PAYMENT.PAYMENT_REPORT}?${url}`);
  return response.data;
}
