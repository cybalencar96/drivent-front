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
    height: 160px;

    >h1 {
        margin-bottom: 8px;
        color: #7b7b7b;
        font-size: 14px;
    }
    
    >div {
        border: 1px 0.5px 1px 0.5px;
        padding: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    };
`;
