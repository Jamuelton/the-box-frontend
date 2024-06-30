// LabSchedule.tsx
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import { Plus } from "@phosphor-icons/react";
import { Input } from "../../components/Input";
import { EventModal } from "../../components/EventModal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  CustomCalendarContainer,
  DivButton,
  Container,
  InputDiv,
  Div,
  MainDiv,
  InputDate,
  FormGroup
} from "./styles";
import { Button } from "../../components/Button";
import { Title } from "../../components/Title";
import { ScheduleData } from "../../services/Types/scheduleType";


export function LabSchedule() {
  moment.locale("pt-br");
  const localizer = momentLocalizer(moment);

  const messages = {
    date: 'Data',
    time: 'Hora',
    event: 'Evento',
    allDay: 'Dia Inteiro',
    week: 'Semana',
    work_week: 'Semana de Trabalho',
    day: 'Dia',
    month: 'Mês',
    previous: 'Anterior',
    next: 'Próximo',
    yesterday: 'Ontem',
    tomorrow: 'Amanhã',
    today: 'Hoje',
    agenda: 'Agenda',
    noEventsInRange: 'Não há eventos nesta faixa de datas.',
    showMore: (total: number) => `+ Ver mais (${total})`
  };

  const formats = {
    monthHeaderFormat: "MMMM YYYY",
    dayHeaderFormat: "dddd, DD/MM/YYYY",
    dayRangeHeaderFormat: ({ start, end }: { start: Date, end: Date }) => {
      const startDate = moment(start).format("DD MMMM");
      const endDate = moment(end).format("DD MMMM YYYY");
      return `${startDate} - ${endDate}`;
    },
    agendaDateFormat: "dddd, DD/MM/YYYY",
    timeGutterFormat: "HH:mm",
    dayFormat: "DD/MM/YYYY",
    dateFormat: "DD",
    monthFormat: "MMMM YYYY",
    agendaTimeFormat: "HH:mm"
  };

  const [eventsData, setEventsData] = useState<ScheduleData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState<ScheduleData>({
    title: "",
    dates: [],
    startTime: new Date(),
    endTime: new Date()
  });

  const handleSelect = () => {
    setNewEvent({
      title: "",
      dates: [],
      startTime: new Date(),
      endTime: new Date()
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (newEvent.title && newEvent.dates.length > 0 && newEvent.startTime && newEvent.endTime) {
      const newEvents = newEvent.dates.map(date => {
        const start = new Date(date);
        const end = new Date(date);
        start.setHours(newEvent.startTime.getHours(), newEvent.startTime.getMinutes());
        end.setHours(newEvent.endTime.getHours(), newEvent.endTime.getMinutes());
        return {
          title: newEvent.title,
          dates: [date],
          startTime: newEvent.startTime,
          endTime: newEvent.endTime,
          start,
          end
        };
      });
      setEventsData([...eventsData, ...newEvents]);
      setShowModal(false);
      setNewEvent({
        title: "",
        dates: [],
        startTime: new Date(),
        endTime: new Date()
      });
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = moment(e.target.value).startOf('day').toDate();
    if (!newEvent.dates.some(date => moment(date).isSame(selectedDate, 'day'))) {
      setNewEvent(prevEvent => ({
        ...prevEvent,
        dates: [...prevEvent.dates, selectedDate]
      }));
    }
  };

  const removeDay = (date: Date) => {
    setNewEvent(prevEvent => ({
      ...prevEvent,
      dates: prevEvent.dates.filter(day => !moment(day).isSame(date, 'day'))
    }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, title: e.target.value });
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    const updatedStartTime = new Date(newEvent.startTime);
    updatedStartTime.setHours(hours, minutes);
    setNewEvent({ ...newEvent, startTime: updatedStartTime });
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    const updatedEndTime = new Date(newEvent.endTime);
    updatedEndTime.setHours(hours, minutes);
    setNewEvent({ ...newEvent, endTime: updatedEndTime });
  };

  const calendarEvents = eventsData.flatMap(event =>
    event.dates.map(date => {
      const start = new Date(date);
      const end = new Date(date);
      start.setHours(event.startTime.getHours(), event.startTime.getMinutes());
      end.setHours(event.endTime.getHours(), event.endTime.getMinutes());
      return {
        title: event.title,
        start,
        end
      };
    })
  );

  return (
    <MainDiv>
      <Title text="Horário dos Laboratórios" />
      <Container>
        <DivButton>
          <Button
            color="#070F2B"
            icon={<Plus size={24} />}
            secondColor="#7FC7D9"
            label="Agendar Horário"
            shape="round"
            size="small"
            buttonFunction={handleSelect}
          />
        </DivButton>
        <CustomCalendarContainer>
          <Calendar
            views={["day", "week", "month"]}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={calendarEvents}
            style={{ height: "100vh" }}
            onSelectEvent={(event: { start: Date, end: Date, title: string }) => alert(`Evento: ${event.title} - Início: ${moment(event.start).format("DD/MM/YYYY HH:mm")} - Término: ${moment(event.end).format("DD/MM/YYYY HH:mm")}`)}
            onSelectSlot={handleSelect}
            messages={messages}
            formats={formats}
          />
          <EventModal
            title="Agendar Horário"
            show={showModal}
            onClose={() => setShowModal(false)}
            onSave={handleSave}
          >
            <FormGroup>
              <Input
                type="text"
                label="Título*"
                placeHolder="Digite um título para o agendamento"
                value={newEvent.title}
                inputFunction={handleTitleChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                label="Hora de Início*"
                placeHolder="Insira a hora de início"
                type="time"
                value={moment(newEvent.startTime).format("HH:mm")}
                inputFunction={handleStartTimeChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                label="Hora de Término*"
                placeHolder="Insira a hora de término"
                type="time"
                value={moment(newEvent.endTime).format("HH:mm")}
                inputFunction={handleEndTimeChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                label="Selecione os Dias"
                type="date"
                inputFunction={handleDayChange}
              />
            </FormGroup>
            <Div>
              {newEvent.dates.map((day, index) => (
                <InputDiv key={index}>
                  <InputDate>
                    <span>{moment(day).format("DD/MM/YYYY")}</span>
                    <button onClick={() => removeDay(day)}>&times;</button>
                  </InputDate>
                </InputDiv>
              ))}
            </Div>
          </EventModal>
        </CustomCalendarContainer>
      </Container>
    </MainDiv>
  );
}
