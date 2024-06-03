import { Eye, EyeClosed } from "@phosphor-icons/react";
import { Input } from "../../components/Input";
import * as S from "./styles";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card/Index";
import { useState } from "react";

export function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

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

  const login = () => {
    console.log(email);
    console.log(password);
  };
  return (
    <S.Container>
      <S.hearder>header</S.hearder>
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
        <div>
          <h2>Sobre</h2>
        </div>
        <S.CarouselArea {...settings}>
          {portalCards.map((item, index) => (
            <section>
              <Card key={index} title={item.title} content={item.content} />
            </section>
          ))}
        </S.CarouselArea>
      </S.About>
    </S.Container>
  );
}
