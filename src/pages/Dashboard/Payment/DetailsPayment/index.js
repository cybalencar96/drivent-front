import { useContext, useState }  from "react";
import TicketInfoContext from "../../../../contexts/TicketInfoContext";
import { Container, DashboardTitle, DashboardTopicTitle, DetailsTicketCard, Details, PriceTotal, CreditCardContainer, ButtonRelative } from "../../../../components/DetailsTicketCard";
import PaymentForm from "../../../../components/PaymentCreditCard";
import useApi from "../../../../hooks/useApi";
import UserContext from "../../../../contexts/UserContext";
import { toast } from "react-toastify";
import { ConfirmPayment } from "../../../../components/ConfirmPayment";
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
