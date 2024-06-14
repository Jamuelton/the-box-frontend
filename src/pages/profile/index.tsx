import { ArrowCircleLeft } from "@phosphor-icons/react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Title } from "../../components/Title";
import * as S from "./style";
import { useState } from "react";

export function Profile() {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  return (
    <S.Container>
      <S.titlearea>
        <ArrowCircleLeft size={30} weight="fill" />
        <Title text="Editar Perfil"></Title>
      </S.titlearea>
      <S.formArea>
        <S.InputArea>
          <Input
            value={name}
            label="Nome"
            placeHolder="Nome do Usuário"
            inputFunction={(e) => {
              setName(e.target.value);
            }}
          ></Input>
          <Input
            value={email}
            label="Email"
            placeHolder="usuario@upe.br"
            inputFunction={(e) => {
              setEmail(e.target.value);
            }}
          ></Input>
          <Input
            value={password}
            label="Senha"
            placeHolder="**********"
            inputFunction={(e) => {
              setPassword(e.target.value);
            }}
          ></Input>
          <Button label="Salvar"></Button>
        </S.InputArea>
      </S.formArea>
    </S.Container>
  );
}
