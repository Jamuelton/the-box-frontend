import { AxiosError } from "axios";
import { api } from "../api";
import { AuthInterface } from "../Types/authType";

export const CreateUser = async (data: AuthInterface) => {
  try {
    const response = await api.post("/auth/register", data);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const LoginUser = async (data: AuthInterface) => {
  try {
    const response = await api.post("/auth/login", data);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};
