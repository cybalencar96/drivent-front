import Container from "./container";

export default function HotelChoice({ ticket }) {
  return ticket.hotelPrice === "0.00" || ticket.hotelPrice === null ? (
    <Container>
      <p>Sua modalidade de ingresso não inclui hospedagem</p>
      <p>Prossiga para a escolha de atividades</p>
    </Container>
  ) : (
    "em breve"
  );
}
