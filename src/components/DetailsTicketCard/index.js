import styled from "styled-components";

export const DetailsTicketCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FFEED2;
  color: #454545;
  width: 290px;
  height: 108px;
  text-align: center;
  border-radius: 20px;

`;

export const DashboardTopicTitle = styled.h1`
  font-family: "Roboto", sans-serif;
  color: #8e8e8e;
  font-size: 20px;
  line-height: 23px;
  margin: 30px 0 !important;
`;

export const DashboardTitle = styled.h1`
  font-family: "Roboto", sans-serif;
  font-size: 34px;
  margin-bottom: 20px!important;
`;
export const Details = styled.p`
    color: #454545;
`;

export const PriceTotal = styled.p`
  font-family: "Roboto", sans-serif;
  display: block;

  color: #898989 !important;
`;

export const CreditCardContainer = styled.div`
    position: relative;
    width: 90%;
    display: flex;
`;

export const Container = styled.div`
    div {
        margin: 0;
        gap: 20px;
    }
`;

export const ButtonRelative = styled.button`
    position: absolute;
    font-weight: 500;
    height: 37.7px;
    width: 182px;
    border-radius: 4px;
    bottom: 10px;
    background-color: #e0e0e0;
    border: none;
    color: #000000;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    cursor: pointer;
`;
