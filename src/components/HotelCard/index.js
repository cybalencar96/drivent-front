import { useEffect, useState } from "react";
import styled from "styled-components";
import useApi from "../../hooks/useApi";
import * as helper from "./helpers";

export default function HotelCard(props) {
  const { hotel } = useApi();
  const [roomsData, setRoomsData] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    hotel
      .getHotelRooms(props.hotelId)
      .then((response) => setRoomsData(response.data))
      .catch(() => alert("Erro"));

    hotel
      .getAvailableRooms(props.hotelId)
      .then((response) => setAvailableRooms(response.data))
      .catch(() => alert("Erro"));
  }, []);

  function selectHotel(index) {
    const clickedHotel = props.selectedHotel[index];

    const newSelectedHotel = [false, false, false];
    if (clickedHotel) {
      props.setSelectedHotel(newSelectedHotel);
      return;
    }
    newSelectedHotel[index] = true;
    props.setSelectedHotel(newSelectedHotel);
  }

  return (
    <CardContainer
      onClick={() => selectHotel(props.index)}
      selectedHotel={props.selectedHotel}
      index={props.index}
    >
      <img alt="" src={props.imageUrl} />
      <h1 className="hotel-name">{props.hotelTitle}</h1>

      <h2 className="info-title">Tipos de acomodação:</h2>
      <p className="info">
        {roomsData ? helper.availableTypes(roomsData) : "..."}
      </p>

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
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${(props) =>
    props.selectedHotel[props.index] ? "#ffeed2" : "#f1f1f1"};
  margin-right: 10px;
  cursor: pointer;

  img {
    width: 100%;
    height: 110px;
    border-radius: 5px;
    margin-bottom: 15px;
  }

  .hotel-name {
    font-size: 16px;
  }

  .info-title {
    font-size: 13px;
    font-weight: bold;
    color: black;
    margin-bottom: 6px;
  }

  .info {
    font-size: 12px;
    margin-bottom: 10px;
  }
`;
