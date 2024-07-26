import { Dropdown } from "antd";
import styled from "styled-components";

export const ordenationButton = styled(Dropdown)`
  display: flex;
  background-color: var(--blue-300);
  align-items: center;
  justify-content: space-between;
  color: var(--blue-700);
  font-weight: bolder;
  font-size: 14px;
  cursor: pointer;
  border-radius: 20px;
  width: 70%;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  height: 100%;

  span {
    justify-content: center;
    align-items: center;
    gap: 0rem;
  }
`;
