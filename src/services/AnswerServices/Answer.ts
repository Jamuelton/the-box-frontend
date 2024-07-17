import axios from 'axios';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';

const token = Cookies.get('token'); 

const api = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

export const likeAnswer = async (id: string): Promise<void> => {
  try {
    await api.patch(`/comment/${id}/like`);
  } catch (error) {
    handleServiceError(error);
  }
};

export const editComment = async (id: string, body: string): Promise<void> => {
  try {
    await api.put(`/comment/${id}`, { body });
  } catch (error) {
    handleServiceError(error);
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
