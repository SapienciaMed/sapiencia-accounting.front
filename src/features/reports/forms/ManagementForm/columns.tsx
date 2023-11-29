import { ICausationTable } from "../../../../common/interfaces/reports.interface";
import { ITableElement } from "../../../../common/interfaces/table.interfaces";
export const tableColumns: ITableElement<ICausationTable>[] = [
  {
    fieldName: "",
    header: "Si es o no respuesta",
  },

  {
    fieldName: "",
    header: "N° de respuesta",
  },
  {
    fieldName: "",
    header: "Fecha radicación",
  },
  {
    fieldName: "expeditionDate",
    header: "Fecha de expedición",
  },

  {
    fieldName: "",
    header: "Tipo cliente",
  },
  {
    fieldName: "",
    header: "ID del usuario remitente",
  },
  {
    fieldName: "contract.business.nit",
    header: "Nit o número de cédula del cliente",
  },

  {
    fieldName: "",
    header: "Codigo del asunto",
  },
  {
    fieldName: "",
    header: "Codigo tipo de documento",
  },
  {
    fieldName: "",
    header: "Envio automático a ruta",
  },
  {
    fieldName: "",
    header: "Codigo de ruta",
  },
  {
    fieldName: "concept",
    header: "Descripción del documento",
  },

  {
    fieldName: "",
    header: "Observaciones",
  },
  {
    fieldName: "",
    header: "Rutas imagenes",
  },
  {
    fieldName: "",
    header: "Condición",
  },
  {
    fieldName: "",
    header: "Dirección",
  },
  {
    fieldName: "",
    header: "Teléfono",
  },
];
