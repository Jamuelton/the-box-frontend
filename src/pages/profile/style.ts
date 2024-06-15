import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;
`;

export const titlearea = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.4rem;
  gap: 1rem;
  color: var(--blue-900);

  svg {
    cursor: pointer;
  }
`;

export const formArea = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const InputArea = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  width: 70%;
  gap: 2rem;
  font-weight: bolder;

  .ant-btn {
    padding-left: 1.8rem;
    padding-right: 1.8rem;
    align-self: flex-end;
  }

  .ant-input {
    background-color: var(--blue-100) !important;
    padding: 0.9rem;
    font-weight: bolder;
    color: var(--blue-900);
  }
  @media (max-width: 460px) {
    width: 100%;
  }
`;
