import styled from "styled-components";

export default function LeftSection(props) {
  const {
    eventName,
    startDate,
    endDate,
  } = props;

  return (
    <LeftSectionContainer>
      <h3>{eventName}</h3>
      <h4>{"10:00 - 11:00"}</h4>
    </LeftSectionContainer>
  );
}

const LeftSectionContainer = styled.div`
    border-right: 1px solid #cfcfcf;

    >h3 {
        color: #191919;
        font-size: 13px;
    }

    >h4 {
        color: #343434;
        font-size: 12px;
    }
`;
