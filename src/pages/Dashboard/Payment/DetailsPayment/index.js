import { useContext, useState }  from "react";
import TicketInfoContext from "../../../../contexts/TicketInfoContext";
import { Container, DashboardTitle, DashboardTopicTitle, DetailsTicketCard, Details, PriceTotal, CreditCardContainer } from "../../../../components/DetailsTicketCard";
import PaymentForm from "../../../../components/PaymentCreditCard";
import Button from "../../../../components/Form/Button";
import useApi from "../../../../hooks/useApi";
import UserContext from "../../../../contexts/UserContext";
import { toast } from "react-toastify";
import { ConfirmPayment } from "../../../../components/ConfirmPayment";
import styled from "styled-components";
export default function DetailsPayment() {
  const { userData, setUserData } = useContext(UserContext);
  const { ticketInfo } = useContext(TicketInfoContext);
  const [canPay, setCanPay] = useState(false);

  const api = useApi();

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

    api.Payment.pay({
      body: {
        user: userData.user.id, type
      }
    }).then(response => {
      toast("Sucesso ao pagar");
      setCanPay(false);
      userData.user.paid = true;
      setUserData({ ...userData });
    }).catch(error => {
      toast("Já pagou né safado");
    });
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

const ButtonRelative = styled.button`
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
