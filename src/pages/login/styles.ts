import styled from "styled-components";

export const Container = styled.div`
  width: 100dvw;
  height: 100dvh;
`;

export const hearder = styled.div`
  height: 10%;
`;

export const Form = styled.section`
  background: linear-gradient(
    to right,
    var(--blue-900) 16%,
    var(--blue-700) 47%,
    var(--blue-500) 69%,
    var(--blue-300) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 426px) and (max-width: 1023px) {
    flex-direction: row;
  }
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

export const TextArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 3rem;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    gap: 1rem;

    @media (min-width: 426px) and (max-width: 1023px) {
      width: 100%;
      align-items: flex-start;
    }
    @media (min-width: 1024px) {
      width: 70%;
      align-items: flex-start;
    }
  }
  h2 {
    color: var(--blue-300);
  }
  p {
    color: white;
    width: 70%;
  }

  @media (min-width: 426px) and (max-width: 1023px) {
    width: 40%;
  }
  @media (min-width: 1024px) {
    width: 50%;
  }
`;

export const LoginArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 2rem 3rem;

  @media (min-width: 426px) and (max-width: 1023px) {
    width: 60%;
  }
  @media (min-width: 1024px) {
    width: 50%;
  }
`;

export const Login = styled.div`
  background: white;
  height: 100%;
  width: 100%;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;

  @media (min-width: 426px) and (max-width: 1023px) {
    width: 100%;
  }
  @media (min-width: 1024px) {
    width: 70%;
  }

  h3 {
    align-self: center;
  }
`;

export const LoginFormPassword = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  span {
    text-decoration: underline;
    font-size: small;
    align-self: flex-end;
    cursor: pointer;
  }

  @media (min-width: 426px) and (max-width: 1023px) {
    flex-direction: row;
  }
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

export const LoginFormButton = styled.div`
  align-self: flex-end;
`;

export const About = styled.section`
  height: 40%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CarouselArea = styled.div`
  height: 100%;
`;
