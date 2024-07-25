import { AxiosError } from "axios";
import { api } from "../api";
import { CommentInterface } from "../Types/commentType";

export const GetCommentsByPost = async (postId: number) => {
  try {
    const response = await api.get(`/comment/post/${postId}`);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const PostComment = async (data: CommentInterface) => {
  try {
    const response = await api.post("/comment", data);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const editComment = async (id: number, body: string) => {
  try {
    const response = await api.put(`/comment/${id}`, { body });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const likeAnswer = async (id: number) => {
  try {
    const response = await api.patch(`/comment/${id}/like`);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};
