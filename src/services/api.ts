import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
