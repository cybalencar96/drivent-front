export const validations = {
  name: {
    isValid: (value) => isValidString(value).length > 3 ? true : { message: "Digite um nome válido" },
    custom: {
      isValid: (value) => isValidString(value).length > 3,
      message: "Digite um nome válido",
    },
  },

  cpf: {
    isValid: (value) => { return parseInt(value?.length, 10) === 14 ? true : { message: "Digite um CPF válido" };},
    custom: {
      isValid: (value) => { return parseInt(value?.length, 10) === 14;},
      message: "Digite um CPF válido",
    },
  },

  phone: {
    isValid: (value) => parseInt(value?.length, 10) >= 15 ? true : { message: "Digite um telefone válido" },
    custom: {
      isValid: (value) => parseInt(value?.length, 10) >= 15,
      message: "Digite um telefone válido",
    },
  },

  cep: {
    isValid: (value) => parseInt(value?.length, 10) === 9 ? true : { message: "Digite um CEP válido" },
    custom: {
      isValid: (value) => parseInt(value?.length, 10) === 9,
      message: "Digite um CEP válido",
    },
  },

  city: {
    isValid: (value) => isValidString(value) ? true : { message: "Digite uma cidade" },
    custom: {
      isValid: (value) => isValidString(value),
      message: "Digite uma cidade",
    },
  },

  neighborhood: {
    isValid: (value) => isValidString(value) ? true : { message: "Digite um bairro" },
    custom: {
      isValid: (value) => isValidString(value),
      message: "Digite um bairro",
    },
  },

  street: {
    isValid: (value) => isValidString(value) ? true : { message: "Digite uma rua" },
    custom: {
      isValid: (value) => isValidString(value),
      message: "Digite uma rua",
    },
  },

  state: {
    isValid: (value) => isValidString(value) ? true : { message: "Selecione um estado" },
    custom: {
      isValid: (value) => isValidString(value),
      message: "Selecione um estado",
    },
  },

  birthday: {
    isValid: (value) =>  (!value || !isNaN(new Date(value?.split("-").reverse().join("-"))) ? true : {  message: "Selecione uma data de aniversário" }),
    custom: {
      isValid: (value) =>  !value || !isNaN(new Date(value?.split("-").reverse().join("-"))),
      message: "Selecione uma data de aniversário",
    },
  },

  number: {
    isValid: (value) => Number(value) ? true : { message: "Digite um número válido" },
    custom: {
      isValid: (value) => Number(value),
      message: "Digite um número válido",
    },
  },
};

export default validations;

function isValidString(value) {
  return value || value?.trim();
}
