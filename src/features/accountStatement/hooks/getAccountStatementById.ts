import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { IGetAccountStatement } from "../../../common/interfaces/accountStatement.interface";
import { ApiResponse } from "../../../common/utils/api-response";
import { urlApiAccounting } from "../../../common/utils/base-url";

export const useGetAccountStatementById = () => {
  const { id } = useParams();
  const { get } = useCrudService(null, urlApiAccounting);
  const [accountStatement, setAccountStatement] =
    useState<IGetAccountStatement>(null);

  const getAccountStatementById = async () => {
    try {
      const endpoint = `/api/v1/account-statement/get-by-id/${id}`;
      const resp: ApiResponse<IGetAccountStatement> = await get(endpoint);
      setAccountStatement(resp.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAccountStatementById();
  }, []);

  return { id, accountStatement };
};