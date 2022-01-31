import { useContext, useEffect, useState }  from "react";
import TicketInfoContext from "../../../../contexts/TicketInfoContext";
import { Container, DashboardTitle, DashboardTopicTitle, DetailsTicketCard, Details, PriceTotal, CreditCardContainer } from "../../../../components/DetailsTicketCard";
import PaymentForm from "../../../../components/PaymentCreditCard";
import useApi from "../../../../hooks/useApi";
import UserContext from "../../../../contexts/UserContext";
import { ConfirmPayment } from "../../../../components/ConfirmPayment";
export default function DetailsPayment() {
  const { userData, setUserData } = useContext(UserContext);
  const { ticketInfo, setTicketInfo } = useContext(TicketInfoContext);
  const [canPay, setCanPay] = useState(false);

  const api = useApi();

  useEffect(() => {
    if (userData.user?.paid?.type) {
      setTicketInfo({
        hotelModality: {
          name: userData.user.paid.type.name.split("+")[1],
          price: Math.floor(userData.user.paid.type.hotelPrice)
        },
        ticketType: {
          name: userData.user.paid.type.name.split("+")[0],
          price: Math.floor(userData.user.paid.type.price)
        }
      });
    }
  }, [userData]);

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
          <PaymentForm userData={userData} setUserData={setUserData} ticketInfo={ticketInfo} api={api} canPay={ canPay } setCanPay={setCanPay}/>
        </CreditCardContainer>
      }
    </Container>
  );
}
