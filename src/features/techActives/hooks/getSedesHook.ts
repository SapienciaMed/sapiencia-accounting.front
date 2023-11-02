import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  IAdditionalField,
  IGenericList,
} from "../../../common/interfaces/global.interface";
import { urlApiCore } from "../../../common/utils/base-url";
import { ApiResponse } from "../../../common/utils/api-response";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { ISelectInfo } from "../../../common/interfaces/accountStatement.interface";

export const useAreasBySede = (sorteable: boolean = false) => {
  const { get } = useCrudService(urlApiCore);
  const [data, setData] = useState<ISelectInfo[]>([]);
  const listUrl = "/api/v1/generic-list";

  const getAreasBySede = async (
    params: IAdditionalField
  ): Promise<ApiResponse<IGenericList[]>> => {
    try {
      const endpoint = `/get-by-parent/AREAS`;
      const data = await get(`${listUrl}${endpoint}`, params);
      const adaptedData = data?.map((item) => {
        const { itemDescription, itemCode } = item;
        return {
          value: Number(itemCode),
          name: itemDescription,
        };
      });
      const sortedData = sorteable
        ? adaptedData.sort((a, b) => a.name.localeCompare(b.name))
        : adaptedData;
      setData(sortedData);
    } catch (error) {
      console.error(error);
    }
    return;
  };

  useEffect(() => {
    getAreasBySede;
  }, []);

  return { data };
};
