import { MagnifyingGlass } from "@phosphor-icons/react";
import * as S from "./styles";
import React from "react";

interface SearchProps {
  searchFunction?: () => void;
}
export const SearchInput: React.FC<SearchProps> = ({ searchFunction }) => {
  return (
    <S.inputSearch
      placeholder="Buscar"
      variant="filled"
      suffix={<MagnifyingGlass size={22} weight="bold" />}
      onSubmit={searchFunction}
    ></S.inputSearch>
  );
};
