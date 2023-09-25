import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../common/contexts/app.context";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../../common/hooks/form-validator.hook";
import { IBusiness } from "../../../../common/interfaces/accountStatement.interface";
import { manageCompanySchema } from "../../../../common/schemas/accountStatement.schema";
import { urlApiAccounting } from "../../../../common/utils/base-url";
import { EResponseCodes } from "../../../../common/constants/api.enum";

export const useManageCompanyName = () => {
  const navigate = useNavigate();
  const { setMessage } = useContext(AppContext);
  const { post } = useCrudService(urlApiAccounting);
  const resolver = useYupValidationResolver(manageCompanySchema);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });

  const createManageCompanyName = async (data: IBusiness) => {
    try {
      const body = { ...data, phone: String(data.phone) };
      const endpoint = "/api/v1/business";
      const resp = await post<null>(endpoint, body);

      if (resp.operation.code === EResponseCodes.FAIL) {
        return setMessage({
          title: "Creación razón social",
          description: resp.operation.message,
          show: true,
          okTitle: "Cerrar",
          onOk: () => {
            setMessage({ show: false });
          },
          background: true,
        });
      }
      setMessage({
        title: "¡Razón social!",
        description: "¡Creada exitosamente!",
        show: true,
        okTitle: "Cerrar",
        onOk: () => {
          setMessage({ show: false });
          navigate(0);
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
    };
    setMessage({
      title: "Crear razón social",
      description: "¿Esta segur@ de crear la razón social?",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk: () => {
        setMessage({ show: false });
        createManageCompanyName(body);
      },
      onClose: () => setMessage({ show: false }),
      background: true,
    });
  };

  const handleCancel = () => {
    setMessage({
      title: "Cancelar razón social",
      description: "¿Esta segur@ de cancelar la creación de la razón social?",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      background: true,
      onOk: () => {
        setMessage({ show: false });
        navigate("/contabilidad/razon-social");
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
  };
};
