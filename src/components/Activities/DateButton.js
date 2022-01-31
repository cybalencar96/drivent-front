import styled from "styled-components";

const DateButton = styled.button`
color: ${props => props.color ? props.color : "#191919"};
font-size: ${props => props.size ? props.size : "14px"};
width: 130px;
height: 36px;
background-color: ${props => props.colorize ? "#FFD37D" : "#e0e0e0"};
box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
border-radius: 4px;
border: none;
outline: none;
cursor: pointer;
margin: 10px;
`;

export default DateButton;
