import styled from "styled-components";
import LocationColumn from "./LocationColumn";
import * as helper from "../helpers";

export default function LocationSection(props) {
  const { activities } = props;
  const uniqueLocations = helper.getUnique("name", activities.map(activity => activity.location));

  return (
    <LocationSectionContainer>
      {
        uniqueLocations.map(location => <LocationColumn key={location} location={location} activities={activities} />)
      }
    </LocationSectionContainer>
  );
}

const LocationSectionContainer = styled.section`
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
    margin-top: 40px;
    height: 70%;
`;
