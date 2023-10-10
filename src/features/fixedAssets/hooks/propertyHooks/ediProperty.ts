import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../common/contexts/app.context";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../../common/hooks/form-validator.hook";
import { urlApiAccounting } from "../../../../common/utils/base-url";
import { usePropertyById } from "./getPropertyByIdraw";
import { editProperySchema } from "../../../../common/schemas/fixedAssets.schema";
import { useGetGenericItems } from "./getGenericItems";
import { useGetAllIdentification } from "./getAllIdentificationUserHook";
import { useGetAllWorkersFullName } from "./getAllWorkersFullNameHook";
import { EResponseCodes } from "../../../../common/constants/api.enum";

export const useEditProperty = () => {
  const navigate = useNavigate();
  const { setMessage } = useContext(AppContext);
  const { id, property } = usePropertyById();
  const { put } = useCrudService(urlApiAccounting);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const resolver = useYupValidationResolver(editProperySchema);
  const { data: area } = useGetGenericItems("AREA");
  const { data: equipmentStatus } = useGetGenericItems("ESTADO_EQUIPO");
  const { data: officers } = useGetGenericItems("FUNCIONARIO");
  const { data: activeOwner } = useGetGenericItems("PROPIETARIO_ACTIVO");
  const { identification } = useGetAllIdentification();
  const { fullName } = useGetAllWorkersFullName();
  const [formWatch, setFormWatch] = useState({
    description: "",
    brand: "",
    model: "",
    measure: "",
    observation: "",
  });


  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormWatch({
      ...formWatch,
      [name]: value,
    });
  };

  const updateProperty = async (data) => {
    try {
      const endpoint = `/api/v1/furniture/${id}/update-by-id`;
      const resp = await put(endpoint, data);

      if (resp.operation.code === EResponseCodes.FAIL) {
        return setMessage({
          title: "Editar Activo",
          description: resp.operation.message,
          show: true,
          okTitle: "Cerrar",
          onOk: () => {
            setMessage({ show: false });
          },
          background: true,
        });
      }
      setMessage({
        title: "Activo fijo",
        description: "¡Editado exitosamente!",
        show: true,
        okTitle: "Cerrar",
        onOk: () => {
          setMessage({ show: false });
          navigate(-1);
        },
        
        background: true,
      });
    } catch (error) {
      console.error(error);
      setMessage({
        title: "Activo fijo",
        description: "Error, por favor intente más tarde",
        show: true,
        okTitle: "Cerrar",
        onOk: () => setMessage({ show: false }),
        background: true,
      });
    }
  };
  const onSubmit = async (data) => {
    setMessage({
      title: "Editar Activo",
      description: "¿Está segur@ de editar activo?",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk: () => {
        setMessage({ show: false });
        updateProperty(data);
        
      },
      onClose: () => setMessage({ show: false }),
      background: true,
    });
  };

  const handleCancel = () => {
    setMessage({
      title: "Cancelar cambios",
      description: "¿Está segur@ de cancelar los cambios?",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      background: true,
      onOk: () => {
        setMessage({ show: false });
        navigate("/contabilidad/activos-fijos/consultar");
      },
      onCancel: () => {
        setMessage({ show: false });
      },
      onClose: () => setMessage({ show: false }),
    });
  };

  useEffect(() => {
    reset(property);
  }, [property]);

  useEffect(() => {
    const { brand, description, measure, model, observation } = formWatch;
    if (!brand || !description || !measure || !model || !observation) {
      return setSubmitDisabled(false)
    }
    setSubmitDisabled(true)
  }, [formWatch]);

  useEffect(() => {
  }, [isValid, submitDisabled])

  return {
    control,
    register,
    errors,
    isValid,
    handleCancel,
    handleSubmit,
    submitDisabled,
    handleChange,
    onSubmit: handleSubmit(onSubmit),
    area,
    equipmentStatus,
    identification,
    fullName,
    officers,
    activeOwner,
  };
};
