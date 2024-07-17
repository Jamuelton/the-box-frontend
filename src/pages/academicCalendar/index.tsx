import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { EventModal } from "../../components/EventModal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  CustomCalendarContainer,
  MainDiv,
  DivButton,
  ButtonGroup,
  Div,
  Container,
  FormGroup,
} from "./styles";
import { Plus, CalendarPlus, Download } from "@phosphor-icons/react";
import { Title } from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { EventData, Schedule, EventSchedule } from "../../services/Types/eventType";
import { useData } from "../../config/data/UseData";
import { createEvent, getEvents, getSchedule, getEventSchedule, createEventSchedule } from "../../services/AcademicCalendarServices";

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

const messages = {
  date: "Data",
  time: "Hora",
  event: "Evento",
  allDay: "Dia Inteiro",
  week: "Semana",
  work_week: "Semana de Trabalho",
  day: "Dia",
  month: "Mês",
  previous: "Anterior",
  next: "Próximo",
  yesterday: "Ontem",
  tomorrow: "Amanhã",
  today: "Hoje",
  agenda: "Agenda",
  noEventsInRange: "Não há eventos nesta faixa de datas.",
  showMore: (total: number) => `+ Ver mais (${total})`,
};

const formats = {
  monthHeaderFormat: "MMMM YYYY",
  dayHeaderFormat: "dddd, DD/MM/YYYY",
  dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) => {
    const startDate = moment(start).format("DD MMMM");
    const endDate = moment(end).format("DD MMMM YYYY");
    return `${startDate} - ${endDate}`;
  },
  agendaDateFormat: "dddd, DD/MM/YYYY",
  timeGutterFormat: "HH:mm",
  dayFormat: "DD/MM/YYYY",
  dateFormat: "DD",
  monthFormat: "MMMM YYYY",
  agendaTimeFormat: "HH:mm",
};

const initialEventState: EventData = {
  id: 0,
  name: "",
  description: "",
  start_date: new Date(),
  end_date: new Date(),
  start_time: new Date(),
  end_time: new Date(),
  speakers: "",
};

