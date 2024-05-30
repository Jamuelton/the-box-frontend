import { Eye } from "@phosphor-icons/react";
import { Input } from "../../components/Input";
import * as S from "./styles";
import { Button } from "../../components/Button";

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
            <h3>Login</h3>
            <div>
              <Input label="Email:" />
            </div>
            <S.LoginFormPassword>
              <Input
                label="Senha:"
                rightAdd={<Eye size={24} color="#7fc7d9" weight="duotone" />}
              />{" "}
              <span>Esqueci minha senha</span>
            </S.LoginFormPassword>
            <S.LoginFormButton>
              <Button label="Entrar" size="large" />
            </S.LoginFormButton>
          </S.Login>
        </S.LoginArea>
      </S.Form>
      <S.About>sobre</S.About>
    </S.Container>
  );
}
