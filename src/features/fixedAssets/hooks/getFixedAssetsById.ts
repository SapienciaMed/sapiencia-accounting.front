import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { urlApiAccounting } from "../../../common/utils/base-url";

export const useFixedAssetsById= ()=>{
    const {id} = useParams();
    const {get} = useCrudService(urlApiAccounting)
    const [fixedAssets, setFixedAssets]= useState(null);

    const getFixedAssetsById = async ()=> {
        try {
            const endpoint = `/api/v1/fixedAssets/get-by-id/${id}`;
            //const resp: ApiResponse = await get(endpoint);
            //setFixedAssets(resp.data);
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
      getFixedAssetsById();
    }, []);

    return {id, fixedAssets}
    
}