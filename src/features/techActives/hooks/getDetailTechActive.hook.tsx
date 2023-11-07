import { DateTime } from "luxon";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTechActiveById } from "./getTechActiveById";
import { HistoryDescription } from "../../../common/components/Form/table-detail.component";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { IFurnitureHistoryData } from "../../../common/interfaces/fixedAssets.interface";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { useGetGenericItems } from "../../fixedAssets/hooks/propertyHooks/getGenericItems";

export const useGetDetailTechActive = () => {
  const navigate = useNavigate();
  const { id, techActive } = useTechActiveById();
  const { control, register, reset } = useForm();
  const [historyData, setHistoryData] = useState<IFurnitureHistoryData[]>(null);
  const { setMessage } = useContext(AppContext);
  const { get } = useCrudService(urlApiAccounting);
  const [type] = ["type"];
  const { data: typeActive } = useGetGenericItems("TIPO_ACTIVOS");

  const handleClose = () =>
    navigate("/contabilidad/activos-tecnologicos/consultar");

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
    reset(techActive);
  }, [techActive]);

  const showHistoryTechActive = () => {
    setMessage({
      title: "Históricos",
      show: true,
      description: <HistoryDescription historyData={historyData} />,
      size: "medium",
      background: true,
    });
  };

  return {
    control,
    register,
    handleClose,
    showHistoryTechActive,
    type,
    typeActive,
  };
};
