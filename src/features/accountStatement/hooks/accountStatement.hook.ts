import { numberToColombianPesosWord } from "@isildur1/number-to-word";
import { DateTime } from "luxon";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import {
  IAccountStatement,
  PAYMENT_TYPE,
} from "../../../common/interfaces/accountStatement.interface";
import { accountStatementSchema } from "../../../common/schemas/accountStatement.schema";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { jsDateToSQL } from "../../../common/utils/helpers";
import { businessData } from "../data";
import { useGetLastConsecutive } from "./getLastConsecutive.hook";
import { useGetContract } from "../../masterData/hooks/manageContractHooks/getContract";

export const useAccountStatement = () => {
  const navigate = useNavigate();
  const { setMessage } = useContext(AppContext);
  const { lastConsecutive, setRealoadConsecutive } = useGetLastConsecutive();
  const { contract: contractData, setReload } = useGetContract();
  const { post } = useCrudService(urlApiAccounting);
  const resolver = useYupValidationResolver(accountStatementSchema);
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "onChange" });
  const [contractValue, paymentTypeValue, valuePayValue] = watch([
    "contractCode",
    "paymentType",
    "valuePay",
  ]);

  const createAccountStatement = async (data: IAccountStatement) => {
    try {
      const endpoint = "/api/v1/account-statement";
      await post(endpoint, data);
      setRealoadConsecutive(new Date());
      reset();
      setMessage({
        title: "Cuenta de cobro",
        description: "¡Creada exitosamente!",
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

  const onSubmit = (data) => {
    const { expeditionDate, expirationDate, paymentType } = data;
    const body = {
      ...data,
      expeditionDate: jsDateToSQL(expeditionDate),
      expirationDate: jsDateToSQL(expirationDate),
      accountNum: lastConsecutive,
      userCreate: "000 0000 0000",
      paymentType: String(paymentType),
    };
    setMessage({
      title: "Crear cuenta de cobro",
      description: "¿Estás segur@ de crear la cuenta de cobro?",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk: () => {
        setMessage({ show: false });
        createAccountStatement(body);
      },
      onClose: () => setMessage({ show: false }),
      background: true,
    });
  };

  const handleCancel = () => {
    setMessage({
      title: "Crear cuenta de cobro",
      description: "¿Estás segur@ de cancelar los cambios?",
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
    const formatExpirationDate = (days: number) => {
      return setValue(
        "expirationDate",
        DateTime.now().plus({ days }).toJSDate()
      );
    };
    if (!paymentTypeValue) {
      return setValue("expirationDate", null);
    }
    if (paymentTypeValue === PAYMENT_TYPE.CONTADO) {
      formatExpirationDate(0);
    } else if (paymentTypeValue === PAYMENT_TYPE["A 30 días"]) {
      formatExpirationDate(30);
    } else if (paymentTypeValue === PAYMENT_TYPE["A 60 días"]) {
      formatExpirationDate(60);
    } else if (paymentTypeValue === PAYMENT_TYPE["A 90 días"]) {
      formatExpirationDate(90);
    }
  }, [paymentTypeValue]);

  useEffect(() => {
    if (!valuePayValue) return;
    setValue("valueLabel", numberToColombianPesosWord(valuePayValue));
  }, [valuePayValue]);

  useEffect(() => {
    const businessFound = businessData.find(
      ({ id }) => Number(id) === contractValue
    );
    setValue("nit", businessFound?.nit ?? "");
    setValue("business", businessFound?.name ?? "");
  }, [contractValue]);

  useEffect(() => {
    setValue("expeditionDate", new Date());
  }, [lastConsecutive]);

  useEffect(() => {
    setValue("id", lastConsecutive);
  }, [lastConsecutive]);

  useEffect(() => {
    if (!contractData) return;
    const contractFound = contractData.find(
      ({ value }) => value === contractValue
    );
    setValue("nit", contractFound.data.nit);
    setValue("business", contractFound.data.name);
  }, [contractValue]);

  return {
    lastConsecutive,
    control,
    handleSubmit: handleSubmit(onSubmit),
    register,
    errors,
    handleCancel,
    isValid,
    contractData,
  };
};
