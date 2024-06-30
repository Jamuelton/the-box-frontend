import { Button, Checkbox, Dropdown, Modal } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
`;

export const Title = styled.div`
  width: 100%;
  padding: 1rem;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonsArea = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem;
  padding-left: 5rem;
  padding-right: 5rem;
  justify-content: space-between;
  gap: 1rem;

  span {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
  }
`;

export const InputArea = styled.div`
  display: flex;
  width: 30%;
`;

export const hamburguerButtons = styled.section`
  display: flex;
  flex-direction: row;
  width: 121%;
  gap: 1rem;

  @media (max-width: 680px) {
    display: none;
  }
`;
export const hamburguerSection = styled(Dropdown)`
  display: none;
  color: var(--blue-700);

  @media (max-width: 680px) {
    display: flex;
  }
`;

export const CardArea = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 270px);
  gap: 116px;
  padding-left: 5rem;
  padding-right: 5rem;
`;

export const ModalArea = styled(Modal)`
  .ant-modal-content {
    background-color: var(--blue-100) !important;
  }

  .ant-modal-title {
    background-color: var(--blue-100) !important;
    font-size: 1.5rem;
    border-bottom: 1px solid var(--blue-300) !important;
    color: var(--blue-900);
    padding-bottom: 0.5rem;
  }
`;

export const ModalButton = styled(Button)`
  background-color: var(--blue-300);
  color: var(--blue-900);
  font-weight: bold;
  border-radius: 20px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  h3 {
    color: var(--blue-900);
    padding: 1rem;
  }
  div {
    padding-left: 2rem;
  }
`;

export const CheckboxArea = styled(Checkbox)`
  display: flex;
  align-items: center;
  color: var(--blue-700);
  font-size: 0.9rem;
  padding: 0.5rem;

  .ant-checkbox-inner {
    background-color: var(--blue-300);
  }
`;
