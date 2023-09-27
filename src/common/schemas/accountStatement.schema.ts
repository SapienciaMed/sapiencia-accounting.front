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
  accountNum: yup.string().optional().max(15, "Solo se permiten 15 caracteres"),
  contractCode: yup.string().optional().nullable(),
  nit: yup
    .string()
    .optional()
    .max(15, "Solo se permiten 15 caracteres")
    .matches(/(^[0-9]+-{1}[0-9]{1})/, {
      message: "NIT inválido",
      excludeEmptyString: true,
    }),
  expeditionDate: yup.date().optional().nullable(),
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
  tracking: yup.object({
    statusId: yup
      .number()
      .typeError("Debe ser un número")
      .required("Completar información"),
  }),
});

export const manageCompanySchema = yup.object({
  name: yup
    .string()
    .required("Completar información")
    .max(300, "Solo se permiten 300 caracteres"),
  nit: yup
    .string()
    .max(15, "Solo se permiten 15 caracteres")
    .required("Completar información")
    .matches(/(^[0-9]+-{1}[0-9]{1})/, {
      message: "NIT inválido",
      excludeEmptyString: true,
    }),
  address: yup
    .string()
    .required("Completar información")
    .max(100, "Solo se permiten 100 caracteres"),
  email: yup
    .string()
    .matches(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i, {
      message: "Formato de correo electrónico inválido example@correo.com",
    })
    .email("Ingrese un correo electrónico válido")
    .required("Completar información")
    .max(50, "Solo se permiten 50 caracteres"),

  municipalityCode: yup.string().required("Completar información"),
  sender: yup
    .string()
    .required("Completar información")
    .max(100, "Solo se permiten 100 caracteres"),
  chargeSender: yup
    .string()
    .required("Completar información")
    .max(100, "Solo se permiten 100 caracteres"),
  phone: yup
    .string()
    .length(10, "El campo debe tener 10 dígitos")
    .typeError("Debe ser un número")
    .required("Completar información"),
});

export const createContractSchema = yup.object({
  contractId: yup
    .string()
    .max(100, "Solo se permiten 100 caracteres")
    .required("Completar información"),
  // ESTE ES LA VALIDACION PARA NIT
  value: yup.number().required("Completar información"),
  debitAccount: yup
    .string()
    .max(20, "Solo se permiten 20 caracteres")
    .required("Completar información"),
  creditAccount: yup
    .string()
    .max(20, "Solo se permiten 20 caracteres")
    .required("Completar información"),
});

export const editContractSchema = yup.object({
  contractId: yup
    .string()
    .max(100, "Solo se permiten 100 caracteres")
    .required("Completar información"),
  // ESTE ES LA VALIDACION PARA NIT
  businessCode: yup.number().required("Completar información"),
  debitAccount: yup
    .string()
    .max(20, "Solo se permiten 20 caracteres")
    .required("Completar información"),
  creditAccount: yup
    .string()
    .max(20, "Solo se permiten 20 caracteres")
    .required("Completar información"),
});
