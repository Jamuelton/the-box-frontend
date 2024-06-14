import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import styled from "styled-components";

// To-do: Criar arquivo com variáveis com as cores do figma

export const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CustomInput = styled(Input)`
  border-radius: 1rem;
  border: none;
  &:focus {
    border-color: var(--red-500);
    outline: none;
  }

  &:hover {
    border-color: var(--red-500);
  }

  background: var(--gray-100) !important;
`;

export const CustomSelect = styled(Select)`
  .ant-select-selector {
    border-radius: 1rem;
    border: none;
    margin: 0rem;
    &:focus {
      border-color: var(--red-500);
      outline: none;
    }

    &:hover {
      border-color: var(--red-500);
    }

    background: var(--gray-100) !important;
  }
`;

export const CustomInputNumber = styled(InputNumber)`
  border-radius: 1rem;
  border: none;
  width: 100%;
  &:focus {
    border-color: var(--red-500);
    outline: none;
  }

  &:hover {
    border-color: var(--red-500);
  }

  background: var(--gray-100) !important;
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const RegistrationTitle = styled.h1`
  color: #070f2b;
  font-weight: 600;
  margin-bottom: 2rem;
`;

export const CustomForm = styled(Form)`
  width: 50em;
  padding: 2em;
  border-radius: 1em;
  background-color: #7fc7d9;

  @media (max-width: 768px) {
    border-radius: 0px;
    width: 100%;
  }

`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 0.5em;
  column-gap: 1.5em;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const PassowrdCheck = styled(Space)`
  padding-bottom: 1em;
`;

export const CustomButton = styled(Button)`
  background-color: #365486;
  color: #DCF2F1;
  border: none;
  width: 8em;
  height: 3em;
  border-radius: 2em;
  font-weight: 700;
`;