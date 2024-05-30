import { Input } from "../../components/Input";
import * as S from "./styles";

export function Login() {
  return (
    <S.Container>
      <S.hearder>header</S.hearder>
      <S.Form>
        <S.TextArea>
          <div>
            <h2>Acesse o portal</h2>
            <p>
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
            </p>
          </div>
        </S.TextArea>
        <S.LoginArea>
          <S.Login>
            <label htmlFor="">Login</label>
            <div>
              <Input label="Email:" />
            </div>
            <div>
              <Input label="Senha:" /> esqueceu a senha
            </div>
            <div>login</div>
          </S.Login>
        </S.LoginArea>
      </S.Form>
      <S.About>sobre</S.About>
    </S.Container>
  );
}
