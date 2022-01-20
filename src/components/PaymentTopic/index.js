import { useState } from "react";
import styled from "styled-components";
import { PaymentCard } from "../PaymentCard";
import { DashboardTopicTitle } from "../DashboardTopicTitle";

export function PaymentTopic({ topic, text, cards = [], paymentInfos, updatePaymentInfos }) {
  const [selectedCard, setSelectedCard] = useState({});

  const handleClick = (card) => () => {
    setSelectedCard(card);
    paymentInfos[topic] = card;
    updatePaymentInfos({ topic, card });
  };

  return (
    <Container>
      <DashboardTopicTitle variant="h6">{text}</DashboardTopicTitle>
      <div>
        {
          cards.map(card => (
            <PaymentCard 
              key={card.key}
              className="payment-card" 
              title={card.name} 
              price={card.price} 
              selected={selectedCard.key === card.key} 
              onClick={handleClick(card)}
            />
          ))
        }
      </div>
    </Container>
  );
}

const Container = styled.div`
    div {
        display: flex;
        gap: 20px;
    }
`;
