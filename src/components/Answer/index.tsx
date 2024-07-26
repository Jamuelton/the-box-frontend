import * as S from "./styles";
import { UserCircle, PencilSimple } from "@phosphor-icons/react";
import { Avatar, Modal, Input, Button as AntButton } from "antd";
import { Button } from "../Button";
import { IAnswer } from "./interfaces";
import { useState } from "react";
import {
  editComment,
  likeAnswer,
} from "../../services/AnswerServices/CommentService";
import { errorNotification, successNotification } from "../Notification";

interface AnswerProps {
  info: IAnswer;
  onLike: (id: string, liked: boolean) => void;
  currentUserId: number | undefined;
  reloadPage: () => void;
}

const Answer: React.FC<AnswerProps> = ({ info, currentUserId, reloadPage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(info.body);

  const edit = currentUserId === info.user_id;
  const isAuthor = info.post_id === info.user_id;

  const handleLike = async () => {
    if (info.id) {
      const response = await likeAnswer(info.id);
      if (response?.status === 200) {
        reloadPage();
      }
    }
  };

  const handleEdit = async () => {
    if (info.id && editedText) {
      const response = await editComment(info.id, editedText);
      if (response?.status === 200) {
        successNotification("Editado com sucesso!");
        reloadPage();
        closeEditModal();
      }
      if (response?.status === 400) {
        errorNotification("Não foi possível editar a respostas");
      }
    }
  };

  const openEditModal = () => {
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  return (
    <S.Container isAuthor={isAuthor}>
      <S.AnswerBaloon isAuthor={isAuthor}>
        <S.Header>
          <S.Title>{info.title}</S.Title>
          <S.Username>
            <S.UsernameText isAuthor={isAuthor}>
              {info.commentator}
            </S.UsernameText>
            <Avatar
              size="default"
              icon={<UserCircle size={32} color="#DCF2F1" />}
            />
          </S.Username>
        </S.Header>
        <S.AnswerText isAuthor={isAuthor}>{info.body}</S.AnswerText>
        <S.Likes>
          <S.LikesText>{info.likes}</S.LikesText>
          <Button
            secondColor={isAuthor ? "#365486" : "#7FC7D9"}
            icon={<S.LikeHeart color={"white"} />}
            buttonFunction={handleLike}
          />
          {edit && (
            <Button
              icon={<PencilSimple size={24} />}
              buttonFunction={openEditModal}
            />
          )}
        </S.Likes>
      </S.AnswerBaloon>

      <Modal
        title="Editar Resposta"
        open={isEditing}
        onOk={() => {}}
        onCancel={closeEditModal}
        footer={[
          <AntButton key="back" onClick={closeEditModal}>
            Cancelar
          </AntButton>,
          <AntButton key="submit" type="primary" onClick={handleEdit}>
            Salvar
          </AntButton>,
        ]}
      >
        <Input.TextArea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          rows={4}
        />
      </Modal>
    </S.Container>
  );
};

export default Answer;
