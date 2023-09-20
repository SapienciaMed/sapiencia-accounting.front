import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { IGetBusiness } from "../../../common/interfaces/accountStatement.interface";
import { ApiResponse } from "../../../common/utils/api-response";
import { urlApiAccounting } from "../../../common/utils/base-url";

export const useGetBusinessById = () => {
  const { id } = useParams();
  const { get } = useCrudService(urlApiAccounting);
  const [businessId, setBusiness] = useState<IGetBusiness>(null);

  const getBusinessById = async () => {
    try {
      const endpoint = `/api/v1/business/${id}/get-by-id`;
      const resp: ApiResponse<IGetBusiness> = await get(endpoint);
      const municipalityCode = Number(resp.data.municipalityCode);
      setBusiness({
        ...resp.data,
        municipalityCode: isNaN(municipalityCode) ? "" : municipalityCode,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBusinessById();
  }, []);

  return { id, businessId };
};
