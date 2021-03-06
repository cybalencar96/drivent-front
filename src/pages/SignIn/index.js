import { useState, useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import AuthLayout from "../../layouts/Auth";

import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import Link from "../../components/Link";
import { Row, Title, Label } from "../../components/Auth";

import EventInfoContext from "../../contexts/EventInfoContext";
import UserContext from "../../contexts/UserContext";

import useApi from "../../hooks/useApi";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [warning, setWarning] = useState(false);

  const api = useApi();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);
  
  function submit(event) {
    event.preventDefault();
    setLoadingSignIn(true); 

    api.auth.signIn(email, password).then(response => {
      setUserData(response.data);
    }).catch(error => {
      /* eslint-disable-next-line no-console */
      console.error(error.response);
      setLoadingSignIn(false);
      setPassword("");
      if (error.response.data.details) {
        for (const detail of error.response.data.details) {
          toast(detail);
        }
      } else {
        toast("Não foi possível conectar ao servidor!");
      }
    });
  } 

  const onKeyDown = keyEvent => {
    if (keyEvent.code === "CapsLock") {
      setWarning(!warning);
    }
  };

  return (
    <AuthLayout background={eventInfo.backgroundImage}>
      <Row>
        <img src={eventInfo.logoImage} alt="Event Logo" />
        <Title>{eventInfo.eventTitle}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          {warning && <Warning>CapsLock está ativo</Warning>}
          <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} onKeyDown={onKeyDown}/>
          <ButtonC type="submit" color="primary" fullWidth disabled={loadingSignIn}>Entrar</ButtonC>
        </form>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}

const Warning = styled.h1`
  text-align : left;
  color: gray;
  margin: 10px 0;
`;
const ButtonC = styled(Button)`
  background-color : #33459F !important;
`;
