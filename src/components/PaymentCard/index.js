import styled from "styled-components";
import { styles } from "../../assets/styles/style";

export function PaymentCard({ title, price, selected = false }) {
  return (
    <Container selected={selected}>
      <p className="title">{title}</p>
      <p className="price">R$ {price}</p>
    </Container>
  );
}

const Container = styled.div`
    width: 145px;
    height: 145px;

    border-radius: 20px;
    border: 1px solid ${props => props.selected ? styles.paymentCard.selected.background : styles.paymentCard.borderColor};
    background-color: ${props => props.selected && styles.paymentCard.selected.background};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 16px;
    gap: 5px;

    .price {
        color: ${styles.paymentCard.secondary};
        font-size: 14px;
    }
`;
