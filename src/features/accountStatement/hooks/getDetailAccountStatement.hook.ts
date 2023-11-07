import { numberToColombianPesosWord } from "@isildur1/number-to-word";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGetGenericItems } from "../../fixedAssets/hooks/propertyHooks/getGenericItems";
import { useGetAccountStatementById } from "./getAccountStatementById";

export const useGetDetailAccountStatement = () => {
  const navigate = useNavigate();
  const { accountStatement } = useGetAccountStatementById();
  const { data: paymentTypeData } = useGetGenericItems("FORMA_PAGO");
  const { control, register, reset, setValue } = useForm();

  const handleClose = () => navigate(-1);

  useEffect(() => {
    if (accountStatement) {
      const { paymentType } = accountStatement;
      reset({
        ...accountStatement,
        paymentType: Number(paymentType),
      });
    }
  }, [accountStatement]);

  useEffect(() => {
    if (accountStatement) {
      setValue(
        "valueLabel",
        numberToColombianPesosWord(accountStatement.valuePay)
      );
    }
  }, [accountStatement]);

  return { control, register, handleClose, paymentTypeData };
};
