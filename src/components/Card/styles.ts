import styled from "styled-components";

export const Container = styled.div<{
  $extend?: boolean;
}>`
  background: var(--blue-500);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 48dvh;
  padding: 22px;
  border-radius: 30px;
  justify-content: space-around;

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
  font-size: 20px;

  font-weight: bold;
`;

export const Content = styled.label`
  color: white;
  word-break: break-word;
  white-space: pre-wrap;
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

export const TitleArea = styled.div`
  section {
    display: flex;
    justify-content: space-between;
    p {
      color: white;
    }
  }
`;

export const RateArea = styled.div``;

export const ButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: var(--blue-300);

  svg {
    cursor: pointer;
  }
`;

export const FooterArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AuthorName = styled.label`
  color: white;
`;
