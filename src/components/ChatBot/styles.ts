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
  .ant-modal-footer {
    display: flex;
    align-items: center;
    gap: 1rem;

    svg {
      cursor: pointer;
    }
  }
`;
