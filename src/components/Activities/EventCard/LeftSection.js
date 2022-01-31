import styled from "styled-components";
import * as helper from "../helpers";

export default function LeftSection(props) {
  const {
    eventName,
    uniqueActivity,
  } = props;

  return (
    <LeftSectionContainer>
      <h3>{uniqueActivity.name}</h3>
      <h4>{`${helper.formatHour(uniqueActivity.startDate)} - ${helper.formatHour(uniqueActivity.endDate)}`}</h4>
    </LeftSectionContainer>
  );
}

const LeftSectionContainer = styled.div`
    border-right: 1px solid #cfcfcf;
    width: 75%;

    >h3 {
        color: #191919;
        font-size: 13px;
        margin: 10px 0;
    }

    >h4 {
        color: #343434;
        font-size: 12px;
    }
`;
