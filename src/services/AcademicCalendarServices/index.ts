import axios from 'axios';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';
import { CreateSchedule, Schedule, CreateEventSchedule, EventSchedule, CreateEvent, EventData } from '../Types/eventType';

const token = Cookies.get('token'); 

const api = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

export const getSchedule = async (): Promise<Schedule[]> => {
  try {
    const response = await api.get('/schedule');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
    throw error;
  }
};

export const getScheduleById = async (id: number): Promise<Schedule> => {
  try {
    const response = await api.get(`/schedule/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
    throw error;
  }
}

export const createEventSchedule = async (data: CreateEventSchedule): Promise<EventSchedule> => {
  try {
    const response = await api.post('/eventSchedule', data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
    throw error;
  }
};

export const getEventSchedule = async (): Promise<EventSchedule[]> => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.get("/eventSchedule", config);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
    throw error; 
  }
};

export const createEvent = async (data: CreateEvent): Promise<EventData> => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.post("/event", data, config);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
    throw error;
  }
};


export const getEvents = async (): Promise<EventData[]> => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.get("/event", config);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
    throw error; 
  }
}

export const getEventsbyId = async (id: number): Promise<EventData> => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.get(`/event/${id}`, config);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
    throw error; 
  }
};


  