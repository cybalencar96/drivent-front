import { useEffect, useState } from "react";
import styled from "styled-components";
import useApi from "../../hooks/useApi";

export default function HotelInfo() {
  const [isPaid, setIsPaid] = useState(null);
  const api = useApi();

  useEffect(() => {
    const paymentPromise = api.payment.getPaymentStatus();
    paymentPromise.then((res) => setIsPaid(res.data.isPaid));
  }, []);

  return isPaid === null ? (
    ""
  ) : isPaid === false ? (
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
