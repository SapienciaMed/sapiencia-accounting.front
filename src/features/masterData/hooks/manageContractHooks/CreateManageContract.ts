// useManageContract.js
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../common/contexts/app.context";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../../common/hooks/form-validator.hook";
import {
  IBusinessInfoSelect,
  IContract,
} from "../../../../common/interfaces/accountStatement.interface";
import { createContractSchema } from "../../../../common/schemas/accountStatement.schema";
import { urlApiAccounting } from "../../../../common/utils/base-url";
import { EResponseCodes } from "../../../../common/constants/api.enum";
import { useGetBusinessInfo } from "./getbusinessInfo";

export const useManageContract = () => {
  const navigate = useNavigate();
  const { setMessage } = useContext(AppContext);
  const { post } = useCrudService(urlApiAccounting);
  const resolver = useYupValidationResolver(createContractSchema);
  const { businessData } = useGetBusinessInfo();
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });
  const businessValue = watch("value");

  const createManageContract = async (data: IBusinessInfoSelect) => {
    try {
      const body = { ...data, businessCode: data.value };
      const endpoint = "/api/v1/contract/create";
      const resp = await post<IContract>(endpoint, body);
      if (resp.operation.code === EResponseCodes.FAIL) {
        return setMessage({
          title: "Creación Contrato",
          description: resp.operation.message,
          onOk: () => setMessage({ show: false }),
          show: true,
          okTitle: "Cerrar",
          background: true,
        });
      }
      setMessage({
        title: "Contrato",
        description: " ¡Creado exitosamente!",
        show: true,
        okTitle: "Cerrar",
        onOk: () => {
          setMessage({ show: false });
          navigate(-1);
        },
        background: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = (data) => {
    setMessage({
      title: "Creación contrato",
      description: "¿Está segur@ de crear el contrato?",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk: () => {
        setMessage({ show: false });
        createManageContract(data);
      },
      onClose: () => setMessage({ show: false }),
      background: true,
    });
  };

  const handleCancel = () => {
    setMessage({
      title: "Cancelar contrato",
      description: "¿Está segur@ de cancelar la creación del contrato?",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      background: true,
      onOk: () => {
        setMessage({ show: false });
        navigate("/contabilidad/contrato");
      },
      onCancel: () => {
        setMessage({ show: false });
      },
      onClose: () => setMessage({ show: false }),
    });
  };

  useEffect(() => {
    const businessFound = businessData.find(
      ({ value }) => value === businessValue
    );
    reset(businessFound);
  }, [businessValue]);

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    register,
    errors,
    handleCancel,
    isValid,
    businessData,
  };
};
