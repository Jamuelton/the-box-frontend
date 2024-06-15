import { ArrowCircleLeft } from "@phosphor-icons/react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Title } from "../../components/Title";
import * as S from "./style";
import { useEffect, useState } from "react";
import { useData } from "../../config/data/UseData";
import { PutUser } from "../../services/UserServices";
import { UserInterface } from "../../services/Types/userType";

export function Profile() {
  const { userInfo, userId, token, reloadPage } = useData();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo?.name);
      setEmail(userInfo?.email);
      setPhone(userInfo?.phone);
    }
  }, [userInfo]);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const [isEdit, setIsEdit] = useState<boolean>();

  const handleSetIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const userData: UserInterface = {
    name: name,
    email: email,
    phone: phone,
  };

  const putUser = async () => {
    const response = await PutUser(parseInt(userId), token, userData);
    if (response?.status == 204) {
      handleSetIsEdit();
      reloadPage();
    }
  };

  return (
    <S.Container>
      <S.titlearea>
        <ArrowCircleLeft size={30} weight="fill" />
        <Title text={isEdit ? "Editar Perfil" : "Perfil do usuário"}></Title>
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
            disabled={!isEdit}
          ></Input>
          <Input
            value={email}
            label="Email"
            placeHolder="usuario@upe.br"
            inputFunction={(e) => {
              setEmail(e.target.value);
            }}
            disabled={!isEdit}
          ></Input>
          <Input
            value={phone}
            label="Telefone"
            placeHolder="(99) 9 9999-9999"
            inputFunction={(e) => {
              setPhone(e.target.value);
            }}
            disabled={!isEdit}
          ></Input>
          <Button
            label={isEdit ? "Salvar" : "Editar"}
            buttonFunction={isEdit ? putUser : handleSetIsEdit}
          ></Button>
        </S.InputArea>
      </S.formArea>
    </S.Container>
  );
}
