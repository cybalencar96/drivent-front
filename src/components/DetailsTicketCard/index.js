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
  margin: 10px 0 !important;
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
    display: flex;
`;

export const Container = styled.div`
    div {
        margin: 0;
        gap: 20px;
    }
`;
