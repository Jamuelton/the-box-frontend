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
  onLikeToggle?: () => void;
  buttonFunction?: () => void;
}

export const Card: FC<CardProps> = ({
  extend,
  title,
  content,
  rateCard,
  like,
  details,
  onLikeToggle,
  buttonFunction,
}) => {
  return (
    <S.Container $extend={extend}>
      {like !== undefined && (
        <S.LikeArea onClick={onLikeToggle}>
          <Rate
            character={<Heart size={24} weight="fill" />}
            count={1}
            value={like ? 1 : 0}
            style={{ color: "#F21E51" }}
          />
        </S.LikeArea>
      )}

      <S.TitleArea>
        <S.Title>{title}</S.Title>
        <S.RateArea>
          {rateCard && <Rate style={{ color: "#7fc7d9" }} />}
        </S.RateArea>
      </S.TitleArea>

      <S.Content>{content}</S.Content>
      {details && (
        <S.ButtonArea onClick={buttonFunction}>
          <label htmlFor="">Ver detalhes</label>
          <ArrowRight size={24} weight="bold" color="#7fc7d9" />
        </S.ButtonArea>
      )}
    </S.Container>
  );
};
