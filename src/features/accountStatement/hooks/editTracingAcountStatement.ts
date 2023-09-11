import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { editAccountStatementSchema } from "../../../common/schemas/accountStatement.schema";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { useGetAccountStatementByAccountNum } from "./getAccountStatementByAccountNum";

export const useEditAccountStatementTracking = () => {
  const navigate = useNavigate();
  const { setMessage } = useContext(AppContext);
  const { accountStatement } = useGetAccountStatementByAccountNum();
  const { put } = useCrudService(urlApiAccounting);

  const resolver = useYupValidationResolver(editAccountStatementSchema);
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver, mode: "all" });

  const updateAccountStatementTracking = async (data) => {
    try {
      const endpoint = `/api/v1/account-statement-tracking/${accountStatement?.id}/update-or-create`;
      await put(endpoint, data);
      setMessage({
        title: "¡Cambios guardados!",
        description: "Cambios guardados exitosamente",
        show: true,
        okTitle: "Cerrar",
        onOk: () => setMessage({ show: false }),
        background: true,
      });
    } catch (err) {
      console.error(err);
      setMessage({
        title: "Error en el seguimiento",
        description:
          "Ha ocurrido un error. Por favor, inténtalo nuevamente más tarde.",
        show: true,
        okTitle: "Cerrar",
        onOk: () => setMessage({ show: true }),
        background: true,
      });
    }
  };

  const onSubmit = async (data) => {
    const { observation, statusId } = data;
    const requestBody = {
      observation,
      statusId,
    };

    updateAccountStatementTracking(requestBody);
  };

  const handleCancel = () => navigate(-1);

  useEffect(() => {
    reset(accountStatement);
  }, [accountStatement]);

  return {
    control,
    register,
    errors,
    handleCancel,
    handleSubmit,
    watch,
    onSubmit: handleSubmit(onSubmit),
  };
};
