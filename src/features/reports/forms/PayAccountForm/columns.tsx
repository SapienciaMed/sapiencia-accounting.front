import { IPaymentTable } from "../../../../common/interfaces/reports.interface";
import { ITableElement } from "../../../../common/interfaces/table.interfaces";
export const tableColumns: ITableElement<IPaymentTable>[] = [
  {
    fieldName: "accountStatement.accountNum",
    header: "N° cuenta de cobro",
  },
  {
    fieldName: "trackingDate",
    header: "Fecha de pago",
  },
  {
    fieldName: "accountStatement.contract.business.nit",
    header: "Nit",
  },
  {
    fieldName: "accountStatement.contract.business.name",
    header: "Razón social",
  },
  {
    fieldName: "accountStatement.contract.sender",
    header: "Nombre",
  },
  {
    fieldName: "accountStatement.concept",
    header: "Concepto de cobro",
  },
  {
    fieldName: "accountStatement.valuePay",
    header: "Valor",
  },
  {
    fieldName: "accountStatement.contract.debitAccount",
    header: "Cuenta contable débito",
  },

  {
    fieldName: "accountStatement.contract.creditAccount",
    header: "Cuenta contable crédito",
  },
];
