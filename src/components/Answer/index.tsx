import * as S from "./styles";
import { UserCircle } from '@phosphor-icons/react';
import { Avatar } from 'antd';
import { Button } from "../Button";
import { IAnswer } from "./interfaces";

function Answer({info}:Readonly<{info:IAnswer}>) {
    const handleLike = () => {
        // adicionar post do like aqui e 
        // atualizar no componente mãe o useEffect 
        //  pra poder atualizar a quantidade de like no post
        console.log("Like clicked");
    }

  return (
    <S.Container isAuthor={info.isAuthor}>
    <S.AnswerBaloon isAuthor={info.isAuthor}>
    <S.Header>
        <S.Title>{info.title}</S.Title>
        <S.Username>
            <S.UsernameText isAuthor={info.isAuthor}>{info.username}</S.UsernameText>
            <Avatar size='default' icon={<UserCircle size={32} color="#DCF2F1"/>}/>
        </S.Username>
    </S.Header>
    <S.AnswerText isAuthor={info.isAuthor}>{info.text}</S.AnswerText>
    <S.Likes>
        <S.LikesText>{info.likes}</S.LikesText> 
        <Button secondColor={info.isAuthor? '#365486':"#7FC7D9"} icon={<S.LikeHeart color="white"/>} buttonFunction={() => handleLike()}/>
    </S.Likes>
    </S.AnswerBaloon>
    </S.Container>
  )
}

export default Answer
