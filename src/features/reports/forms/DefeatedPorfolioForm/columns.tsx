import { DateTime } from "luxon";
import { IDefeatedTable } from "../../../../common/interfaces/reports.interface";
import { ITableElement } from "../../../../common/interfaces/table.interfaces";
import moment from "moment";
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
    renderCell: () => <>{DateTime.now().toFormat("yyyy/MM/dd")}</>,
  },

  {
    fieldName: "expiratioDays",
    header: "Días de vencimiento",
    renderCell: (el) => {
      moment.locale("es");
      return (
        <>{moment(el.accountStatement.expirationDate.toString()).fromNow()}</>
      );
    },
  },
  {
    fieldName: "",
    header: "Gestión",
  },
];
