import { BiLogIn } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io";
import styled from "styled-components";

export default function RightSection(props) {
  const { vacancies } = props;

  return (
    <RightSectionContainer>
      {
        vacancies > 0
          ? <BiLogIn className="ico" color="#078632"/>
          : <IoCloseCircleOutline className="ico" color="#CC6666"/>
      }
      <p vacancies={vacancies}>{vacancies > 0 ? `${vacancies} vaga(s)` : "Esgotado"}</p>
    </RightSectionContainer>
  );
}

const RightSectionContainer = styled.div`
    margin: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    >.ico {
        margin-bottom: 5px;
    }

    >p {
        font-size: 8px;
        color: ${props => props.vacancies > 0 ? "#078632" : "#CC6666"};
    }
`;
