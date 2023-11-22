import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGetAllDatesInventory } from "./getFurnitureInventoryDateHook";
import { AppContext } from "../../../common/contexts/app.context";
import { IDatesInventory } from "../../../common/interfaces/fixedAssets.interface";
import { urlApiAccounting } from "../../../common/utils/base-url";

export const useHistoryInventoryFurniture = () => {
  const navigate = useNavigate();
  const { datesInventory } = useGetAllDatesInventory();
  const [dateSelect, setDateSelect] = useState([]);
  const { handleSubmit } = useForm({ mode: "all" });
  const dates = datesInventory.map((item: IDatesInventory) => item.createdAt);

  const handleCheckboxChange = (date, isChecked) => {
    if (isChecked) {
      setDateSelect((prevFechas) => [...prevFechas, date]);
    } else {
      setDateSelect((prevFechas) => prevFechas.filter((f) => f !== date));
    }
  };
  console.log(dateSelect);

  const handleClose = () => {
    navigate(`/contabilidad/control-inventario/bienes-muebles`);
  };

  const downloadCollection = async () => {
    try {
      const requestDataid = dateSelect.map((result) => result.id);
      const url = new URL(
        `${urlApiAccounting}/api/v1/furniture-inventory/generate-xlsx`
      );
      const params = new URLSearchParams();
      const token = localStorage.getItem("token");
      params.append("authorization", token);
      params.append("inventoryDates", JSON.stringify(requestDataid));
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
    handleSubmit,
    downloadCollection,
  };
};
