import React from "react";
import Cards from "react-credit-cards";
import styled from "styled-components";
import "react-credit-cards/es/styles-compiled.css";
import Button from "../Form/Button";

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
  }
  
  render() {
    return (
      <PaymentCard>
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <FormCreditCard onSubmit={(e) => this.submit(e, this.props)}>
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
          <Button type='submit' disabled={this.props.canPay}>Checar</Button>
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
    
`;

const InputCreditCard = styled.input`
  height: 50px;
  width: 100%;
  border-radius: 5px;
  padding-left: 10px;
  color:#BABBBB;
`;
