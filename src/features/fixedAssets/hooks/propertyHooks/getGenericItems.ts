import { useEffect, useState } from "react";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import {
  IGenericItem,
  ISelectInfo,
} from "../../../../common/interfaces/accountStatement.interface";
import { ApiResponse } from "../../../../common/utils/api-response";
import { urlApiCore } from "../../../../common/utils/base-url";

export const useGetGenericItems = (grouper: string) => {
  const { get } = useCrudService(urlApiCore);
  const [data, setData] = useState<ISelectInfo[]>([]);
  const [reload, setReload] = useState(new Date());

  const getData = async () => {
    try {
      const endpoint = `/api/v1/generic-list/get-by-grouper/${grouper}`;
      const { data }: ApiResponse<IGenericItem[]> = await get(endpoint);
      const adaptedData = data
        ?.map((item) => {
          const { itemDescription, itemCode } = item;
          return {
            value: Number(itemCode),
            name: itemDescription,
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
      setData(adaptedData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, [reload]);

  return { data, setReload };
};
