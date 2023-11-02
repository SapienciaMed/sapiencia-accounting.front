import { useEffect, useState } from "react";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../../common/utils/api-response";
import { urlApiAccounting } from "../../../../common/utils/base-url";
import { IWorkersInfoSelect } from "../../../../common/interfaces/accountStatement.interface";

export const useGetAllIdentification = () => {
  const { get } = useCrudService(urlApiAccounting);
  const [identification, setAllIdentification] = useState<any>([]);

  const getAllIdentification = async () => {
    try {
      const endpoint = "/api/v1/furniture/get-identification-users-select-info";
      const resp: ApiResponse<IWorkersInfoSelect[]> = await get(endpoint);
      setAllIdentification(resp?.data);
    } catch (err) {
      console.error(err);
      console.log("Error response:", err.response);
    }
  };
  useEffect(() => {
    getAllIdentification();
  }, []);

  return { identification };
};
