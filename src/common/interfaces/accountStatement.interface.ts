import { DateTime } from "luxon";

export interface IAccountStatement {
  id: number; // CTC_CODIGO
  contractCode: number; // CTC_CODCTR_CONTRATO
  accountNum: number; // CTC_NUMERO
  expeditionDate: DateTime; // CTC_FECHA_EXPEDICION
  expirationDate: DateTime; // CTC_FECHA_VENCIMIENTO
  paymentType: string; // CTC_FORMA_PAGO
  valuePay: number; // CTC_VALOR
  concept: string; // CTC_CONCEPTO
  userCreate: string; // CTC_USUARIO_CREO
  userModified?: string; // CTC_USUARIO_MODIFICO
  createdAt: DateTime; // CTC_FECHA_CREO
  updatedAt: DateTime; // CTC_FECHA_MODIFICO
}

export interface IBusiness {
  id?: number; // RZO_CODIGO
  name: string; // RZO_NOMBRE
  nit: string; // RZO_NIT
  phone: number; //RZO_PHONE
  address: string; // RZO_DIRECCION
  email: string; // RZO_CORREO_ELECTRONICO
  municipalityCode: string; // RZO_CODIGO_MUNICIPIO
  sender: string; // RZO_REMISOR
  chargeSender: string; // RZO_CARGO_REMISOR
  userModified?: string; // RZO_USUARIO_MODIFICO
  userCreate: string; // RZO_USUARIO_CREO
  createdAt?: DateTime; // RZO_FECHA_CREO
  updatedAt?: DateTime; // RZO_FECHA_MODIFIC
}

export interface IManageContract {
  id?: number; // CTR_CODIGO
  contractNumber: string; // CTR_NUMERO_CONTRATO
  codRzo: number; // CTR_CODIGO_RAZÓN_SOCIAL
  userModified: string; //CTR_NÚMERO_DOCUMENTO_ÚLTIMO_USUARIO_MODIFICACIÓN
  dateModified?: DateTime; // CTR_FECHA_HORA_ÚLTIMA_MODIFICACIÓN
  userCreated: string; // CTR_DOCUMENTO_USUARIO_CREÓ_EL_REGISTRO
  dateCreated?: DateTime; // CTR_FECHA_HORA_CREACIÓN_REGISTRO
}
export interface IProperty {
  plate: string; // BIE_PLACA_ACTIVO
  description: string; // BIE_TIPO_ACTIVO_DESCRIPCION
  acquisitionDate: DateTime; // BIE_FECHA_ADQUISICION
  equipmentStatus: number; // BIE_ESTADO_EQUIPO
  workerId: number;
  area: number; // BIE_AREA
  model: string; // BIE_MODELO
  measure: string; // BIE_MEDIDAS
  activeOwner: number; // BIE_PROPIETARIO_ACTIVO
  observation: string; // BIE_OBSERVACION
  brand: string; //BIE_MARCA
  clerk: number; // BIE_FUNCIONARIO
}

export interface IFurniture {
  plate: string;
  description: string;
  acquisitionDate: string;
  equipmentStatus: number;
  userIdentification: string;
  fullName: string;
  area: number;
  model: string;
  brand: string;
  measure: string;
  activeOwner: number;
  observation: string;
  clerk: number;
}
export interface IGetContract {
  id?: number;
  contractId: string | number;
  businessCode: number;
  debitAccount: string | number;
  creditAccount: string | number;
  business: {
    id?: number;
    nit: string;
    name: string;
    municipalityCode: string | number;
    address: string;
    phone: number;
    email: string;
    sender: string;
    chargeSender: string;
  };
}
export interface IGetBusiness {
  id?: number;
  nit: string;
  name: string;
  municipalityCode: string | number;
  address: string;
  phone: number;
  email: string;
  sender: string;
  chargeSender: string;
  contract?: string;
}

export interface IFurtunite {
  id: number;
  grouper: string;
  itemCode: string;
  itemDescription: string;
  additionalFields: string;
}

export type ISelectInfo = {
  name: string;
  value: number;
};

export type IWorkersInfoSelect = {
  name: string;
  value: number;
};

export type IBusinessInfoSelect = {
  name: string;
  value: number;
  data: IBusiness;
};

export interface IContract {
  id: number;
  contractId: string;
  businessCode: number;
  userModified: string;
  userCreate: string;
  createdAt: string;
  updatedAt: string;
  business: IBusiness;
}
export interface IAccountStatementForm {
  contractCode: number;
  accountNum: number;
  expeditionDate: string;
  expirationDate: string;
  paymentType: string;
  valuePay: number;
  concept: string;
  valueLabel: string;
}

export interface IGetAccountStatement {
  id: number;
  contractCode: number;
  accountNum: number;
  expeditionDate: string;
  expirationDate: string;
  paymentType: string;
  valuePay: number;
  concept: string;
  userCreate: string;
  userModified?: string;
  createdAt: string;
  updatedAt: string;
  contract: IContract;
  tracking: ITracking;
}

interface ITracking {
  id: number;
  observation: string;
  trackingDate: string;
  statusId: string;
}

export interface IFilterAccountStatement {
  accountNum?: number;
  contractCode?: number;
  nit?: string;
  expeditionDate?: DateTime;
}

export enum PAYMENT_TYPE {
  "CONTADO" = "1",
  "A 30 días" = "2",
  "A 60 días" = "3",
  "A 90 días" = "4",
}

export enum STATE_TYPE {
  "Anulada" = 1,
  "Pagada" = 2,
  "Vencida" = 3,
}

export type IGenericItem = {
  id: number;
  itemDescription: string;
  itemCode: string;
};
