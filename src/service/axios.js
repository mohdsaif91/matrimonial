import axios from "axios";
import { BASE_URL } from "./constants";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (!err.response) {
      if (!window.navigator.onLine) {
        console.error("No internet connection detected.");
        // ✅ Option 1: Show custom offline page
        window.location.href = "/noInternet";
      } else {
        console.error("Network error, but internet seems fine:", err.message);
      }
      return Promise.reject(err);
    }

    if (err.response?.status === 401) {
      localStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");

      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default api;
