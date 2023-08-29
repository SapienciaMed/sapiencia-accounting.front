import * as yup from "yup";

export const accountStatementSchema = yup.object({
  id: yup.string().required("Completar información"),
  contractCode: yup.string().required("Completar información"),
  business: yup.string().required("Completar información"),
  paymentType: yup.string().required("Completar información"),
  concept: yup
    .string()
    .min(1)
    .max(500, "Solo se permiten 500 caracteres")
    .required("Completar información"),
  valuePay: yup
    .string()
    .max(15, "Solo se permiten 15 caracteres")
    .required("Completar información"),
});
