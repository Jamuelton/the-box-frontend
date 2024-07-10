import { AxiosError } from "axios";
import { api } from "../api";
import Cookies from "js-cookie";
type CreateLabSchedule = {
  start_time: Date;
  end_time: Date;
  date: Date[];
  lab_id: number;
  user_id: string;
};

export interface schedules {
  id: number;
  schedule: CreateLabSchedule[];
}
[];

interface requestLab {
  id: number;
  start_time: Date;
  end_time: Date;
  date: Date;
  user_id: number;
  lab_id: number;
}

export const createNewLabEvent = async (data: CreateLabSchedule) => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer: ${token}` },
    };

    const { start_time, end_time, date, lab_id, user_id } = data;

    const newEvent = {
      start_time: start_time,
      end_time: end_time,
      date: date[0],
      lab_id: lab_id,
      user_id: parseInt(user_id),
    };

    console.log(newEvent);
    const response = await api.post("/labschedules", newEvent, config);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const getLabSchedule = async () => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.get("/labschedules", config);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};
