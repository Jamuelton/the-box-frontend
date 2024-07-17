import { useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import * as S from "./styles";
import { Button } from "../../components/Button";
import { Plus } from "@phosphor-icons/react";
import Answer from "../../components/Answer";
import { IAnswer } from "../../components/Answer/interfaces";
import { Modal, message } from "antd";
import { useState, useEffect } from "react";
import { Input } from "../../components/Input";
import {
  fetchComments,
  fetchPost,
  submitComment,
} from "../../services/AnswerServices/CommentService";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ForumAnswer: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<any>(null);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decoded = jwtDecode<{ sub: string }>(token);
      const userId = parseInt(decoded.sub, 10);
      setUserId(userId);
    }
  }, []);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        if (postId) {
          const fetchedPost = await fetchPost(Number(postId));
          if (fetchedPost) {
            setPost(fetchedPost);
          }

          const comments = await fetchComments(Number(postId));
          setAnswers(comments);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        message.error("Erro ao carregar dados");
      }
    };

    fetchPostAndComments();
  }, [postId]);

  const handleChangeAnswer = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setAnswer(value);
  };

  const handleModalOpen = (value: boolean) => {
    setModalOpen(value);
  };

  const validateAnswer = () => {
    const newErrors = [];

    if (answer.length === 0) {
      newErrors.push("Não é possível enviar uma mensagem vazia");
    }

    if (!userId) {
      newErrors.push("Erro ao obter informações do usuário");
    }

    return newErrors;
  };

  const submitAnswer = async () => {
    const validationErrors = validateAnswer();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      message.open({
        content: validationErrors.join(", "),
        type: "error",
        duration: 3,
      });
      return;
    }

    try {
      const newComment = await submitComment(Number(postId), userId!, answer);

      if (newComment) {
        setAnswers((prevAnswers) => [...prevAnswers, newComment]);
        message.open({
          content: "Resposta enviada com sucesso",
          type: "success",
          duration: 3,
        });
      } else {
        message.open({
          content: "Erro ao enviar resposta",
          type: "error",
          duration: 3,
        });
      }

      setAnswer("");
      setModalOpen(false);
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
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === id
          ? {
              ...answer,
              liked,
              likes: liked ? answer.likes + 1 : answer.likes - 1,
            }
          : answer
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
          onOk={submitAnswer}
          onCancel={() => handleModalOpen(false)}
        >
          <Input
            value={answer}
            label="Resposta"
            inputFunction={handleChangeAnswer}
          />
          {errors.length > 0 && (
            <ul>
              {errors.map((error, index) => (
                <li key={index} style={{ color: "red" }}>
                  {error}
                </li>
              ))}
            </ul>
          )}
        </Modal>
      </S.ButtonContainer>

      {post && (
        <S.PostContainer>
          <S.PostHeader>
            <S.PostTitle>{post.title}</S.PostTitle>
            <S.PostDetails>
              <S.PostCategory>{post.category}</S.PostCategory>
              <S.PostDate>
                {new Date(post.created_at).toLocaleDateString()}
              </S.PostDate>
            </S.PostDetails>
          </S.PostHeader>
          <S.PostContent>{post.content}</S.PostContent>
        </S.PostContainer>
      )}

      {answers.length === 0 ? (
        <p>Não há respostas ainda.</p>
      ) : (
        answers.map((answer: IAnswer, index: number) => (
          <Answer
            key={index}
            info={answer}
            onLike={handleLike}
            currentUserId={userId}
          />
        ))
      )}
    </S.Container>
  );
};

export default ForumAnswer;
