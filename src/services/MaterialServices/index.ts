import { AxiosError } from "axios";
import { api } from "../api";
import { MaterialInterface } from "../Types/materialTypes";

export const getMaterial = async (token: string) => {
  try {
    const response = await api.get("/materialFormal", {
      headers: { Authorization: "Bearer " + `${token}` },
    });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const postMaterial = async (data: MaterialInterface, token: string) => {
  try {
    const response = await api.post("/materialFormal", data, {
      headers: { Authorization: "Bearer " + `${token}` },
    });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const putURL = async (token: string, fileType: string) => {
  try {
    const response = await api.post(`/materialUploadUrl?fileType=${fileType}`, {
      headers: { Authorization: "Bearer " + `${token}` },
    });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};
