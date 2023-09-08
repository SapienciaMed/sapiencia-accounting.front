import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  IAccountStatementForm,
  IGetAccountStatement,
} from "../../../common/interfaces/accountStatement.interface";
import { ApiResponse } from "../../../common/utils/api-response";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { urlApiAccounting } from "../../../common/utils/base-url";

export const useGetAccountStatementByAccountNum = () => {
  const { accountNum } = useParams();
  const { get } = useCrudService(urlApiAccounting);
  const [accountStatement, setAccountStatement] =
    useState<IGetAccountStatement>(null);

  const getAccountStatementByAccountNum = async () => {
    try {
      const endpoint = `/api/v1/account-statement/${accountNum}/get-by-account-number`;
      const resp: ApiResponse<IGetAccountStatement> = await get(endpoint);
      console.log(resp.data);
      console.log("concepto ", resp.data.concept);
      setAccountStatement(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAccountStatementByAccountNum();
  }, []);

  return {
    accountStatement
  }
};
