import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const api: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
