import { AxiosError } from "axios";
import { api } from "../api";
import { UserInterface } from "../Types/userType";

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

export const PutUser = async (
  id: number,
  token: string,
  data: UserInterface
) => {
  try {
    const response = await api.put(`/user/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};
