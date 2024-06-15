import { ChatCircleDots, PaperPlaneTilt } from "@phosphor-icons/react";
import * as S from "./styles";
import { useState } from "react";
import { Input } from "../Input";

export const ChatBot = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
            <PaperPlaneTilt size={24} weight="fill" />
          </>
        }
      ></S.Chat>
    </S.Container>
  );
};
