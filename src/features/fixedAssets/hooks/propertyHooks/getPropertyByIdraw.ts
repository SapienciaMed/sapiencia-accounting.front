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
            setProperty(resp.data);
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
      getPropertyById();
    }, []);

    return {id, property}
    
}