import { DateTime } from "luxon";

type IFurnitureHistoryChanges = {
  oldChanges: Partial<IFurniture>;
  newChanges: Partial<IFurniture>;
};

export interface IGetProperty {
  id?: number;
  plate: string;
  description: string;
  acquisitionDate: DateTime;
  equipmentStatus: string;
  userIdentification: string;
  area: string;
  fullName: string;
  model: string;
  measure: string;
  activeOwner: string;
  observation: string;
  clerk: string;
  workerId: number;
}

export type IFurniture = {
  plate: string; // BIE_PLACA_ACTIVO
  description: string; // BIE_TIPO_ACTIVO_DESCRIPCION
  acquisitionDate: DateTime; // BIE_FECHA_ADQUISICION
  equipmentStatus: number; // BIE_ESTADO_EQUIPO
  userIdentification: string; // BIE_CC_USUARIO
  fullName: string; // BIE_NOMBRE_APELLIDO
  area: number; // BIE_AREA
  model: string; // BIE_MODELO
  brand: string;
  measure: string; // BIE_MEDIDAS
  activeOwner: number; // BIE_PROPIETARIO_ACTIVO
  observation: string; // BIE_OBSERVACION
  clerk: number; // BIE_FUNCIONARIO
};

export type IFurnitureHistoryData = {
  id: number;
  furnitureId: number;
  createdAt: string;
  changes: IFurnitureHistoryChanges;
};
