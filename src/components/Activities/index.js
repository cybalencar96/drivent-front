import { useState } from "react";
import LocationSection from "./LocationsSection";
import Title from "./Title";
import UserApi from "../../services/UserApi";
import { useEffect } from "react";
import DateButton from "./DateButton";
import * as helper from "./helpers";

export default function Activities() {
  const [activities, setActivities] = useState([]);

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
        helper.getUnique("startDate", activities).map(activity => <DateButton>{helper.formatDateToButtonPattern(activity)}</DateButton>)
      }
    </>
  );
}
