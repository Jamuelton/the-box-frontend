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
import Cookies from "js-cookie";
import { useAuth } from "../../config/auth/UseAuth";

export function Login() {
  const navigate = useNavigate();

  const { auth, reloadPage } = useAuth();

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
      title: "Calendário Acadêmico",
      content:
        "Fique por dentro das datas importantes, como provas, entregas de trabalhos e eventos.",
    },
    {
      title: "Material de Apoio",
      content:
        "Compartilhe material de apoio com colegas e amigos, como apostilas, slides e artigos relevantes.",
    },
    {
      title: "Horário do Laboratório",
      content:
        "Agende horários de laboratórios de maneira prática e eficiente.",
    },
    {
      title: "Fórum",
      content:
        "Interaja com seus colegas e professores, tire dúvidas, compartilhe opiniões e experiências.",
    },
    {
      title: "Comércio Local",
      content:
        "Conheça o comércio local e suas informações, como restaurantes, academias e outros serviços.",
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
      const tokenDuration = new Date(Date.now() + 1000 * 60 * 60 * 40);
      Cookies.set("token", response.data.token, {
        expires: tokenDuration,
      });
      auth();
      reloadPage();
      successNotification("Usuário logado com sucesso!");
      navigate("/");
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
            <h2>Acesse o portal do aluno</h2>
            <p>
              Bem-vindo ao Portal do Aluno do curso de Engenharia de Software da
              UPE, campus Garanhuns! Este portal foi desenvolvido para
              centralizar todas as informações importantes do seu curso,
              facilitando o acesso e a organização da sua vida acadêmica.
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
              {/* <S.ForgotPassText>Esqueci minha senha</S.ForgotPassText> */}
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
                like={false}
              />
            </section>
          ))}
        </S.CarouselArea>
      </S.About>
    </S.Container>
  );
}
