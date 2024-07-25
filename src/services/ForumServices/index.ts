import { AxiosError } from "axios";
import { api } from "../api";
import { CategoryEnum, ForumInterface } from "../Types/forumTypes";

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

export const GetPostById = async (id: number) => {
  try {
    const response = await api.get(`/post/${id}`);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const getPostsByCategory = async (category: CategoryEnum) => {
  try {
    const response = await api.get(`/post/category/${category}`);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const createPost = async (data: ForumInterface, token: string) => {
  try {
    const response = await api.post("/post", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};
