import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { ITechActives } from "../../../common/interfaces/accountStatement.interface";

export const useTechActiveById = () => {
  const { id } = useParams();
  const { get } = useCrudService(urlApiAccounting);
  const [techActive, setTechActive] = useState<ITechActives>(null);

  const getTechActiveById = async () => {
    try {
      const endpoint = `/api/v1/asset/${id}/get-by-id`;
      const resp: ApiResponse<ITechActives> = await get(endpoint);
      setTechActive(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTechActiveById();
  }, []);

  return { id, techActive };
};
