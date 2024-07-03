import { Button } from "../../components/Button";
import { Title } from "../../components/Title";
import { Heart, XCircle } from "@phosphor-icons/react";
import * as S from "./styles";
import { useState, useEffect } from "react";
import { FilterButton } from "../../components/FilterButton";
import { SearchInput } from "../../components/Search";
import { MenuProps } from "antd";
import { Card } from "../../components/Card/Index";
import { useNavigate } from "react-router-dom";

export function LocalCommerce() {
  const [modalFiltro, setModalFiltro] = useState<boolean>(false);
  const [favoriteMode, setFavoriteMode] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filterOptions = [
    "Restaurante", "Serviços Gerais", "Farmácia", "Mercado", "Academia", "Lanchonete", "Padaria", "Sorveteria"
  ];

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
      content: "Restaurante aberto de segunda à sabado servindo pratos completos de café da manhã, almoço e janta.",
      type: "Restaurante"
    },
    {
      key: 2,
      title: "Oscar Diskgas E Água",
      content: "Venda e entrega de produtos como botijão de água, gás de cozinha e etc",
      type: "Serviços Gerais"
    },
    {
      key: 3,
      title: "Casa do Bem de Dona Mônica",
      content: "Lugar de diversos serviços, fica em frente a UPE",
      type: "Serviços Gerais"
    },
    {
      key: 4,
      title: "Pastelaria do Japonês",
      content: "Lanchonete em frente a UPE com uma variedade de mini salgados e etc.",
      type: "Lanchonete"
    },
    {
      key: 5,
      title: "Lefrut",
      content: "Uma lanchonete/sorveteria aconchegante com preços bem acessiveis.",
      type: "Sorveteria"
    },
  ];

  const toggleFavorite = (key: number) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(key)) {
        newFavorites.delete(key);
      } else {
        newFavorites.add(key);
      }
      return newFavorites;
    });
  };

  const favoritePlaces = () => {
    setFavoriteMode(!favoriteMode);
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = new Set(prevFilters);
      if (newFilters.has(filter)) {
        newFilters.delete(filter);
      } else {
        newFilters.add(filter);
      }
      return newFilters;
    });
  };

  const handleApply = () => {
    setModalFiltro(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (modalFiltro && event.key === 'Enter') {
        handleApply();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalFiltro]);

  const normalizeString = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  const filteredContent = selectedFilters.size > 0
    ? cardContent.filter((item) => selectedFilters.has(item.type))
    : cardContent;

  const searchedContent = filteredContent.filter((item) => 
    normalizeString(item.title).includes(normalizeString(searchQuery)) ||
    normalizeString(item.content).includes(normalizeString(searchQuery))
  );

  const displayedContent = favoriteMode
    ? searchedContent.filter((item) => favorites.has(item.key))
    : searchedContent;

  const navigate = useNavigate();

  const handleSearch = () => {
    // This function is called when the search is triggered
    setSearchQuery(searchQuery);
  };

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
            <SearchInput 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              searchFunction={handleSearch} // To handle search on Enter and icon click
            />
          </S.InputArea>
          <span>
            <S.hamburguerButtons>
              <FilterButton buttonFunction={() => setModalFiltro(!modalFiltro)} />
            </S.hamburguerButtons>
          </span>
        </S.ButtonsArea>
        <S.CardArea>
          {displayedContent.map((item) => (
            <Card
              key={item.key}
              title={item.title}
              content={item.content}
              like={favorites.has(item.key)}
              extend={true}
              details={true}
              onLikeToggle={() => toggleFavorite(item.key)}
              buttonFunction={() => navigate(`/localCommerce/establishment/${item.key}`)}
            />
          ))}
        </S.CardArea>
      </S.Wrapper>
      <S.ModalArea
        open={modalFiltro}
        onCancel={() => setModalFiltro(false)}
        footer={<S.ModalButton onClick={handleApply}>Aplicar</S.ModalButton>}
        title="Filtros"
        centered
        closeIcon={<XCircle size={22} weight="bold" color="#23335e" />}
      >
        <S.ModalContent>
          <h3>Categorias</h3>
          <div>
            {filterOptions.map((option, index) => (
              <S.CheckboxArea key={index}                   checked={selectedFilters.has(option)}
              onChange={() => toggleFilter(option)}>
                <label>{option}</label>
              </S.CheckboxArea>
            ))}
          </div>
        </S.ModalContent>
      </S.ModalArea>
    </S.Container>
  );
}
