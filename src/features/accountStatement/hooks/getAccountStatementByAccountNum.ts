import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IGetAccountStatement } from "../../../common/interfaces/accountStatement.interface";
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
      setAccountStatement(resp.data);
      console.log(resp.data);
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAccountStatementByAccountNum();
  }, []);

  return {
    accountStatement,
  };
};
