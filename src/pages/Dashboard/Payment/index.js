import { useContext, useState } from "react";
import { DashboardTitle } from "../../../components/DashboardTitle";
import UserContext from "../../../contexts/UserContext";
import { NoContent } from "../../../components/NoContent";
import { PaymentTopic } from "../../../components/PaymentTopic";
import Button from "../../../components/Form/Button";
import {  useHistory } from "react-router";
import TicketInfoContext from "../../../contexts/TicketInfoContext";

const textTopic1 = "Primeiro, escolha sua modalidade de ingresso";
const textTopic2 = "Ótimo! Agora escolha sua modalidade de hospedagem";
const textNoEnroll = "Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso";

const tickets = [
  { key: 0, name: "Presencial", price: 250 },
  { key: 1, name: "Online", price: 100 },
];

const hotelModalities = [
  { key: 0, name: "Sem Hotel", price: 0 },
  { key: 1, name: "Com Hotel", price: 350 },
];

export default function Payment() {
  const { userData } = useContext(UserContext);
  const { setTicketInfo } = useContext(TicketInfoContext);
  const [paymentInfos, setPaymentInfos] = useState({});

  const history = useHistory();

  const textTopicEnd = `Fechado! O total ficou em R$ ${paymentInfos?.hotelModality === undefined ? paymentInfos?.ticketType?.price :  paymentInfos?.hotelModality?.price + paymentInfos?.ticketType?.price}. Agora é só confirmar:`;

  const updatePaymentInfos = (data) => {
    if (data.topic === "ticketType" && data.card.name === "Online") {
      delete paymentInfos.hotelModality;
    }

    paymentInfos[data.topic] = data.card;
    setPaymentInfos({ ...paymentInfos });
  };

  const nextPage = (data) => {
    setTicketInfo(data);
    history.push("/dashboard/payment/details");
  };

  if (userData.user.paid) {
    history.push("/dashboard/payment/details");
  }

  return (
    <>
      <DashboardTitle variant="h4">Ingresso e pagamento</DashboardTitle>
      {
        !userData.user.enrolled ? <NoContent text={textNoEnroll} /> : 
          <>
            <PaymentTopic text={textTopic1} cards={tickets} topic="ticketType" paymentInfos={paymentInfos} updatePaymentInfos={updatePaymentInfos}/>
            { paymentInfos.ticketType?.name === "Presencial" && <PaymentTopic text={textTopic2} cards={hotelModalities} topic="hotelModality" paymentInfos={paymentInfos} updatePaymentInfos={updatePaymentInfos}/> }
            { (paymentInfos.ticketType?.name === "Online" || paymentInfos.hotelModality?.name) &&
              <>
                <PaymentTopic text={textTopicEnd} paymentInfos={paymentInfos} updatePaymentInfos={updatePaymentInfos}/>
                <Button onClick={() => nextPage(paymentInfos)}>RESERVAR INGRESSO</Button>
              </>
            }
          </>
      }
    </>
  );
}
