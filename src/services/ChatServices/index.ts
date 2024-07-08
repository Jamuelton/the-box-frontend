import axios, { AxiosError } from "axios";

export const SendMesageBot = async (question: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_CHAT_URL}/query`,
      {
        question: question,
      }
    );
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};
