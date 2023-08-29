import { IGetAccountStatement } from "../../../../common/interfaces/accountStatement.interface";
import { ITableElement } from "../../../../common/interfaces/table.interfaces";
import {
  ISOToLocale,
  formaterNumberToCurrency,
} from "../../../../common/utils/helpers";

export const tableColumns: ITableElement<IGetAccountStatement>[] = [
  {
    fieldName: "contract.contractId",
    header: "Contrato",
    renderCell: (row) => {
      return <>{row.contract.contractId.toLocaleUpperCase()}</>;
    },
  },
  {
    fieldName: "accountNum",
    header: "No. Cuenta de cobro",
  },
  {
    fieldName: "expeditionDate",
    header: "Fecha expedición",
    renderCell: (row) => {
      return <>{ISOToLocale(row.expeditionDate)}</>;
    },
  },
  {
    fieldName: "contract.business.nit",
    header: "NIT",
  },
  {
    fieldName: "contract.business.name",
    header: "Razón social /  Nombre",
    renderCell: (row) => {
      return <>{row.contract.business.name.toLocaleUpperCase()}</>;
    },
  },
  {
    fieldName: "concept",
    header: "Concepto",
  },
  {
    fieldName: "valuePay",
    header: "Valor",
    renderCell: (row) => {
      return <>{formaterNumberToCurrency(Number(row.valuePay))}</>;
    },
  },
];