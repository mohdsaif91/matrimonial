import api from "./axios.js";
import { ROUTE } from "./route.js";

export const fetchPhotoAndBio = async (id: string) => {
  const response = await api.get(`${ROUTE.CLIENTS.IMAGEPOST}/${id}`);
  return response.data;
};

export const deletePhotoAndBio = async (id: string) => {
  const response = await api.delete(`${ROUTE.CLIENTS.IMAGEPOST}/${id}`);
  return response.data;
};
