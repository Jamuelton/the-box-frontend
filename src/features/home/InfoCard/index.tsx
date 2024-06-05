import * as S from "./styles";
import { FC, ReactNode } from "react";

interface InfocardProps {
  text: string;
  icon: ReactNode;
}

export const InfoCard: FC<InfocardProps> = ({ text, icon }) => {
  return (
    <S.Container>
      {icon}
      <label>{text}</label>
    </S.Container>
  );
};
