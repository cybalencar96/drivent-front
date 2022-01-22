import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import useApi from "../../hooks/useApi";
import Container from "./container";
import HotelChoice from "./HotelChoice";

export default function HotelInfo() {
  const [ticket, setTicket] = useState(null);
  const api = useApi();
  const { userData } = useContext(UserContext);

  useEffect(() => {
    api.ticket.getTicket().then(res => {
      setTicket(res.data);
    })
      .catch(error => {
      });
  }, [userData]);

  return ticket === null ? (
    ""
  ) : !ticket.isPaid ? (
    <Container>
      <p>Você precisa ter confirmado pagamento antes</p>
      <p>de fazer a escolha de hospedagem</p>
    </Container>
  ) : (
    <HotelChoice ticket={ticket} />
  );
}
