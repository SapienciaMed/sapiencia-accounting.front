import { ITechActiveColumns } from "../../../../common/interfaces/accountStatement.interface";
import { ITableElement } from "../../../../common/interfaces/table.interfaces";
export const tableColumns: ITableElement<ITechActiveColumns>[] = [
  {
    fieldName: "type",
    header: "Tipo dispositivo",
  },
  {
    fieldName: "campus",
    header: "Sede",
  },
  {
    fieldName: "area",
    header: "Área",
  },
  {
    fieldName: "status",
    header: "Estado",
  },
  {
    fieldName: "ownerId",
    header: "CC usuario",
  },
  {
    fieldName: "ownerFullName",
    header: "Nombres y apellidos",
  },
  {
    fieldName: "clerk",
    header: "Funcionario",
  },
  {
    fieldName: "ownerDate",
    header: "Fecha de adquisición",
  },

  {
    fieldName: "equipmentType",
    header: "Tipo equipo",
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
    header: "Placa",
  },
  {
    fieldName: "serial",
    header: "Serial",
  },
  {
    fieldName: "observations",
    header: "Observaciones",
  },

  {
    fieldName: "cpu",
    header: "Procesador",
  },
  {
    fieldName: "ram",
    header: "Memoria ram",
  },
  {
    fieldName: "storage",
    header: "Disco duro",
  },
  {
    fieldName: "os",
    header: "Sistema operativo",
  },
];
