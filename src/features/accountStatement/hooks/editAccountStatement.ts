import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { editAccountStatementSchema } from "../../../common/schemas/accountStatement.schema";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { numberToWord } from "../../../common/utils/helpers";
import { businessData } from "../data";
import { useGetAccountStatementById } from "./getAccountStatementById";

export const useEditAccountStatement = () => {
  const navigate = useNavigate();
  const { setMessage } = useContext(AppContext);
  const { id, accountStatement } = useGetAccountStatementById();
  const { put } = useCrudService(null, urlApiAccounting);
  const resolver = useYupValidationResolver(editAccountStatementSchema);
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver, mode: "all" });
  const contractCodeValue = watch("contractCode");

  const updateAccountStatement = async (data) => {
    try {
      const endpoint = `/api/v1/account-statement/update/${id}`;
      await put(endpoint, data);
      setMessage({
        title: "¡Cambios guardados!",
        description: "Cambios guardados exitosamente",
        show: true,
        OkTitle: "Cerrar",
        onOk: () => setMessage({ show: false }),
        background: true,
      });
    } catch (err) {
      console.log(err);
      setMessage({
        title: "Cuenta de cobro",
        description: "Error, por favor intente más tarde",
        show: true,
        OkTitle: "Cerrar",
        onOk: () => setMessage({ show: false }),
        background: true,
      });
    }
  };

  const onSubmit = async (data) => {
    const { contractCode, valuePay, concept } = data;
    const body = {
      contractCode,
      valuePay,
      concept,
    };
    setMessage({
      title: "Guardar cambios",
      description: "Estás segur@ de guardar los cambios?",
      show: true,
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk: () => {
        setMessage({ show: false });
        updateAccountStatement(body);
      },
      onClose: () => setMessage({ show: false }),
      background: true,
    });
  };

  const handleCancel = () => navigate(-1);

  useEffect(() => {
    reset(accountStatement);
  }, [accountStatement]);

  useEffect(() => {
    const businessFound = businessData.find(
      ({ id }) => Number(id) === contractCodeValue
    );
    setValue("nit", businessFound?.nit ?? "");
    setValue("business", businessFound?.name ?? "");
  }, [contractCodeValue]);

  useEffect(() => {
    if (accountStatement) {
      setValue("valueLabel", numberToWord(accountStatement.valuePay));
    }
  }, [accountStatement]);

  return {
    control,
    register,
    errors,
    handleCancel,
    handleSubmit,
    onSubmit: handleSubmit(onSubmit),
  };
};
