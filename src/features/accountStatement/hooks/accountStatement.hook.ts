import { DateTime } from "luxon";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import writtenNumber from "written-number";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { IAccountStatement } from "../../../common/interfaces/accountStatement.interface";
import { accountStatementSchema } from "../../../common/schemas/accountStatement.schema";
import { ApiResponse } from "../../../common/utils/api-response";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { jsDateToSQL } from "../../../common/utils/helpers";
import { businessData } from "../data";
import { useGetLastConsecutive } from "./getLastConsecutive.hook";

export const useAccountStatement = () => {
  const { setMessage } = useContext(AppContext);
  const { lastConsecutive, setRealoadConsecutive } = useGetLastConsecutive();
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
  const { post } = useCrudService(null, urlApiAccounting);

  const createAccountStatement = async (data) => {
    try {
      const endpoint = "/api/v1/account-statement";
      const resp: ApiResponse<IAccountStatement> = await post(endpoint, data);
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
        description: err.message,
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
      userCreate: crypto.randomUUID(),
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
    if (paymentTypeValue === -1) {
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
    let lettersValue: string = writtenNumber(valuePayValue, { lang: "es" });
    lettersValue = lettersValue.charAt(0).toUpperCase() + lettersValue.slice(1);
    setValue("valueLabel", lettersValue.concat(" m/l."));
  }, [valuePayValue]);

  useEffect(() => {
    const businessFound = businessData.find(({ id }) => id === contractValue);
    setValue("nit", businessFound?.nit ?? "");
    setValue("business", businessFound?.name ?? "");
  }, [contractValue]);

  useEffect(() => {
    setValue("expeditionDate", new Date());
  }, []);

  return {
    lastConsecutive,
    control,
    handleSubmit: handleSubmit(onSubmit),
    register,
    errors,
  };
};
