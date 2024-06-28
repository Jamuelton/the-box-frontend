import { AxiosError } from "axios";
import { api } from "../api";
import { ForumInterface } from "../Types/forumTypes";

export const getPosts = async () => {
  try {
    const response = await api.get("/post");
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const createPost = async (data: ForumInterface) => {
  try {
    const response = await api.post("/post", data);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};
