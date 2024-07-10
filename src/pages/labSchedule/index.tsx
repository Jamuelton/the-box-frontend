// LabSchedule.tsx
import React, { useEffect, useState } from "react";
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
  FormGroup,
} from "./styles";
import { Button } from "../../components/Button";
import { Title } from "../../components/Title";
import { ScheduleData } from "../../services/Types/scheduleType";
import { message } from "antd/lib";
import { createNewLabEvent, getLabSchedule } from "../../services/labServices";
import { useData } from "../../config/data/UseData";
export function LabSchedule() {
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

  const { userId } = useData();
  const [lab, setLab] = useState<number>();
  const [eventsData, setEventsData] = useState<ScheduleData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState<ScheduleData>({
    title: "",
    date: [],
    start_time: new Date(),
    end_time: new Date(),
    lab_id: 0,
    user_id: userId,
  });

  const getSchedule = async () => {
    const response = await getLabSchedule();
    const labData = response?.data;
    setEventsData(labData);
  };

  useEffect(() => {
    getSchedule();
  }, []);

  const handleSelect = () => {
    setNewEvent({
      title: "",
      date: [],
      start_time: new Date(),
      end_time: new Date(),
      lab_id: 0,
      user_id: userId,
    });
    setShowModal(true);
  };

  const sendEvent = (event: ScheduleData) => {
    createNewLabEvent(event);
  };

  const handleSave = () => {
    if (
      newEvent.title &&
      newEvent.date.length > 0 &&
      newEvent.start_time &&
      newEvent.end_time
    ) {
      sendEvent(newEvent);
      getSchedule();
      setShowModal(false);
      setNewEvent({
        title: "",
        date: [],
        start_time: new Date(),
        end_time: new Date(),
        lab_id: 0,
        user_id: userId,
      });
    } else {
      message.open({
        type: "error",
        content: "Por favor, preencha todos os campos!",
        duration: 2,
      });
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = moment(e.target.value).startOf("day").toDate();
    if (
      !newEvent.date.some((date) => moment(date).isSame(selectedDate, "day"))
    ) {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        date: [selectedDate],
      }));
    } else {
      message.open({
        type: "error",
        content: "Só é possível selecionar uma data",
        duration: 2,
      });
    }
  };

  const removeDay = () => {
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      date: [],
    }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, title: e.target.value });
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    const updatedStartTime = new Date(newEvent.start_time);
    updatedStartTime.setHours(hours, minutes);
    setNewEvent({ ...newEvent, start_time: updatedStartTime });
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    const updatedEndTime = new Date(newEvent.end_time);
    updatedEndTime.setHours(hours, minutes);
    setNewEvent({ ...newEvent, end_time: updatedEndTime });
  };

  const calendarEvents = eventsData.flatMap((event) =>
    event.date.map((date) => {
      const start = new Date(date);
      const end = new Date(date);
      start.setHours(
        event.start_time.getHours(),
        event.start_time.getMinutes()
      );
      end.setHours(event.end_time.getHours(), event.end_time.getMinutes());
      return {
        title: event.title,
        start,
        end,
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
            onSelectEvent={(event: { start: Date; end: Date; title: string }) =>
              alert(
                `Evento: ${event.title} - Início: ${moment(event.start).format(
                  "DD/MM/YYYY HH:mm"
                )} - Término: ${moment(event.end).format("DD/MM/YYYY HH:mm")}`
              )
            }
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
                value={moment(newEvent.start_time).format("HH:mm")}
                inputFunction={handleStartTimeChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                label="Hora de Término*"
                placeHolder="Insira a hora de término"
                type="time"
                value={moment(newEvent.end_time).format("HH:mm")}
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
              {newEvent.date.map((day, index) => (
                <InputDiv key={index}>
                  <InputDate>
                    <span>{moment(day).format("DD/MM/YYYY")}</span>
                    <button onClick={() => removeDay()}>&times;</button>
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
