import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../../../../common/contexts/app.context";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../../common/hooks/form-validator.hook";
import { manageCompanySchema } from "../../../../common/schemas/accountStatement.schema";
import { urlApiAccounting } from "../../../../common/utils/base-url";
import { useGetBusinessById } from "./getBusinessById";

export const useEditBusiness = () => {
  const navigate = useNavigate();
  const { setMessage } = useContext(AppContext);
  const { id, businessId } = useGetBusinessById();
  const { put } = useCrudService(urlApiAccounting);
  const resolver = useYupValidationResolver(manageCompanySchema);
  const {
    control,
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver, mode: "all" });

  const updateBusiness = async (data) => {
    try {
      const endpoint = `/api/v1/business/${id}/update`;
      await put(endpoint, data);
      setMessage({
        title: "Razón social",
        description: "¡Editada exitosamente!",
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
        title: "Error razón social",
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
      title: "Edición  razón social",
      description: "¿Esta segur@ de editar la razón social?",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk: () => {
        setMessage({ show: false });
        updateBusiness(body);
      },
      onClose: () => setMessage({ show: false }),
      background: true,
    });
  };

  const handleCancel = () => {
    setMessage({
      title: "Cancelar edición razón social",
      description: "¿Esta segur@ de cancelar la edición de la razón social?",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      background: true,
      onOk: () => {
        setMessage({ show: false });
        navigate("/contabilidad/razon-social");
      },
      onCancel: () => {
        setMessage({ show: false });
      },
      onClose: () => setMessage({ show: false }),
    });
  };
  useEffect(() => {
    reset(businessId);
  }, [businessId]);

  useEffect(() => {
    setValue("nit", businessId?.nit ?? "");
    setValue("name", businessId?.name ?? "");
    setValue("municipalityCode", businessId?.municipalityCode ?? "");
    setValue("address", businessId?.address ?? "");
    setValue("phone", businessId?.phone ?? "");
    setValue("email", businessId?.email ?? "");
    setValue("sender", businessId?.sender ?? "");
    setValue("chargeSender", businessId?.chargeSender ?? "");
  }, []);

  return {
    control,
    register,
    errors,
    handleCancel,
    handleSubmit,
    watch,
    onSubmit: handleSubmit(onSubmit),
  };
};
