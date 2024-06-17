import { Modal } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const optionsArea = styled.div`
  display: flex;
  flex-direction: row;
  background-color: var(--blue-900);
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  gap: 5rem;

  @media (min-width: 500px) and (max-width: 1080px) {
    gap: 1.5rem;
  }

  @media (max-width: 680px) {
    display: none;
  }
`;

export const hamburguerSection = styled.section`
  display: none;
  color: var(--blue-300);

  @media (max-width: 680px) {
    display: flex;
  }
`;

export const hamburguerOptions = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--blue-900);

  @media (min-width: 680px) {
    display: none;
  }
`;

export const hamburguerDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  padding: 0.7rem;
  border-bottom: 0.01px solid var(--blue-300);
`;

export const optionTitle = styled.p`
  color: var(--blue-300);
  font-size: 0.85rem;
`;

export const optionDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

export const headerArea = styled.header`
  display: flex;
  background-color: var(--blue-100);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 13dvh;
  box-shadow: 0 7px 7px -5px rgb(0 0 0 / 0.1);
`;

export const logo = styled.img`
  display: flex;
  height: 43px;
  width: 53px;
`;

export const info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 2rem;
  gap: 4rem;
`;

export const icons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 2rem;
  gap: 2rem;
  cursor: pointer;

  @media (max-width: 380px) {
    gap: 0.7rem;
  }
`;
export const logoArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 1rem;
  gap: 1.5rem;
`;

export const title = styled.p`
  color: var(--blue-900);
  font-size: 1.2rem;

  @media (max-width: 380px) {
    font-size: 1rem;
  }
`;

export const link = styled.a`
  color: var(--blue-900);
  font-size: 1rem;
  font-weight: lighter;
  &:hover {
    color: var(--blue-500);
  }
`;

export const LogoutArea = styled.label`
  color: #ff0000;
  text-decoration: underline;
  font-weight: 700;
  cursor: pointer;
`;

export const NotificationModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  color: var(--blue-900);
  border-radius: 1.2rem;

  .ant-modal-title {
    background-color: var(--blue-100);
    color: var(--blue-900);
    font-size: 1.6rem;
  }

  .ant-modal-header {
    margin: 0;
  }

  .ant-modal-content {
    max-height: 30rem;
    background-color: var(--blue-100);
    overflow: scroll;
  }

  .ant-modal-content::-webkit-scrollbar {
    width: 4px !important;
  }

  .ant-modal-content::-webkit-scrollbar-track {
    background-color: #e1e6e6 !important;
  }

  .ant-modal-content::-webkit-scrollbar-thumb {
    border-radius: 6px !important;
    background-color: var(--blue-500);
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const ModalCard = styled.div`
  background-color: var(--blue-300);
  border-radius: 1.2rem;
  padding: 1rem;
  padding-left: 1.5rem;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: var(--blue-900);
  }

  h3 {
    font-weight: bolder;
  }
`;

export const Clean = styled.p`
  display: flex;
  font-size: 1.2rem;
  font-weight: bold;
  justify-content: flex-end;
  padding-bottom: 1rem;
`;
