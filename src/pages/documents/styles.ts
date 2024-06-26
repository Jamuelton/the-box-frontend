import { Dropdown } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
`;

export const FilterArea = styled.div`
  padding: 1rem;
  display: flex;
  width: 100%;
  justify-content: flex-end;

  span {
    display: flex;
    width: 50%;
    gap: 1rem;
    justify-content: flex-end;
  }
`;

export const CardsArea = styled.div``;

export const hamburguerButtons = styled.section`
  display: flex;
  flex-direction: row;
  width: 121%;
  gap: 1rem;

  @media (max-width: 680px) {
    display: none;
  }
`;
export const hamburguerSection = styled(Dropdown)`
  display: none;
  color: var(--blue-700);

  @media (max-width: 680px) {
    display: flex;
  }
`;
