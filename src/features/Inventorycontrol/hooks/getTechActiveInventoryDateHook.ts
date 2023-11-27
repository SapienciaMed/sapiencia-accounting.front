import { useEffect, useState } from "react";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { IDatesInventory } from "../../../common/interfaces/fixedAssets.interface";
import { ApiResponse } from "../../../common/utils/api-response";
import { urlApiAccounting } from "../../../common/utils/base-url";

export const useGetAllDatesTechActiveInventory = () => {
  const { get } = useCrudService(urlApiAccounting);
  const [datesInventory, setAllDatesInventory] = useState<any>([]);

  const getAllDatesInventory = async () => {
    try {
      const endpoint = "/api/v1/asset-inventory/get-inventory-dates";
      const resp: ApiResponse<IDatesInventory[]> = await get(endpoint);
      setAllDatesInventory(resp?.data);
    } catch (err) {
      console.error(err);
      console.log("Error response:", err.response);
    }
  };
  useEffect(() => {
    getAllDatesInventory();
  }, []);

  return { datesInventory };
};
