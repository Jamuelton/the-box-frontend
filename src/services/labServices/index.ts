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
    console.log(data);
    const { start_time, end_time, date, lab_id, user_id } = data;

    const newEvent: requestLab = {
      start_time: start_time,
      end_time: end_time,
      date: date[0],
      lab_id: lab_id,
      user_id: parseInt(user_id),
    };

    const response = await api.post("/labschedules", newEvent, config);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const getLabSchedule = async (lab: number) => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.get(`/lab/${lab}/schedules`, config);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const getLabs = async () => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.get("/labs", config);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};
