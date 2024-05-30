import { Button } from "antd";
import styled from "styled-components";

export const ButtonArea = styled(Button)`
  background: var(--blue-500);
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none !important;
  &:hover {
    background: var(--blue-500) !important;
    border: none !important;
    color: white !important;
  }
`;
