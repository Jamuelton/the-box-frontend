// AcademicCalendar.tsx
import React, { useState } from "react";
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
import { EventData } from "../../services/Types/eventType";
import { useData } from "../../config/data/UseData";

export function AcademicCalendar() {
  const { userInfo } = useData();

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

  const [eventsData, setEventsData] = useState<EventData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState<EventData>({
    title: "",
    start: new Date(),
    end: new Date(),
  });

  const navigate = useNavigate();

  const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
    setNewEvent({ ...newEvent, start, end, title: "" });
    setShowModal(true);
  };

  const handleSave = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      setEventsData([...eventsData, newEvent]);
      setShowModal(false);
      setNewEvent({ title: "", start: new Date(), end: new Date() });
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, title: e.target.value });
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const startDate = new Date(e.target.value);
    setNewEvent({ ...newEvent, start: startDate });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const endDate = new Date(e.target.value);
    setNewEvent({ ...newEvent, end: endDate });
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
              {userInfo?.profile == "SUPER_USER" && (
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
              {userInfo?.profile == "SUPER_USER" && (
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
            events={eventsData}
            style={{ height: "100vh" }}
            onSelectEvent={(event: EventData) => alert(event.title)}
            onSelectSlot={handleSelect}
            messages={messages}
            formats={formats}
          />
          <EventModal
            title="Adicionar Novo Evento"
            show={showModal}
            onClose={() => setShowModal(false)}
            onSave={handleSave}
          >
            <FormGroup>
              <Input
                label="Título do Evento"
                placeHolder="Insira o título do evento"
                type="text"
                value={newEvent.title}
                inputFunction={handleTitleChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                label="Data e Hora de Início"
                type="datetime-local"
                value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
                inputFunction={handleStartDateChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                label="Data e Hora de Término"
                type="datetime-local"
                value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
                inputFunction={handleEndDateChange}
              />
            </FormGroup>
          </EventModal>
        </CustomCalendarContainer>
      </Container>
    </MainDiv>
  );
}
