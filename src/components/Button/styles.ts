import { Button } from "antd";
import styled from "styled-components";

export const ButtonArea = styled(Button)<{
  $color?: string;
  $secondColor?: string;
}>`
  background: ${(props) =>
    props.$secondColor ? props.$secondColor : "#365486"};
  color: ${(props) => (props.$color ? props.$color : "#fff")};
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
