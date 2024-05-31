import styled from "styled-components";

export const Container = styled.div`
  background: var(--blue-500);
  display: flex;
  flex-direction: column;
  width: 25dvw;
  height: 100%;
  padding: 2rem;
  border-radius: 2rem;
  gap: 2rem;
`;

export const Title = styled.label`
  color: var(--blue-300);
  font-size: 1.5rem;
`;

export const Content = styled.label`
  color: white;
`;
