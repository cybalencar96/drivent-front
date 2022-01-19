import { useContext } from "react";
import { DashboardTitle } from "../../../components/DashboardTitle";
import UserContext from "../../../contexts/UserContext";
import { NoContent } from "../../../components/NoContent";
import { PaymentTopic } from "../../../components/PaymentTopic";

const textTopic1 = "Primeiro, escolha sua modalidade de ingresso";
const textTopic2 = "Ótimo! Agora escolha sua modalidade de hospedagem";
const textTopicEnd = "Fechado! O total ficou em R$ 600. Agora é só confirmar:";
const textNoEnroll = "Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso";

const tickets = [
  { key: 0, name: "Presencial", price: 250 },
  { key: 1, name: "Online", price: 100 },
];

export default function Payment() {
  const { userData } = useContext(UserContext);
  return (
    <>
      <DashboardTitle variant="h4">Ingresso e pagamento</DashboardTitle>
      {
        !userData.user.enrolled ? <NoContent text={textNoEnroll} /> : 
          <>
            <PaymentTopic text={textTopic1} cards={tickets} topic="ticketType"/>
          </>
      }
    </>
  );
}
