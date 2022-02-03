import React from "react";
import Cards from "react-credit-cards";
import styled from "styled-components";
import "react-credit-cards/es/styles-compiled.css";
import Button from "../Form/Button";
import { toast } from "react-toastify";
export default class PaymentForm extends React.Component {
  state = {
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e, props) => {
    const { name, value } = e.target;
    props.setCanPay(false);
    this.setState({ [name]: value });
  }

  submit(event, props) {
    event.preventDefault();
    props.setCanPay(!props.canPay);

    let type;
    if (props.ticketInfo.ticketType.name === "Presencial" && props.ticketInfo.hotelModality.name === "Com Hotel") {
      type = 1;
    }
    else if (props.ticketInfo.ticketType.name === "Presencial" && props.ticketInfo.hotelModality.name === "Sem Hotel") {
      type = 2;
    }
    else {
      type = 3;
    }

    props.api.ticket.payTicket({
      body: {
        user: props.userData.user.id, type
      }
    }).then(response => {
      toast("Sucesso ao pagar");
      props.userData.user.paid = response.data;
      props.setUserData({ ...props.userData });
    }).catch(error => {
      toast("Você já realizou o pagamento");
    });
  }
  
  render() {
    return (
      <PaymentCard>
        <FormCreditCard onSubmit={(e) => this.submit(e, this.props)}>
          <ContainerCard>
            <Cards
              cvc={this.state.cvc}
              expiry={this.state.expiry}
              focused={this.state.focus}
              name={this.state.name}
              number={this.state.number}
            />
            <ButtonConfirm type='submit' disabled={this.props.canPay}>Confirmar Pagamento</ButtonConfirm>

          </ContainerCard>
          <ContainerInput>

            <InputCreditCard
              type="tel"
              name="number"
              inputmode="numeric"
              pattern="[0-9\s]{16}"
              title='Apenas números'
              autocomplete="cc-number"
              placeholder="Card Number"
              onChange={ (e) => this.handleInputChange(e, this.props)}
              onFocus={this.handleInputFocus}
              maxLength='16'
              minLength='16'
              required
            />
            <EG>E.g: 62...,49...,51...,36...,37...</EG>
            <InputCreditCard
              type="text"
              name="name"
              placeholder="name"
              onChange={ (e) => this.handleInputChange(e, this.props)}
              onFocus={this.handleInputFocus}
              required
            />
            <ContainerFormTwoInputs>
              <InputCreditCard
                type="text"
                name="expiry"
                placeholder="Valid Thru"
                onChange={ (e) => this.handleInputChange(e, this.props)}
                onFocus={this.handleInputFocus}
                pattern="[0-9\s]{4}"
                title='um número de 4 algarismos'
                maxLength="4"
                minLength="4"
                required
              />
              <InputCreditCard
                type="text"
                name="cvc"
                pattern="[0-9\s]{3}"
                placeholder="CVC"
                onChange={ (e) => this.handleInputChange(e, this.props)}
                onFocus={this.handleInputFocus}
                title="um número de 3 algarismos"
                maxLength="3"
                minLength="3"
                required
              />
            </ContainerFormTwoInputs>
          </ContainerInput>
        </FormCreditCard>
        
      </PaymentCard>
    );
  }
}

const PaymentCard = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
`;

const EG = styled.h1`
  font-size: 15px;
  margin: 5px 0;
  color:#BABBBB;
`;

const ContainerFormTwoInputs = styled.div`
  display:flex;
  margin: 20px 0 !important;
  width: 100%;
`;

const FormCreditCard = styled.form`
  display: flex;
`;
const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px !important;
  gap: 0px !important;
`;

const InputCreditCard = styled.input`
  height: 50px;
  width: 100%;
  border-radius: 5px;
  padding-left: 10px;
  color:#BABBBB;
  border: solid 1px #C9C9C9;
`;

const ContainerCard = styled.div``;

const ButtonConfirm = styled(Button)`
  margin: 40px 0 !important;
`;

