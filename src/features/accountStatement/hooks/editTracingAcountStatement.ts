import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { IGetAccountStatement } from "../../../common/interfaces/accountStatement.interface";
import { editAccountStatementTrackingSchema } from "../../../common/schemas/accountStatement.schema";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { useGetGenericItems } from "../../fixedAssets/hooks/propertyHooks/getGenericItems";

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
  const { data: paymentTypeData } = useGetGenericItems("FORMA_PAGO");
  const resolver = useYupValidationResolver(editAccountStatementTrackingSchema);
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { isValid, errors },
  } = useForm({ resolver, mode: "all" });
  const statusId = watch("tracking.statusId");
  const { data: statementStatusData } = useGetGenericItems(
    "ESTADO_CUENTA",
    true
  );

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
        title: "Cambios guardados",
        description: "¡Cambios guardados exitosamente!",
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
      trackingDate: data.trackingDate ?? data.tracking.trackingDate,
    };
    setMessage({
      title: "Guardar Cambios",
      description: "¿Está segur@ de guardar los cambios?",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk: () => {
        setMessage({ show: false });
        updateAccountStatementTracking(body);
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
    errors,
    control,
    isValid,
    register,
    statusId,
    handleCancel,
    handleSubmit,
    paymentTypeData,
    statementStatusData,
    currentAccountStatement,
    onSubmit: handleSubmit(onSubmit),
  };
};
