import { useEffect, useState } from "react";
import styled from "styled-components";
import useApi from "../../hooks/useApi";
import * as helper from "./helpers";

export default function HotelCard(props) {
  const { hotel } = useApi();
  const [ roomsData, setRoomsData] = useState([]);
  const [ availableRooms, setAvailableRooms ] = useState([]);

  useEffect(() => {
    hotel.getHotelRooms(props.hotelId)
      .then(response => setRoomsData(response.data))
      .catch(() => alert("Erro"));

    hotel.getAvailableRooms(props.hotelId)
      .then(response => setAvailableRooms(response.data))
      .catch(() => alert("Erro"));
  }, []);

  return (
    <CardContainer>
      <img alt="" src={props.imageUrl} />
      <h1 className="hotel-name">{props.name}</h1>

      <h2 className="info-title">Tipos de acomodação:</h2>
      <p className="info">{roomsData ? helper.availableTypes(roomsData) : "..." }</p>

      <h2 className="info-title">Vagas Disponíveis:</h2>
      <p className="info">{availableRooms.length}</p>
    </CardContainer>
  );
}

const CardContainer = styled.div`
width: 190px;
height: 260px;
padding: 20px;
border-radius: 10px;
font-family: 'Roboto', sans-serif;
display: flex;
flex-direction: column;
align-items: flex-start;
background-color: #F1F1F1;
margin-right: 10px;
cursor: pointer;

img {
    width: 100%;
    height: 110px;
    border-radius: 5px;
}

.hotel-name {
    font-size: 16px;
}

.info-title {
    font-size: 14px;
    font-weight: bolder;
}

.info {
    font-size: 12px;
}
`;
