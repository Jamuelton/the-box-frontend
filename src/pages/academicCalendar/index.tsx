import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Button } from "../../components/Button";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  CustomCalendarContainer,
  DivButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ButtonDiv,
  ModalTitle,
  CloseButton,
  FormGroup,
  Label,
  Input,
  Container
} from "./styles";
import { Plus, XCircle } from "@phosphor-icons/react";

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

// Definindo o tipo para um evento
type EventData = {
  title: string;
  start: Date;
  end: Date;
};

export default function AcademicCalendar() {
  const [eventsData, setEventsData] = useState<EventData[]>([]);
  const [showModal, setShowModal] = useState(false);
  
  // Inicializa newEvent com null ou com um objeto vazio
  const [newEvent, setNewEvent] = useState<EventData | null>(null);

  const handleSelect = ({ start, end }: { start: Date, end: Date }) => {
    setNewEvent({ ...newEvent, start, end, title: "" });
    setShowModal(true);
  };

  const handleSave = () => {
    if (newEvent && newEvent.title && newEvent.start && newEvent.end) {
      setEventsData([...eventsData, newEvent]);
      setShowModal(false);
      setNewEvent(null); // Limpa newEvent após salvar
    } else {
      alert("Por favor preencha todos os campos!");
    }
  };

  return (
    <Container>
      <CustomCalendarContainer>
        <DivButton>
          <Button
            color="#070F2B"
            icon={<Plus size={24} />}
            secondColor="#7FC7D9"
            label="Adicionar Evento"
            shape="round"
            size="small"
            buttonFunction={handleSelect as () => void}
          />
        </DivButton>
        <Calendar
          views={["day", "week", "month"]}
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={eventsData}
          style={{ height: "100vh" }}
          onSelectEvent={(event: { start: Date, end: Date, title: string }) => alert(event.title)}
          onSelectSlot={handleSelect}
        />
        {showModal && (
          <ModalOverlay show={showModal}>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Adicionar Novo Evento</ModalTitle>
                <CloseButton onClick={() => setShowModal(false)}>
                  <XCircle size={24} />
                </CloseButton>
              </ModalHeader>
              <FormGroup>
                <Label>Título do Evento</Label>
                <Input
                  type="text"
                  placeholder="Insira o título do evento"
                  value={newEvent?.title || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewEvent({ ...newEvent!, title: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label>Data e Hora de Início</Label>
                <Input
                  type="datetime-local"
                  value={newEvent?.start ? moment(newEvent.start).format("YYYY-MM-DDTHH:mm") : ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewEvent({ ...newEvent!, start: new Date(e.target.value) })}
                />
              </FormGroup>
              <FormGroup>
                <Label>Data e Hora de Término</Label>
                <Input
                  type="datetime-local"
                  value={newEvent?.end ? moment(newEvent.end).format("YYYY-MM-DDTHH:mm") : ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewEvent({ ...newEvent!, end: new Date(e.target.value) })}
                />
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
