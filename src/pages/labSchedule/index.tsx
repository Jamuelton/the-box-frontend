import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import { Info, Plus } from "@phosphor-icons/react";
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
import {
  Labs,
  OtherScheduleData,
  ScheduleData,
} from "../../services/Types/scheduleType";
import { message } from "antd/lib";
import {
  createNewLabEvent,
  getLabs,
  getLabSchedule,
} from "../../services/labServices";
import { useData } from "../../config/data/UseData";
import { Button as ButtonAntd } from "antd/lib";
import { Tooltip } from "antd";

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

  const { userId, userInfo } = useData();
  const [labs, setLabs] = useState<Labs[]>();
  const [eventsData, setEventsData] = useState<OtherScheduleData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState<ScheduleData>({
    title: "",
    date: [],
    start_time: new Date(),
    end_time: new Date(),
    lab_id: 1,
    user_id: userId,
  });
  const [currentLab, setCurrentLab] = useState<number>(1);

  const getSchedule = async (labId: number) => {
    const labsResponse = await getLabs();
    setLabs(labsResponse?.data);

    const response = await getLabSchedule(labId);
    const data = response?.data.map((item) => ({
      date: item.date,
      end_time: item.end_time,
      id: item.id,
      lab_id: item.lab_id,
      start_time: item.start_time,
      user_id: item.user_id,
    }));

    setEventsData(data);
  };

  useEffect(() => {
    getSchedule(currentLab);
  }, [currentLab]);

  const handleSelect = () => {
    setNewEvent({
      title: "",
      date: [],
      start_time: new Date(),
      end_time: new Date(),
      lab_id: currentLab,
      user_id: userId,
    });
    setShowModal(true);
  };

  const sendEvent = async (event: ScheduleData) => {
    try {
      const response = await createNewLabEvent(event);
      // Check if response status is successful
      if (response.status === 201) {
        message.success("Reserva no laboratório feita com sucesso");
        // Optionally, you can perform additional actions after successful creation
      } else {
        message.error("Não foi possível criar a reserva para o laboratório");
      }
    } catch (error) {
      message.error("Não foi possível criar a reserva");
    }
  };

  const handleSave = () => {
    if (
      newEvent.title &&
      newEvent.date.length > 0 &&
      newEvent.start_time &&
      newEvent.end_time
    ) {
      sendEvent(newEvent);
      getSchedule(currentLab);
      setShowModal(false);
      setNewEvent({
        title: "",
        date: [],
        start_time: new Date(),
        end_time: new Date(),
        lab_id: currentLab,
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

  const calendarEvents = () => {
    return eventsData.map((event, index) => {
      const eventDate = new Date(event.date);

      const startTimeComponents = new Date(event.start_time);
      const endTimeComponents = new Date(event.end_time);

      const startTime = new Date(eventDate);
      startTime.setUTCHours(
        startTimeComponents.getUTCHours(),
        startTimeComponents.getUTCMinutes(),
        startTimeComponents.getUTCSeconds()
      );

      const endTime = new Date(eventDate);
      endTime.setUTCHours(
        endTimeComponents.getUTCHours(),
        endTimeComponents.getUTCMinutes(),
        endTimeComponents.getUTCSeconds()
      );

      return {
        id: index + 1,
        title: `Event ${index + 1}`,
        start: startTime,
        end: endTime,
      };
    });
  };

  const handleLabButtonClick = (lab: number) => {
    setCurrentLab(lab);
  };

  const capitalize = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <MainDiv>
      <Title
        text="Horário dos Laboratórios"
        item={
          <Tooltip
            title="Para agendar um horário, contate um professor."
            color="#365486"
          >
            <Info size={32} color={"#365486"} cursor={"pointer"} />
          </Tooltip>
        }
      />
      <Container>
        {labs?.map((item) => (
          <ButtonAntd
            key={item.id}
            onClick={() => handleLabButtonClick(item.id)}
            style={{
              backgroundColor: item.id == currentLab ? "#40a9ff" : "#fff",
            }}
          >
            {capitalize(item.name)}
          </ButtonAntd>
        ))}
        <DivButton>
          {userInfo?.profile == "SUPER_USER" && (
            <Button
              color="#070F2B"
              icon={<Plus size={24} />}
              secondColor="#7FC7D9"
              label="Agendar Horário"
              shape="round"
              size="small"
              buttonFunction={handleSelect}
            />
          )}
        </DivButton>
        <CustomCalendarContainer>
          <Calendar
            views={["day", "week", "month"]}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={calendarEvents()}
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
            ocult={false}
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
