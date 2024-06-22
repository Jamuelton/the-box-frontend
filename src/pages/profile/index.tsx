import { ArrowCircleLeft } from "@phosphor-icons/react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Title } from "../../components/Title";
import * as S from "./style";
import { useEffect, useState } from "react";
import { useData } from "../../config/data/UseData";
import { PutUser } from "../../services/UserServices";
import { UserSchema } from "../../services/Types/userType";
import { useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { warningNotification } from "../../components/Notification";

interface ErrorInterface {
  errorType: "" | "warning" | "error" | undefined;
  errorShow: boolean;
}

export function Profile() {
  const { userInfo, userId, token, reloadPage } = useData();

  const navigate = useNavigate();

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

  const [errorName, setErrorName] = useState<ErrorInterface>();
  const [errorEmail, setErrorEmail] = useState<ErrorInterface>();
  const [errorPhone, setErrorPhone] = useState<ErrorInterface>();

  const [isEdit, setIsEdit] = useState<boolean>();

  const handleSetIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleChangeName = (e: { target: { value: string } }) => {
    const { value } = e.target;
    try {
      UserSchema.shape.name.parse(value);
      setErrorName({ errorType: "", errorShow: false });
    } catch (error) {
      setErrorName({ errorType: "error", errorShow: true });
    }
    setName(value);
  };

  const handleChangeEmail = (e: { target: { value: string } }) => {
    const { value } = e.target;
    try {
      UserSchema.shape.email.parse(value);
      setErrorEmail({ errorType: "", errorShow: false });
    } catch (error) {
      setErrorEmail({ errorType: "error", errorShow: true });
    }
    setEmail(value);
  };

  const handleChangePhone = (e: { target: { value: string } }) => {
    const { value } = e.target;
    try {
      UserSchema.shape.phone.parse(value);
      setErrorPhone({ errorType: "", errorShow: false });
    } catch (error) {
      setErrorPhone({ errorType: "error", errorShow: true });
    }
    setPhone(value);
  };

  const putUser = async () => {
    try {
      const userData = UserSchema.parse({
        name: name,
        email: email,
        phone: phone,
      });
      const response = await PutUser(parseInt(userId), token, userData);
      if (response?.status == 204) {
        handleSetIsEdit();
        reloadPage();
      }
    } catch (error) {
      if (error instanceof ZodError) {
        warningNotification(error.issues[0].message);
      }
    }
  };

  const backtoScreen = () => {
    navigate(-1);
  };

  return (
    <S.Container>
      <S.titlearea>
        <ArrowCircleLeft size={30} weight="fill" onClick={backtoScreen} />
        <Title text={isEdit ? "Editar Perfil" : "Perfil do usuário"}></Title>
      </S.titlearea>
      <S.formArea>
        <S.InputArea>
          <Input
            value={name}
            label="Nome"
            placeHolder="Nome do Usuário"
            inputFunction={handleChangeName}
            disabled={!isEdit}
            status={errorName?.errorType}
            errorShow={errorName?.errorShow}
            errorText={"O nome precisa ter entre 2 e 80 caracteres."}
          ></Input>
          <Input
            value={email}
            label="Email"
            placeHolder="usuario@upe.br"
            inputFunction={handleChangeEmail}
            disabled={!isEdit}
            status={errorEmail?.errorType}
            errorShow={errorEmail?.errorShow}
            errorText={"O email precisa ser válido."}
          ></Input>
          <Input
            value={phone}
            label="Telefone"
            placeHolder="(99) 9 9999-9999"
            inputFunction={handleChangePhone}
            disabled={!isEdit}
            status={errorPhone?.errorType}
            errorShow={errorPhone?.errorShow}
            errorText={"O email precisa ser válido."}
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
