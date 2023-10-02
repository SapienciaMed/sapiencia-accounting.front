import { numberToColombianPesosWord } from "@isildur1/number-to-word";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { editAccountStatementSchema } from "../../../common/schemas/accountStatement.schema";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { useGetAccountStatementById } from "./getAccountStatementById";
import { useGetContract } from "../../masterData/hooks/manageContractHooks/getContract";
import { useGetBusiness } from "../../masterData/hooks/businessHooks/getBusinessName";

export const useEditAccountStatement = () => {
  const navigate = useNavigate();
  const { setMessage } = useContext(AppContext);
  const { id, accountStatement } = useGetAccountStatementById();
  const { business: businessData } = useGetBusiness();
  const { put } = useCrudService(urlApiAccounting);
  const { contract: contractData, setReload } = useGetContract();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const resolver = useYupValidationResolver(editAccountStatementSchema);
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });
  const [accountNum, contractCode, valuePay] = watch([
    "id",
    "contractCode",
    "valuePay",
  ]);

  const updateAccountStatement = async (data) => {
    try {
      const endpoint = `/api/v1/account-statement/update/${id}`;
      await put(endpoint, data);
      setMessage({
        title: "Cambios guardados",
        description: "¡Cambios guardados exitosamente!",
        show: true,
        okTitle: "Cerrar",
        onOk: () => setMessage({ show: false }),
        background: true,
      });
    } catch (err) {
      console.log(err);
      setMessage({
        title: "Cuenta de cobro",
        description: "Error, por favor intente más tarde",
        show: true,
        okTitle: "Cerrar",
        onOk: () => setMessage({ show: false }),
        background: true,
      });
    }
  };

  const onSubmit = async (data) => {
    const { contractCode, valuePay, concept } = data;
    console.log(data);
    const body = {
      contractCode,
      valuePay,
      concept,
    };
    setMessage({
      title: "Guardar cambios",
      description: "Está segur@ de guardar los cambios?",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk: () => {
        setMessage({ show: false });
        updateAccountStatement(body);
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
        navigate("/contabilidad/cuenta-de-cobro/consultar");
      },
      onCancel: () => {
        setMessage({ show: false });
      },
      onClose: () => setMessage({ show: false }),
    });
  };

  useEffect(() => {
    reset(accountStatement);
  }, [accountStatement]);

  useEffect(() => {
    const businessFound = contractData?.find(
      ({ value }) => value === contractCode
    );
    setValue("nit", businessFound?.data?.nit ?? "");
    setValue("business", businessFound?.data?.name ?? "");
  }, [contractCode, valuePay]);

  useEffect(() => {
    if (accountStatement) {
      setValue(
        "valueLabel",
        numberToColombianPesosWord(accountStatement.valuePay)
      );
    }
  }, [accountStatement]);

  useEffect(() => {
    setValue("valueLabel", numberToColombianPesosWord(valuePay));
  }, [valuePay]);

  useEffect(() => {
    if (!accountNum || !contractCode || !valuePay) {
      return setSubmitDisabled(true);
    }
    setSubmitDisabled(false);
  }, [accountNum, contractCode, valuePay]);

  return {
    control,
    register,
    errors,
    isValid,
    handleCancel,
    handleSubmit,
    submitDisabled,
    onSubmit: handleSubmit(onSubmit),
    contractData,
  };
};
