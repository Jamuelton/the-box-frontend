import { Button, Checkbox, Dropdown, Input, Modal, Select } from "antd";
import styled from "styled-components";

const { TextArea } = Input;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Title = styled.div`
  width: 100%;
  padding: 1rem;
`;

export const NewButton = styled(Button)`
  display: flex;
  background-color: var(--blue-100);
  color: var(--blue-700);
  align-items: center;
  border-radius: 1.4rem;
  gap: 0.5rem;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const NewButtonIcon = styled(Button)`
  display: none;
  background-color: var(--blue-100);
  color: var(--blue-700);
  align-items: center;
  border-radius: 1.4rem;

  @media (max-width: 480px) {
    display: flex;
  }
`;

export const ButtonsArea = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem;
  padding-left: 4rem;
  padding-right: 4rem;
  justify-content: space-between;
  gap: 1rem;

  span {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;

export const CardArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  gap: 3rem;
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

export const NewPostModal = styled(Modal)`
  /* display: flex; */
  /* width: 100% !important; */
  /* justify-content: center; */
  /* align-items: center; */

  .ant-modal-content {
    background-color: var(--blue-100) !important;
    padding-left: 3rem;
    padding-right: 3rem;
  }

  .ant-modal-title {
    background-color: var(--blue-100) !important;
    font-size: 1.5rem;
    color: var(--blue-900);
    padding-bottom: 0.5rem;
  }
`;

export const newPostContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h3 {
    font-size: 1rem;
    color: var(--blue-900);
    padding-left: 0.5rem;
  }
`;

export const newPostDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const SelectArea = styled(Select)`
  width: 100%;
  .ant-select-selector {
    border-radius: 20px;
    background: var(--blue-900) !important;
    color: white;
  }
  .ant-select-selection-placeholder {
    color: #ffffff;
    font-weight: lighter;
  }
  .ant-select-arrow {
    color: #ffffff;
  }
`;

export const TextAreaContainer = styled(TextArea)`
  background-color: var(--gray-100) !important;
  border-radius: 1rem;
  padding: 1rem;
  resize: none !important;

  &:focus {
    outline: none;
    border-color: var(--gray-100);
  }

  &:hover {
    border-color: var(--gray-100);
  }
`;

export const TextAreaError = styled.label`
  display: flex;
  font-size: 0.85rem;
  color: red;
  padding: 0 1rem;
`;

export const TextAreaFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 6rem;
`;
export const TextAreaCancelBtn = styled(Button)`
  background-color: var(--blue-900);
  color: var(--blue-100);
  font-weight: bold;
  border-radius: 20px;
`;

export const TextAreaOkBtn = styled(Button)`
  background-color: var(--blue-300);
  color: var(--blue-900);
  font-weight: bold;
  border-radius: 20px;
`;
export const hamburguerButtons = styled.section`
  display: flex;
  flex-direction: row;
  width: 121%;
  gap: 1rem;
  height: 100%;

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

export const NoPost = styled.h3`
  color: var(--blue-700);
  align-self: center;
`;
