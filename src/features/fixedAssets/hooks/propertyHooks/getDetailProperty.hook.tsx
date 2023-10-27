import { DateTime } from "luxon";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import HistoryDescription from "../../../../common/components/Form/table-detail.component";
import { AppContext } from "../../../../common/contexts/app.context";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { urlApiAccounting } from "../../../../common/utils/base-url";
import { usePropertyById } from "./getPropertyById";
import { IFurnitureHistoryData } from "../../../../common/interfaces/fixedAssets.interface";

export const useGetDetailProperty = () => {
  const navigate = useNavigate();
  const { id, property } = usePropertyById();
  const { control, register, reset } = useForm();
  const [historyData, setHistoryData] = useState<IFurnitureHistoryData[]>(null);
  const { setMessage } = useContext(AppContext);
  const { get } = useCrudService(urlApiAccounting);

  const handleClose = () => navigate("/contabilidad/activos-fijos/consultar");

  const getFurnitureHistoryById = async () => {
    const resp = await get<IFurnitureHistoryData[]>(
      `/api/v1/furniture-history/${id}/get-furniture-history-by-id`
    );
    setHistoryData(resp.data);
  };

  useEffect(() => {
    getFurnitureHistoryById();
  }, []);

  useEffect(() => {
    reset(property);
  }, [property]);

  const showHistoryProperty = () => {
    setMessage({
      title: "Históricos",
      show: true,
      description: <HistoryDescription historyData={historyData} />,
      size: "medium",
      background: true,
    });
  };

  return { control, register, handleClose, showHistoryProperty };
};
