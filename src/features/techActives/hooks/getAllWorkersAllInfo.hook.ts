import { useEffect, useState } from "react";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { IWorkersInfoSelect } from "../../../common/interfaces/accountStatement.interface";
import { ApiResponse } from "../../../common/utils/api-response";
import { urlApiAccounting } from "../../../common/utils/base-url";

export const useGetAllWorkersAllInfoHook = () => {
  const { get } = useCrudService(urlApiAccounting);
  const [fullInfo, setAllWorkersFullInfo] = useState<any>([]);

  const getAllWorkersAllInfoHook = async () => {
    try {
      const endpoint = "/api/v1/asset/get-workers-info-select";
      const resp: ApiResponse<IWorkersInfoSelect[]> = await get(endpoint);
      setAllWorkersFullInfo(resp.data);
    } catch (err) {
      console.error(err);
      console.log("Error response:", err.response);
    }
  };
  useEffect(() => {
    getAllWorkersAllInfoHook();
  }, []);

  return { fullInfo };
};
