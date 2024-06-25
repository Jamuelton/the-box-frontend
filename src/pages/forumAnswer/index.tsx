import { Title } from "../../components/Title";
import * as S from "./styles";
import { Button } from "../../components/Button";
import { Plus } from "@phosphor-icons/react";
import Answer from "../../components/Answer";
import { IAnswer } from "../../components/Answer/interfaces";
import { Modal, message } from "antd";
import { useState } from "react";
import { Input } from "../../components/Input";
import axios from "axios";

function ForumAnswer() {
  const mockData: IAnswer[] = [
    // Seu array mockado de dados de resposta aqui
  ];

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  const userId = 1; // Substitua pelo ID real do usuário que está comentando

  const handleChangeAnswer = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setAnswer(value);
  };

  const handleModalOpen = (value: boolean) => {
    setModalOpen(value);
  };

  const submitAnswer = async () => {
    if (answer.length === 0) {
      message.open({
        content: "Não é possível enviar uma mensagem vazia",
        type: "error",
        duration: 3,
      });
      return;
    }
  
    const postId = 1; //id estatico
  
    console.log("Enviando dados:", {
      body: answer,
      user_id: userId, 
      post_id: postId, 
    });
  
    try {
      const response = await axios.post("http://localhost:3000/comment", {
        body: answer,
        user_id: userId,
        post_id: postId,
      });
  
      console.log("Resposta recebida do servidor:", response.data);
  
      message.open({
        content: "Resposta enviada com sucesso",
        type: "success",
        duration: 3,
      });
  
      setAnswer(""); 
    } catch (error) {
      console.error("Erro ao enviar resposta:", error);
  
      message.open({
        content: "Erro ao enviar resposta",
        type: "error",
        duration: 3,
      });
    }
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
          title="Adicione sua resposta"
          open={modalOpen}
          okText="Publicar"
          cancelText="Cancelar"
          onOk={() => {
            handleModalOpen(false);
            submitAnswer();
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
      {mockData.map((answer: IAnswer, index: number) => {
        return <Answer key={index} info={answer} />;
      })}
    </S.Container>
  );
}

export default ForumAnswer;
