import { DateTime } from "luxon";
import { IFilterPlate } from "../../../../common/interfaces/fixedAssets.interface";
import { ITableElement } from "../../../../common/interfaces/table.interfaces";

export const tableColumns: ITableElement<IFilterPlate>[] = [
  {
    fieldName: "plate",
    header: "Placa activo",
  },
  {
    fieldName: "ownerDate",
    header: "Fecha de adquisición",
  },
  {
    fieldName: "status",
    header: "Estado",
  },
  {
    fieldName: "userCreated",
    header: "CC usuario",
  },
  {
    fieldName: "ownerFullName",
    header: "Nombres y apellidos",
  },
  {
    fieldName: "createdAt",
    header: "Fecha inventario",
    renderCell: () => <>{DateTime.now().toFormat("yyyy/MM/dd")}</>,
  },
];
