import axios from 'axios';
import * as S from "./styles";
import { UserCircle } from '@phosphor-icons/react';
import { Avatar } from 'antd';
import { Button } from "../Button";
import { IAnswer } from "./interfaces";
import Cookies from 'js-cookie';
import { useState } from 'react';

function Answer({ info, onLike }: Readonly<{ info: IAnswer, onLike: (id: string, liked: boolean) => void }>) {
  const [liked, setLiked] = useState(info.liked);
  const [likes, setLikes] = useState(info.likes);

  const handleLike = async () => {
    try {
      const token = Cookies.get('token'); 
      await axios.patch(`http://localhost:3000/comment/${info.id}/like`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (liked) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
      
      setLiked(!liked);
      onLike(info.id, !liked); 
    } catch (error) {
      console.error('Erro ao alterar like:', error);
    }
  }

  return (
    <S.Container isAuthor={info.isAuthor}>
      <S.AnswerBaloon isAuthor={info.isAuthor}>
        <S.Header>
          <S.Title>{info.title}</S.Title>
          <S.Username>
            <S.UsernameText isAuthor={info.isAuthor}>{info.user}</S.UsernameText>
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
        </S.Likes>
      </S.AnswerBaloon>
    </S.Container>
  )
}

export default Answer;
