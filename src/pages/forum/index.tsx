import * as S from "./styles";
import { MenuProps } from "antd";
import { FilterButton } from "../../components/FilterButton";
import { OrdenationButton } from "../../components/OrdenationButton";
import { SearchInput } from "../../components/Search";
import { Title } from "../../components/Title/";
import { List, Plus, XCircle } from "@phosphor-icons/react";
import { Card } from "../../components/Card/Index";
import { useState } from "react";
import { Input } from "../../components/Input";

export function Forum() {
  const [modalFiltro, setModalFiltro] = useState<boolean>(false);
  const [modalPost, setModalPost] = useState<boolean>(false);

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
  return (
    <S.Container>
      <S.Title>
        <Title text="Fórum"></Title>
      </S.Title>
      <S.ButtonsArea>
        <S.NewButton onClick={() => setModalPost(!modalPost)}>
          Novo Post <Plus size={22} weight="bold" />
        </S.NewButton>
        <S.NewButtonIcon onClick={() => setModalPost(!modalPost)}>
          <Plus size={20} weight="bold" />
        </S.NewButtonIcon>
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
      </S.ButtonsArea>
      <S.CardArea>
        <Card title="dfvdffdf" content="fgdfd" rateCard={true} extend={true} />
        <Card title="dfvdffdf" content="fgdfd" rateCard={true} extend={true} />
        <Card title="dfvdffdf" content="fgdfd" rateCard={true} extend={true} />
      </S.CardArea>
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
      <S.NewPostModal
        open={modalPost}
        onCancel={() => setModalPost(false)}
        title="Novo Post"
        closeIcon={<XCircle size={22} weight="bold" color="#23335e" />}
        footer={
          <S.TextAreaFooter>
            <S.TextAreaCancelBtn>Cancelar</S.TextAreaCancelBtn>
            <S.TextAreaOkBtn>Publicar</S.TextAreaOkBtn>
          </S.TextAreaFooter>
        }
      >
        <S.newPostContent>
          <div>
            <h3>Título *</h3>
            <S.newPostDiv>
              <Input placeHolder="Título"></Input>
              <S.SelectArea
                placeholder="Categoria"
                style={{ width: 120 }}
                // onChange={handleChange}
                options={[
                  { value: "jack", label: "Estudo" },
                  { value: "lucy", label: "Universidade" },
                  { value: "Yiminghe", label: "Dúvida" },
                ]}
              />
            </S.newPostDiv>
          </div>
          <div>
            <h3>Corpo da Publicação *</h3>
            <S.TextAreaContainer
              placeholder="Sua publicação..."
              rows={8}
            ></S.TextAreaContainer>
          </div>
        </S.newPostContent>
      </S.NewPostModal>
    </S.Container>
  );
}
