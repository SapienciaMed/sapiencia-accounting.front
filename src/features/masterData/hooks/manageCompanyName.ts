import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { IBusiness } from "../../../common/interfaces/accountStatement.interface";
import {
  accountStatementSchema,
  manageCompanySchema,
} from "../../../common/schemas/accountStatement.schema";
import { urlApiAccounting } from "../../../common/utils/base-url";

export const useManageCompanyName = () => {
  const navigate = useNavigate();
  const { setMessage } = useContext(AppContext);
  const { post } = useCrudService(urlApiAccounting);
  const resolver = useYupValidationResolver(manageCompanySchema);
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });

  const createManageCompanyName = async (data: IBusiness) => {
    try {
      const endpoint = "/business";
      await post(endpoint, data);
      reset();
      setMessage({
        title: "Razón social",
        description: "¡Creada exitosamente!",
        show: true,
        okTitle: "Cerrar",
        onOk: () => setMessage({ show: false }),
        background: true,
      });
    } catch (err) {
      console.log(err);
      setMessage({
        title: "Razón social",
        description: err.message,
        show: true,
        okTitle: "Cerrar",
        onOk: () => setMessage({ show: false }),
        background: true,
      });
    }
  };

  const onSubmit = (data) => {
    const body = {
      ...data,
    };
    setMessage({
      title: "Crear Razón social",
      description: "¿Estás segur@ de crear razón social?",
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
      title: "Crear Razón social",
      description: "¿Estás segur@ de cancelar los cambios?",
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
