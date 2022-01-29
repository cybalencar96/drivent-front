import { BiLogIn } from "react-icons/bi";
import { RiCloseCircleLine } from "react-icons/ri";
import styled from "styled-components";

export default function RightSection(props) {
  const { vacancies } = props;

  return (
    <RightSectionContainer vacancies={vacancies}>
      {
        vacancies > 0
          ? <BiLogIn className="ico" color="#078632" size={22}/>
          : <RiCloseCircleLine className="ico" color="#CC6666" size={22}/>
      }
      <p>{vacancies > 0 ? `${vacancies} vaga(s)` : "Esgotado"}</p>
    </RightSectionContainer>
  );
}

const RightSectionContainer = styled.div`
    margin: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 25%;

    >.ico {
        margin-bottom: 5px;
        cursor: pointer;
    }

    >p {
        font-size: 9px;
        color: ${props => props.vacancies > 0 ? "#078632" : "#CC6666"};
    }
`;
