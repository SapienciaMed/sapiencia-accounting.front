import { useEffect, useState } from "react";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../../common/utils/api-response";
import { urlApiAccounting } from "../../../../common/utils/base-url";

interface INitRazonSocialNombre {
  id: number;
  name: string;
  value: string;
  municipalityCode: string;
  address: string;
  phone: string;
  email: string;
  sender: string;
  chargeSender: string;
  municipality: string;
}

export const useGetContract = () => {
  const { get } = useCrudService(urlApiAccounting);
  const [reload, setReload] = useState(new Date());
  const [contract, setContract] = useState<any>(null);

  const getContract = async () => {
    try {
      const endpoint = "/api/v1/contract/get-info-select";
      const resp: ApiResponse<INitRazonSocialNombre[]> = await get(endpoint);
      setContract(resp.data);
    } catch (err) {
      console.error(err);
      console.log("Error response:", err.response);
    }
  };
  useEffect(() => {
    getContract();
  }, [reload]);

  return { contract, setReload };
};
