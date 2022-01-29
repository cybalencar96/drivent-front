import styled from "styled-components";

const SubTitle = styled.h2`
color: ${props => props.color ? props.color : "#8E8E8E"};
font-size: ${props => props.size ? props.size : "16px"};
`;

export default SubTitle;
