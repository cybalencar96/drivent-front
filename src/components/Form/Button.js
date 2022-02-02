import MuiButton from "@material-ui/core/Button";
import styled from "styled-components";

export default function Button({ variant = "contained", children, ...props }) {
  return (
    <StyledMuiButton variant={variant} {...props}>
      {children}
    </StyledMuiButton>
  );
}

const StyledMuiButton = styled(MuiButton)`
  
  
  margin-top: 8px !important;
`;
// TODO verify line below from StyledMuiButton. It's below because was not commenting inside MuiButton 
/* background-color: ${({ color }) => color.length ? "white" : color} !important;  */