export function AcademicCalendar() {
  const { userInfo } = useData();
  const navigate = useNavigate();

  const [eventsData, setEventsData] = useState<EventData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState<EventData>(initialEventState);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [eventSchedules, setEventSchedules] = useState<EventSchedule[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null);
  const [eventSchedule, setEventSchedule] = useState<number | null>(null);

  useEffect(() => {
    fetchEvents(); 
    fetchSchedules(); 
    fetchEventSchedules(); 
  }, []);

  const fetchEvents = async () => {
    try {
      const events = await getEvents();
      if (events) {
        setEventsData(
          events.map((event: EventData) => ({
            ...event,
            start_date: new Date(event.start_date),
            end_date: new Date(event.end_date),
            start_time: new Date(event.start_time),
            end_time: new Date(event.end_time),
            name: event.name,
            description: event.description,
            speakers: event.speakers,
          }))
        );
        console.log("Eventos carregados:", events); // Debug log
      }
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  const fetchSchedules = async () => {
    try {
      const schedules = await getSchedule();
      setSchedules(schedules);
    } catch (error) {
      console.error("Erro ao buscar schedules:", error);
    }
  };

  const fetchEventSchedules = async () => {
    try {
      const eventSchedules = await getEventSchedule();
      setEventSchedules(eventSchedules);
    } catch (error) {
      console.error("Erro ao buscar event schedules:", error);
    }
  };

  const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
    setNewEvent({
      ...newEvent,
      start_date: start,
      end_date: end,
      start_time: start,
      end_time: end,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const response = await createEvent(newEvent);
      if (response) {
        setEventsData([...eventsData, response]);
        if (eventSchedule) {
          await createEventSchedule({ event_id: response.id, schedule_id: eventSchedule });
        }
        setNewEvent(initialEventState);
        setEventSchedule(null);
        setShowModal(false);
      }
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, name: event.target.value });
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, description: event.target.value });
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, start_date: moment(event.target.value).toDate() });
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, end_date: moment(event.target.value).toDate() });
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    const updatedStartTime = moment(newEvent.start_time).toDate();
    updatedStartTime.setHours(hours, minutes);
    setNewEvent({ ...newEvent, start_time: updatedStartTime });
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    const updatedEndTime = moment(newEvent.end_time).toDate();
    updatedEndTime.setHours(hours, minutes);
    setNewEvent({ ...newEvent, end_time: updatedEndTime });
  };

  const handleSpeakersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, speakers: event.target.value });
  };

  const handleScheduleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSchedule(Number(event.target.value));
  };

  const calendarEvents = eventsData.filter((event) => {
    if (!selectedSchedule) return true;
    const eventMatchesSchedule = eventSchedules.some(
      (es) => es.event_id === event.id && es.schedule_id === selectedSchedule
    );
    console.log(`Evento ${event.id} corresponde ao schedule ${selectedSchedule}: ${eventMatchesSchedule}`);
    return eventMatchesSchedule;
  }).map((event) => {
    const eventStartDate = new Date(event.start_date);
    const eventEndDate = new Date(event.end_date);

    const startTimeComponents = new Date(event.start_time);
    const endTimeComponents = new Date(event.end_time);

    const startTime = new Date(eventStartDate);
    startTime.setUTCHours(
      startTimeComponents.getUTCHours(),
      startTimeComponents.getUTCMinutes(),
      startTimeComponents.getUTCSeconds()
    );

    const endTime = new Date(eventEndDate);
    endTime.setUTCHours(
      endTimeComponents.getUTCHours(),
      endTimeComponents.getUTCMinutes(),
      endTimeComponents.getUTCSeconds()
    );

    return {
      ...event,
      title: event.name,
      start: startTime,
      end: endTime,
    };
  });
  console.log("Eventos filtrados para o calendário:", calendarEvents);

  const handleSelectEvent = (event: EventData) => {
    setSelectedEvent(event);
    setShowModal(true);
    console.log("Evento selecionado:", event); // Debug log
  };

  return (
    <MainDiv>
      <Title text="Calendário Acadêmico" />
      <Container>
        <CustomCalendarContainer>
          <div>
            <label>Escolha o Schedule:</label>
            <select onChange={handleScheduleChange}>
              <option value="">Todos</option>
              {schedules.map((schedule) => (
                <option key={schedule.id} value={schedule.id}>
                  {schedule.year} - {schedule.period}
                </option>
              ))}
            </select>
          </div>
          <Div>
            <ButtonGroup>
              <Button
                color="#070F2B"
                icon={<Download size={24} />}
                secondColor="#7FC7D9"
                shape="round"
                size="small"
              />
              {userInfo?.profile === "SUPER_USER" && (
                <Button
                  color="#070F2B"
                  icon={<CalendarPlus size={24} />}
                  secondColor="#7FC7D9"
                  shape="round"
                  size="small"
                  buttonFunction={() => navigate("/add-calendar")}
                />
              )}
            </ButtonGroup>
            <DivButton>
              {userInfo?.profile === "SUPER_USER" && (
                <Button
                  color="#070F2B"
                  icon={<Plus size={24} />}
                  secondColor="#7FC7D9"
                  label="Adicionar Evento"
                  shape="round"
                  size="small"
                  buttonFunction={() => setShowModal(true)}
                />
              )}
            </DivButton>
          </Div>
          <Calendar
            views={["day", "week", "month"]}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={calendarEvents}
            style={{ height: "100vh" }}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelect}
            messages={messages}
            formats={formats}
          />
          <EventModal
            title={selectedEvent ? "Detalhes do Evento" : "Adicionar Novo Evento"}
            show={showModal}
            onClose={() => {
              setShowModal(false);
              setSelectedEvent(null);
            }}
            onSave={handleSave}
            ocult={selectedEvent ? true : false}
          >
            {selectedEvent ? (
              <div>
                <p><strong>Nome do Evento:</strong> {selectedEvent.name}</p>
                <p><strong>Descrição:</strong> {selectedEvent.description}</p>
                <p><strong>Data de Início:</strong> {moment(selectedEvent.start_date).format("DD/MM/YYYY")}</p>
                <p><strong>Data de Término:</strong> {moment(selectedEvent.end_date).format("DD/MM/YYYY")}</p>
                <p><strong>Horário de Início:</strong> {moment(selectedEvent.start_time).format("HH:mm")}</p>
                <p><strong>Horário de Término:</strong> {moment(selectedEvent.end_time).format("HH:mm")}</p>
                <p><strong>Palestrantes:</strong> {selectedEvent.speakers}</p>
              </div>
            ) : (
              <>
                <FormGroup>
                  <Input
                    label="Nome do Evento"
                    placeHolder="Insira o nome do evento"
                    type="text"
                    value={newEvent.name}
                    inputFunction={handleNameChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    label="Descrição do Evento"
                    placeHolder="Insira a descrição do evento"
                    type="text"
                    value={newEvent.description}
                    inputFunction={handleDescriptionChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    label="Data de Início"
                    type="date"
                    value={moment(newEvent.start_date).format("YYYY-MM-DD")}
                    inputFunction={handleStartDateChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    label="Data de Término"
                    type="date"
                    value={moment(newEvent.end_date).format("YYYY-MM-DD")}
                    inputFunction={handleEndDateChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    label="Horário de Início"
                    type="time"
                    value={moment(newEvent.start_time).format("HH:mm")}
                    inputFunction={handleStartTimeChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    label="Horário de Término"
                    type="time"
                    value={moment(newEvent.end_time).format("HH:mm")}
                    inputFunction={handleEndTimeChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    label="Palestrantes"
                    placeHolder="Insira o nome do palestrante"
                    type="text"
                    value={newEvent.speakers}
                    inputFunction={handleSpeakersChange}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Schedule</label>
                  <select value={eventSchedule || ''} onChange={(e) => setEventSchedule(Number(e.target.value))}>
                    <option value="">Selecione um Schedule</option>
                    {schedules.map((schedule) => (
                      <option key={schedule.id} value={schedule.id}>
                        {schedule.year} - {schedule.period}
                      </option>
                    ))}
                  </select>
                </FormGroup>
              </>
            )}
          </EventModal>
        </CustomCalendarContainer>
      </Container>
    </MainDiv>
  );
}
