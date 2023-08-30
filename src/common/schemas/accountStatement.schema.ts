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

export const filtersAccountStatementSchema = yup.object({
  accountNum: yup.number().optional().typeError("Debe ser un número"),
  contractCode: yup.string().optional(),
  nit: yup
    .string()
    .optional()
    .max(15, "Solo se permiten 15 caracteres")
    .matches(/(^[0-9]+-{1}[0-9]{1})/, {
      message: "NIT inválido",
      excludeEmptyString: true,
    }),
  expeditionDate: yup.date().optional(),
});

export const editAccountStatementSchema = yup.object({
  contractCode: yup.string().required("Completar información"),
  valuePay: yup
    .string()
    .max(15, "Solo se permiten 15 caracteres")
    .required("Completar información"),
  concept: yup
    .string()
    .min(1)
    .max(500, "Solo se permiten 500 caracteres")
    .required("Completar información"),
});
