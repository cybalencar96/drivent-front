import styled from "styled-components";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import * as helper from "../helpers";

export default function EventCard(props) {
  const { vacancies, uniqueActivity } = props;
  const duration = helper.getDurationInHours(uniqueActivity.startDate, uniqueActivity.endDate);
  return (
    <EventCardContainer eventDuration={duration}>
      <LeftSection 
        uniqueActivity={uniqueActivity}
      />
      <RightSection vacancies={vacancies} />
    </EventCardContainer>
  );
}

const EventCardContainer = styled.div`
    border-radius: 5px;
    background-color: #f1f1f1;
    padding: 15px 0px 15px 15px;
    width: 100%;
    height: ${props => `${+props.eventDuration * 80}px`};
    margin-bottom: 10px;
    display: flex;
`;
