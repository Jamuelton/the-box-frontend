import { Input } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
`;

export const InputArea = styled(Input)`
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

  svg {
    cursor: pointer;
  }
`;

export const Label = styled.label`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-self: start;
`;

export const Error = styled.label`
  font-size: 0.85rem;
  color: red;
  padding: 0 1rem;
`;
