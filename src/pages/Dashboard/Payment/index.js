import { useContext, useState } from "react";
import { DashboardTitle } from "../../../components/DashboardTitle";
import UserContext from "../../../contexts/UserContext";
import { NoContent } from "../../../components/NoContent";
import { PaymentTopic } from "../../../components/PaymentTopic";
import Button from "../../../components/Form/Button";
import {  useHistory } from "react-router";
import TicketInfoContext from "../../../contexts/TicketInfoContext";

const text = {
  topic1: "Primeiro, escolha sua modalidade de ingresso",
  topic2: "Ótimo! Agora escolha sua modalidade de hospedagem",
  topicEnd: "Fechado! O total ficou em R$ 600. Agora é só confirmar:",
  noEnroll: "Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso"
};

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
  const [paymentInfos, setPaymentInfos] = useState({});
  const { setTicketInfo } = useContext(TicketInfoContext);
  const history = useHistory();
  const updatePaymentInfos = (data) => {
    if (data.topic === "ticketType" && data.card.name === "Online") {
      delete paymentInfos.hotelModality;
    }

    paymentInfos[data.topic] = data.card;
    setPaymentInfos({ ...paymentInfos });
  };

  const nextPage = (data) => {
    setTicketInfo(data);
    history.push("/dashboard/details-payment");
  };

  return (
    <>
      <DashboardTitle variant="h4">Ingresso e pagamento</DashboardTitle>
      {
        !userData.user.enrolled ? <NoContent text={text.noEnroll} /> : 
          <>
            <PaymentTopic text={text.topic1} cards={tickets} topic="ticketType" paymentInfos={paymentInfos} updatePaymentInfos={updatePaymentInfos}/>
            { paymentInfos.ticketType?.name === "Presencial" && <PaymentTopic text={text.topic2} cards={hotelModalities} topic="hotelModality" paymentInfos={paymentInfos} updatePaymentInfos={updatePaymentInfos}/> }
            { (paymentInfos.ticketType?.name === "Online" || paymentInfos.hotelModality?.name) &&
              <>
                <PaymentTopic text={text.topicEnd} paymentInfos={paymentInfos} updatePaymentInfos={updatePaymentInfos}/>
                <Button onClick={() => nextPage(paymentInfos)}>RESERVAR INGRESSO</Button>
              </>
            }
          </>
      }
    </>
  );
}
