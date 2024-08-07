import { AxiosError } from "axios";
import { api } from "../api";
import {
  CategoryMaterialEnum,
  MaterialInterface,
} from "../Types/materialTypes";

export const getMaterial = async (
  token: string,
  order?: string,
  category?: CategoryMaterialEnum
) => {
  try {
    if (category) {
      console.log(category.toString());
      const response = await api.get(
        `/materialFormal/?order=${order}&category=${category.toString()}`,
        {
          headers: { Authorization: "Bearer " + `${token}` },
        }
      );
      console.log(response);
      return response;
    }
    const response = await api.get(`/materialFormal/?order=${order}`, {
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
