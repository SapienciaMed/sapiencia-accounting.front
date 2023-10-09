import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EResponseCodes } from "../../../../common/constants/api.enum";
import { AppContext } from "../../../../common/contexts/app.context";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../../common/hooks/form-validator.hook";
import { IProperty } from "../../../../common/interfaces/accountStatement.interface";
import { createPropertySchema } from "../../../../common/schemas/fixedAssets.schema";
import { urlApiAccounting } from "../../../../common/utils/base-url";
import { jsDateToISODate } from "../../../../common/utils/helpers";
import { useGetAllIdentification } from "./getAllIdentificationUserHook";
import { useGetAllWorkersFullName } from "./getAllWorkersFullNameHook";
import { useGetGenericItems } from "./getGenericItems";

export const useManageProperty = () => {
  const navigate = useNavigate();
  const { setMessage } = useContext(AppContext);
  const { post } = useCrudService(urlApiAccounting);
  const resolver = useYupValidationResolver(createPropertySchema);
  const { data: area } = useGetGenericItems("AREA");
  const { data: equipmentStatus } = useGetGenericItems("ESTADO_EQUIPO");
  const { data: officers } = useGetGenericItems("FUNCIONARIO");
  const { data: activeOwner } = useGetGenericItems("PROPIETARIO_ACTIVO");
  const { identification } = useGetAllIdentification();
  const { fullName } = useGetAllWorkersFullName();
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });

  const createProperty = async (data: IProperty) => {
    try {
      const endpoint = "/api/v1/furniture/create";
      const resp = await post<IProperty>(endpoint, data);
      if (resp.operation.code === EResponseCodes.FAIL) {
        return setMessage({
          title: "Activo fijo",
          description: resp.operation.message,
          onOk: () => setMessage({ show: false }),
          show: true,
          okTitle: "Cerrar",
          background: true,
        });
      }
      setMessage({
        title: "Activo fijo",
        description: " ¡Creado exitosamente!",
        show: true,
        okTitle: "Cerrar",
        onOk: () => {
          reset();
          setMessage({ show: false });
        },
        background: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = (data) => {
    const body = {
      ...data,
      acquisitionDate: jsDateToISODate(data.acquisitionDate),
    };
    setMessage({
      title: "Crear Activo",
      description: "¿Esta segur@ de crear el  activo?",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk: () => {
        setMessage({ show: false });
        createProperty(body);
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
        navigate("/contabilidad/activos-fijos/consultar");
      },
      onCancel: () => {
        setMessage({ show: false });
      },
      onClose: () => setMessage({ show: false }),
    });
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    register,
    errors,
    handleCancel,
    isValid,
    equipmentStatus,
    area,
    officers,
    activeOwner,
    identification,
    fullName,
  };
};
