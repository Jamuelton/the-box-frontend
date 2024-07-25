import { useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import * as S from "./styles";
import { Button } from "../../components/Button";
import { Plus } from "@phosphor-icons/react";
import { Modal } from "antd";
import { useState, useEffect } from "react";
import { Input } from "../../components/Input";
import {
  GetCommentsByPost,
  PostComment,
} from "../../services/AnswerServices/CommentService";
import { IAnswer } from "../../components/Answer/interfaces";
import Answer from "../../components/Answer";
import { useData } from "../../config/data/UseData";
import { CommentInterface } from "../../services/Types/commentType";
import { GetPostById } from "../../services/ForumServices";
import { ForumInterface } from "../../services/Types/forumTypes";
import {
  errorNotification,
  warningNotification,
} from "../../components/Notification";

const ForumAnswer: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { userId } = useData();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  const [allAnswer, setAllAnswer] = useState<Array<IAnswer>>([]);
  const [post, setPost] = useState<ForumInterface>();

  const [reload, setReload] = useState<number>(0);

  useEffect(() => {
    if (postId) {
      const getAllCommentsByPost = async () => {
        const response = await GetCommentsByPost(parseInt(postId));
        if (response?.status === 200) {
          setAllAnswer(response.data.comments);
        }
        if (response?.status === 400) {
          warningNotification("Não foi possível listar as respostas");
        }
      };

      const getPost = async () => {
        const response = await GetPostById(parseInt(postId));
        if (response?.status) {
          setPost(response.data);
        }
        if (response?.status === 400) {
          warningNotification("Não foi possível listar o post");
        }
      };
      getPost();
      getAllCommentsByPost();
    }
  }, [postId, reload]);

  function reloadPage() {
    setReload((prev) => prev + 1);
  }

  const postComment = async () => {
    if (userId && postId) {
      const data: CommentInterface = {
        body: answer,
        user_id: parseInt(userId),
        post_id: parseInt(postId),
      };
      const response = await PostComment(data);
      if (response?.status === 200) {
        reloadPage();
        handleModalOpen(false);
      }
      if (response?.status === 400) {
        errorNotification("Não foi possível comentar!");
      }
    }
  };

  const handleChangeAnswer = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setAnswer(value);
  };

  const handleModalOpen = (value: boolean) => {
    setModalOpen(value);
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
          onOk={postComment}
          onCancel={() => handleModalOpen(false)}
        >
          <Input
            value={answer}
            label="Resposta"
            inputFunction={handleChangeAnswer}
          />
        </Modal>
      </S.ButtonContainer>

      <S.PostContainer>
        <S.PostHeader>
          <S.PostTitle>{post?.title}</S.PostTitle>
          <S.PostDetails>
            <S.PostCategory>{post?.category}</S.PostCategory>
          </S.PostDetails>
        </S.PostHeader>
        <S.PostContent>{post?.content}</S.PostContent>
      </S.PostContainer>
      {userId && allAnswer.length > 0 ? (
        allAnswer?.map((item, index) => (
          <Answer
            key={index}
            info={item}
            onLike={() => {}}
            currentUserId={parseInt(userId)}
            reloadPage={reloadPage}
          />
        ))
      ) : (
        <p>sem repostas</p>
      )}
    </S.Container>
  );
};

export default ForumAnswer;
