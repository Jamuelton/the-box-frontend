import styled from "styled-components";

export const Container = styled.div`
  width: 100dvw;
  height: 100dvh;
`;

export const hearder = styled.div`
  height: 10%;
`;

export const Form = styled.section`
  height: 40%;
  background: linear-gradient(
    to right,
    var(--blue-900) 16%,
    var(--blue-700) 47%,
    var(--blue-500) 69%,
    var(--blue-300) 100%
  );
  display: flex;
  justify-content: space-between;
`;

export const About = styled.section`
  height: 50%;
`;

export const TextArea = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 3rem;
  h2 {
    color: var(--blue-300);
  }
  p {
    color: white;
    width: 70%;
  }
`;

export const LoginArea = styled.div`
  width: 50%;
`;
