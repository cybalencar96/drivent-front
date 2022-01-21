import styled from "styled-components";

function NoContent({ text }) {
  return (
    <Container>
      <div>{text}</div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 70%;

  div {
    width: 60%;

    font-family: 'Roboto', sans-serif;
    color: #8E8E8E;
    font-size: 20px;
    text-align: center;
    line-height: 23px;
  }
`;

export { NoContent };
