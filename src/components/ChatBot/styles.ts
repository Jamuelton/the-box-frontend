import { FloatButton, Modal } from "antd";
import styled from "styled-components";

export const Container = styled.div``;

export const OpenChatButton = styled(FloatButton)`
  background: var(--blue-300);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Chat = styled(Modal)`
  .ant-modal-content {
    background: var(--blue-100);
  }

  .ant-modal-header {
    background: var(--blue-100);
  }

  .ant-modal-title {
    font-size: 1.5rem;
  }

  .ant-modal-footer {
    display: flex;
    align-items: center;
    gap: 1rem;

    svg {
      cursor: pointer;
    }
  }
`;

export const ChatLabel = styled.div`
  background: var(--blue-300);
  padding: 1rem;
  border-radius: 1rem;
`;

export const userLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;

  label {
    font-weight: bold;
  }
`;
