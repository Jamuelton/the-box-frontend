import { AxiosError } from "axios";
import { api } from "../api";

export const getEstablishment = async () => {
  try {
    const response = await api.get("/establishment");
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const getEstablishmentById = async (id: number) => {
    try {
      const response = await api.get(`/establishment/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar estabelecimento:", error);
      throw error;
    }
  };