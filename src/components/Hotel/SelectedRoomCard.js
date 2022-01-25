import { useContext } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import useApi from "../../hooks/useApi";

export default function SelectedRoomCard(props) {
  const { hotel } = useApi();
  const { userData } = useContext(UserContext);

  return (
    <CardContainer>
      <img alt="" src={props.imageUrl} />
      <h1 className="hotel-name">{props.hotelTitle}</h1>

      <h2 className="info-title">Quarto reservado:</h2>
      <p className="info">{`${props.roomNumber} (${props.type})`}</p>

      <h2 className="info-title">Pessoas no seu quarto:</h2>
      <p className="info">{props.amount > 1 ? `Você e mais ${props.amount - 1}` : "Só você"}</p>
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
  background-color: ${({ selectedHotel, index }) =>
    selectedHotel === index ? "#ffeed2" : "#f1f1f1"};
  margin-right: 10px;
  cursor: pointer;

  h1 {
    margin-bottom: 10px;
    font-size: 20px;
    line-height: 23px;
  }

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
