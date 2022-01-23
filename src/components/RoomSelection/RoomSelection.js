import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import useApi from "../../hooks/useApi";
import Room from "./Room";

export default function RoomSelection({ hotelData }) {
  const [rooms, setRooms] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  console.log(selectedRoom);
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
