import { Title } from "../../components/Title";
import * as S from "./styles";
import { Button } from "../../components/Button";
import { Plus } from "@phosphor-icons/react";
import Answer from "../../components/Answer";
import { IAnswer } from "../../components/Answer/interfaces";
import { Modal, message } from "antd";
import { useState } from "react";
import { Input } from "../../components/Input";
function ForumAnswer() {
  const mockData: IAnswer[] = [
    {
      title: "How to learn TypeScript?",
      username: "johndoe",
      text: "I recommend starting with the official TypeScript documentation and then practicing by converting a small JavaScript project to TypeScript.",
      likes: 34,
      isAuthor: true,
    },
    {
      username: "janedoe",
      text: "You can also check out some great courses on platforms like Udemy or Coursera. They offer structured learning paths and projects to work on.",
      likes: 28,
      isAuthor: false,
    },
    {
      username: "coder123",
      text: "Don’t forget to use TypeScript's official playground to test out your code snippets. It’s a great way to get hands-on experience.",
      likes: 15,
      isAuthor: false,
    },
    {
      username: "typescript_guru",
      text: "Always enable strict mode in your tsconfig.json to catch common errors and ensure your code is type-safe.",
      likes: 50,
      isAuthor: true,
    },
    {
      username: "dev_ninja",
      text: "Make use of TypeScript’s advanced types like union types, intersection types, and conditional types to write more flexible and robust code.",
      likes: 22,
      isAuthor: false,
    },
    {
      username: "webpack_master",
      text: "You need to install ts-loader and configure it in your webpack.config.js file. Ensure that you also set up a tsconfig.json file for your project.",
      likes: 30,
      isAuthor: true,
    },
    {
      username: "frontend_dev",
      text: "Don’t forget to set resolve.extensions to include .ts and .tsx file extensions in your Webpack configuration.",
      likes: 18,
      isAuthor: false,
    },
  ];

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");

  const handleChangeAnswer = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setAnswer(value);
  };

  const handleModalOpen = (value: boolean) => {
    setModalOpen(value);
  };

  const submitAnswer = () => {
    if (answer.length == 0) {
      message.open({
        content: "Não é possível enviar uma mensagem vazia",
        type: "error",
        duration: 3,
      });
      return;
    }
    console.log(answer);
  };

  return (
    <S.Container>
      <Title text={"Fórum"} />
      <S.ButtonContainer>
        <Button
          color="#365486"
          secondColor="#DCF2F1"
          icon={<Plus size={24} />}
          label="Adicionar resposta"
          buttonFunction={() => handleModalOpen(true)}
        />
        <Modal
          title="Adicione sua reposta"
          open={modalOpen}
          okText="Publicar"
          cancelText="Cancelar"
          onOk={() => {
            handleModalOpen(false), submitAnswer();
          }}
          onCancel={() => handleModalOpen(false)}
        >
          <Input
            value={answer}
            label="Resposta"
            inputFunction={handleChangeAnswer}
          />
        </Modal>
      </S.ButtonContainer>
      {mockData.map((answer: IAnswer) => {
        return <Answer info={answer} />;
      })}
    </S.Container>
  );
}

export default ForumAnswer;
