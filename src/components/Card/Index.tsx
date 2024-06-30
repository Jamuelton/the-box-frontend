import { FC } from "react";
import * as S from "./styles";
import { ArrowRight, Download, Heart, NotePencil } from "@phosphor-icons/react";
import { Rate } from "antd";

interface CardProps {
  title?: string;
  content?: string;
  rateCard?: boolean;
  like?: boolean;
  extend?: boolean;
  details?: boolean;
  download?: boolean;
  edit?: boolean;
  editFunction?: () => void;
}

export const Card: FC<CardProps> = ({
  extend,
  title,
  content,
  rateCard,
  like,
  details,
  download,
  edit,
  editFunction,
}) => {
  return (
    <S.Container $extend={extend}>
      {like && (
        <S.LikeArea>
          <Rate character={<Heart size={24} weight="fill" />} count={1} />
        </S.LikeArea>
      )}
      {download && (
        <S.MaterialArea>
          {edit && (
            <NotePencil onClick={editFunction} size={32} weight="fill" />
          )}
          <Download size={32} weight="fill" />
        </S.MaterialArea>
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
