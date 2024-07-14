import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment-timezone";
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
import { EventData } from "../../services/Types/eventType";
import { useData } from "../../config/data/UseData";
import { createEvent, getEvents } from "../../services/AcademicCalendarServices";

moment.locale("pt-br");
moment.tz.setDefault("America/Sao_Paulo");
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
  name: "",
  description: "",
  start_date: moment().toDate(),
  end_date: moment().toDate(),
  start_time: moment().toDate(),
  end_time: moment().toDate(),
  speakers: "",
};

console.log("initialEventState", initialEventState);

export function AcademicCalendar() {
  const { userInfo } = useData();
  const navigate = useNavigate();

  const [eventsData, setEventsData] = useState<EventData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState<EventData>(initialEventState);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getEvents();
        if (events) {
          setEventsData(events.map((event: EventData) => ({
            ...event,
            start_date: moment(event.start_date).tz("America/Sao_Paulo").toDate(),
            end_date: moment(event.end_date).tz("America/Sao_Paulo").toDate(),
            start_time: moment(event.start_time).tz("America/Sao_Paulo").toDate(),
            end_time: moment(event.end_time).tz("America/Sao_Paulo").toDate(),
          })));
        }
        console.log("events", events);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    fetchEvents();
  }, []);

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
      const adjustedEvent: EventData = {
        ...newEvent,
        start_date: moment(newEvent.start_date).tz("America/Sao_Paulo").toDate(),
        end_date: moment(newEvent.end_date).tz("America/Sao_Paulo").toDate(),
        start_time: moment(newEvent.start_time).tz("America/Sao_Paulo").toDate(),
        end_time: moment(newEvent.end_time).tz("America/Sao_Paulo").toDate(),
      };
      console.log("adjustedEvent", adjustedEvent);

      await createEvent(adjustedEvent);

      setShowModal(false);
      setNewEvent(initialEventState);

      const events = await getEvents();
      console.log("events", events);
      if (events) {
        setEventsData(events.map((event: EventData) => ({
          ...event,
          start_date: moment(event.start_date).tz("America/Sao_Paulo").toDate(),
          end_date: moment(event.end_date).tz("America/Sao_Paulo").toDate(),
          start_time: moment(event.start_time).tz("America/Sao_Paulo").toDate(),
          end_time: moment(event.end_time).tz("America/Sao_Paulo").toDate(),
        })));
      }
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
    }
  };
  console.log("newEvent", newEvent);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, name: event.target.value });
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, description: event.target.value });
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, start_date: moment(event.target.value).tz("America/Sao_Paulo").toDate()});
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, end_date: moment(event.target.value).tz("America/Sao_Paulo").toDate() });
  };

  const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = event.target.value.split(":");
    const date = moment(newEvent.start_time).tz("America/Sao_Paulo").toDate(); 
    date.setHours(parseInt(time[0], 10), parseInt(time[1], 10));
    setNewEvent({ ...newEvent, start_time: date });
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = event.target.value.split(":");
    const date = new Date(newEvent.end_date);
    date.setHours(parseInt(time[0], 10), parseInt(time[1], 10));
    setNewEvent({ ...newEvent, end_time: date });
  };

  const handleSpeakersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, speakers: event.target.value });
  };

  // Transform eventsData to have the correct structure for the calendar
  const calendarEvents = eventsData.map((event) => {
    const startDateTime = new Date(`${moment(event.start_date).tz("America/Sao_Paulo").format("YYYY-MM-DD")}T${moment(event.start_time).tz("America/Sao_Paulo").format("HH:mm:ss")}`);
    const endDateTime = new Date(`${moment(event.end_date).tz("America/Sao_Paulo").format("YYYY-MM-DD")}T${moment(event.end_time).tz("America/Sao_Paulo").format("HH:mm:ss")}`);
    return {
      ...event,
      title: event.name,
      start: startDateTime,
      end: endDateTime,
    };
    
  });
  console.log("calendarEvents", calendarEvents);
  const handleSelectEvent = (event: EventData) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  return (
    <MainDiv>
      <Title text="Calendário Acadêmico" />
      <Container>
        <CustomCalendarContainer>
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
                <p><strong>Data de Início:</strong> {moment(selectedEvent.start_date).tz("America/Sao_Paulo").format("YYYY-MM-DD")}</p>
                <p><strong>Data de Término:</strong> {moment(selectedEvent.end_date).tz("America/Sao_Paulo").format("YYYY-MM-DD")}</p>
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
                    value={moment(newEvent.start_date).tz("America/Sao_Paulo").format("YYYY-MM-DD")}
                    inputFunction={handleStartDateChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    label="Data de Término"
                    type="date"
                    value={moment(newEvent.end_date).tz("America/Sao_Paulo").format("YYYY-MM-DD")}
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
              </>
            )}
          </EventModal>
        </CustomCalendarContainer>
      </Container>
    </MainDiv>
  );
}