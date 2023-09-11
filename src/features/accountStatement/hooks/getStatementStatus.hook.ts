import { useState, useEffect } from "react";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { urlApiAccounting } from "../../../common/utils/base-url";

type IAccountStatementStatus = {
  id: number;
  status_name: string;
};

export const useGetStatementStatus = () => {
  const { get } = useCrudService(urlApiAccounting);
  const [statementstatus, setStatementstatus] = useState<any>(null);

  const getStatementstatus = async () => {
    try {
      const endpoint = "/api/v1/account-statement-status/get-all";
      const resp: ApiResponse<IAccountStatementStatus[]> = await get(endpoint);
      const adaptedData = resp.data.map(({ id, status_name }) => {
        return {
          value: id,
          name: status_name,
        };
      });
      setStatementstatus(adaptedData);
    } catch (err) {
      console.error(err);
      console.log("Error response:", err.response);
    }
  };
  useEffect(() => {
    getStatementstatus();
  }, []);

  useEffect(() => {
    console.log(statementstatus);
  }, [statementstatus]);


  return { statementstatus };
};
