import { Title } from "../../components/Title";
import * as S from "./styles";

interface Establishment {
  key: number;
  title: string;
  content: string;
  type: string;
  phone: number;
  days: string;
  adress: string;
  hours: string;
  observations: string;
}

export function Establishment() {
  {
    /*const cardContent = [
    {
      key: 1,
      title: "Bosco Restaurante",
      content:
        "Restaurante aberto de segunda à sabado servindo pratos completos de café da manhã, almoço e janta.",
      type: "Restaurante",
      phone: "87 999933805",
      days: "Seg-Sab",
      address:
        "R. Cap. Pedro Rodrigues, 186 - Magano, Garanhuns - PE, 55290-000",
      hours: "seg até as texta, 07:30–22:00/ sáb, 09:00–19:30",
      observations:
        "Preço varia de R$12,00 até R$15,00, podendo fechar combo completo do mes.",
    },
  ];*/
  }

  return (
    <S.Container>
      <S.Title>
        <Title text={"Estabelecimento"} />
      </S.Title>
    </S.Container>
  );
}
