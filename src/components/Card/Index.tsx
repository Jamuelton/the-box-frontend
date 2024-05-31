import { FC } from "react";
import * as S from "./styles";

interface CardProps {
  title: string;
  content: string;
}

export const Card: FC<CardProps> = ({ title, content }) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Content>{content}</S.Content>
    </S.Container>
  );
};
