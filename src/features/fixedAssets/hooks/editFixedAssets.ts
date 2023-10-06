import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { useFixedAssetsById } from "./getFixedAssetsById";
import { editFixedAssets } from "../../../common/schemas/fixedAssets.schema";
import { useGetGenericItems } from "./propertyHooks/getGenericItems";
import { useGetAllIdentification } from "./propertyHooks/getAllIdentificationUserHook";
import { useGetAllWorkersFullName } from "./propertyHooks/getAllWorkersFullNameHook";


export const useEditFixedAssets = () => {
  const navigate = useNavigate();
  const { setMessage } = useContext(AppContext);
  const { id, fixedAssets } = useFixedAssetsById();
  const { put } = useCrudService(urlApiAccounting);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const resolver = useYupValidationResolver(editFixedAssets);
  const { data: area } = useGetGenericItems("AREA");
  const { data: equipmentStatus } = useGetGenericItems("ESTADO_EQUIPO");
  const { data: officers } = useGetGenericItems("FUNCIONARIO");
  const { identification } = useGetAllIdentification();
  const { fullName } = useGetAllWorkersFullName();
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });

  const updateFixedAssets = async (data) => {
    try {
      const endpoint = `/api/v1/furniture/${id}/update-by-id`;
      await put(endpoint, data);
      setMessage({
        title: "Cambios guardados",
        description: "¡Cambios guardados exitosamente!",
        show: true,
        okTitle: "Cerrar",
        onOk: () => setMessage({ show: false }),
        background: true,
      });
    } catch (error) {
      console.error(error);
      setMessage({
        title: "Activo fijo",
        description: "Error, por favor intente más tarde",
        show: true,
        okTitle: "Cerrar",
        onOk: () => setMessage({ show: false }),
        background: true,
      });
    }

   

  };
  const onSubmit = async (data) => {
    setMessage({
      title: "Guardar cambios",
      description: "Está segur@ de guardar los cambios?",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk: () => {
        setMessage({ show: false });
        updateFixedAssets(data);
      },
      onClose: () => setMessage({ show: false }),
      background: true,
    });
  };

  const handleCancel = () => {
    setMessage({
      title: "Cancelar cambios",
      description: "¿Está segur@ de cancelar los cambios?",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      background: true,
      onOk: () => {
        setMessage({ show: false });
        navigate("/activos-fijos/consultar");
      },
      onCancel: () => {
        setMessage({ show: false });
      },
      onClose: () => setMessage({ show: false }),
    });
  };

  useEffect(() => {
    reset(fixedAssets);
  }, [fixedAssets]);



  return {
    control,
    register,
    errors,
    isValid,
    handleCancel,
    handleSubmit,
    submitDisabled,
    onSubmit: handleSubmit(onSubmit),
    area,
    equipmentStatus,
    identification,
    fullName,officers
  };
};
