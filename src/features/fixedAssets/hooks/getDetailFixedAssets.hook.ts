import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {useFixedAssetsById} from "./getFixedAssetsById"

export const useGetDetailFixedAssets = () =>{
    const navigate = useNavigate();
    const {fixedAssets} = useFixedAssetsById();
    const {control, register,reset}= useForm();

    const handleClose = ()=> navigate(-1);

    useEffect(()=>{
        reset(fixedAssets);
    },[fixedAssets]);

    return {control, register, handleClose}
}