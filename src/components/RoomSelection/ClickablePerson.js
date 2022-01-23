import { ReactComponent as Person } from "../../assets/images/person.svg";
import { ReactComponent as SelectedPerson } from "../../assets/images/selectedPerson.svg";

export default function ClickablePerson({
  number,
  selectedRoom,
  setSelectedRoom,
  hotelId,
  bed,
}) {
  function isThisSelected() {
    return (
      selectedRoom?.number === number &&
      selectedRoom?.hotelId === hotelId &&
      selectedRoom?.bed === bed
    );
  }
  function handleClick() {
    if (isThisSelected()) {
      setSelectedRoom(null);
    } else {
      setSelectedRoom({ number, hotelId, bed });
    }
  }

  return isThisSelected() ? (
    <SelectedPerson onClick={handleClick} />
  ) : (
    <Person onClick={handleClick} />
  );
}
