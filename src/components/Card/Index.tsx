import { FC } from "react";
import * as S from "./styles";
import { ArrowRight, Heart } from "@phosphor-icons/react";
import { Rate } from "antd";

interface CardProps {
  title?: string;
  content?: string;
  rateCard?: boolean;
  like?: boolean;
  extend?: boolean;
  details?: boolean;
}

export const Card: FC<CardProps> = ({
  extend,
  title,
  content,
  rateCard,
  like,
  details,
}) => {
  return (
    <S.Container $extend={extend}>
      {like && (
        <S.LikeArea>
          <Rate character={<Heart size={24} weight="fill" />} count={1} />
        </S.LikeArea>
      )}

      <S.TitleArea>
        <S.Title>{title}</S.Title>
        {rateCard && <Rate />}
      </S.TitleArea>

      <S.Content>{content}</S.Content>
      {details && (
        <S.ButtonArea>
          <label htmlFor="">Ver detalhes</label>
          <ArrowRight size={24} weight="bold" color="#7fc7d9" />
        </S.ButtonArea>
      )}
    </S.Container>
  );
};
