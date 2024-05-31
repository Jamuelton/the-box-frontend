import React from "react";
import * as S from "./styles";
import Logo from "../assets/Logo.svg";
import {
  Bell,
  SignOut,
  ChatsCircle,
  Calendar,
  Clock,
  FolderSimple,
  FileText,
  MapPinArea,
} from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  username?: string;
  logged?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ logged, username }) => {
  const options = [
    {
      icon: <ChatsCircle size={24} color="#7fc7d9" />,
      title: "Fórum",
    },
    {
      icon: <Calendar size={24} color="#7fc7d9" />,
      title: "Calendário Acadêmico",
    },
    {
      icon: <Clock size={24} color="#7fc7d9" />,
      title: "Horários",
    },
    {
      icon: <FolderSimple size={24} color="#7fc7d9" />,
      title: "Materiais",
    },
    {
      icon: <FileText size={24} color="#7fc7d9" />,
      title: "Documentações",
    },
    {
      icon: <MapPinArea size={24} color="#7fc7d9" />,
      title: "Comércio Local",
    },
  ];

  const path = useLocation().pathname;
  return (
    <S.Container>
      <S.headerArea>
        <S.logoArea>
          <S.logo src={Logo}></S.logo>
          {logged ? (
            <S.title>Bem vindo, {username}!</S.title>
          ) : (
            <S.title>Portal do Aluno</S.title>
          )}
        </S.logoArea>
        {logged ? (
          <S.icons>
            <Bell size={22}></Bell>
            <SignOut size={22}></SignOut>
          </S.icons>
        ) : (
          <S.info>
            <S.link href="#">Sobre</S.link>
            <S.link href="#">Cadastre-se</S.link>
          </S.info>
        )}
      </S.headerArea>
      {logged && path !== "/home" ? (
        <S.optionsArea>
          {options.map(({ icon, title }, index) => (
            <S.optionDiv key={index}>
              {icon}
              <S.optionTitle>{title}</S.optionTitle>
            </S.optionDiv>
          ))}
        </S.optionsArea>
      ) : (
        <></>
      )}
    </S.Container>
  );
};
