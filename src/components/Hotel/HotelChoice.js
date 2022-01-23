import Container from "./container";
import useApi from "../../hooks/useApi";
import styled from "styled-components";
import { useState, useEffect } from "react";
import HotelCard from "../HotelCard";
import RoomSelection from "../RoomSelection/RoomSelection";

export default function HotelChoice({ ticket }) {
  const { hotel } = useApi();
  const [hotelsData, setHotelsData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState([false, false, false]);

  useEffect(() => {
    hotel
      .getHotels()
      .then((response) => setHotelsData(response.data))
      .catch(() => alert("Erro"));
  }, []);

  return ticket.hotelPrice === "0.00" || ticket.hotelPrice === null ? (
    <Container>
      <p>Sua modalidade de ingresso não inclui hospedagem</p>
      <p>Prossiga para a escolha de atividades</p>
    </Container>
  ) : (
    <HotelSectionContainer>
      <h1>Escolha de hotel e quarto:</h1>
      <h2>Primeiro, escolha seu hotel</h2>

      <div>
        {hotelsData?.map((hotel, i) => (
          <HotelCard
            key={hotel.id}
            hotelId={hotel.id}
            imageUrl={hotel.imageUrl}
            hotelTitle={hotel.name}
            selectedHotel={selectedHotel}
            setSelectedHotel={setSelectedHotel}
            index={i}
          />
        ))}
      </div>
      {selectedHotel.some((hotel) => hotel === true) ? (
        <RoomSelection hotelData={hotelsData[selectedHotel.indexOf(true)]} />
      ) : (
        ""
      )}
    </HotelSectionContainer>
  );
}

const HotelSectionContainer = styled.section`
  font-family: "Roboto", sans-serif;

  > h1 {
    margin-bottom: 40px;
    font-size: 30px;
  }

  > h2 {
    color: #8e8e8e;
    font-size: 20px;
    margin-bottom: 20px;
  }

  > div {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;
