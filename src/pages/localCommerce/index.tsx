import { Button } from "../../components/Button";
import { Title } from "../../components/Title";
import { Heart, XCircle } from "@phosphor-icons/react";
import * as S from "./styles";
import { useState, useEffect } from "react";
import { FilterButton } from "../../components/FilterButton";
import { SearchInput } from "../../components/Search";
import { Card } from "../../components/Card/Index";
import { useNavigate } from "react-router-dom";
import { getEstablishment } from "../../services/EstablishmentServices";

interface Establishment {
  id: number;
  name: string;
  description: string;
  type: string;
}

export function LocalCommerce() {
  const [modalFiltro, setModalFiltro] = useState<boolean>(false);
  const [favoriteMode, setFavoriteMode] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    new Set()
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [establishmentList, setEstablishmentList] = useState<Establishment[]>(
    []
  );

  const filterOptions = [
    "Restaurante",
    "Serviços Gerais",
    "Farmácia",
    "Mercado",
    "Academia",
    "Lanchonete",
    "Padaria",
    "Sorveteria",
  ];

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(new Set(JSON.parse(storedFavorites)));
    }
  }, []);

  useEffect(() => {
    loadEstablishments();
  }, []);

  const loadEstablishments = async () => {
    const response = await getEstablishment();
    if (response?.status === 200) {
      setEstablishmentList(response.data);
    } else {
      console.error("Não foi possível carregar os estabelecimentos");
    }
  };

  const updateLocalStorage = (newFavorites: Set<number>) => {
    localStorage.setItem("favorites", JSON.stringify(Array.from(newFavorites)));
  };

  const toggleFavorite = (key: number) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(key)) {
        newFavorites.delete(key);
      } else {
        newFavorites.add(key);
      }
      updateLocalStorage(newFavorites);
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
      if (modalFiltro && event.key === "Enter") {
        handleApply();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalFiltro]);

  const normalizeString = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const filteredContent =
    selectedFilters.size > 0
      ? establishmentList.filter((item) => selectedFilters.has(item.type))
      : establishmentList;

  const searchedContent = filteredContent.filter(
    (item) =>
      normalizeString(item.name).includes(normalizeString(searchQuery)) ||
      normalizeString(item.description || "").includes(
        normalizeString(searchQuery)
      )
  );

  const displayedContent = favoriteMode
    ? searchedContent.filter((item) => favorites.has(item.id))
    : searchedContent;

  const navigate = useNavigate();

  const handleSearch = () => {
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
              searchFunction={handleSearch}
            />
          </S.InputArea>
          <span>
            <S.hamburguerButtons>
              <FilterButton
                buttonFunction={() => setModalFiltro(!modalFiltro)}
              />
            </S.hamburguerButtons>
          </span>
        </S.ButtonsArea>
        <S.CardArea>
          {displayedContent.map((item) => (
            <Card
              key={item.id}
              title={item.name}
              content={item.description}
              like={favorites.has(item.id)}
              extend={true}
              details={true}
              onLikeToggle={() => toggleFavorite(item.id)}
              buttonFunction={() =>
                navigate(`/localCommerce/establishment/${item.id}`)
              }
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                key={index}
              >
                <S.CheckboxArea
                  type="checkbox"
                  checked={selectedFilters.has(option)}
                  onChange={() => toggleFilter(option)}
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        </S.ModalContent>
      </S.ModalArea>
    </S.Container>
  );
}
