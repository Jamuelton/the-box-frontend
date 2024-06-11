import React, { useState } from "react";
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
  List,
} from "@phosphor-icons/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../config/auth/UseAuth";
import { Popover } from "antd";
import { warningNotification } from "../Notification";

interface HeaderProps {
  username?: string;
}

export const Header: React.FC<HeaderProps> = ({ username }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, reloadPage } = useAuth();
  const path = useLocation().pathname;
  const [hamburguer, setHamburguer] = useState<boolean>(false);

  console.log(path);
  console.log(isAuthenticated);

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

  const logouting = () => {
    logout();
    reloadPage();
    warningNotification("Usuário deslogado!");
    navigate("/login");
  };

  return (
    <S.Container>
      <S.headerArea>
        <S.logoArea>
          <S.logo src={Logo}></S.logo>
          {isAuthenticated ? (
            <S.title>Bem vindo, {username}!</S.title>
          ) : (
            <S.title>Portal do Aluno</S.title>
          )}
        </S.logoArea>
        {isAuthenticated ? (
          <S.icons>
            <Bell size={22}></Bell>
            <Popover
              content={<S.LogoutArea onClick={logouting}>Sair</S.LogoutArea>}
            >
              <SignOut size={22}></SignOut>
            </Popover>
            <S.hamburguerSection>
              <List size={22} onClick={() => setHamburguer(!hamburguer)} />
            </S.hamburguerSection>
          </S.icons>
        ) : (
          <S.info>
            <S.link href="#">Sobre</S.link>
            <S.link href="/register">Cadastre-se</S.link>
          </S.info>
        )}
      </S.headerArea>
      {isAuthenticated && path !== "/home" ? (
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
      {hamburguer && (
        <S.hamburguerOptions>
          {options.map(({ icon, title }, index) => (
            <S.hamburguerDiv key={index}>
              {icon}
              <S.optionTitle>{title}</S.optionTitle>
            </S.hamburguerDiv>
          ))}
        </S.hamburguerOptions>
      )}
    </S.Container>
  );
};
