import * as yup from "yup";

export const consultBusinessSchema = yup.object({
  id: yup.string().required("Selecciona un NIT o razón social para buscar"),
});

export const consultContractSchema = yup.object({
  id: yup.number().optional(),
  businessCode: yup.number().optional(),
});
