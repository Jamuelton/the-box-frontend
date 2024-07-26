import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Content = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  section {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 426px) and (max-width: 1023px) {
    }
    @media (min-width: 1024px) {
      justify-content: flex-end;
      height: 70dvh;
    }
  }
`;

export const CardArea = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 5rem;

  @media (min-width: 426px) and (max-width: 1023px) {
    justify-content: center;
  }
  @media (min-width: 1024px) {
    width: 90%;
    justify-content: flex-start;
  }
`;
