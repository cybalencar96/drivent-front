import { ReactComponent as Person } from "../../assets/images/person.svg";
import { ReactComponent as SelectedPerson } from "../../assets/images/selectedPerson.svg";

export default function ClickablePerson({
  roomId,
  selectedRoom,
  setSelectedRoom,
  hotelId,
  bed,
}) {
  function isThisSelected() {
    return (
      selectedRoom?.hotelId === hotelId &&
      selectedRoom?.bed === bed &&
      selectedRoom?.roomId === roomId
    );
  }
  function handleClick() {
    if (isThisSelected()) {
      setSelectedRoom(null);
    } else {
      setSelectedRoom({ roomId, hotelId, bed });
    }
  }

  return isThisSelected() ? (
    <SelectedPerson onClick={handleClick} style={{ cursor: "pointer" }} />
  ) : (
    <Person onClick={handleClick} style={{ cursor: "pointer" }} />
  );
}
