import styled from "styled-components";

export const Container = styled.div`
  background: var(--blue-500);
  width: 100%;
  padding: 1rem;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  @media (min-width: 426px) and (max-width: 1023px) {
    width: 50%;
  }
  @media (min-width: 1024px) {
    width: 16%;
  }

  label {
    cursor: pointer;
    color: var(--blue-300);
    font-weight: 700;
    width: 80%;
    text-align: center;
  }
`;
