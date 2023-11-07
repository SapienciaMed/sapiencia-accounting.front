import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { IGetContract } from "../../../../common/interfaces/accountStatement.interface";
import { ApiResponse } from "../../../../common/utils/api-response";
import { urlApiAccounting } from "../../../../common/utils/base-url";

export const useGetContractById = () => {
  const { id } = useParams();
  const { get } = useCrudService(urlApiAccounting);
  const [contract, setContract] = useState<IGetContract>(null);

  const getContractById = async () => {
    try {
      const endpoint = `/api/v1/contract/${id}/get-by-id`;
      const resp: ApiResponse<IGetContract> = await get(endpoint);
      setContract(resp.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getContractById();
  }, []);

  return { id, contract };
};
