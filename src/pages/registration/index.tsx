import { useState } from "react";
import { Badge, Form, message } from "antd";
import * as S from "./styles";
import { emailValidation, passowordValidation } from "./fuctions";
import { Input } from "antd";
import { FormProps } from "antd/lib";
import { useNavigate } from "react-router-dom";
import { CreateUser } from "../../services/AuthServices";
import {
  errorNotification,
  successNotification,
} from "../../components/Notification";

interface SignUpProps {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  number: number;
}

function Registration() {
  const navigate = useNavigate();

  const [isSubmit, setSubmit] = useState(false);
  const [form] = Form.useForm<SignUpProps>();
  const [lenght8, setLenght8] = useState(false);
  const [containsNumber, setContainsNumber] = useState(false);
  const [containsCharSpecial, setContainsCharSpecial] = useState(false);
  const [containsUppercase, setContainsUppercase] = useState(false);
  const [containsLowercase, setContainsLowercase] = useState(false);
  const [validEmail, setValidEmail] = useState(true);

  const passwordValidator = passowordValidation({
    setLenght8,
    setContainsNumber,
    setContainsCharSpecial,
    setContainsUppercase,
    setContainsLowercase,
  });

  const emailValidator = emailValidation({
    setValidEmail,
  });

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = 2019; year <= currentYear; year++) {
    years.push(year);
  }

  const navigateBack = () => {
    navigate('/login');
  };

  const onFinish: FormProps<unknown>["onFinish"] = async (values) => {
    setSubmit(true);
    const { name, email, number, repeatPassword }: SignUpProps =
      values as SignUpProps;

    const response = await CreateUser({
      name: name,
      email: email,
      phone: number.toString(),
      profile: "USER",
      password: repeatPassword,
    });
    setSubmit(false);
    if (response?.status == 201) {
      successNotification("Usuário registrado com sucesso!");
      navigate("/login");
    }
    if (response?.status == 400) {
      errorNotification("Error ao registrar, tente novamente.");
    }
  };

  const onFinishFailed: FormProps<unknown>["onFinishFailed"] = () => {
    message.open({
      type: "error",
      content: "Preencha os campos corretamente!",
      duration: 2,
    });
  };

  return (
    <S.Container>
      <S.CustomForm
        form={form}
        name="signup"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <S.RegistrationTitle>Cadastro</S.RegistrationTitle>
        <S.Grid>
          <Form.Item
            name="name"
            label="Seu nome"
            rules={[{ required: true, message: "Por favor digite um nome!" }]}
            required
          >
            <S.CustomInput placeholder="Digite seu primeiro nome" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Por favor digite seu email!" },
              { validator: emailValidator },
            ]}
            validateStatus={
              validEmail === true
                ? "success"
                : validEmail === false
                ? "error"
                : ""
            }
            help={
              validEmail === false
                ? "Por favor insira um email institucional válido (terminado com '@upe.br')."
                : undefined
            }
            required
          >
            <S.CustomInput placeholder="Email" />
          </Form.Item>

          <Form.Item<SignUpProps>
            name="number"
            label="Telefone"
            rules={[{ required: true, message: "Por favor digite um numero!" }]}
            required
          >
            <S.CustomInputNumber
              placeholder="(99) 9 9999-9999"
              maxLength={11}
              controls={false}
            />
          </Form.Item>

          {/* <Form.Item<SignUpProps>
            label="Ano de ingresso"
            name="yearOfEntry"
            rules={[
              {
                required: true,
                message: "Por favor insira seu ano de entrada!",
              },
            ]}
          >
            <S.CustomSelect placeholder="Ex: 2023">
              {years.map((year) => (
                <Select.Option key={year} value={year}>
                  {year}
                </Select.Option>
              ))}
            </S.CustomSelect>
          </Form.Item> */}

          <Form.Item<SignUpProps>
            name="password"
            label="Senha"
            rules={[
              { required: true, message: "Por favor digite um senha!" },
              { validator: passwordValidator },
            ]}
            required
            hasFeedback
          >
            <Input.Password
              placeholder="Senha"
              style={{
                borderRadius: 16,
                border: "none",
                background: "var(--gray-100)",
                margin: 0,
              }}
            />
          </Form.Item>

          <Form.Item<SignUpProps>
            name="repeatPassword"
            label="Repita sua senha"
            rules={[
              { required: true, message: "Por favor digite um senha!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Senha não correspondente!"));
                },
              }),
            ]}
            required
            hasFeedback
          >
            <Input.Password
              placeholder="Repita sua senha"
              style={{
                borderRadius: 16,
                border: "none",
                background: "var(--gray-100)",
                margin: 0,
              }}
            />
          </Form.Item>
        </S.Grid>
        <S.PassowrdCheck direction="vertical">
          <Badge
            status={lenght8 ? "success" : "error"}
            text="Senha com no mínimo 8 caracteres."
          />
          <Badge
            status={containsUppercase ? "success" : "error"}
            text="Senha com no mínimo 1 letra maiúscula."
          />
          <Badge
            status={containsLowercase ? "success" : "error"}
            text="Senha com no mínimo 1 letra minúscula."
          />
          <Badge
            status={containsNumber ? "success" : "error"}
            text="Senha com no mínimo 1 número."
          />
          <Badge
            status={containsCharSpecial ? "success" : "error"}
            text="Senha com no mínimo 1 caracteres especial."
          />
        </S.PassowrdCheck>
        <S.Grid></S.Grid>
        <S.ButtonRow>
          <S.CustomButton onClick={navigateBack}>Voltar</S.CustomButton>
          <S.CustomButton htmlType="submit" loading={isSubmit}>
            Cadastrar
          </S.CustomButton>
        </S.ButtonRow>
      </S.CustomForm>
    </S.Container>
  );
}
export default Registration;
