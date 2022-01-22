import Container from "./container";

export default function HotelChoice({ ticket }) {
  return ticket.hotelPrice === "0.00" || ticket.hotelPrice === null ? (
    <Container>
      Sua modalidade de ingresso não inclui hospedagem
      <br /> Prossiga para a escolha de atividades
    </Container>
  ) : (
    "em breve"
  );
}
