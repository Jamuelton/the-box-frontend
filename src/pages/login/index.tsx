import { Eye, EyeClosed } from "@phosphor-icons/react";
import { Input } from "../../components/Input";
import * as S from "./styles";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card/Index";
import { useState } from "react";
import { Title } from "../../components/Title";
import { AuthInterface } from "../../services/Types/authType";
import { LoginUser } from "../../services/AuthServices";
import {
  errorNotification,
  successNotification,
  warningNotification,
} from "../../components/Notification";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  const handleChangeEmail = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleChangePassword = (e: { target: { value: string } }) => {
    const { value } = e.target;

    setPassword(value);
  };

  const portalCards = [
    {
      title: "Bem-vindo ao Portal",
      content:
        "Explore os recursos e serviços oferecidos pela universidade. Faça login para acessar seu painel personalizado.",
    },
    {
      title: "Acesso ao Moodle",
      content:
        "Entre no Moodle para acessar suas aulas online, entregar trabalhos e participar de fóruns de discussão.",
    },
    {
      title: "Biblioteca Digital",
      content:
        "Acesse uma vasta coleção de e-books, artigos e revistas acadêmicas disponíveis para todos os estudantes e funcionários.",
    },
    {
      title: "Calendário Acadêmico",
      content:
        "Confira o calendário acadêmico para se manter atualizado sobre datas importantes, como início de semestres, exames e feriados.",
    },
    {
      title: "Suporte Técnico",
      content:
        "Precisa de ajuda? Entre em contato com o suporte técnico para resolver problemas de acesso ou uso do portal.",
    },
  ];

  const settings = {
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 645,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const AuthData: AuthInterface = {
    email: email,
    password: password,
  };

  const login = async () => {
    const response = await LoginUser(AuthData);
    if (response?.status == 200) {
      successNotification("Usuário logado com sucesso!");
      navigate("/home");
    }
    if (response?.status === 401) {
      warningNotification("Email e/ou senha incorretos");
    }
    if (response?.status === 422) {
      errorNotification("Formato de email incorreto");
    }
  };
  return (
    <S.Container>
      <S.Form>
        <S.TextArea>
          <div>
            <h2>Acesse o portal</h2>
            <p>
              Explore os recursos e serviços oferecidos pela universidade. Faça
              login para acessar seu painel personalizado.
            </p>
          </div>
        </S.TextArea>
        <S.LoginArea>
          <S.Login>
            <h3>Login</h3>
            <div>
              <Input label="Email:" inputFunction={handleChangeEmail} />
            </div>
            <S.LoginFormPassword>
              <Input
                label="Senha:"
                rightAdd={
                  isPassVisible ? (
                    <Eye
                      size={24}
                      color="#7fc7d9"
                      weight="duotone"
                      onClick={() => setIsPassVisible(!isPassVisible)}
                    />
                  ) : (
                    <EyeClosed
                      size={24}
                      color="#7fc7d9"
                      weight="duotone"
                      onClick={() => setIsPassVisible(!isPassVisible)}
                    />
                  )
                }
                inputFunction={handleChangePassword}
                type={isPassVisible ? "text" : "password"}
              />
              <S.ForgotPassText>Esqueci minha senha</S.ForgotPassText>
            </S.LoginFormPassword>
            <S.LoginFormButton>
              <Button label="Entrar" size="large" buttonFunction={login} />
            </S.LoginFormButton>
          </S.Login>
        </S.LoginArea>
      </S.Form>
      <S.About>
        <Title text={"Sobre"} />
        <S.CarouselArea {...settings}>
          {portalCards.map((item, index) => (
            <section key={index}>
              <Card
                key={index}
                title={item.title}
                content={item.content}
                rateCard={false}
              />
            </section>
          ))}
        </S.CarouselArea>
      </S.About>
    </S.Container>
  );
}
