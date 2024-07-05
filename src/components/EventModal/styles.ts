import styled from "styled-components";

export const ModalOverlay = styled.div.attrs<{ show: boolean }>(({ show }) => ({
  style: {
    display: show ? "block" : "none"
  }
}))`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const ModalContent = styled.div`
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

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #7FC7D9;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

export const ModalTitle = styled.h4`
  margin: 0;
  font-size: 20px;
  color: #070F2B;
  font-weight: medium;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #070F2B;
`;

export const Input = styled.input`
  width: 100%;
  color: #070F2B;
  padding: 8px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
`;

export const InputDate = styled.div`
  background-color: #A2B5D4;
  border-radius: 20px;
  padding: 10%;
  border: none;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const InputDiv = styled.div`
  display: flex; 
  align-items: center; 
  margin-top: 5px;
  font-size: 12px; 
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-Content: space-around;
  margin-top: 24;
`; 

export const ModalBody = styled.div`
  padding: 20px 0;
  width: 100%;
`;

// Estilo para o rodapé do modal
export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid #eaeaea;
  padding-top: 10px;
`;