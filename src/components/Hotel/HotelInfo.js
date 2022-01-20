import { useEffect, useState } from "react";
import styled from "styled-components";
import useApi from "../../hooks/useApi";

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
    "Em breve"
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
  line-height: 23px;
  color: #8e8e8e;
`;
