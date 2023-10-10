import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../../common/utils/api-response";
import { urlApiAccounting } from "../../../../common/utils/base-url";
import { IGetProperty } from "../../../../common/interfaces/fixedAssets.interface";

export const usePropertyById= ()=>{
    const {id} = useParams();
    const {get} = useCrudService(urlApiAccounting)
    const [property, setProperty]= useState<IGetProperty>(null);

    const getPropertyById = async ()=> {
        try {
            const endpoint = `/api/v1/furniture/${id}/get-by-id-raw`;
            const resp: ApiResponse<IGetProperty> = await get(endpoint);
            const data = resp.data
            console.log(data)
            if(data.equipmentStatus == '2' || data.equipmentStatus == '3'){
                data.clerk = null;
                data.workerId = 0;
            }
            setProperty(data);
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
      getPropertyById();
    }, []);

    return {id, property}
    
}