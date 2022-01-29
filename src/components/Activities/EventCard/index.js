import styled from "styled-components";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

export default function EventCard() {
  return (
    <EventCardContainer>
      <LeftSection />
      <RightSection />
    </EventCardContainer>
  );
}

const EventCardContainer = styled.div`
    border-radius: 5px;
    background-color: #f1f1f1;
    padding: 5px;
    width: 100%;
`;
