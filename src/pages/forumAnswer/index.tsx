import { Title } from "../../components/Title";
import * as S from "./styles";
import { Button } from "../../components/Button";
import { Plus } from "@phosphor-icons/react";
import Answer from "../../components/Answer";
import { IAnswer } from "../../components/Answer/interfaces";
import { Modal, message } from "antd";
import { useState, useEffect } from "react";
import { Input } from "../../components/Input";
import { fetchComments } from '../../services/AnswerServices/CommentService';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const ForumAnswer: React.FC = () => {
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);
  const postId = 1; // ID estático do post

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const decoded = jwtDecode<{ sub: string }>(token);
      const userId = parseInt(decoded.sub, 10);
      setUserId(userId);
    }
  }, []);

  useEffect(() => {
    const fetchCommentsData = async () => {
      try {
        const comments = await fetchComments(postId);
        setAnswers(comments);
      } catch (error) {
        console.error("Erro ao buscar comentários:", error);
        message.error("Erro ao carregar comentários");
      }
    };

    fetchCommentsData();
  }, [postId]);

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

    if (!userId) {
      message.open({
        content: "Erro ao obter informações do usuário",
        type: "error",
        duration: 3,
      });
      return;
    }

    console.log("Enviando dados:", {
      body: answer,
      user_id: userId,
      post_id: postId,
    });

    try {
      const token = Cookies.get('token');

      console.log("Resposta enviada com sucesso");

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

  const handleLike = (id: string, liked: boolean) => {
    setAnswers(prevAnswers =>
      prevAnswers.map(answer =>
        answer.id === id ? { ...answer, liked, likes: liked ? answer.likes + 1 : answer.likes - 1 } : answer
      )
    );
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
      {answers.map((answer: IAnswer, index: number) => (
        <Answer key={index} info={answer} onLike={handleLike} currentUserId={userId} />
      ))}
    </S.Container>
  );
};

export default ForumAnswer;
