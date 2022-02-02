import { BiLogIn } from "react-icons/bi";
import { RiCloseCircleLine } from "react-icons/ri";
import { AiOutlineCheckCircle } from "react-icons/ai";
import styled from "styled-components";
import { toast } from "react-toastify";

export default function RightSection(props) {
  const { vacancies, usersAmount, registerToEvent, isRegistered } = props;

  function getIconState() {
    if (isRegistered) return "registered";
    if (vacancies <= 0) return "full";
    if (vacancies > 0) return "enabled";
  }

  function renderIcon() {
    const icons = {
      registered: <AiOutlineCheckCircle className="ico" color="#078632" size={22} />,
      full: <RiCloseCircleLine className="ico" color="#CC6666" size={22} onClick={() => toast(" Não foi possível se registrar nesse evento devido as vagas estarem esgotadas")}/>,
      enabled: <BiLogIn className="ico" color="#078632" size={22} onClick={registerToEvent}/>,
    };

    return icons[getIconState()];
  }

  function renderText() {
    const texts = {
      registered: "Inscrito",
      full: "Esgotado",
      enabled: `${vacancies - usersAmount}/${vacancies} vaga(s)`,
    };

    return <p>{texts[getIconState()]}</p>;
  }

  return (
    <RightSectionContainer vacancies={vacancies}>
      { renderIcon() }
      { renderText() }
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
