import { IBusiness } from "../../../../common/interfaces/accountStatement.interface";
import { ITableElement } from "../../../../common/interfaces/table.interfaces";

export const tableColumns: ITableElement<IBusiness>[] = [
  {
    fieldName: "nit",
    header: "NIT",
  },
  {
    fieldName: "name",
    header: "Razón social / Nombre",
    renderCell: (row) => {
      return <>{row.name.toLocaleUpperCase()}</>;
    },
  },
  {
    fieldName: "municipality",
    header: "Ciudad",
  },
  {
    fieldName: "address",
    header: "Dirección",
  },
  {
    fieldName: "phone",
    header: "Teléfono",
  },
];
