import { Button } from "antd";
import styled from "styled-components";

interface LabProps {
  lab: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export const TitleContainer = styled.div``;

export const ConfirmationContainer = styled.div`
  height: 53vh;
  overflow: auto;
  margin-top: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 10px;

  &::-webkit-scrollbar {
    width: 10px;
    scroll-behavior: smooth;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 10px;
  }
`;

export const CustomSpan = styled.span`
  display: flex;
  justify-content: center;
  margin: 0.3rem;
`;

export const CustomButton = styled(Button)<LabProps>`
  background-color: ${(props) => (props.lab ? "#070F2B" : "#7FC7D9")};
  color: ${(props) => (props.lab ? "white" : "#070F2B")};
  margin-inline: 1.5rem;
`;
