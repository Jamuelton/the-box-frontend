import { useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import * as S from "./styles";

interface EstablishmentInfo {
  key: number;
  title: string;
  content: string;
  type: string;
  phone: string; // Corrigido para string
  days: string;
  address: string; // Corrigido a grafia
  hours: string;
  observations?: string;
  socialMedia?: string;
}

const cardContent: EstablishmentInfo[] = [
  {
    key: 1,
    title: "Bosco Restaurante",
    content:
      "Restaurante aberto de segunda à sabado servindo pratos completos de café da manhã, almoço e janta.",
    type: "Restaurante",
    phone: "87 999933805",
    days: "Seg-Sab",
    address: "R. Cap. Pedro Rodrigues, 186 - Magano, Garanhuns - PE, 55290-000",
    hours: "seg até as texta, 07:30–22:00/ sáb, 09:00–19:30",
    observations:
      "Preço varia de R$12,00 até R$15,00, podendo fechar combo completo do mes.",
  },
  {
    key: 2,
    title: "Oscar Diskgas E Água",
    content:
      "Venda e entrega de produtos como botijão de água, gás de cozinha e etc",
    type: "Serviços Gerais",
    phone: "87996625532",
    days: "Segunda à domingo",
    address: "R. Cap. Pedro Rodrigues, S/N - Magano, Garanhuns - PE, 55294-310",
    hours: "seg a sab, 07:00-19:30/ domingo, 07:00-14:00",
  },
];

export function Establishment() {
  const { id } = useParams<{ id: string }>();
  const establishment = cardContent.find(
    (item) => item.key === parseInt(id || "")
  );

  if (!establishment) {
    return <S.Container>Estabelecimento não encontrado</S.Container>;
  }

  return (
    <S.Container>
      <S.Title>
        <Title text={establishment.title} />
      </S.Title>
      <S.Wrapper>
        <S.EstablishmentInfo>
          <S.SpanLine>
            <S.ColumnContainer>
              <S.InfoEstablishmentContainer>
                <S.InfoEstablishmentTitleText>
                  Tipo de estabelecimento:
                </S.InfoEstablishmentTitleText>
                <S.InfoEstablishmentValueText>
                  {establishment.type}
                </S.InfoEstablishmentValueText>
              </S.InfoEstablishmentContainer>
              <S.InfoEstablishmentContainer>
                <S.InfoEstablishmentTitleText>
                  Telefone:
                </S.InfoEstablishmentTitleText>
                <S.InfoEstablishmentValueText>
                  {establishment?.phone}
                </S.InfoEstablishmentValueText>
              </S.InfoEstablishmentContainer>
              <S.InfoEstablishmentContainer>
                <S.InfoEstablishmentTitleText>
                  Horário de funcionamento:
                </S.InfoEstablishmentTitleText>
                <S.InfoEstablishmentValueText>
                  {establishment.hours}
                </S.InfoEstablishmentValueText>
              </S.InfoEstablishmentContainer>
              <S.InfoEstablishmentContainer>
                <S.InfoEstablishmentTitleText>
                  Observações:
                </S.InfoEstablishmentTitleText>
                <S.InfoEstablishmentValueText>
                  {establishment?.observations}
                </S.InfoEstablishmentValueText>
              </S.InfoEstablishmentContainer>
            </S.ColumnContainer>
            <S.ColumnContainer>
              <S.InfoEstablishmentContainer>
                <S.InfoEstablishmentTitleText></S.InfoEstablishmentTitleText>
                <S.InfoEstablishmentValueText></S.InfoEstablishmentValueText>
              </S.InfoEstablishmentContainer>
              <S.InfoEstablishmentContainer>
                <S.InfoEstablishmentTitleText>
                  Endereço:
                </S.InfoEstablishmentTitleText>
                <S.InfoEstablishmentValueText>
                  {establishment.address}
                </S.InfoEstablishmentValueText>
              </S.InfoEstablishmentContainer>
              <S.InfoEstablishmentContainer>
                <S.InfoEstablishmentTitleText>
                  Dias de funcionamento:
                </S.InfoEstablishmentTitleText>
                <S.InfoEstablishmentValueText>
                  {establishment.days}
                </S.InfoEstablishmentValueText>
              </S.InfoEstablishmentContainer>
              <S.InfoEstablishmentContainer>
                <S.InfoEstablishmentTitleText>
                  Redes Socias:
                </S.InfoEstablishmentTitleText>
                <S.InfoEstablishmentValueText>
                  {establishment.days}
                </S.InfoEstablishmentValueText>
              </S.InfoEstablishmentContainer>
            </S.ColumnContainer>
          </S.SpanLine>
        </S.EstablishmentInfo>
        <S.EstablishmentGrouped>
          <S.ImageEstablishmentContainer>
            <div className="rectangle-blue"></div>
            <div className="rectangle-grey">Imagem aqui</div>
          </S.ImageEstablishmentContainer>
          <S.RateEstablishment/>
          <S.AvaliationEstablishmentContainer>
            Ver Avaliação
          </S.AvaliationEstablishmentContainer>
        </S.EstablishmentGrouped>
      </S.Wrapper>
    </S.Container>
  );
}
