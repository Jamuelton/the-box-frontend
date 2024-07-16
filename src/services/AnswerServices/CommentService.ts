import axios from 'axios';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';
import { IAnswer } from '../../components/Answer/interfaces';

const token = Cookies.get('token'); 

const api = axios.create({
  baseURL: 'http://localhost:3000/', 
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

export const fetchComments = async (postId: number): Promise<IAnswer[]> => {
  try {
    const response = await api.get(`/comment/post/${postId}`);
    return response.data.comments as IAnswer[];
  } catch (error) {
    handleServiceError(error);
    return [];
  }
};

const handleServiceError = (error: AxiosError): void => {
  if (error.response) {
    console.error('Request failed with status:', error.response.status);
  } else if (error.request) {
    console.error('Request failed:', error.request);
  } else {
    console.error('Request error:', error.message);
  }
};
