import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { IGetAccountStatement } from "../../../common/interfaces/accountStatement.interface";
import { editAccountStatementSchema } from "../../../common/schemas/accountStatement.schema";
import { urlApiAccounting } from "../../../common/utils/base-url";

type IUpdateTracking = {
  statusId: string;
  observation: string;
  trackingDate: string;
};

interface IUpdateForm extends IGetAccountStatement {
  trackingDate: string;
}

export const useEditAccountStatementTracking = () => {
  const navigate = useNavigate();
  const { setMessage, currentAccountStatement, setCurrentAccountStatement } =
    useContext(AppContext);
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

  const updateAccountStatementTracking = async (body: IUpdateTracking) => {
    try {
      const { id } = currentAccountStatement;
      const endpoint = `/api/v1/account-statement-tracking/${id}/update-or-create`;
      const resp = await put<null>(endpoint, body);
      if (resp.operation.code === EResponseCodes.FAIL) {
        return setMessage({
          title: "Error en el seguimiento",
          description: resp.operation.message,
          show: true,
          okTitle: "Cerrar",
          onOk: () => setMessage({ show: true }),
          background: true,
        });
      }
      setMessage({
        title: "¡Cambios guardados!",
        description: "Cambios guardados exitosamente",
        show: true,
        okTitle: "Cerrar",
        background: true,
        onOk: () => {
          setMessage({ show: false });
          navigate(-1);
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (data: IUpdateForm) => {
    const body = {
      observation: data.tracking.observation,
      statusId: data.tracking.statusId,
      trackingDate: data.trackingDate,
    };
    updateAccountStatementTracking(body);
  };

  const handleCancel = () => {
    setMessage({
      title: "Editar seguimiento cuenta de cobro",
      description: "¿Estás segur@ de cancelar los cambios?",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      background: true,
      onOk: () => {
        setMessage({ show: false });
        navigate(-1);
      },
      onCancel: () => {
        setMessage({ show: false });
      },
      onClose: () => setMessage({ show: false }),
    });
  };

  useEffect(() => {
    if (!currentAccountStatement) {
      return navigate("/contabilidad/cuenta-de-cobro/seguimiento/");
    }
    reset(currentAccountStatement);
  }, []);

  useEffect(() => {
    return () => {
      setCurrentAccountStatement(null);
    };
  }, []);

  return {
    control,
    register,
    errors,
    handleCancel,
    handleSubmit,
    watch,
    currentAccountStatement,
    onSubmit: handleSubmit(onSubmit),
  };
};
