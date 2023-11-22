import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllDatesFurnituresInventory } from "./getFurnitureInventoryDateHook";
import { IDatesInventory } from "../../../common/interfaces/fixedAssets.interface";
import { urlApiAccounting } from "../../../common/utils/base-url";

export const useHistoryInventoryFurniture = () => {
  const navigate = useNavigate();
  const { datesInventory } = useGetAllDatesFurnituresInventory();
  const [dateSelect, setDateSelect] = useState([]);
  const dates = datesInventory.map((item: IDatesInventory) => item.createdAt);

  const handleCheckboxChange = (date, isChecked) => {
    if (isChecked) {
      setDateSelect((prevFechas) => [...prevFechas, date]);
      console.log(date);
    } else {
      setDateSelect((prevFechas) => prevFechas.filter((f) => f !== date));
    }
  };

  const handleClose = () => {
    navigate(`/contabilidad/control-inventario/bienes-muebles`);
  };

  const downloadCollection = async (ev) => {
    try {
      ev.preventDefault();
      const requestDataid = dateSelect;
      const url = new URL(
        `${urlApiAccounting}/api/v1/furniture-inventory/generate-inventory-xlsx`
      );
      const params = new URLSearchParams();
      const token = localStorage.getItem("token");
      params.append("inventoryDates", JSON.stringify(requestDataid));
      params.append("authorization", token);
      url.search = params.toString();
      window.open(url.toString(), "_blank");
    } catch (err) {
      console.log(err);
    }
  };

  return {
    dates,
    dateSelect,
    handleCheckboxChange,
    handleClose,
    downloadCollection,
  };
};
