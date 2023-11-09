import * as yup from "yup";

// export const createTechActiveSchema = yup.object({
//   type: yup.string().required("Ingresar una opción"),
//   campus: yup.string().required("Completar información"),
//   area: yup.string().required("Completar información"),
//   status: yup.string().required("Completar información"),
//   ownerId: yup.string().required("Completar información"),
//   ownerDate: yup
//     .date()
//     .required("Completar información")
//     .typeError("Fecha inválida"),
//   equipmentType: yup
//     .string()
//     .max(50, "Solo se permiten 50 caracteres")
//     .required("Completar información"),
//   brand: yup
//     .string()
//     .max(50, "Solo se permiten 50 caracteres")
//     .required("Completar información"),
//   model: yup
//     .string()
//     .max(50, "Solo se permiten 50 caracteres")
//     .required("Completar información"),
//   plate: yup
//     .string()
//     .max(50, "Solo se permiten 50 caracteres")
//     .required("Completar información"),
//   serial: yup
//     .string()
//     .max(50, "Solo se permiten 50 caracteres")
//     .required("Completar información"),
//   observations: yup
//     .string()
//     .max(500, "Solo se permiten 500 caracteres")
//     .required("Completar información"),
//   official: yup
//     .string()
//     .max(50, "Solo se permiten 50 caracteres")
//     .required("Completar información"),
// });

export const createTechActiveaSchema = yup.object({
  type: yup.string().required("Ingresar una opción"),
  campus: yup.string().required("Completar información"),
  area: yup.string().required("Completar información"),
  status: yup.string().required("Completar información"),
  ownerId: yup.string().required("Completar información"),
  ownerDate: yup
    .date()
    .required("Completar información")
    .typeError("Fecha inválida"),
  equipmentType: yup
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
  serial: yup
    .string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  observations: yup
    .string()
    .max(500, "Solo se permiten 500 caracteres")
    .required("Completar información"),
  official: yup
    .string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  ram: yup.string().max(50).optional().nullable(),

  // ram: yup
  // .string()
  // .when( 'type', {
  //   is: 'Computo',
  //   then: yup.string().optional(therwise: yup.string().nullable(),
  // })

  cpu: yup.string().max(50).optional().nullable(),
  storage: yup.string().max(50).optional().nullable(),
  os: yup.string().max(50).optional().nullable(),
});

export const editTechActiveaSchema = yup.object({
  type: yup.string().required("Ingresar una opción"),
  campus: yup.string().required("Completar información"),
  area: yup.string().required("Completar información"),
  status: yup.string().required("Completar información"),
  ownerId: yup.number().required("Completar información"),
  ownerDate: yup
    .date()
    .required("Completar información")
    .typeError("Fecha inválida"),
  equipmentType: yup
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
  serial: yup
    .string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  observations: yup
    .string()
    .max(500, "Solo se permiten 500 caracteres")
    .required("Completar información"),
  clerk: yup
    .string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  ram: yup
    .string()
    .max(500, "Solo se permiten 500 caracteres")
    .required("Completar información"),
  cpu: yup
    .string()
    .max(500, "Solo se permiten 500 caracteres")
    .required("Completar información"),
  storage: yup
    .string()
    .max(500, "Solo se permiten 500 caracteres")
    .required("Completar información"),
  os: yup
    .string()
    .max(500, "Solo se permiten 500 caracteres")
    .required("Completar información"),
});

export const consultTechActiveSchema = yup.object({
  type: yup.string().optional().nullable(),
  campus: yup.string().optional().nullable(),
  ownerId: yup.string().optional().nullable(),
  plate: yup
    .string()
    .max(50, "Solo se permiten 50 caracteres")
    .optional()
    .nullable(),
  serial: yup
    .string()
    .max(50, "Solo se permiten 50 caracteres")
    .optional()
    .nullable(),
});
