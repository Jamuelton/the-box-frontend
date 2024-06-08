import { Heart } from "@phosphor-icons/react";
import styled from "styled-components";
import { IAnswer } from "./interfaces";

export const Container = styled.div<IAnswer>`
    width: 100%;
    display: flex;
    justify-content: ${props => props.isAuthor? `start`: `end`};
`;

export const AnswerBaloon = styled.div<IAnswer>`
    background: ${props => props.isAuthor? `#365486`:`#7FC7D9`};
    width: 75%;
    padding: 2rem;
    border-radius: 1.5rem;
    margin-bottom: 2rem;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

export const Title = styled.h1`
    color: #DCF2F1;
    font-weight: 400;
`;

export const UsernameText = styled.p<IAnswer>`
    padding-right: 1rem;
    color: ${props => props.isAuthor? `#DCF2F1`: `#365486`}
`;

export const Username = styled.div<IAnswer>`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const AnswerText = styled.p<IAnswer>`
    color: ${props => props.isAuthor? `#DCF2F1`: `#365486`};
`;

export const Likes = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
`;

export const LikesText = styled.p`
    color: #DCF2F1;
`;

export const LikeHeart = styled(Heart)`
    width: 1.3rem;  
    height: 1.3rem; 
    transition: transform 0.2s; 
    &:hover {
        transform: scale(1.1); 
    }
`;
