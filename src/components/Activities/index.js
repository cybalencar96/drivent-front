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

  function filterVeryfier(activity) {
    const condition = (helper.formatDateToButtonPattern(activity.startDate) === filterCase);
    return condition;
  }

  useEffect(() => {
    UserApi
      .getAllEvents()
      .then(response => setActivities(response.data))
      .catch(e => console.log(e));
  }, []);

  return (
    <>
      <Title>Escolha de atividades</Title>
      {
        helper
          .getUnique("startDate", activities)
          .map(activity => <DateButton key={activity} onClick={() => filterSelectionHandler(activity)} colorize={helper.formatDateToButtonPattern(activity) === filterCase}>{helper.formatDateToButtonPattern(activity)}</DateButton>)
      }
      {
        clickedOnceAtLeast
          ? <LocationSection activities={activities.filter(activity => filterVeryfier(activity))} />
          : void(0)
      }
    </>
  );
}
