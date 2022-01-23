import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import useApi from "../../hooks/useApi";
import Room from "./Room";

export default function RoomSelection({
  hotelData,
  selectedRoom,
  setSelectedRoom,
}) {
  const [rooms, setRooms] = useState(null);
  const api = useApi();

  useEffect(() => {
    const roomsPromise = api.hotel.getRoomDetails(hotelData.id);
    roomsPromise.then((res) => setRooms(res.data));
  }, [hotelData.id]);

  return (
    <RoomSelectionContainer>
      <Title>Ótima pedida! Agora escolha seu quarto:</Title>
      <RoomsContainer>
        {rooms &&
          rooms.map((room, i) => (
            <Room
              number={room.number}
              totalBeds={room.totalBeds}
              occupiedBeds={room.occupiedBeds}
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom}
              hotelId={hotelData.id}
              key={i}
            />
          ))}
      </RoomsContainer>
      {selectedRoom ? (
        <ReservationButton>RESERVAR QUARTO</ReservationButton>
      ) : (
        ""
      )}
    </RoomSelectionContainer>
  );
}

const RoomSelectionContainer = styled.div`
  margin-top: 52px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 20px;
  line-height: 23px;
  color: #8e8e8e;
`;

const RoomsContainer = styled.div`
  margin-top: 33px;
  display: flex;

  > div {
    margin-right: 17px;
    margin-bottom: 8px;
  }
`;

const ReservationButton = styled.button`
  width: 182px;
  height: 37px;
  background-color: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  font-size: 14px;
  line-height: 16px;
  font-family: "Roboto", sans-serif;
  margin-top: 38px;
  cursor: pointer;
`;
