import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Plus, XCircle } from "@phosphor-icons/react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  CustomCalendarContainer,
  DivButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  FormGroup,
  Label,
  Input,
  InputDiv,
  ButtonDiv,
  Container,
  Div,
  InputDate
} from "./styles";
import { Button } from "../../components/Button";

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

// Definindo o tipo para um evento
type EventData = {
  title: string;
  dates: Date[];
  startTime: Date;
  endTime: Date;
};

export function LabSchedule() {
  const [eventsData, setEventsData] = useState<EventData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState<EventData>({
    title: "",
    dates: [],
    startTime: new Date(),
    endTime: new Date()
  });

  // Função para abrir o modal e preparar um novo evento
  const handleSelect = () => {
    setNewEvent({
      title: "",
      dates: [],
      startTime: new Date(),
      endTime: new Date()
    });
    setShowModal(true);
  };

  // Função para salvar o novo evento
  const handleSave = () => {
    if (newEvent.title && newEvent.dates.length > 0 && newEvent.startTime && newEvent.endTime) {
      // Mapear cada data selecionada para criar eventos individuais
      const newEvents = newEvent.dates.map(date => {
        // Copiar a data para não modificar o objeto original
        const start = new Date(date);
        const end = new Date(date);

        // Definir horas de início e término com base no horário escolhido
        start.setHours(newEvent.startTime.getHours(), newEvent.startTime.getMinutes());
        end.setHours(newEvent.endTime.getHours(), newEvent.endTime.getMinutes());

        return {
          title: newEvent.title,
          dates: [date], // Apenas a data atual
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

  // Função para adicionar um dia ao array de dias
  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = moment(e.target.value).startOf('day').toDate();
    if (!newEvent.dates.some(date => moment(date).isSame(selectedDate, 'day'))) {
      setNewEvent(prevEvent => ({
        ...prevEvent,
        dates: [...prevEvent.dates, selectedDate]
      }));
    }
  };

  // Função para remover um dia do array de dias
  const removeDay = (date: Date) => {
    setNewEvent(prevEvent => ({
      ...prevEvent,
      dates: prevEvent.dates.filter(day => !moment(day).isSame(date, 'day'))
    }));
  };

  // Preparar eventos para o calendário
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
    <Container>
      <DivButton>
        <Button
          color="#070F2B"
          icon={<Plus size={24} />}
          secondColor="#7FC7D9"
          label="Adicionar Evento"
          shape="round"
          size="small"
          buttonFunction={() => handleSelect()}
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
        />
        {showModal && (
          <ModalOverlay show={showModal}>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Agendar Horário</ModalTitle>
                <CloseButton onClick={() => setShowModal(false)}>
                  <XCircle size={24} />
                </CloseButton>
              </ModalHeader>
              <FormGroup>
                <Label>Título*</Label>
                <Input
                  type="text"
                  placeholder="Insira o título do evento"
                  value={newEvent.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label>Hora de Início*</Label>
                <Input
                  type="time"
                  value={moment(newEvent.startTime).format("HH:mm")}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const [hours, minutes] = e.target.value.split(":").map(Number);
                    const updatedStartTime = new Date(newEvent.startTime);
                    updatedStartTime.setHours(hours, minutes);
                    setNewEvent({ ...newEvent, startTime: updatedStartTime });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label>Hora de Término*</Label>
                <Input
                  type="time"
                  value={moment(newEvent.endTime).format("HH:mm")}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const [hours, minutes] = e.target.value.split(":").map(Number);
                    const updatedEndTime = new Date(newEvent.endTime);
                    updatedEndTime.setHours(hours, minutes);
                    setNewEvent({ ...newEvent, endTime: updatedEndTime });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label>Selecione os Dias*</Label>
                <Input
                  type="date"
                  onChange={handleDayChange}
                />
                <Div>
                  {newEvent.dates.map((day, index) => (
                    <InputDiv key={index}>
                          <InputDate >
                            <span>{moment(day).format("DD/MM/YYYY")}</span>
                            <CloseButton onClick={() => removeDay(day)} >&times;</CloseButton>
                          </InputDate>
                    </InputDiv>
                  ))}
                </Div>
              </FormGroup>
              <ButtonDiv>
                <Button
                  color="#ffff"
                  secondColor="#070F2B"
                  label="Cancelar"
                  shape="round"
                  size="small"
                  buttonFunction={() => setShowModal(false)}
                />
                <Button
                  color="#070F2B"
                  secondColor="#7FC7D9"
                  label="Adicionar"
                  shape="round"
                  size="small"
                  buttonFunction={handleSave}
                />
              </ButtonDiv>
            </ModalContent>
          </ModalOverlay>
        )}
      </CustomCalendarContainer>
    </Container>
  );
}
