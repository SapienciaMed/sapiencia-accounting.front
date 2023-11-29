import { ICausationTable } from "../../../../common/interfaces/reports.interface";
import { ITableElement } from "../../../../common/interfaces/table.interfaces";
export const tableColumns: ITableElement<ICausationTable>[] = [
  {
    fieldName: "accountNum",
    header: "N° cuenta de cobro",
  },
  {
    fieldName: "expeditionDate",
    header: "Fecha de expedición",
  },
  {
    fieldName: "contract.business.nit",
    header: "Nit",
  },
  {
    fieldName: "contract.business.name",
    header: "Razón social",
  },
  {
    fieldName: "contract.sender",
    header: "Nombre",
  },
  {
    fieldName: "concept",
    header: "Concepto de cobro",
  },
  {
    fieldName: "valuePay",
    header: "Valor",
  },
  {
    fieldName: "contract.debitAccount",
    header: "Cuenta contable débito",
  },

  {
    fieldName: "contract.creditAccount",
    header: "Cuenta contable crédito",
  },
];
