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
  justify-content: space-between;

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
  margin: 10px 0 0;
  font-size: 16px;
  padding: 2rem 0 2rem 0;
`;

export const LikeArea = styled.div`
  align-self: flex-end;
`;

export const TitleArea = styled.div``;

export const RateArea = styled.div`

`;

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
