import styled from "styled-components";

export const Container = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
`;

export const CustomCalendarContainer = styled.div`
  .rbc-calendar {
    background-color: #DCF2F1;
    color: #070F2B;
  }
  .rbc-toolbar {
    background-color: white;
    color: #070F2B;
  }
  .rbc-toolbar button {
    color: #070F2B;
    background-color: #ffff;
    border: 1px solid #070F2B;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 1rem 0;
  }
  .rbc-toolbar button:hover {
    background-color: #7FC7D9;
  }
  .rbc-event {
    background-color: #365486 ;
    border: 1px solid #7FC7D9;
    color: #ffff;
    border-radius: 5px;
    padding: 2px 5px;
  }
  .rbc-day-slot {
    background-color: #DCF2F1;
    
  }
  .rbc-selected-cell {
    background-color:#7FC7D9;
  }
  .rbc-month-view {
    border: 1px solid #7FC7D9;
  }
  .rbc-header {
    background-color: #DCF2F1;
    color: #070F2B;
    text-align: right;
    font-weight: normal;
    padding: 1rem;
    border: 0.2rem solid white;
  }
  .rbc-today {
    background-color:  #A2B5D4;
  }
  .rbc-current-time-indicator {
    background-color: red;
  }
  .rbc-day-bg{
    border: 0.2rem solid white;
  }
  .rbc-off-range-bg {
    background-color: #DCF2F1;
  }
`;

export const DivButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

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

export const Div = styled.div`
  display: flex;
  flex-direction: row; 
  gap: 2rem;
  flex-wrap: wrap; 
  margin: 10px;
`;