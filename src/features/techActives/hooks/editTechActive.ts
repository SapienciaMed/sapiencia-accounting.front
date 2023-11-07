import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTechActiveById } from "./getTechActiveById";
import { createTechActiveaSchema } from "../../../common/schemas/techActives.schemas";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { AppContext } from "../../../common/contexts/app.context";
import { useGetGenericItems } from "../../fixedAssets/hooks/propertyHooks/getGenericItems";
import { useGetAllWorkersAllInfoHook } from "./getAllWorkersAllInfo.hook";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";

export const useEditTechActive = () => {
  const navigate = useNavigate();
  const { setMessage } = useContext(AppContext);
  const { id, techActive } = useTechActiveById();
  const { put } = useCrudService(urlApiAccounting);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const resolver = useYupValidationResolver(createTechActiveaSchema);
  const { getListByParent } = useGenericListService();

  const { data: equipmentStatus } = useGetGenericItems("ESTADO_EQUIPO");
  const { data: officers } = useGetGenericItems("FUNCIONARIO");
  const { data: activeOwner } = useGetGenericItems("PROPIETARIO_ACTIVO");
  const { data: sede } = useGetGenericItems("SEDES");
  const { data: typeActive } = useGetGenericItems("TIPO_ACTIVOS");
  const { fullInfo } = useGetAllWorkersAllInfoHook();
  const [areasData, setAreasData] =
    useState<{ name: string; value: string }[]>();

  const [formWatch, setFormWatch] = useState({
    equipmentType: "",
    brand: "",
    model: "",
    plate: "",
    serial: "",
    observations: "",
    cpu: "",
    ram: "",
    storage: "",
    os: "",
  });

  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });

  const [type, campus] = watch(["type", "campus"]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormWatch({
      ...formWatch,
      [name]: value,
    });
  };

  const updateProperty = async (data) => {
    try {
      const endpoint = `/api/v1/asset/${id}/update`;
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
      description: "¿Esta segur@ de editar activo?",
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
      title: "Cancelar edición activo",
      description: "¿Esta segur@ de cancelar la edición del activo?",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      background: true,
      onOk: () => {
        setMessage({ show: false });
        navigate("/contabilidad/activos-tecnologicos/consultar");
      },
      onCancel: () => {
        setMessage({ show: false });
      },
      onClose: () => setMessage({ show: false }),
    });
  };

  useEffect(() => {
    reset(techActive);
  }, [techActive]);

  useEffect(() => {
    const {
      brand,
      equipmentType,
      plate,
      model,
      serial,
      observations,
      cpu,
      ram,
      storage,
      os,
    } = formWatch;
    if (
      !brand ||
      !equipmentType ||
      !plate ||
      !model ||
      !serial ||
      !observations ||
      !cpu ||
      !ram ||
      !storage ||
      !os
    ) {
      return setSubmitDisabled(false);
    }
    setSubmitDisabled(true);
  }, [formWatch]);

  useEffect(() => {}, [isValid, submitDisabled]);

  const getAreaByCampusCode = async (campus: string) => {
    if (!campus) return;
    const resp = await getListByParent({
      grouper: "AREA",
      fieldName: "campusId",
      parentItemCode: campus,
    });
    const areasData = resp.data.map((item) => ({
      name: item.itemDescription,
      value: item.itemCode,
    }));
    setAreasData(areasData);
  };

  useEffect(() => {
    getAreaByCampusCode(campus);
  }, [campus]);

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
    areasData,
    equipmentStatus,
    typeActive,
    sede,
    officers,
    activeOwner,
    fullInfo,
    type,
  };
};
