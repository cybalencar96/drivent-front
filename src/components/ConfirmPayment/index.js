import styled from "styled-components";
import check from "../../assets/images/Group.png";

export function ConfirmPayment() {
  return (
    <Container>
      <img src={check} alt='check-mark' />
      <Text><Strong>Pagamento confirmado!</Strong> Prossiga para escolha de hospedagem e atividades</Text>
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    color:#454545;
    line-height: 20px;
`;

const Text = styled.h1``;

const Strong = styled.h1`
    font-weight: bold;
`;
