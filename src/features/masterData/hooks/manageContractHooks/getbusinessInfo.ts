import { useEffect, useState } from "react";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { IBusinessInfoSelect } from "../../../../common/interfaces/accountStatement.interface";
import { ApiResponse } from "../../../../common/utils/api-response";
import { urlApiAccounting } from "../../../../common/utils/base-url";

export const useGetBusinessInfo = () => {
  const { get } = useCrudService(urlApiAccounting);
  const [businessData, setBusinessData] = useState<IBusinessInfoSelect[]>([]);

  const getBusinessInfo = async () => {
    try {
      const endpoint = `/api/v1/business/get-all-business-info`;
      const resp: ApiResponse<IBusinessInfoSelect[]> = await get(endpoint);
      setBusinessData(resp.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBusinessInfo();
  }, []);

  return { businessData };
};
