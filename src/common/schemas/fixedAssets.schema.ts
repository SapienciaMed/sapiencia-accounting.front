import * as yup from "yup";

export const createPropertySchema = yup.object({
  area: yup.number().required("Completar información"),
  equipmentStatus: yup.number().required("Completar información"),
  workerId: yup.number().required("Completar información"),
  clerk: yup.number().required("Completar información"),
  acquisitionDate: yup
    .date()
    .required("Completar información")
    .typeError("Fecha inválida"),
  description: yup
    .string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  brand: yup
    .string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  model: yup
    .string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  plate: yup
    .number()
    .max(12, "Solo se permiten 12 caracteres")
    .required("Completar información"),
  measure: yup
    .string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  activeOwner: yup.number().required("Completar información"),
  observation: yup
    .string()
    .max(500, "Solo se permiten 500 caracteres")
    .required("Completar información"),
});

export const consultPropertySchema = yup.object({
  acquisitionDate: yup.date().optional().nullable(),
  equipmentStatus: yup.number().optional().nullable(),
  description: yup
    .string()
    .optional()
    .max(50, "Solo se permiten 50 caracteres"),
  plate: yup.string().optional().max(12, "Solo se permiten 12 caracteres"),
});

export const editProperySchema = yup.object({
  area: yup.number().required("Completar información"),
  equipmentStatus: yup.number().required("Completar información"),
  workerId: yup.number().required("Completar información"),
  clerk: yup.number().required("Completar información"),
  acquisitionDate: yup
    .date()
    .required("Completar información")
    .typeError("Fecha inválida"),
  description: yup
    .string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  brand: yup
    .string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  model: yup
    .string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  plate: yup
    .string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  measure: yup
    .string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  activeOwner: yup.number().required("Completar información"),
  observation: yup
    .string()
    .max(500, "Solo se permiten 500 caracteres")
    .required("Completar información"),
});
