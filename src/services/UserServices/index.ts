import { AxiosError } from "axios";
import { api } from "../api";

export const GetUser = async (id: number, token: string) => {
  try {
    const response = await api.get(`/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};
