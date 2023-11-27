import { DateTime } from "luxon";
import { IFilterPlate } from "../../../../common/interfaces/fixedAssets.interface";
import { ITableElement } from "../../../../common/interfaces/table.interfaces";

export const tableColumns: ITableElement<IFilterPlate>[] = [
  {
    fieldName: "plate",
    header: "Placa activo",
  },
  {
    fieldName: "acquisitionDate",
    header: "Fecha de adquisición",
  },
  {
    fieldName: "equipmentStatus",
    header: "Estado",
  },
  {
    fieldName: "userIdentification",
    header: "CC usuario",
  },
  {
    fieldName: "fullName",
    header: "Nombres y apellidos",
  },
  {
    fieldName: "createdAt",
    header: "Fecha inventario",
    renderCell: () => <>{DateTime.now().toFormat("yyyy/MM/dd")}</>,
  },
];
