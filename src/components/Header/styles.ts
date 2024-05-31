import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const optionsArea = styled.div`
  display: flex;
  flex-direction: row;
  background-color: var(--blue-900);
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  gap: 5rem;
`;

export const optionTitle = styled.p`
  color: var(--blue-300);
  font-size: 0.85rem;
`;

export const optionDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

export const headerArea = styled.header`
  display: flex;
  background-color: var(--blue-100);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 13dvh;
  box-shadow: 0 7px 7px -5px rgb(0 0 0 / 0.1);
`;

export const logo = styled.img`
  display: flex;
  height: 43px;
  width: 53px;
`;

export const info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 2rem;
  gap: 4rem;
`;

export const icons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 2rem;
  gap: 2rem;
  cursor: pointer;
`;
export const logoArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 1rem;
  gap: 1.5rem;
`;

export const title = styled.p`
  color: var(--blue-900);
  font-size: 1.2rem;
`;

export const link = styled.a`
  color: var(--blue-900);
  font-size: 1rem;
  font-weight: lighter;
  &:hover {
    color: var(--blue-500);
  }
`;
