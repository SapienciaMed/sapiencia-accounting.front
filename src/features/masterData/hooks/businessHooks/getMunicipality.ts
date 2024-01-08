import { useEffect, useState } from "react";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../../common/utils/api-response";
import { urlApiCore } from "../../../../common/utils/base-url";

interface IMunicipalityRes {
  id: number;
  grouper: string;
  itemCode: string;
  itemDescription: string;
  additionalFields: AdditionalFields;
}
interface AdditionalFields {
  departmentId: string;
}

export const useGetMunicipality = (sorteable: boolean = false) => {
  const { get } = useCrudService(urlApiCore);
  const [municipality, setMunicipality] = useState<any>(null);

  const getMunicipalities = async () => {
    try {
      const endpoint = "/api/v1/generic-list/get-by-grouper/MUNICIPIOS";
      const resp: ApiResponse<IMunicipalityRes[]> = await get(endpoint);
      const adaptedData = resp.data.map(({ id, itemDescription }) => {
        return {
          value: id,
          name: itemDescription,
        };
      });
      const sortedData = sorteable
        ? adaptedData.sort((a, b) => a.name.localeCompare(b.name))
        : adaptedData;
      setMunicipality(sortedData);
    } catch (err) {
      console.error(err);
      console.log("Error response:", err.response);
    }
  };
  useEffect(() => {
    getMunicipalities();
  }, []);

  return { municipality };
};
