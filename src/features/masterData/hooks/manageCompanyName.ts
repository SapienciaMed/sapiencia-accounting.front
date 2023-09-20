import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { IBusiness } from "../../../common/interfaces/accountStatement.interface";
import { manageCompanySchema } from "../../../common/schemas/accountStatement.schema";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { EResponseCodes } from "../../../common/constants/api.enum";

export const useManageCompanyName = () => {
  const navigate = useNavigate();
  const { setMessage } = useContext(AppContext);
  const { post } = useCrudService(urlApiAccounting);
  const resolver = useYupValidationResolver(manageCompanySchema);
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });

  const createManageCompanyName = async (data: IBusiness) => {
    try {
      const body = { ...data, phone: String(data.phone) };
      const endpoint = "/api/v1/business";
      const resp = await post<null>(endpoint, body);
      if (resp.operation.code === EResponseCodes.FAIL) {
        return setMessage({
          title: "Error en la creación",
          description: resp.operation.message,
          show: true,
          okTitle: "Cerrar",
          background: true,
        });
      }
      setMessage({
        title: "¡Cambios guardados!",
        description: "Razón social creado exitosamente",
        show: true,
        okTitle: "Cerrar",
        onOk: () => {
          setMessage({ show: false });
          navigate(-1);
        },
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