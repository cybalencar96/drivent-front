import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import LocationSection from "./LocationsSection";
import Title from "./Title";
import UserApi from "../../services/UserApi";
import DateButton from "./DateButton";
import * as helper from "./helpers";
import UserContext from "../../contexts/UserContext";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [filterCase, setFilterCase] = useState(null);
  const [clickedOnceAtLeast, setClickedOnceAtLeast] = useState(false);
  const { userData } = useContext(UserContext);

  function filterSelectionHandler(activity) {
    setFilterCase(helper.formatDateToButtonPattern(activity));
    setClickedOnceAtLeast(true);
  }

  useEffect(() => {
    UserApi.getAllEvents()
      .then((response) => {
        setActivities(response.data);
        console.log(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Title>Escolha de atividades</Title>
      {userData.user.paid === undefined ? (
        <Container>
          <p>Você precisa ter confirmado pagamento antes</p>
          <p>de fazer a escolha de atividades</p>
        </Container>
      ) : userData.user.paid.type.name === "Online" ? (
        <Container>
          <p>Sua modalidade de ingresso não necessita escolher</p>
          <p>atividade. Você terá acesso a todas as atividades.</p>
        </Container>
      ) : (
        <>
          {helper.getUnique("startDate", activities).map((activity) => (
            <DateButton
              onClick={(activity) => filterSelectionHandler(activity)}
            >
              {helper.formatDateToButtonPattern(activity)}
            </DateButton>
          ))}
          <LocationSection activities={activities}></LocationSection>
        </>
      )}
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  max-height: 560px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
  }
`;
