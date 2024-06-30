import styled from "styled-components";

export const Container = styled.div`
    padding: 1rem 8rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;

export const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 20px;
  width: 600px;
  max-width: 90%;
  z-index: 1001;
  background-color: #DCF2F1;
`;

export const Div = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 2rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #7FC7D9;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

export const Title = styled.h4`
  margin: 0;
  font-size: 20px;
  color: #070F2B;
  font-weight: medium;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-Content: flex-end;
  margin-top: 24;
`; 

