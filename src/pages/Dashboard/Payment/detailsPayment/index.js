import styled from "styled-components";
import { useState }  from "react";
import SupportedCards from "./creditCardComponent";
import Select from "../../../../components/Form/Select";
import { bankList } from "./bankList";
import { InputWrapper } from "../../../../components/PersonalInformationForm/InputWrapper";
import { MenuItem } from "@material-ui/core";
import { ErrorMsg } from "../../../../components/PersonalInformationForm/ErrorMsg";
import { useForm } from "../../../../hooks/useForm";
import { FormWrapper } from "../../../../components/PersonalInformationForm/FormWrapper";
import PaymentForm from "./creditCardComponent";
import "react-credit-cards/es/styles-compiled.css";

export default function DetailsPayment() {
//   const [flipped, setFlipped] = useState(false);
  const [bank, setBank] = useState("");
  //   const [number, setNumber] = useState("4111 1111 1111 1111");
  //   const [model, setModel] = useState("personnalite");
  //   const [type, setType] = useState("black");
  //   const [brand, setBrand] = useState("mastercard");
  //   const [expiration, setExpiration] = useState("12/19");
  //   const [name, setName] = useState("FULANO DE TAL");
  //   const [cvc, setCvc] = useState("123");
    
  const {
    handleSubmit,
    handleChange,
    data,
    errors,
    setData,
    customHandleChange,
  } = useForm({
    // validations: FormValidations,
      
    onSubmit: (data) => {
      console.log(data);
      const newData = {
        ticketType: 2,
          
      };
      console.log(data.bank);

    //   enrollment.save(newData).then(() => {
    //     toast("Salvo com sucesso!");
    //   }).catch((error) => {
    //     if (error.response?.data?.details) {
    //       for (const detail of error.response.data.details) {
    //         toast(detail);
    //       }
    //     } else {
    //       toast("Não foi possível");
    //     }
    //     /* eslint-disable-next-line no-console */
    //     console.log(error);
    //   });
    },

    initialValues: {
      name: "",
      number: "",
      expiration: "",
      cvc: "",
      bank: "",
      model: "",
      type: "",
      brand: "",
    },
  });
  return (
    <Container>
      <DashboardTitle>Ingresso e pagamento</DashboardTitle>
      <DashboardTopicTitle>Ingresso Escolhido</DashboardTopicTitle>
      <DetailsTicketCard>
        <Details>Presencial + Com Hotel</Details>
        <PriceTotal>R$ 600</PriceTotal>
      </DetailsTicketCard>
      <DashboardTopicTitle>Pagamento</DashboardTopicTitle>
      <CreditCardContainer>
        <PaymentForm />
      </CreditCardContainer>
    </Container>
  );
}

//components
const DashboardTopicTitle = styled.h1`
  font-family: "Roboto", sans-serif;
  color: #8e8e8e;return (
      
  )
  font-size: 20px;
  line-height: 23px;
  margin: 10px 0 !important;
`;

const Container = styled.div`
    div {
        margin: 0;
        gap: 20px;
    }
`;
const DashboardTitle = styled.h1`
  font-family: "Roboto", sans-serif;
  font-size: 34px;
  margin-bottom: 20px!important;
`;

const DetailsTicketCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FFEED2;
  color: #454545;
  width: 290px;
  height: 108px;
  text-align: center;
  border-radius: 20px;

`;
const Details = styled.p`
    color: #454545;
`;

const PriceTotal = styled.p`
  font-family: "Roboto", sans-serif;
  display: block;

  color: #898989 !important;
`;

const CreditCardContainer = styled.div`
    display: flex;
`;
