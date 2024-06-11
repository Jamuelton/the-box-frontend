import { AxiosError } from "axios";
import { api } from "../api";
import { AuthInterface } from "../Types/AuthType";

export const CreateUser = async (data: AuthInterface) => {
  try {
    const response = await api.post("/user/auth", data);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const LoginUser = async (data: AuthInterface) => {
  try {
    const response = await api.post("/user/auth/login", data);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};
