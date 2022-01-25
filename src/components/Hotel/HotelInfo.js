import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import useApi from "../../hooks/useApi";
import Container from "./container";
import HotelChoice from "./HotelChoice";
import SelectedRoomCard from "./SelectedRoomCard";

export default function HotelInfo() {
  const [ticket, setTicket] = useState(null);
  const api = useApi();
  const { userData, changeRoomMode, setChangeRoomMode } = useContext(UserContext);

  useEffect(() => {
    let unmounted = false;
    api.ticket.getTicket().then(res => {
      if(!unmounted) setTicket(res.data);
    })
      .catch(error => {
      });
    return () => { unmounted = true; };
  }, [userData]);

  return (
    <HotelInfoContainer>
      {
        ticket === null
          ? ""
          : !ticket.isPaid 
            ? <Container>
              <p>Você precisa ter confirmado pagamento antes</p>
              <p>de fazer a escolha de hospedagem</p>
            </Container>
            : !changeRoomMode && userData.user.reservation
              ? <SelectedRoomCard 
                imageUrl={userData.user.reservation.room.hotel.imageUrl}
                hotelTitle={userData.user.reservation.room.hotel.name}
                roomNumber={userData.user.reservation.room.number}
                amount={userData.user.reservation.amount}
                type={userData.user.reservation.room.type.name}
              />
              : <HotelChoice ticket={ticket} />
      }
      {
        !changeRoomMode 
          ? <ChangeButton onClick={() => setChangeRoomMode(true)}>Trocar de quarto</ChangeButton>
          : void(0)
        
      }
    </HotelInfoContainer>
  );
}

const HotelInfoContainer = styled.div`
position: relative;
height: 100%;
width: 100%;
`;

const ChangeButton = styled.button`
width: 180px;
height: 40px;
border-radius: 5px;
background-color: #E0E0E0;
color: black;
font-family: "Roboto", sans-serif;
position: absolute;
bottom: 20px;
left: 20px;
box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
border: none;
outline: none;
font-size: 16px;
cursor: pointer;
`;
