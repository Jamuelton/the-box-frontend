import { Button } from "antd";
import styled from "styled-components";

export const filterButton = styled(Button)`
  display: flex;
  background-color: var(--blue-300);
  align-items: center;
  color: var(--blue-700);
  font-weight: bold;
  cursor: pointer;
  gap: 0.5rem;
  border-radius: 20px;
`;
