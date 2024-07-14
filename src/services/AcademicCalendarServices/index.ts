import axios from 'axios';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';
import { EventData } from '../Types/eventType';

const token = Cookies.get('token'); 

const api = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

export const createEvent = async (event: EventData): Promise<void> => {
  try {
    await api.post('/event', event);
  } catch (error) {
    handleServiceError(error);
  }
}

export const updateEvent = async (id: string, body: string): Promise<void> => {
    try {
        await api.put(`/event/${id}`, { body });
    } catch (error) {
        handleServiceError(error);
    }
};

export const deleteEvent = async (id: number): Promise<void> => {
  try {
    await api.delete(`/event/${id}`);
  } catch (error) {
    handleServiceError(error);
  }
}

export const getEvents = async () => {
  try {
    const response = await api.get('/event');
    return response.data;
  } catch (error) {
    handleServiceError(error);
  }
}

const handleServiceError = (error: AxiosError): void => {
    if (error.response) {
      console.error('Request failed with status:', error.response.status);
    } else if (error.request) {
      console.error('Request failed:', error.request);
    } else {
      console.error('Request error:', error.message);
    }
  };
  