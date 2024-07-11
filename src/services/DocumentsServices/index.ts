import { AxiosError } from "axios";
import { api } from "../api";
import { DocumentsInterface } from "../Types/documentsTypes";

export const getMaterial = async (token: string) => {
  try {
    const response = await api.get("/materialDidatico", {
      headers: { Authorization: "Bearer " + `${token}` },
    });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const postMaterial = async (data: DocumentsInterface, token: string) => {
  try {
    const response = await api.post("/materialDidatico", data, {
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
      const response = await api.post(`/materialUploadUrl?fileType=${fileType}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response;
      }
      throw error;
    }
  };
