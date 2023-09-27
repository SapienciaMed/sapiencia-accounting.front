import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../common/contexts/app.context";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../../common/hooks/form-validator.hook";
import { createContractSchema } from "../../../../common/schemas/accountStatement.schema";
import { urlApiAccounting } from "../../../../common/utils/base-url";
import { useGetContractById } from "./getContractById";
import { useForm } from "react-hook-form";
import { useGetBusiness } from "../businessHooks/getBusinessName";

export const useEditContract = () => {
  const navigate = useNavigate();
  const { setMessage } = useContext(AppContext);
  const { put } = useCrudService(urlApiAccounting);
  const { business } = useGetBusiness();
  const [nitData, setNitData] = useState([]);
  const resolver = useYupValidationResolver(createContractSchema);
  const { id, contract } = useGetContractById();
  const {
    control,
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver, mode: "all" });

  const businessCode = watch("businessCode");

  const updateContract = async (data) => {
    try {
      const endpoint = `/api/v1/contract/${id}/update-by-id`;
      await put(endpoint, data);
      setMessage({
        title: "Cambios guardados",
        description: "¡Cambios guardados exitosamente!",
        show: true,
        okTitle: "Cerrar",
        onOk: () => {
          setMessage({ show: false });
          navigate(-1);
        },
        background: true,
      });
    } catch (err) {
      console.log(err);
      setMessage({
        title: "Error contrato",
        description: "Error, por favor intente más tarde",
        show: true,
        okTitle: "Cerrar",
        onOk: () => setMessage({ show: false }),
        background: true,
      });
    }
  };

  const onSubmit = async (data) => {
    const {} = data;
    const body = {
      ...data,
      phone: String(data.phone),
    };
    setMessage({
      title: "Guardar cambios",
      description: "¿Esta segur@ de guardar los cambios?",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk: () => {
        setMessage({ show: false });
        updateContract(body);
      },
      onClose: () => setMessage({ show: false }),
      background: true,
    });
  };
  const handleCancel = () => {
    setMessage({
      title: "Cancelar contrato",
      description: " ¿Esta segur@ de cancelar la edición del contrato?",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      background: true,
      onOk: () => {
        setMessage({ show: false });
        navigate("/contabilidad/contrato");
      },
      onCancel: () => {
        setMessage({ show: false });
      },
      onClose: () => setMessage({ show: false }),
    });
  };

  useEffect(() => {
    if (!contract) return;
    reset(contract);
    setValue("businessCode", contract.businessCode);
  }, [contract, nitData]);

  useEffect(() => {
    const newData = business?.map((el) => {
      const { data } = el;
      return {
        ...el,
        name: data.nit,
        business: data,
      };
    });
    setNitData(newData);
    console.log({ newData });
  }, [business]);

  useEffect(() => {
    if (!businessCode) return;
    const businessFound = nitData?.find(({ value }) => value === businessCode);
    reset(businessFound);
    setValue("businessCode", businessFound?.value);
  }, [businessCode]);

  return {
    control,
    register,
    errors,
    handleCancel,
    handleSubmit,
    onSubmit: handleSubmit(onSubmit),
    nitData,
  };
};
