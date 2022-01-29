import { useState } from "react";
import LocationSection from "./LocationsSection";
import Title from "./Title";
import UserApi from "../../services/UserApi";
import { useEffect } from "react";
import DateButton from "./DateButton";
import * as helper from "./helpers";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [filterCase, setFilterCase] = useState(null);
  const [clickedOnceAtLeast, setClickedOnceAtLeast] = useState(false);

  function filterSelectionHandler(activity) {
    setFilterCase(helper.formatDateToButtonPattern(activity));
    setClickedOnceAtLeast(true);
  }

  useEffect(() => {
    UserApi
      .getAllEvents()
      .then(response => {
        setActivities(response.data);
        console.log(response.data);})
      .catch(e => console.log(e));
  }, []);

  return (
    <>
      <Title>Escolha de atividades</Title>
      {
        helper
          .getUnique("startDate", activities)
          .map(activity => <DateButton onClick={activity => filterSelectionHandler(activity)}>{helper.formatDateToButtonPattern(activity)}</DateButton>)
      }
      <LocationSection activities={activities}></LocationSection>
    </>
  );
}
