import { List, XCircle } from "@phosphor-icons/react";
import { FilterButton } from "../../components/FilterButton";
import { OrdenationButton } from "../../components/OrdenationButton";
import { SearchInput } from "../../components/Search";
import { Title } from "../../components/Title";
import * as S from "./styles";
import { MenuProps } from "antd";
import { useState } from "react";
import { Card } from "../../components/Card/Index";

export function Documents() {
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
      title: "Fundamentos de Engenharia de Software",
      content:
        "Este curso apresenta os princípios básicos da engenharia de software, incluindo metodologias de desenvolvimento, ciclo de vida de software e boas práticas.",
    },
    {
      title: "Análise e Projeto de Sistemas",
      content:
        "Foca nas técnicas de análise de requisitos e design de sistemas. Abrange a modelagem de sistemas usando UML e outras ferramentas de design.",
    },
    {
      title: "Gestão de Projetos de Software",
      content:
        "Este curso ensina técnicas de gestão de projetos de software, incluindo planejamento, execução, monitoramento e controle de projetos, com ênfase no uso de metodologias ágeis.",
    },
    {
      title: "Qualidade de Software e Testes",
      content:
        "Explora os conceitos de garantia de qualidade de software, técnicas de teste, automação de testes e métricas de qualidade. Inclui estudos de caso e práticas recomendadas.",
    },
    {
      title: "Desenvolvimento de Software Orientado a Objetos",
      content:
        "Cobre os princípios e práticas de desenvolvimento de software orientado a objetos. Inclui tópicos como encapsulamento, herança, polimorfismo e design patterns.",
    },
  ];

  return (
    <S.Container>
      <Title text={"Documentação do Curso"} />
      <S.FilterArea>
        <span>
          <SearchInput />
          <S.hamburguerButtons>
            <OrdenationButton items={ordenationItems} placement="bottomRight" />
            <FilterButton buttonFunction={() => setModalFiltro(!modalFiltro)} />
          </S.hamburguerButtons>
          <S.hamburguerSection menu={{ items }}>
            <List size={30} onClick={() => setHamburguer(!hamburguer)} />
          </S.hamburguerSection>
        </span>
      </S.FilterArea>
      <S.CardsArea>
        {cardContent.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            content={item.content}
            rateCard={true}
            extend
          />
        ))}
      </S.CardsArea>
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
