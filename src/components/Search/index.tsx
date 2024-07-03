import { MagnifyingGlass } from "@phosphor-icons/react";
import * as S from "./styles";
import React from "react";

interface SearchProps {
  searchFunction: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: React.FC<SearchProps> = ({ value, onChange, searchFunction }) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      searchFunction();
    }
  };

  return (
    <S.inputSearch
      placeholder="Buscar"
      variant="filled"
      suffix={<MagnifyingGlass size={22} weight="bold" onClick={searchFunction} />}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
    />
  );
};
