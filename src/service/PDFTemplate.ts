import { PDFTemplateProps } from "../types/pdfTemplate.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addPDFTemplate(relData: PDFTemplateProps) {
  const response = await api.post(ROUTE.PDF_TEMPLATE.ADD, { ...relData });
  return response.data;
}

export async function fetchPDFTemplate() {
  const response = await api.get(ROUTE.PDF_TEMPLATE.GET);
  return response.data;
}

export async function updatePDFTemplate(data: PDFTemplateProps) {
  const { id, ...restProps } = data;
  const response = await api.put(`${ROUTE.PDF_TEMPLATE.PUT}/${id}`, {
    ...restProps,
  });
  return response.data;
}

export async function deletePDFTemplate(id: number) {
  const response = await api.delete(`${ROUTE.PDF_TEMPLATE.DELETE}/${id}`);
  return response.data;
}
