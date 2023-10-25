import { DateTime } from "luxon";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import HistoryDescription from "../../../../common/components/Form/table-detail.component";
import { AppContext } from "../../../../common/contexts/app.context";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { urlApiAccounting } from "../../../../common/utils/base-url";
import { usePropertyById } from "./getPropertyById";

export type IFurniture = {
  plate: string; // BIE_PLACA_ACTIVO
  description: string; // BIE_TIPO_ACTIVO_DESCRIPCION
  acquisitionDate: DateTime; // BIE_FECHA_ADQUISICION
  equipmentStatus: number; // BIE_ESTADO_EQUIPO
  userIdentification: string; // BIE_CC_USUARIO
  fullName: string; // BIE_NOMBRE_APELLIDO
  area: number; // BIE_AREA
  model: string; // BIE_MODELO
  brand: string;
  measure: string; // BIE_MEDIDAS
  activeOwner: number; // BIE_PROPIETARIO_ACTIVO
  observation: string; // BIE_OBSERVACION
  clerk: number; // BIE_FUNCIONARIO
};

export enum FURNITURE_NAMES {
  plate = "Placa",
  description = "Descripción",
  acquisitionDate = "Fecha adquisición",
  equipmentStatus = "Estado",
  userIdentification = "Identificación",
  fullName = "Nombre",
  area = "Área",
  model = "Modelo",
  brand = "Marca",
  measure = "Medidas",
  activeOwner = "Propietario",
  observation = "Observaciones",
  clerk = "Funcionario",
}

type IFurnitureHistoryChanges = {
  oldChanges: Partial<IFurniture>;
  newChanges: Partial<IFurniture>;
};

export type IFurnitureHistoryData = {
  id: number;
  furnitureId: number;
  createdAt: string;
  changes: IFurnitureHistoryChanges;
};

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
