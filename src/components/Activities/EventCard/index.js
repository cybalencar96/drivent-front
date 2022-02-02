import { useContext, useState } from "react";
import styled from "styled-components";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import * as helper from "../helpers";
import UserContext from "../../../contexts/UserContext";
import UserApi from "../../../services/UserApi";
import { styles } from "../../../assets/styles/style";
import { toast } from "react-toastify";

export default function EventCard(props) {
  const { vacancies, uniqueActivity } = props;
  const duration = helper.getDurationInHours(uniqueActivity.startDate, uniqueActivity.endDate);
  const { userData, setUserData } = useContext(UserContext);
  const [isRegistered, setIsRegistered] = useState(isUserRegisteredToEvent());

  function registerToEvent() {
    UserApi.signInEvents(userData.user.id, uniqueActivity.id)
      .then(res => {
        userData.user.events.push(res.data.event);
        setUserData({ ...userData });
        setIsRegistered(isUserRegisteredToEvent());
      })
      .catch(err => {
        if (err.response) {
          if (err.response.data.message.includes("Overlap")) {
            return toast("Não é possivel se registrar neste evento devido a conflito de tempo");
          }
        }
        // eslint-disable-next-line no-console
        console.log(err);
        return toast("Algo de errado aconteceu.");
      });
  }

  function isUserRegisteredToEvent() {
    return !!userData.user.events.map(event => event.id === uniqueActivity.id)[0];
  }

  return (
    <EventCardContainer eventDuration={duration} isRegistered={isRegistered}>
      <LeftSection uniqueActivity={uniqueActivity} />
      <RightSection vacancies={vacancies} registerToEvent={registerToEvent} isRegistered={isRegistered}/>
    </EventCardContainer>
  );
}

const EventCardContainer = styled.div`
    border-radius: 5px;
    background-color: ${props => props.isRegistered ? styles.eventCard.color.signed : "#f1f1f1"};
    padding: 15px 0px 15px 15px;
    width: 100%;
    height: ${props => `${+props.eventDuration * 80}px`};
    margin-bottom: 10px;
    display: flex;
`;
