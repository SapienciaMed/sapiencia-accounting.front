import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IAccountStatementForm } from "../../../common/interfaces/accountStatement.interface";
import { numberToWord } from "../../../common/utils/helpers";
import { useGetAccountStatementById } from "./getAccountStatementById";

export const useGetDetailAccountStatement = () => {
  const navigate = useNavigate();
  const { accountStatement } = useGetAccountStatementById();
  const { control, register, reset, setValue } =
    useForm<IAccountStatementForm>();

  const handleClose = () => navigate(-1);

  useEffect(() => {
    reset(accountStatement);
  }, [accountStatement]);

  useEffect(() => {
    if (accountStatement) {
      setValue("valueLabel", numberToWord(accountStatement.valuePay));
    }
  }, [accountStatement]);

  return { control, register, handleClose };
};
