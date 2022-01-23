import styled from "styled-components";
import { ReactComponent as FilledPerson } from "../../assets/images/filledPerson.svg";
import { ReactComponent as GreyPerson } from "../../assets/images/greyPerson.svg";
import beds from "./helpers";
import ClickablePerson from "./ClickablePerson";

export default function Room({
  number,
  totalBeds,
  occupiedBeds,
  selectedRoom,
  setSelectedRoom,
  hotelId,
}) {
  return (
    <Container
      fullRoom={totalBeds === occupiedBeds}
      isThisRoomSelected={
        selectedRoom?.hotelId === hotelId && selectedRoom?.number === number
      }
    >
      <span>{number}</span>
      <PeopleContainer>
        {beds(totalBeds, occupiedBeds).map((bed, i) => {
          if (bed === "free") {
            return (
              <ClickablePerson
                key={i}
                number={number}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                hotelId={hotelId}
                bed={i}
              />
            );
          }
          if (bed === "occupied") {
            return <FilledPerson key={i} />;
          }
          return <GreyPerson key={i} />;
        })}
      </PeopleContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 190px;
  height: 45px;
  border-radius: 10px;
  border: 1px solid #cecece;
  padding: 11px 12.38px 11px 16px;
  position: relative;
  background-color: ${({ fullRoom, isThisRoomSelected }) =>
    fullRoom ? "#e9e9e9" : isThisRoomSelected ? "#ffeed2" : "white"};

  span {
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #454545;
  }
`;

const PeopleContainer = styled.div`
  position: absolute;
  right: 12.38px;
  top: 12.38px;

  svg:not(:last-child) {
    margin-right: 6.75px;
  }
`;
