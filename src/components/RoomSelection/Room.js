import styled from "styled-components";
import person from "../../assets/images/person.png";
import filledPerson from "../../assets/images/filledPerson.png";
import beds from "./helpers";

export default function Room({ number, totalBeds, occupiedBeds }) {
  return (
    <Container>
      <span>{number}</span>
      <PeopleContainer>
        {beds(totalBeds, occupiedBeds).map((bed, i) =>
          bed === "free" ? (
            <img src={person} alt="" key={i} />
          ) : (
            <img src={filledPerson} alt="" key={i} />
          )
        )}
      </PeopleContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 190px;
  height: 45px;
  border-radius: 10px;
  border: 1px solid #cecece;
  padding: 11px 12.38px 11px 16px;
  position: relative;

  span {
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #454545;
  }
`;

const PeopleContainer = styled.div`
  position: absolute;
  right: 12.38px;
  top: 12.38px;

  img {
    width: 20.25px;
    height: 20.25px;
  }

  img:not(:last-child) {
    margin-right: 6.75px;
  }
`;
