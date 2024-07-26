import { Button, Card } from "antd";
import styled from "styled-components";

interface ButtonProps {
  bgColor?: string;
  hoverColor?: string;
  fontColor?: string;
}

export const ConfirmationContainer = styled(Card)`
  margin: 2rem;
  background: #dcf2f1;
  width: 80%;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

export const DateContainer = styled.div`
  background: #dcf2f1;
  display: flex;
  flex-direction: column;
  width: fit-content;
`;

export const DateContainerValue = styled.div`
  background: #dcf2f1;
  font-weight: 600;
`;
export const DateValue = styled.div`
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
  padding-inline: 0.7rem;
  background: white;
  border-radius: 10px;
  border: solid;
  border-width: 1px;
  border-color: gray;
`;
export const DateTitle = styled.div`
  font-weight: 600;
`;

export const TimeDataSpan = styled.span`
  display: flex;
  flex-direction: row;
  @media (max-width: 550px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const InputContainerDate = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 550px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const CustomButton = styled(Button)<ButtonProps>`
  background-color: ${(props) => props.bgColor || "blue"};
  color: ${(props) => props.fontColor || "white"};
  border-radius: 0.7rem;
  width: 7rem;
  margin-inline: 1rem;
  &:hover {
    background-color: ${(props) => props.hoverColor ?? "darkblue"};
  }
`;
