import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import { FC, ReactNode } from "react";

interface InfocardProps {
  text: string;
  icon: ReactNode;
  link: string;
}

export const InfoCard: FC<InfocardProps> = ({ text, icon, link }) => {
  const navigate = useNavigate();

  const sendToScreen = () => {
    navigate(link);
  };

  return (
    <S.Container onClick={sendToScreen}>
      {icon}
      <label>{text}</label>
    </S.Container>
  );
};
