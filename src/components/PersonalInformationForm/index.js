import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import DateFnsUtils from "@date-io/date-fns";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MenuItem from "@material-ui/core/MenuItem";

import useApi from "../../hooks/useApi";
import { useForm } from "../../hooks/useForm";

import Input from "../Form/Input";
import Button from "../Form/Button";
import Select from "../../components/Form/Select";
import { FormWrapper } from "./FormWrapper";
import { CustomDatePicker } from "./CustomDatePicker";
import { InputWrapper } from "./InputWrapper";
import { ErrorMsg } from "./ErrorMsg";
import { ufList } from "./ufList";
import FormValidations, { validations } from "./FormValidations";
import { DashboardTitle } from "../DashboardTitle";
import UserContext from "../../contexts/UserContext";

dayjs.extend(CustomParseFormat);
export default function PersonalInformationForm() {
  const [errorCPF, setErrorCPF] = useState("");
  const [dynamicInputIsLoading, setDynamicInputIsLoading] = useState(false);
  const { enrollment, cep } = useApi();
  const { userData, setUserData } = useContext(UserContext);
  const {
    handleSubmit,
    handleChange,
    data,
    errors,
    setData,
    customHandleChange,
  } = useForm({
    validations: FormValidations,

    onSubmit: (data) => {
      setDynamicInputIsLoading(false);
      const newData = {
        name: data.name,
        cpf: data.cpf,
        birthday: data.birthday,
        address: {
          cep: data.cep,
          street: data.street,
          city: data.city,
          number: data.number,
          state: data.state,
          neighborhood: data.neighborhood,
          addressDetail: data.addressDetail,
        },
        phone: data.phone.replace(/[^0-9]+/g, "").replace(/^(\d{2})(9?\d{4})(\d{4})$/, "($1) $2-$3"),
      };

      if (Object.values(errors).length) {
        return;
      }

      enrollment.save(newData).then(() => {
        userData.user.enrolled = true;

        setUserData({ ...userData });
        toast("Salvo com sucesso!");
      }).catch((error) => {
        if (error.response?.data?.details) {
          for (const detail of error.response.data.details) {
            if (detail[0] === "C") {
              console.log("aqui");
              setErrorCPF("CPF já está em uso");
              setDynamicInputIsLoading(true);
            }
            else {
              toast(detail); 
            }
          }
        } else {
          toast("CPF já cadastrado");
        }
        /* eslint-disable-next-line no-console */
        console.log(error);
      });
    },

    initialValues: {
      cpf: "",
      name: "",
      birthday: null,
      phone: "",
      cep: "",
      street: "",
      city: "",
      number: "",
      state: "",
      neighborhood: "",
      addressDetail: "",
    },
  });

  useEffect(() => {
    enrollment.getPersonalInformations().then(response => {
      if (response.status !== 200) {
        return;
      }
      
      const { name, cpf, birthday, phone, address } = response.data;

      setData({
        name,
        cpf,
        birthday,
        phone,
        cep: address.cep,
        street: address.street,
        city: address.city,
        state: address.state,
        number: address.number,
        neighborhood: address.neighborhood,
        addressDetail: address.addressDetail,
      });
    });
  }, []);

  useEffect(() => {
    if (!Object.values(errors).length) {
      setDynamicInputIsLoading(false);
    } else {
      setDynamicInputIsLoading(true);
    }
  }, [errors]);
  
  function isValidCep(cep) {
    return cep.length === 8;
  }

  function handleCepChanges(event) {
    const { name, value } = event.target;

    const valueWithoutMask = value.replace("-", "");

    if (isValidCep(valueWithoutMask)) {
      const newDataValues = {
        ...data,
        [name]: value
      };

      setDynamicInputIsLoading(true);
      cep.getAddress(valueWithoutMask).then(({ data }) => {
        setDynamicInputIsLoading(false);
        if (data.erro) {
          setDynamicInputIsLoading(true);
          errors["cep"] = "Digite um CEP válido";
          return;
        }
        delete errors["cep"];
        delete errors["street"];
        delete errors["city"];
        delete errors["neighborhood"];
        delete errors["state"];
        setData({
          ...newDataValues,
          street: data.logradouro,
          city: data.localidade,
          neighborhood: data.bairro,
          state: data.uf,
        });

        if (!Object.values(errors).length) {
          setDynamicInputIsLoading(false);
        } else {
          setDynamicInputIsLoading(true);
        }
      });
    }
    else {
      setDynamicInputIsLoading(true);
      errors["cep"] = "Digite um CEP válido";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (validations[name].isValid(value) === true) {
      delete errors[name];
    } else {
      if (name === "cpf") {
        setErrorCPF("");
      }
      errors[name] = validations[name].isValid(value).message;
    }
  
    if (!Object.values(errors).length) {
      setDynamicInputIsLoading(false);
    } else {
      setDynamicInputIsLoading(true);
    }
  };
  return (
    <>
      <DashboardTitle variant="h4">Suas Informações</DashboardTitle>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormWrapper onSubmit={(data) => handleSubmit(data, errors)}>
          <InputWrapper>
            <Input
              label="Nome Completo"
              name="name"
              type="text"
              value={data.name || ""}
              onChange={(e) => {
                handleChange("name")(e);
                handleInputChange(e);
              }
              }
            />
            {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              name="cpf"
              label="CPF"
              type="text"
              maxLength="14"
              mask="999.999.999-99"
              value={data.cpf || ""}
              onChange={(e) => {
                handleChange("cpf")(e);
                handleInputChange(e);
              }
              }
            />
            {errors.cpf && !errorCPF && <ErrorMsg>{errors.cpf}</ErrorMsg>}
            {errorCPF && !errors.cpf && <ErrorMsg>{errorCPF}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <CustomDatePicker
              name="birthday"
              error={false}
              helperText={null}
              format="dd-MM-yyyy"
              label="Data de Nascimento"
              inputVariant="outlined"
              clearable
              value={data.birthday && dayjs(data.birthday, "DD-MM-YYYY").toString()}
              onChange={(date) => {
                customHandleChange("birthday", (d) => d && dayjs(d).format("DD-MM-YYYY"))(date);
              }}
            />
            {errors.birthday && <ErrorMsg>{errors.birthday}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Telefone"
              mask={data.phone.length < 15 ? "(99) 9999-99999" : "(99) 99999-9999"} // o 9 extra no primeiro é para permitir digitar um número a mais e então passar pra outra máscara - gambiarra? temos
              name="phone"
              value={data.phone || ""}
              onChange={(e) => {
                handleChange("phone")(e);
                handleInputChange(e);
              }}
            />
            {errors.phone && <ErrorMsg>{errors.phone}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="CEP"
              name="cep"
              mask="99999-999"
              value={data.cep || ""}
              onChange={(e) => {
                handleChange("cep")(e);
                handleCepChanges(e);
              }}
            />
            {errors.cep && <ErrorMsg>{errors.cep}</ErrorMsg>}            
          </InputWrapper>
          <InputWrapper>
            <Select
              label="Estado"
              name="state"
              id="state"
              value={data.state || ""}
              onChange={(e) => {
                handleChange("state")(e);
                handleInputChange(e);
              }
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {ufList.map((uf) => (
                <MenuItem value={uf.name} key={uf.id}>
                  <em>{uf.name}</em>
                </MenuItem>
              ))}
            </Select>
            {errors.state && <ErrorMsg>{errors.state}</ErrorMsg>}
          </InputWrapper>

          <InputWrapper>
            <Input
              label="Cidade"
              name="city"
              value={data.city || ""}
              onChange={(e) => {
                handleChange("city")(e);
                handleInputChange(e);
              }
              }
              disabled={dynamicInputIsLoading}
            />
            {errors.city && <ErrorMsg>{errors.city}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Rua"
              name="street"
              value={data.street || ""}
              onChange={(e) => {
                handleChange("street")(e);
                handleInputChange(e);
              }
              }
              disabled={dynamicInputIsLoading}
            />
            {errors.street && <ErrorMsg>{errors.street}</ErrorMsg>}
          </InputWrapper>

          <InputWrapper>
            <Input
              label="Número"
              name="number"
              value={data.number || ""}
              onChange={(e) => {
                handleChange("number")(e);
                handleInputChange(e);
              }
              }
            />
            {errors.number && <ErrorMsg>{errors.number}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Bairro"
              name="neighborhood"
              value={data.neighborhood || ""}
              onChange={(e) => {
                handleChange("neighborhood")(e);
                handleInputChange(e);
              }
              }
              disabled={dynamicInputIsLoading}
            />
            {errors.neighborhood && <ErrorMsg>{errors.neighborhood}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Complemento"
              name="addressDetail"
              value={data.addressDetail || ""}
              onChange={(e) => {
                handleChange("addressDetail")(e);
                handleInputChange(e);
              }
              }
            />
          </InputWrapper>
          
          <SubmitContainer>
            <Button type="submit" disabled={dynamicInputIsLoading}>
              Salvar
            </Button>
          </SubmitContainer>
        </FormWrapper>
      </MuiPickersUtilsProvider>
    </>
  );
}

const SubmitContainer = styled.div`
  margin-top: 40px!important;
  width: 100%!important;

  > button {
    margin-top: 0 !important;
  }
`;
