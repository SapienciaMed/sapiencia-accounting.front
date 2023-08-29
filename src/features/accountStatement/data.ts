import { PAYMENT_TYPE } from "../../common/interfaces/accountStatement.interface";

export const contractsData = [
  {
    value: 1,
    name: "PAC ENERO 2023",
  },
  {
    value: 2,
    name: "338",
  },
  {
    value: 3,
    name: "328",
  },
];

export const businessData = [
  {
    id: "1",
    name: "Institución Universitaria Colegio Mayor de Antioquia",
    nit: "890980134",
  },
  {
    id: "2",
    name: "Instituto Tecnológico Metropolitano",
    nit: "800214750",
  },
  {
    id: "3",
    name: "DATOLABS S.A.S",
    nit: "901131054",
  },
];

export const paymentTypeData = [
  {
    value: PAYMENT_TYPE.CONTADO,
    name: "Contado",
  },
  {
    value: PAYMENT_TYPE["A 30 días"],
    name: "A 30 días",
  },
  {
    value: PAYMENT_TYPE["A 60 días"],
    name: "A 60 días",
  },
  {
    value: PAYMENT_TYPE["A 90 días"],
    name: "A 90 días",
  },
];
