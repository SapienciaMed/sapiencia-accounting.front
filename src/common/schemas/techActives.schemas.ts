// @ts-ignore
import { string, date, number, object } from "yup";
import { ASSET_TYPES } from "../constants/asset";

const otherAssetTypeSchema = {
  type: string().required("Ingresar una opción"),
  campus: string().required("Completar información"),
  area: string().required("Completar información"),
  status: string().required("Completar información"),
  ownerId: string().required("Completar información"),
  ownerDate: date()
    .required("Completar información")
    .typeError("Fecha inválida"),
  equipmentType: string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  brand: string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  model: string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  plate: string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  serial: string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  observations: string()
    .max(500, "Solo se permiten 500 caracteres")
    .required("Completar información"),
};

const computeAssetTypeSchema = {
  ram: string()
    .max(50, "Es necesario 50 caracteres ")
    .required("Completar información"),
  cpu: string()
    .max(50, "Es necesario 50 caracteres ")
    .required("Completar información"),
  storage: string()
    .max(50, "Es necesario 50 caracteres ")
    .required("Completar información"),
  os: string()
    .max(50, "Es necesario 50 caracteres ")
    .required("Completar información"),
};

export const createTechActiveaSchema = (assetType: ASSET_TYPES) => {
  let schema = {};
  if (assetType === ASSET_TYPES.OTROS) {
    schema = otherAssetTypeSchema;
  } else if (assetType === ASSET_TYPES.COMPUTO) {
    schema = {
      ...otherAssetTypeSchema,
      ...computeAssetTypeSchema,
    };
  }
  return object(schema);
};

export const editTechActiveaSchema = object({
  type: string().required("Ingresar una opción"),
  campus: string().required("Completar información"),
  area: string().required("Completar información"),
  status: string().required("Completar información"),
  ownerId: number().required("Completar información"),
  ownerDate: date()
    .required("Completar información")
    .typeError("Fecha inválida"),
  equipmentType: string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  brand: string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  model: string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  plate: string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  serial: string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  observations: string()
    .max(500, "Solo se permiten 500 caracteres")
    .required("Completar información"),
  clerk: string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("Completar información"),
  ram: string().max(50, "Solo se permiten 50 caracteres").optional().nullable(),
  cpu: string().max(50, "Solo se permiten 50 caracteres").optional().nullable(),
  storage: string()
    .max(50, "Solo se permiten 50 caracteres")
    .optional()
    .nullable(),
  os: string().max(50, "Solo se permiten 50 caracteres").optional().nullable(),
});

export const consultTechActiveSchema = object({
  type: string().optional().nullable(),
  campus: string().optional().nullable(),
  ownerId: string().optional().nullable(),
  plate: string()
    .max(50, "Solo se permiten 50 caracteres")
    .optional()
    .nullable(),
  serial: string()
    .max(50, "Solo se permiten 50 caracteres")
    .optional()
    .nullable(),
});
