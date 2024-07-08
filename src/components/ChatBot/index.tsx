import { ChatCircleDots, PaperPlaneTilt } from "@phosphor-icons/react";
import * as S from "./styles";
import { useState } from "react";
import { Input } from "../Input";
import { useLocation } from "react-router-dom";
import { SendMesageBot } from "../../services/ChatServices";

export const ChatBot = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const path = useLocation().pathname;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const AskBot = async () => {
    const response = await SendMesageBot("Onde posso almoçar com R$16,00?");
    if (response?.status == 200) {
      console.log(response.data);
    }
  };

  //   const answer = [{ label: "Como poderia ajudar hoje?" }];

  //   const question = [
  //     { label: "Quais os horários do laborátorio disponivel hoje?" },
  //   ];

  if (path == "/login" || path == "/register") {
    return null;
  }

  return (
    <S.Container>
      <S.OpenChatButton
        icon={<ChatCircleDots size={20} />}
        onClick={showModal}
      />
      <S.Chat
        title="ChatBot"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <>
            <Input placeHolder="Pergunte algo" />
            <PaperPlaneTilt size={24} weight="fill" onClick={AskBot} />
          </>
        }
      >
        <S.ChatLabel>
          <p>Como poderia te ajudar hoje?</p>
        </S.ChatLabel>
        <S.userLabel>
          <label htmlFor="">Você</label>
          <p>Quais os horários do laborátorio disponivel hoje?</p>
        </S.userLabel>
      </S.Chat>
    </S.Container>
  );
};
