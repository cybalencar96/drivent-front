import { useContext } from "react";
import { DashboardTitle } from "../../../components/DashboardTitle";
import UserContext from "../../../contexts/UserContext";
import { NoContent } from "../../../components/NoContent";
import { PaymentCard } from "../../../components/PaymentCard";
import { DashboardTopicTitle } from "../../../components/DashboardTopicTitle";

const textTopic1 = "Primeiro, escolha sua modalidade de ingresso";
const textTopic2 = "Ótimo! Agora escolha sua modalidade de hospedagem";
const textTopicEnd = "Fechado! O total ficou em R$ 600. Agora é só confirmar:";

export default function Payment() {
  const { userData } = useContext(UserContext);
  const text = "Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem";
  return (
    <>
      <DashboardTitle variant="h4">Ingresso e pagamento</DashboardTitle>
      {
        !userData.user.enrolled ? <NoContent text={text} /> : <PaymentTopic text={textTopic1}/>
      }
    </>
  );
}

function PaymentTopic({ text }) {
  return (
    <>
      <DashboardTopicTitle variant="h6">{text}</DashboardTopicTitle>
      <PaymentCard title="Online" price={100}/>
    </>
  );
}
