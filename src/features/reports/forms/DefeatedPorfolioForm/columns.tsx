import { IDefeatedTable } from "../../../../common/interfaces/reports.interface";
import { ITableElement } from "../../../../common/interfaces/table.interfaces";
export const tableColumns: ITableElement<IDefeatedTable>[] = [
  {
    fieldName: "accountStatement.accountNum",
    header: "N° cuenta de cobro",
  },
  {
    fieldName: "accountStatement.contract.business.nit",
    header: "Nit",
  },
  {
    fieldName: "accountStatement.contract.business.name",
    header: "Razón social / Nombre",
  },
  {
    fieldName: "accountStatement.contract.business.name",
    header: "Nombre",
  },
  {
    fieldName: "accountStatement.expirationDate",
    header: "Fecha de vencimiento",
  },
  {
    fieldName: "",
    header: "Dias de vencimiento",
  },
  {
    fieldName: "",
    header: "Gestion",
  },
];
