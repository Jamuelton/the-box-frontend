import { useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import * as S from "./styles";
import { useEffect, useState } from "react";
import { getEstablishmentById } from "../../services/EstablishmentServices";

interface EstablishmentInfo {
  id: number;
  name: string;
  type: string;
  phone: string;
  schedule_days: string;
  address: string;
  schedule_hours: string;
  observations?: string;
  instagram?: string;
  image: string;
}

export function Establishment() {
  const { id } = useParams<{ id: string }>();
  const [establishment, setEstablishment] = useState<EstablishmentInfo | null>(null);

  useEffect(() => {
    const fetchEstablishment = async () => {
      try {
        const data = await getEstablishmentById(Number(id));
        setEstablishment(data);
      } catch (error) {
        console.error("Erro ao buscar estabelecimento:", error);
      }
    };
    fetchEstablishment();
  }, [id]);

  if (!establishment) {
    return <S.Container>Estabelecimento não encontrado</S.Container>;
  }

  return (
    <S.Container>
      <S.Title>
        <Title text={establishment.name} />
      </S.Title>
      <S.Wrapper>
        <S.EstablishmentInfo>
          <S.SpanLine>
            <S.ColumnContainer>
              <S.InfoEstablishmentContainer>
                {establishment.type && (
                  <>
                    <S.InfoEstablishmentTitleText>
                      Tipo de estabelecimento:
                    </S.InfoEstablishmentTitleText>
                    <S.InfoEstablishmentValueText>
                      {establishment.type}
                    </S.InfoEstablishmentValueText>
                  </>
                )}
              </S.InfoEstablishmentContainer>
              <S.InfoEstablishmentContainer>
                {establishment.phone && (
                  <>
                    <S.InfoEstablishmentTitleText>
                      Telefone:
                    </S.InfoEstablishmentTitleText>
                    <S.InfoEstablishmentValueText>
                      {establishment.phone}
                    </S.InfoEstablishmentValueText>
                  </>
                )}
              </S.InfoEstablishmentContainer>
              <S.InfoEstablishmentContainer>
                {establishment.schedule_hours && (
                  <>
                    <S.InfoEstablishmentTitleText>
                      Horário de funcionamento:
                    </S.InfoEstablishmentTitleText>
                    <S.InfoEstablishmentValueText>
                      {establishment.schedule_hours}
                    </S.InfoEstablishmentValueText>
                  </>
                )}
              </S.InfoEstablishmentContainer>
              <S.InfoEstablishmentContainer>
                {establishment.observations && (
                  <>
                    <S.InfoEstablishmentTitleText>
                      Observações:
                    </S.InfoEstablishmentTitleText>
                    <S.InfoEstablishmentValueText>
                      {establishment.observations}
                    </S.InfoEstablishmentValueText>
                  </>
                )}
              </S.InfoEstablishmentContainer>
            </S.ColumnContainer>
            <S.ColumnContainer>
              <S.InfoEstablishmentContainer />
              <S.InfoEstablishmentContainer>
                {establishment.address && (
                  <>
                    <S.InfoEstablishmentTitleText>
                      Endereço:
                    </S.InfoEstablishmentTitleText>
                    <S.InfoEstablishmentValueText>
                      {establishment.address}
                    </S.InfoEstablishmentValueText>
                  </>
                )}
              </S.InfoEstablishmentContainer>
              <S.InfoEstablishmentContainer>
                {establishment.schedule_days && (
                  <>
                    <S.InfoEstablishmentTitleText>
                      Dias de funcionamento:
                    </S.InfoEstablishmentTitleText>
                    <S.InfoEstablishmentValueText>
                      {establishment.schedule_days}
                    </S.InfoEstablishmentValueText>
                  </>
                )}
              </S.InfoEstablishmentContainer>
              <S.InfoEstablishmentContainer>
                {establishment.instagram && (
                  <>
                    <S.InfoEstablishmentTitleText>
                      Redes Sociais:
                    </S.InfoEstablishmentTitleText>
                    <S.InfoEstablishmentValueText>
                      {establishment.instagram}
                    </S.InfoEstablishmentValueText>
                  </>
                )}
              </S.InfoEstablishmentContainer>
            </S.ColumnContainer>
          </S.SpanLine>
        </S.EstablishmentInfo>
        <S.EstablishmentGrouped>
          <S.ImageEstablishmentContainer>
            <div className="rectangle-blue"></div>
            <div className="rectangle-grey">
              <img src={establishment.image} alt={establishment.name} />
            </div>
          </S.ImageEstablishmentContainer>
        </S.EstablishmentGrouped>
      </S.Wrapper>
    </S.Container>
  );
}
