/* eslint-disable */
import HotelCard from "../../../components/HotelCard";
import useApi from "../../../hooks/useApi";
import styled from "styled-components";
import { useEffect, useState } from "react";

export default function Hotel() {
  const { hotel } = useApi();
  const [ hotelsData, setHotelsData ] = useState([]);

  useEffect(() => {
    hotel.getHotels()
      .then(response => setHotelsData(response.data))
      .catch(() => alert("Erro"));
  }, []);

  return (
    <HotelSectionContainer>
      <h1>Escolha de hotel e quarto</h1>
      <h2>Primeiro, escolha seu hotel</h2>

      <div>{
          hotelsData?.map(hotel => 
            <HotelCard
              key={hotel.id}
              hotelId={hotel.id}
              imageUrl={hotel.imageUrl}
              hotelTitle={hotel.name}
            />)
    }</div>
    </HotelSectionContainer>
  );
}

const HotelSectionContainer = styled.section`
font-family: 'Roboto', sans-serif;

h1 {
    margin-bottom: 40px;
    font-size: 20px;
}

h2 {
    color: #8E8E8E;
    font-size: 14px;
    margin-bottom: 20px;
}

div {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}
`;
