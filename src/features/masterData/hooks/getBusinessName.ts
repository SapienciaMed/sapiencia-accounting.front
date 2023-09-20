import { useEffect, useState } from "react";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { urlApiAccounting } from "../../../common/utils/base-url";

interface INitRazonSocialNombre {
  id: number;
  name: string;
  value: string;
}

export const useGetBusiness = () => {
  const { get } = useCrudService(urlApiAccounting);
  const [reload, setReload] = useState(new Date());
  const [business, setBusiness] = useState<any>(null);

  const getBusiness = async () => {
    try {
      const endpoint = "/api/v1/business/get-all-business-info";
      const resp: ApiResponse<INitRazonSocialNombre[]> = await get(endpoint);
      setBusiness(resp.data);
    } catch (err) {
      console.error(err);
      console.log("Error response:", err.response);
    }
  };
  useEffect(() => {
    getBusiness();
  }, [reload]);

  return { business, setReload };
};
