import { useEffect, useState } from "react";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { IAccountStatement } from "../../../common/interfaces/accountStatement.interface";
import { ApiResponse } from "../../../common/utils/api-response";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { EResponseCodes } from "../../../common/constants/api.enum";

export const useGetLastConsecutive = () => {
  const { get } = useCrudService(urlApiAccounting);
  const [lastConsecutive, setLastConsecutive] = useState<string>(null);
  const [realoadConsecutive, setRealoadConsecutive] = useState(new Date());

  const getLastConsecutive = async () => {
    try {
      const endpoint = "/api/v1/account-statement/get-last";
      const resp: ApiResponse<IAccountStatement> = await get(endpoint);
      if (resp.operation.code === EResponseCodes.FAIL) {
        return setLastConsecutive("0");
      }
      const consecutiveId = String(resp.data.accountNum + 1);
      setLastConsecutive(consecutiveId);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getLastConsecutive();
  }, [realoadConsecutive]);

  return { lastConsecutive, setRealoadConsecutive };
};
