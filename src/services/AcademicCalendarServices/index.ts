import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { CreateEventSchedule, CreateEvent } from "../Types/eventType";
import { api } from "../api";

export const getSchedule = async () => {
  try {
    const response = await api.get("/schedule");
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const getScheduleById = async (id: number) => {
  try {
    const response = await api.get(`/schedule/${id}`);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const createEventSchedule = async (data: CreateEventSchedule) => {
  try {
    const response = await api.post("/eventSchedule", data);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const getEventSchedule = async () => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.get("/eventSchedule", config);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const createEvent = async (data: CreateEvent) => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.post("/event", data, config);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const getEvents = async () => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.get("/event", config);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const getEventsbyId = async (id: number) => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.get(`/event/${id}`, config);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};
