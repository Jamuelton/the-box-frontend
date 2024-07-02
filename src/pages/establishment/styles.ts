import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

`;

export const Title = styled.div`
  width: 100%;
  padding: 1rem;
`;

export const Wrapper = styled.div`
  display: flex;  
  flex-direction: row;
  padding: 4rem 2rem 0 3rem;
  gap: 6rem;
`;

export const ColumnContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SpanLine = styled.span`
  display: flex;
  flex-direction: row;
  gap: 6rem
`;

export const EstablishmentInfo = styled.section`
    display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

export const InfoEstablishmentContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 3.25rem;
`;

export const InfoEstablishmentTitleText = styled.div`
  color: var(--blue-500);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
  `;


export const InfoEstablishmentValueText = styled.div`
  font-size: 16px;
  font-weight: 700;
  max-width: 400px;
`;

export const EstablishmentGrouped = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ImageEstablishmentContainer = styled.div`
  position: relative;
  display: flex;
  width: 440px;
  height: 270px;

  .rectangle-blue {
    position: absolute;
    top: 0;
    left: 0;
    width: 440px;
    height: 260px;
    background: #7FC7D9;
    border-radius: 20px;
  }

  .rectangle-grey {
    position: absolute;
    top: 1rem;
    right: 0.8rem; 
    width: 440px;
    height: 262px;
    background: #DCE2E3;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 20px;
    color: #000000;
  }
`;

export const Img = styled.div``;

export const RateEstablishment = styled.div`
display: flex;
`;

export const AvaliationEstablishmentContainer = styled.div`
display: flex;
`;
