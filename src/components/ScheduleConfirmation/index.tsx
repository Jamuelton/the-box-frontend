import * as S from "./styles";
import { Title } from "../Title";
import { ArrowRight, CalendarDots, Clock } from "@phosphor-icons/react";
import { useState } from "react";
import { Modal } from "antd"; // Assuming you're using Ant Design for the modal

interface ScheduleData {
  title: string;
  owner: string;
  begginsAt: Date;
  endsAt: Date;
}

function ScheduleConfirmation({
  schedule,
}: Readonly<{ schedule: ScheduleData }>) {
  const { title, owner, begginsAt, endsAt } = schedule;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"accept" | "reject" | null>(null);

  const date = begginsAt.toLocaleDateString("pt-br");
  const endsAtTime = endsAt.toLocaleTimeString("pt-br");
  const begginsAtTime = begginsAt.toLocaleTimeString("pt-br");

  const handleConfirmation = () => {
    console.log("aceitar reserva");
    setIsModalOpen(false);
  };

  const handleRejection = () => {
    console.log("rejeitar reserva");
    setIsModalOpen(false);
  };

  const showModal = (type: "accept" | "reject") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <S.ConfirmationContainer>
      <Title text={title} />
      <S.DateContainer>
        <S.TimeDataSpan>
          <S.InputContainerDate>
            <S.DateTitle>Data:</S.DateTitle>
            <S.DateValue>
              {date}
              <CalendarDots size={24} />
            </S.DateValue>
          </S.InputContainerDate>

          <S.InputContainerDate>
            <S.DateTitle>Horário:</S.DateTitle>
            <S.DateValue>
              {begginsAtTime} <ArrowRight size={18} /> {endsAtTime}{" "}
              <Clock size={24} />
            </S.DateValue>
          </S.InputContainerDate>
        </S.TimeDataSpan>
      </S.DateContainer>
      <S.FooterContainer>
        <S.TimeDataSpan>
          <p style={{ marginRight: 10 }}>Agendado por: </p>
          <S.DateTitle>{owner}</S.DateTitle>
        </S.TimeDataSpan>
        <div>
          <S.CustomButton
            bgColor="#070F2B"
            fontColor="#fff"
            onClick={() => showModal("reject")}
          >
            <p style={{ fontWeight: 600 }}>Rejeitar</p>
          </S.CustomButton>
          <S.CustomButton
            bgColor="#7FC7D9"
            fontColor="#070F2B"
            onClick={() => showModal("accept")}
          >
            Aceitar
          </S.CustomButton>
        </div>
      </S.FooterContainer>
      <Modal
        title={
          modalType === "accept" ? "Confirmar Aceitação" : "Confirmar Rejeição"
        }
        open={isModalOpen}
        onOk={modalType === "accept" ? handleConfirmation : handleRejection}
        onCancel={handleCancel}
      >
        {modalType === "accept" ? (
          <p>Tem certeza que deseja aceitar esta reserva?</p>
        ) : (
          <p>Tem certeza que deseja rejeitar esta reserva?</p>
        )}
      </Modal>
    </S.ConfirmationContainer>
  );
}

export default ScheduleConfirmation;
