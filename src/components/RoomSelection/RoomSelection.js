import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import useApi from "../../hooks/useApi";
import Room from "./Room";

export default function RoomSelection({
  hotelData,
  selectedRoom,
  setSelectedRoom,
}) {
  const [rooms, setRooms] = useState(null);
  const { userData, setUserData, changeRoomMode, setChangeRoomMode } = useContext(UserContext);
  const api = useApi();

  useEffect(() => {
    let unmounted = false;
    const roomsPromise = api.hotel.getRoomDetails(hotelData.id);
    roomsPromise.then((res) => {
      if(!unmounted) setRooms(res.data);
    });

    return () => { unmounted = true; };
  }, [hotelData.id]);

  function submit() {
    const reservationPromise = api.hotel.makeReservation(selectedRoom.roomId);
    reservationPromise
      .then((res) => {
        userData.user.reservation = res.data;
        setUserData({
          ...userData,
        });
        toast("Reserva realizada");
        setChangeRoomMode(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <RoomSelectionContainer>
      {userData.user.reservation && !changeRoomMode? (
        "Já pediu"
      ) : (
        <>
          <Title>Ótima pedida! Agora escolha seu quarto:</Title>
          <RoomsContainer>
            {rooms &&
              rooms.map((room, i) => (
                <Room
                  roomId={room.id}
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
            <ReservationButton onClick={submit}>
              RESERVAR QUARTO
            </ReservationButton>
          ) : (
            ""
          )}
        </>
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
