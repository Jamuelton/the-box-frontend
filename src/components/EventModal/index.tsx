// EventModal.tsx
import React, { FC } from "react";
import { XCircle } from "@phosphor-icons/react";
import { Button } from "../../components/Button";
import * as S from "./styles"; // Assumindo que temos um arquivo de estilos semelhante ao Card

interface EventModalProps {
  title?: string;
  show: boolean;
  onClose: () => void;
  onSave: () => void;
  children?: React.ReactNode;
}

export const EventModal: FC<EventModalProps> = ({
  title,
  show,
  onClose,
  onSave,
  children
}) => {
  if (!show) return null;

  return (
    <S.ModalOverlay show={show}>
      <S.ModalContent>
        <S.ModalHeader>
          <S.ModalTitle>{title}</S.ModalTitle>
          <S.CloseButton onClick={onClose}>
            <XCircle size={24} />
          </S.CloseButton>
        </S.ModalHeader>
        <S.ModalBody>{children}</S.ModalBody>
        <S.ModalFooter>
          <Button
            color="#ffff"
            secondColor="#070F2B"
            label="Cancelar"
            shape="round"
            size="small"
            buttonFunction={onClose}
          />
          <Button
            color="#070F2B"
            secondColor="#7FC7D9"
            label="Salvar"
            shape="round"
            size="small"
            buttonFunction={onSave}
          />
        </S.ModalFooter>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};
