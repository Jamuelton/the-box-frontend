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
import { useData } from "../../config/data/UseData";
import { isAuth } from "../../config/auth/Auth";

interface HeaderProps {
  username?: string;
}

export const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, reloadPage } = useAuth();
  const { userInfo } = useData();
  const path = useLocation().pathname;
  const [hamburguer, setHamburguer] = useState<boolean>(false);

  const options = [
    {
      icon: <ChatsCircle size={24} color="#7fc7d9" />,
      title: "Fórum",
      link: "/forum",
    },
    {
      icon: <Calendar size={24} color="#7fc7d9" />,
      title: "Calendário Acadêmico",
      link: "/home",
    },
    {
      icon: <Clock size={24} color="#7fc7d9" />,
      title: "Horários",
      link: "/lab-schedule",
    },
    {
      icon: <FolderSimple size={24} color="#7fc7d9" />,
      title: "Materiais",
      link: "/material",
    },
    {
      icon: <FileText size={24} color="#7fc7d9" />,
      title: "Documentações",
      link: "/home",
    },
    {
      icon: <MapPinArea size={24} color="#7fc7d9" />,
      title: "Comércio Local",
      link: "/home",
    },
  ];

  const logouting = () => {
    logout();
    reloadPage();
    warningNotification("Usuário deslogado!");
    navigate("/login");
  };

  const sendToHome = () => {
    navigate("/home");
  };

  return (
    <S.Container>
      <S.headerArea>
        <S.logoArea>
          <S.logo src={Logo} onClick={sendToHome}></S.logo>
          {isAuthenticated || isAuth() ? (
            <S.title>Bem vindo, {userInfo?.name}!</S.title>
          ) : (
            <S.title>Portal do Aluno</S.title>
          )}
        </S.logoArea>
        {isAuthenticated || isAuth() ? (
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
      {isAuthenticated || (isAuth() && path !== "/home") ? (
        <S.optionsArea>
          {options.map(({ icon, title, link }, index) => (
            <S.optionDiv key={index} onClick={() => navigate(link)}>
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
