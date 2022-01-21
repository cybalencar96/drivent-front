import styled from "styled-components";
import { useState, useContext }  from "react";
import Select from "../../../../components/Form/Select";
import { InputWrapper } from "../../../../components/PersonalInformationForm/InputWrapper";
import { MenuItem } from "@material-ui/core";
import { ErrorMsg } from "../../../../components/PersonalInformationForm/ErrorMsg";
import { useForm } from "../../../../hooks/useForm";
import { FormWrapper } from "../../../../components/PersonalInformationForm/FormWrapper";
import TicketInfoContext from "../../../../contexts/TicketInfoContext";
import { Container, DashboardTitle, DashboardTopicTitle, DetailsTicketCard, Details, PriceTotal } from "../../../../components/DetailsTicketCard";

export default function DetailsPayment() {
  const { ticketInfo } = useContext(TicketInfoContext);
  
  return (
    <Container>
      <DashboardTitle>Ingresso e pagamento</DashboardTitle>
      <DashboardTopicTitle>Ingresso Escolhido</DashboardTopicTitle>
      <DetailsTicketCard>
        {ticketInfo.hotelModality?.name === undefined ? <><Details>{ticketInfo?.ticketType?.name}</Details> <PriceTotal>R$ {ticketInfo?.ticketType?.price}</PriceTotal></> :
          <><Details>{ticketInfo?.ticketType?.name} + {ticketInfo?.hotelModality?.name}</Details><PriceTotal>R$ {ticketInfo?.ticketType?.price + ticketInfo?.hotelModality?.price}</PriceTotal></>
        }
      </DetailsTicketCard>
    </Container>
  );
}
