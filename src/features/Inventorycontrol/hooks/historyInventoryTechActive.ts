import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IDatesInventory } from "../../../common/interfaces/fixedAssets.interface";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { useGetAllDatesTechActiveInventory } from "./getTechActiveInventoryDateHook";

export const useHistoryInventoryTechActive = () => {
  const navigate = useNavigate();
  const { datesInventory } = useGetAllDatesTechActiveInventory();
  const [dateSelect, setDateSelect] = useState([]);
  const dates = datesInventory.map((item: IDatesInventory) => item.createdAt);

  const handleCheckboxChange = (date, isChecked) => {
    if (isChecked) {
      setDateSelect((prevFechas) => [...prevFechas, date]);
    } else {
      setDateSelect((prevFechas) => prevFechas.filter((f) => f !== date));
    }
  };
  const handleClose = () => {
    navigate(`/contabilidad/control-inventario/activos-tecnologicos`);
  };

  const downloadCollection = async (ev) => {
    try {
      ev.preventDefault();
      const requestDataid = dateSelect;
      const url = new URL(
        `${urlApiAccounting}/api/v1/asset-inventory/generate-inventory-xlsx`
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
