import styled from "styled-components";

export const Container = styled.div<{
  $extend?: boolean;
}>`
  background: var(--blue-500);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 48dvh;
  padding: 2rem;
  border-radius: 2rem;

  @media (min-width: 426px) and (max-width: 1023px) {
    width: ${(props) => (props.$extend ? "100%" : "40dvw")};
    height: 48dvh;
  }
  @media (min-width: 1024px) {
    width: ${(props) => (props.$extend ? "100%" : "16dvw")};
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

export const MaterialArea = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 1.2rem;
  color: #ffffff;
  cursor: pointer;
`;

export const TitleArea = styled.div``;

export const RateArea = styled.div`

`;

export const ButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.25rem;
  font-weight: bold;
  label {
    color: var(--blue-300);
    cursor: pointer;
  }

  svg {
    cursor: pointer;
  }
`;
