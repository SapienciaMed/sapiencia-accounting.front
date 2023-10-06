import { useEffect, useState } from "react";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../../common/utils/api-response";
import { urlApiAccounting } from "../../../../common/utils/base-url";
import { IWorkersInfoSelect } from "../../../../common/interfaces/accountStatement.interface";

export const useGetAllWorkersFullName = () => {
  const { get } = useCrudService(urlApiAccounting);
  const [fullName, setAllWorkersFullName] = useState<any>([]);

  const getAllWorkersFullName = async () => {
    try {
      const endpoint = "/api/v1/furniture/get-workers-full-name-select-info";
      const resp: ApiResponse<IWorkersInfoSelect[]> = await get(endpoint);
      setAllWorkersFullName(resp.data);
    } catch (err) {
      console.error(err);
      console.log("Error response:", err.response);
    }
  };
  useEffect(() => {
    getAllWorkersFullName();
  }, []);

  return { fullName };
};
