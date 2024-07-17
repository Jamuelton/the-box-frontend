export interface EventData{
  id: number;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  start_time: Date;
  end_time: Date;
  speakers: string;
}


export interface CreateSchedule {
  year: string;
  period: string;
}

export interface Schedule {
  id: number;
  year: string;
  period: string;
}

export interface CreateEventSchedule {
  event_id: number;
  schedule_id: number;
}

export interface EventSchedule {
  id: number;
  event_id: number;
  schedule_id: number;
}

export interface CreateEvent {
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  start_time: Date;
  end_time: Date;
  speakers: string;
  schedule_id?: number;
}
