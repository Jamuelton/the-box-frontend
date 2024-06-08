import { FC, ReactNode } from "react";
import * as S from "./styles";

interface TitleProps {
  text: string;
  item?: ReactNode;
}

export const Title: FC<TitleProps> = ({ text, item }) => {
  return (
    <S.Container>
      <div>
        <h2>{text}</h2>
        {item && item}
      </div>
      <section
        style={{ borderTop: "1px solid #7fc7d9", padding: 0, height: "1px" }}
      ></section>
    </S.Container>
  );
};
