import { IManageContract } from "../../../../common/interfaces/accountStatement.interface";
import { ITableElement } from "../../../../common/interfaces/table.interfaces";
export const tableColumns: ITableElement<IManageContract>[] = [
  {
    fieldName: "contractId",
    header: "Contrato",
  },
  {
    fieldName: "business.nit",
    header: "NIT",
  },
  {
    fieldName: "business.name",
    header: "Razón social nombre",
  },
  {
    fieldName: "debitAccount",
    header: "Cuenta contable débito",
  },
  {
    fieldName: "creditAccount",
    header: "Cuenta contable crédito",
  },
];
