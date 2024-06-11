import { Funnel } from "@phosphor-icons/react";
import * as S from "./styles";
import React from "react";

interface FilterProps {
  buttonFunction?: () => void;
}
export const FilterButton: React.FC<FilterProps> = ({ buttonFunction }) => {
  return (
    <S.filterButton onClick={buttonFunction}>
      <Funnel size={20} weight="fill" />
      Filtro
    </S.filterButton>
  );
};
