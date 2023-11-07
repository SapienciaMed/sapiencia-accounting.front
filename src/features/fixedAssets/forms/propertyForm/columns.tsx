import { IFurniture } from "../../../../common/interfaces/accountStatement.interface";
import { ITableElement } from "../../../../common/interfaces/table.interfaces";
export const tableColumns: ITableElement<IFurniture>[] = [
  {
    fieldName: "area",
    header: "Área",
  },
  {
    fieldName: "equipmentStatus",
    header: "Estado",
  },
  {
    fieldName: "userIdentification",
    header: "CC usuario",
  },
  {
    fieldName: "fullName",
    header: "Nombres y Apellidos",
  },
  {
    fieldName: "clerk",
    header: "Funcionario",
  },
  {
    fieldName: "acquisitionDate",
    header: "Fecha de adquisición",
  },
  {
    fieldName: "description",
    header: "Tipo activo-Descripción",
  },
  {
    fieldName: "brand",
    header: "Marca",
  },
  {
    fieldName: "model",
    header: "Modelo",
  },
  {
    fieldName: "plate",
    header: "Placa activo",
  },
  {
    fieldName: "measure",
    header: "Medidas",
  },
  {
    fieldName: "activeOwner",
    header: "Propietario activo",
  },
  {
    fieldName: "observation",
    header: "Observaciones",
  },
];
