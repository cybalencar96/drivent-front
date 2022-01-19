import { useContext } from "react";
import { DashboardTitle } from "../../../components/DashboardTitle";
import UserContext from "../../../contexts/UserContext";
import { NoContent } from "../../../components/NoContent";

export default function Payment() {
  const { userData } = useContext(UserContext);
  const text = "Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem";
  return (
    <>
      <DashboardTitle variant="h4">Ingresso e pagamento</DashboardTitle>
      {
        !userData.user.enrolled ? <NoContent text={text} /> : ""
      }
    </>
  );
}
