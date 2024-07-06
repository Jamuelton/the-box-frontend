import * as S from "./styles";
import { UserCircle, PencilSimple } from '@phosphor-icons/react';
import { Avatar, Modal, Input, Button as AntButton } from 'antd';
import { Button } from "../Button";
import { IAnswer } from "./interfaces";
import { useState } from 'react';
import { likeAnswer, editComment } from '../../services/AnswerServices/Answer';
import Cookies from 'js-cookie';

interface AnswerProps {
  info: IAnswer;
  onLike: (id: string, liked: boolean) => void;
}

const Answer: React.FC<AnswerProps> = ({ info, onLike }) => {
  const [liked, setLiked] = useState(info.liked);
  const [likes, setLikes] = useState(info.likes);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(info.body);
  const currentUserId = Cookies.get('userId'); 

  const handleLike = async () => {
    try {
      await likeAnswer(info.id); // Adicionar ou remover like
      setLiked(!liked);
      setLikes(likes + (liked ? -1 : 1));
      onLike(info.id, !liked); 
    } catch (error) {
      console.error('Erro ao alterar like:', error);
    }
  };

  const handleEdit = async () => {
    try {
      await editComment(info.id, editedText);
      info.body = editedText; // Atualiza o texto do comentário localmente
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao editar comentário:', error);
    }
  };

  const openEditModal = () => {
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  return (
    <S.Container isAuthor={info.isAuthor}>
      <S.AnswerBaloon isAuthor={info.isAuthor}>
        <S.Header>
          <S.Title>{info.title}</S.Title>
          <S.Username>
            <S.UsernameText isAuthor={info.isAuthor}>{info.commentator}</S.UsernameText>
            <Avatar size='default' icon={<UserCircle size={32} color="#DCF2F1"/>}/>
          </S.Username>
        </S.Header>
        <S.AnswerText isAuthor={info.isAuthor}>{info.body}</S.AnswerText>
        <S.Likes>
          <S.LikesText>{likes}</S.LikesText>
          <Button 
            secondColor={info.isAuthor ? '#365486' : "#7FC7D9"} 
            icon={<S.LikeHeart color={liked ? "red" : "white"}/>} 
            buttonFunction={handleLike}
          />
          {info.user_id === currentUserId && (
            <Button 
              secondColor="#FFC107"
              icon={<PencilSimple size={24} />}
              buttonFunction={openEditModal}
            />
          )}
        </S.Likes>
      </S.AnswerBaloon>

      <Modal
        title="Editar Resposta"
        visible={isEditing}
        onOk={handleEdit}
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
