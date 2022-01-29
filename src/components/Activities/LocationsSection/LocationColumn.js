import styled from "styled-components";

export default function LocationColumn(props) {
  const { location } = props;

  return (
    <LocationColumnContainer>
      <h1>{location}</h1>
      <div>
        "Renderizar os cards aqui"
      </div>
    </LocationColumnContainer>
  );
}

const LocationColumnContainer = styled.section`
    height: 100%;
    width: 100%;

    >h1 {
        margin-bottom: 8px;
        color: #7b7b7b;
        font-size: 14px;
        width: 100%;
        text-align: center;
    }
    
    >div {
        border: 1px solid #d7d7d7;
        padding: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        height: 100%;
    };
`;
