import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EResponseCodes } from "../../../../common/constants/api.enum";
import { AppContext } from "../../../../common/contexts/app.context";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../../common/hooks/form-validator.hook";
import { IProperty } from "../../../../common/interfaces/accountStatement.interface";
import { ITableAction } from "../../../../common/interfaces/table.interfaces";
import { urlApiAccounting } from "../../../../common/utils/base-url";
import { useGetGenericItems } from "./getGenericItems";
import { consultPropertySchema } from "../../../../common/schemas/fixedAssets.schema";

export const useConsultProperty = () => {
  const { data: equipmentStatusData } = useGetGenericItems("ESTADO_EQUIPO");
  const navigate = useNavigate();
  const tableComponentRef = useRef(null);

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [tableView, setTableView] = useState<boolean>(false);
  const { deleted } = useCrudService(urlApiAccounting);
  const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
  const resolver = useYupValidationResolver(consultPropertySchema);
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });
  const { setMessage } = useContext(AppContext);
  const urlGetConsultFurniture = `${urlApiAccounting}/api/v1/furniture/get-all-paginated`;
  const [formWatch, setFormWatch] = useState({
    plate: "",
    description: "",
  });
  const [acquisitionDate, equipmentStatus] = watch([
    "acquisitionDate",
    "equipmentStatus",
  ]);

  const tableActions: ITableAction<IProperty>[] = [
    {
      icon: "Detail",
      onClick: (row) => {
        // navigate(`/contabilidad/cuenta-de-cobro/detalle/${row.id}`);
      },
    },
    {
      icon: "Edit",
      onClick: (row) => {
        // navigate(`/contabilidad/contrato/editar/${row.id}`);
      },
    },
    {
      icon: "Delete",
      onClick: (row) => {
        handleDelete(row);
      },
    },
  ];

  const handleDelete = (row) => {
    setMessage({
      title: " Eliminar contrato",
      description: `¿Está segur@ de eliminar el contrato?`,
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk: () => {
        setMessage({ show: false });
        deleteContract(row);
      },
      onClose: () => setMessage({ show: false }),
      background: true,
    });
  };

  const deleteContract = async (row) => {
    try {
      const endpoint = `/api/v1/contract/${row.id}/delete-by-id`;
      const resp = await deleted<null>(endpoint);
      // setReload(new Date());
      handleClean();
      setMessage({
        title: "Contrato",
        description: `¡Contrato eliminado exitosamente!`,
        show: true,
        okTitle: "Cerrar",
        onOk: () => {
          setMessage({ show: false });
        },
        background: true,
      });
      if (resp.operation.code === EResponseCodes.FAIL) {
        return setMessage({
          title: "Contrato en uso",
          description: resp.operation.message,
          show: true,
          okTitle: "Cerrar",
          onOk: () => {
            setMessage({ show: false });
          },
          background: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClean = () => {
    reset();
    setSubmitDisabled(true);
    tableComponentRef.current?.emptyData();
    setTableView(false);
  };

  const onSubmit = handleSubmit((filters: IProperty) => {
    setTableView(true);
    tableComponentRef.current?.loadData(filters);
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormWatch({
      ...formWatch,
      [name]: value,
    });
  };

  useEffect(() => {
    const { plate, description } = formWatch;
    if (acquisitionDate || equipmentStatus || description || plate) {
      return setSubmitDisabled(false);
    }
    setSubmitDisabled(true);
  }, [acquisitionDate, equipmentStatus, formWatch]);

  return {
    tableComponentRef,
    setPaginateData,
    equipmentStatusData,
    urlGetConsultFurniture,
    tableView,
    onSubmit,
    register,
    control,
    errors,
    isValid,
    tableActions,
    submitDisabled,
    handleChange,
    handleClean,
  };
};
