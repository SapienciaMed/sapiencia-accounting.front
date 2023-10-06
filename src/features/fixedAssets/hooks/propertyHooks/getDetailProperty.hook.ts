import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {usePropertyById} from "./getPropertyById"

export const useGetDetailProperty = () =>{
    const navigate = useNavigate();
    const {property} = usePropertyById();
    const {control, register,reset}= useForm();

    const handleClose = ()=> navigate("/contabilidad/activos-fijos/consultar");

    useEffect(()=>{
        reset(property);
    },[property]);
    return {control, register, handleClose}
}