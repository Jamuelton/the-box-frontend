import { MagnifyingGlass } from "@phosphor-icons/react";
import * as S from "./styles";
import React from "react";

interface SearchProps {
  onChangeSearchFunction?: React.ChangeEventHandler<HTMLInputElement>;
  searchFunction?: () => void;
}
export const SearchInput: React.FC<SearchProps> = ({
  onChangeSearchFunction,
  searchFunction,
}) => {
  return (
    <S.inputSearch
      placeholder="Buscar"
      variant="filled"
      suffix={
        <MagnifyingGlass size={22} weight="bold" onClick={searchFunction} />
      }
      onChange={onChangeSearchFunction}
    ></S.inputSearch>
  );
};
