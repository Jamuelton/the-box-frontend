import styled from "styled-components";

export const Container = styled.div`
  background: var(--blue-500);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 48dvh;
  padding: 2rem;
  border-radius: 2rem;

  @media (min-width: 426px) and (max-width: 1023px) {
    width: 40dvw;
    height: 48dvh;
  }
  @media (min-width: 1024px) {
    width: 16dvw;
    height: 44dvh;
  }
`;

export const Title = styled.label`
  color: var(--blue-300);
  font-size: 1.2rem;
`;

export const Content = styled.label`
  color: white;
`;

export const LikeArea = styled.div`
  align-self: flex-end;
`;

export const TitleArea = styled.div``;

export const ButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  label {
    color: var(--blue-300);
    cursor: pointer;
  }

  svg {
    cursor: pointer;
  }
`;
