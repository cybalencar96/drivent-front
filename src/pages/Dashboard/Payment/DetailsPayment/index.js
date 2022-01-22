import { useContext, useState }  from "react";
import TicketInfoContext from "../../../../contexts/TicketInfoContext";
import { Container, DashboardTitle, DashboardTopicTitle, DetailsTicketCard, Details, PriceTotal, CreditCardContainer } from "../../../../components/DetailsTicketCard";
import PaymentForm from "../../../../components/PaymentCreditCard";
import Button from "../../../../components/Form/Button";
import useApi from "../../../../hooks/useApi";
import UserContext from "../../../../contexts/UserContext";
import {  useHistory } from "react-router";
import { toast } from "react-toastify";
import { ConfirmPayment } from "../../../../components/ConfirmPayment";
import styled from "styled-components";
export default function DetailsPayment() {
  const { userData, setUserData } = useContext(UserContext);
  const { ticketInfo } = useContext(TicketInfoContext);
  const [canPay, setCanPay] = useState(false);

  const api = useApi();
  const history = useHistory();
  function submit() {
    let type;
    if (ticketInfo.ticketType.name === "Presencial" && ticketInfo.hotelModality.name === "Com Hotel") {
      type = 1;
    }
    else if (ticketInfo.ticketType.name === "Presencial" && ticketInfo.hotelModality.name === "Sem Hotel") {
      type = 2;
    }
    else {
      type = 3;
    }
    console.log(ticketInfo);
    api.Payment.pay({
      body: {
        user: userData.user.id, type
      }
    }).then(response => {
      toast("Sucesso ao pagar");
      setCanPay(false);
      userData.user.paid = true;
      setUserData({ ...userData });

      // history.push("/payment/confirmation");
    }).catch(error => {
      toast("Já pagou né safado");
      console.log(error);
    });
  }

  if (userData.paid) {
    return; 
  }

  return (
    <Container>
      <DashboardTitle>Ingresso e pagamento</DashboardTitle>
      <DashboardTopicTitle>Ingresso Escolhido</DashboardTopicTitle>
      <DetailsTicketCard>
        {ticketInfo.hotelModality?.name === undefined ? <><Details>{ticketInfo?.ticketType?.name}</Details> <PriceTotal>R$ {ticketInfo?.ticketType?.price}</PriceTotal></> :
          <><Details>{ticketInfo?.ticketType?.name} + {ticketInfo?.hotelModality?.name}</Details><PriceTotal>R$ {ticketInfo?.ticketType?.price + ticketInfo?.hotelModality?.price}</PriceTotal></>
        }
      </DetailsTicketCard>
      <DashboardTopicTitle>Pagamento</DashboardTopicTitle>
      {userData.user.paid && <ConfirmPayment />}
      {!userData.user.paid &&
        <CreditCardContainer>
          <PaymentForm canPay={ canPay } setCanPay={setCanPay}/>
        </CreditCardContainer>
      }
      {canPay && <ButtonRelative onClick={() => submit()}> FINALIZAR PAGAMENTO</ButtonRelative>}
    </Container>
  );
}

const ButtonRelative = styled(Button)`
    position: absolute;
    bottom: 45px;
`;
