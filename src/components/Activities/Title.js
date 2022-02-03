import styled from "styled-components";

const Title = styled.h1`
color: ${props => props.color ? props.color : "#191919"};
font-size: ${props => props.size ? props.size : "20px"};
margin-bottom: 40px;
`;

export default Title;
