import { PAYMENT_TYPE } from "../../common/interfaces/accountStatement.interface";

export const businessData = [
  {
    id: "1",
    name: "Institución Universitaria Colegio Mayor de Antioquia",
    nit: "890980134-1",
  },
  {
    id: "2",
    name: "Instituto Tecnológico Metropolitano",
    nit: "800214750-2",
  },
  {
    id: "3",
    name: "DATOLABS S.A.S",
    nit: "901131054-9",
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
