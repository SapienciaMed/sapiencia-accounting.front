import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { ITechActives } from "../../../common/interfaces/accountStatement.interface";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { useGetGenericItems } from "../../fixedAssets/hooks/propertyHooks/getGenericItems";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { createTechActiveaSchema } from "../../../common/schemas/techActives.schemas";
import { useGetAllWorkersAllInfoHook } from "./getAllWorkersAllInfo.hook";
import { ASSET_TYPES } from "../../../common/constants/asset";

export const useCreateTechActive = () => {
  const navigate = useNavigate();
  const [areasData, setAreasData] =
    useState<{ name: string; value: string }[]>();
  const { getListByParent } = useGenericListService();
  const { setMessage } = useContext(AppContext);
  const { post } = useCrudService(urlApiAccounting);

  const { data: equipmentStatus } = useGetGenericItems("ESTADO_EQUIPO");
  const { data: activeOwner } = useGetGenericItems("PROPIETARIO_ACTIVO");
  const { data: sede } = useGetGenericItems("SEDES");
  const { data: typeActive } = useGetGenericItems("TIPO_ACTIVOS");
  const { fullInfo } = useGetAllWorkersAllInfoHook();
  const [assetType, setAssetType] = useState(null);
  const resolver = useYupValidationResolver(createTechActiveaSchema(assetType));

  const {
    control,
    handleSubmit,
    register,
    setValue,
    clearErrors,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });

  const [type, campus, ownerId] = watch(["type", "campus", "ownerId"]);
  const createTechActive = async (data: ITechActives) => {
    try {
      const endpoint = "/api/v1/asset/create";
      const resp = await post<ITechActives>(endpoint, data);
      if (resp.operation.code === EResponseCodes.FAIL) {
        return setMessage({
          title: "Activo fijo",
          description: resp.operation.message,
          onOk: () => setMessage({ show: false }),
          show: true,
          okTitle: "Cancelar",
          background: true,
        });
      }
      setMessage({
        title: "Activo fijo",
        description: " ¡Creado exitosamente!",
        show: true,
        okTitle: "Cerrar",
        onOk: () => {
          navigate("/contabilidad/activos-tecnologicos/consultar");
          setMessage({ show: false });
        },
        background: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = (data) => {
    setMessage({
      title: "Crear Activo",
      description: "¿Esta segur@ de crear el  activo?",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk: () => {
        setMessage({ show: false });
        createTechActive(data);
      },
      onClose: () => setMessage({ show: false }),
      background: true,
    });
  };

  const handleCancel = () => {
    setMessage({
      title: "Cancelar creación activo",
      description: "¿Esta segur@ de cancelar la creación del activo?",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      background: true,
      onOk: () => {
        setMessage({ show: false });
        navigate("/contabilidad/activos-tecnologicos/consultar");
      },
      onCancel: () => {
        setMessage({ show: false });
      },
      onClose: () => setMessage({ show: false }),
    });
  };

  const getAreaByCampusCode = async (campus: string) => {
    if (!campus) return;
    const resp = await getListByParent({
      grouper: "AREA",
      fieldName: "campusId",
      parentItemCode: campus,
    });
    const areasData = resp.data.map((item) => ({
      name: item.itemDescription,
      value: item.itemCode,
    }));
    setAreasData(areasData);
  };

  useEffect(() => {
    getAreaByCampusCode(campus);
  }, [campus]);

  useEffect(() => {
    if (!fullInfo) return;
    const workerFound = ownerId
      ? fullInfo.find((worker) => worker.value === Number(ownerId))
      : undefined;
    setValue("clerk", String(workerFound?.clerk ?? ""));
  }, [ownerId, fullInfo]);

  useEffect(() => {
    setAssetType(type);
    clearErrors();
  }, [type]);

  return {
    areasData,
    typeActive,
    sede,
    equipmentStatus,
    activeOwner,
    control,
    handleSubmit: handleSubmit(onSubmit),
    register,
    errors,
    handleCancel,
    isValid,
    fullInfo,
    watch,
    type,
  };
};
