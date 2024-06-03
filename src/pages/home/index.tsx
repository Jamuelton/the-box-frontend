import { Title } from "../../components/Title";
import * as S from "./styles";

export function Home() {
  return (
    <S.Container>
      <S.hearder>header</S.hearder>
      <S.Content>
        <Title text={"Pagina Inicial"} />
      </S.Content>
    </S.Container>
  );
}
