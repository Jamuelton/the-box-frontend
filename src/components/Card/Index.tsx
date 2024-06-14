import { FC } from "react";
import * as S from "./styles";
import { ArrowRight, Heart } from "@phosphor-icons/react";
import { Rate } from "antd";

interface CardProps {
  title?: string;
  content?: string;
  rateCard?: boolean;
  extend?: boolean;
}

export const Card: FC<CardProps> = ({ extend, title, content, rateCard }) => {
  return (
    <S.Container $extend={extend}>
      {rateCard && (
        <S.LikeArea>
          <Rate character={<Heart size={24} weight="fill" />} count={1} />
        </S.LikeArea>
      )}

      <S.TitleArea>
        <S.Title>{title}</S.Title>
        {rateCard && <Rate />}
      </S.TitleArea>

      <S.Content>{content}</S.Content>
      {rateCard && (
        <S.ButtonArea>
          <label htmlFor="">Ver detalhes</label>
          <ArrowRight size={24} weight="bold" color="#7fc7d9" />
        </S.ButtonArea>
      )}
    </S.Container>
  );
};
