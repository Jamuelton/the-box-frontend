import { Button } from "../../components/Button";
import { Title } from "../../components/Title";
import { Heart, List, XCircle } from "@phosphor-icons/react";
import * as S from "./styles";
import { useState } from "react";
import { FilterButton } from "../../components/FilterButton";
import { OrdenationButton } from "../../components/OrdenationButton";
import { SearchInput } from "../../components/Search";
import { MenuProps } from "antd";
import { Card } from "../../components/Card/Index";

export function LocalCommerce() {
  const [modalFiltro, setModalFiltro] = useState<boolean>(false);
  const [hamburguer, setHamburguer] = useState<boolean>(false);

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: "Filtros",
      onClick: () => {
        setModalFiltro(!modalFiltro);
      },
    },
    {
      type: "divider",
    },
    {
      key: 2,
      type: "group",
      label: "Ordenar",
      children: [
        {
          key: "2-1",
          label: "Postados Recentemente",
        },
        {
          key: "2-2",
          label: "Quantidade de Replys",
        },
        {
          key: "2-3",
          label: "Quantidade de Curtidas",
        },
      ],
    },
  ];

  const ordenationItems: MenuProps["items"] = [
    {
      key: 1,
      label: "Postados Recentemente",
    },
    {
      type: "divider",
    },
    {
      key: 2,
      label: "Quantidade de Replys",
    },
    {
      type: "divider",
    },
    {
      key: 3,
      label: "Quantidade de Curtidas",
    },
  ];

  const cardContent = [
    {
      key: 1,
      title: "Bosco Restaurante",
      content:
        "Restaurante aberto de segunda à sabado servindo pratos completos de café da manhã, almoço e janta.",
    },
    {
      key: 2,
      title: "Oscar Diskgas E Água",
      content:
        "Venda e entrega de produtos como botijão de água, gás de cozinha e etc",
    },
    {
      key: 3,
      title: "Casa do Bem de Dona Mônica",
      content: "Lugar de diversos serviços, fica em frente a UPE",
    },
    {
      key: 4,
      title: "Pastelaria do Japonês",
      content:
        "Lanchonete em frente a UPE com uma variedade de mini salgados e etc.",
    },
    {
      key: 5,
      title: "Lefrut",
      content:
        "Uma lanchonete/sorveteria aconchegante com preços bem acessiveis.",
    },
  ];

  function favoritePlaces(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <S.Container>
      <S.Title>
        <Title
          text={"Conheça o comércio local"}
          item={
            <Button
              label={"Lugares Favoritos"}
              icon={<Heart size={32} weight="fill" />}
              shape="round"
              color="#7FC7D9"
              secondColor=" #070F2B"
              buttonFunction={favoritePlaces}
            />
          }
        />
      </S.Title>
      <S.Wrapper>
        <S.ButtonsArea>
          <S.InputArea>
            <SearchInput />
          </S.InputArea>
          <span>
            <S.hamburguerButtons>
              <OrdenationButton
                items={ordenationItems}
                placement="bottomRight"
              />
              <FilterButton
                buttonFunction={() => setModalFiltro(!modalFiltro)}
              />
            </S.hamburguerButtons>
            <S.hamburguerSection menu={{ items }}>
              <List size={30} onClick={() => setHamburguer(!hamburguer)} />
            </S.hamburguerSection>
          </span>
        </S.ButtonsArea>
        <S.CardArea>
          {cardContent.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              content={item.content}
              rateCard={true}
              like={true}
              extend={true}
              details={true}
            />
          ))}
        </S.CardArea>
      </S.Wrapper>
      <S.ModalArea
        open={modalFiltro}
        onCancel={() => setModalFiltro(false)}
        footer={<S.ModalButton>Aplicar</S.ModalButton>}
        title="Filtros"
        centered
        closeIcon={<XCircle size={22} weight="bold" color="#23335e" />}
      >
        <S.ModalContent>
          <h3>Categorias</h3>
          <div>
            <S.CheckboxArea>Checkbox</S.CheckboxArea>
            <S.CheckboxArea>Checkbox</S.CheckboxArea>
            <S.CheckboxArea>Checkbox</S.CheckboxArea>
          </div>
        </S.ModalContent>
      </S.ModalArea>
    </S.Container>
  );
}
