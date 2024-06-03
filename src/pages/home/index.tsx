import { Title } from "../../components/Title";
import { InfoCard } from "../../features/home/InfoCard";
import * as S from "./styles";

export function Home() {
  return (
    <S.Container>
      <S.hearder>header</S.hearder>
      <S.Content>
        <Title text={"Pagina Inicial"} />
        <InfoCard text={""} icon={undefined} />
      </S.Content>
    </S.Container>
  );
}
