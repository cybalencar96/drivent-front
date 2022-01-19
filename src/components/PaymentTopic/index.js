import { useContext, useState } from "react";
import styled from "styled-components";
import { PaymentCard } from "../PaymentCard";
import { DashboardTopicTitle } from "../DashboardTopicTitle";
import UserContext from "../../contexts/UserContext";

export function PaymentTopic({ topic, text, cards }) {
  const [selectedCard, setSelectedCard] = useState({});
  const { userData, setUserData } = useContext(UserContext);

  const handleClick = (card) => () => {
    setSelectedCard(card);
    userData[topic] = card;
    setUserData({ ...userData });
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
