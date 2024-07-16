export interface ScheduleData {
  title: string;
  date: Date[];
  start_time: Date;
  end_time: Date;
  lab_id: number;
  user_id?: string;
}

export interface OtherScheduleData {
  title: string;
  date: Date;
  start_time: Date;
  end_time: Date;
  lab_id: number;
  user_id?: string;
}

export interface Labs {
  id: number;
  code: string;
  name: string;
}
