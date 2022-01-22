import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import Container from "./container";
import HotelChoice from "./HotelChoice";

export default function HotelInfo() {
  const [ticket, setTicket] = useState(null);
  const api = useApi();

  useEffect(() => {
    const paymentPromise = api.ticket.getTicket();
    paymentPromise.then((res) => setTicket(res.data));
  }, []);

  return ticket === null ? (
    ""
  ) : ticket.isPaid === false ? (
    <Container>
      Você precisa ter confirmado pagamento antes
      <br /> de fazer a escolha de hospedagem
    </Container>
  ) : (
    <HotelChoice ticket={ticket} />
  );
}
