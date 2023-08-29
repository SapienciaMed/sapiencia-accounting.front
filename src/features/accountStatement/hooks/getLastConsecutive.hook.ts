import { useEffect, useState } from "react";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { IAccountStatement } from "../../../common/interfaces/accountStatement.interface";
import { ApiResponse } from "../../../common/utils/api-response";
import { urlApiAccounting } from "../../../common/utils/base-url";

export const useGetLastConsecutive = () => {
  const { get } = useCrudService(null, urlApiAccounting);
  const [lastConsecutive, setLastConsecutive] = useState<string>(null);
  const [realoadConsecutive, setRealoadConsecutive] = useState(new Date());

  const getLastConsecutive = async () => {
    try {
      const endpoint = "/api/v1/account-statement/get-last";
      const resp: ApiResponse<IAccountStatement> = await get(endpoint);
      const consecutiveId = String(resp.data.accountNum + 1);
      setLastConsecutive(consecutiveId);
    } catch (err) {
      console.error(err);
      getLastConsecutive();
    }
  };

  useEffect(() => {
    getLastConsecutive();
  }, [realoadConsecutive]);

  return { lastConsecutive, setRealoadConsecutive };
};
