import { DateTime } from "luxon";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import {
  IAccountStatement,
  PAYMENT_TYPE,
} from "../../../common/interfaces/accountStatement.interface";
import { accountStatementSchema } from "../../../common/schemas/accountStatement.schema";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { jsDateToSQL, numberToWord } from "../../../common/utils/helpers";
import { businessData } from "../data";
import { useGetLastConsecutive } from "./getLastConsecutive.hook";

export const useAccountStatement = () => {
  const { setMessage } = useContext(AppContext);
  const { lastConsecutive, setRealoadConsecutive } = useGetLastConsecutive();
  const { post } = useCrudService( urlApiAccounting);
  const resolver = useYupValidationResolver(accountStatementSchema);
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver, mode: "all" });
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
      description: "Estás segur@ de crear la cuenta de cobro?",
      show: true,
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk: () => {
        setMessage({ show: false });
        createAccountStatement(body);
      },
      onClose: () => setMessage({ show: false }),
      background: true,
    });
  };

  useEffect(() => {
    if (!paymentTypeValue) return;
    if (paymentTypeValue === PAYMENT_TYPE.CONTADO) {
      return setValue(
        "expirationDate",
        DateTime.now().plus({ days: 0 }).toJSDate()
      );
    }
    setValue(
      "expirationDate",
      DateTime.now().plus({ days: paymentTypeValue }).toJSDate()
    );
  }, [paymentTypeValue]);

  useEffect(() => {
    if (!valuePayValue) return;
    setValue("valueLabel", numberToWord(valuePayValue));
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

  return {
    lastConsecutive,
    control,
    handleSubmit: handleSubmit(onSubmit),
    register,
    errors,
  };
};
