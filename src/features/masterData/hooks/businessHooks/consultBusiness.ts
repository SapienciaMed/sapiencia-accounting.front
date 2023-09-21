import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useYupValidationResolver from "../../../../common/hooks/form-validator.hook";
import {
  IBusiness,
  IContract,
} from "../../../../common/interfaces/accountStatement.interface";
import { ITableAction } from "../../../../common/interfaces/table.interfaces";
import { urlApiAccounting } from "../../../../common/utils/base-url";
import { AppContext } from "../../../../common/contexts/app.context";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { consultBusinessSchema } from "../../../../common/schemas/consultBusinessSchema";
import { useGetBusiness } from "./getBusinessName";

export const useConsultBusiness = () => {
  const navigate = useNavigate();
  const tableComponentRef = useRef(null);
  const { business, setReload } = useGetBusiness();
  const [tableView, setTableView] = useState<boolean>(false);
  const [formWatch, setFormWatch] = useState({
    value: "",
  });
  const { deleted } = useCrudService(urlApiAccounting);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
  const resolver = useYupValidationResolver(consultBusinessSchema);
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });
  const idValue = watch("id");
  const { setMessage } = useContext(AppContext);

  const urlGetConsultBusiness = `${urlApiAccounting}/api/v1/business/get-paginated`;

  const tableActions: ITableAction<IBusiness>[] = [
    {
      icon: "Edit",
      onClick: (row) => {
        navigate(`/contabilidad/razon-social/editar/${row.id}`);
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
      title: "Eliminar razón social",
      description: `Estás segur@ de eliminar ${row.name}?`,
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk: () => {
        setMessage({ show: false });
        deleteBusiness(row);
      },
      onClose: () => setMessage({ show: false }),
      background: true,
    });
  };

  const deleteBusiness = async (row) => {
    try {
      const endpoint = `/api/v1/business/${row.id}/delete`;
      await deleted(endpoint);
      setReload(new Date());
      setMessage({
        title: "Razón social!",
        description: "Razón social eliminada exitosamente",
        show: true,
        okTitle: "Cerrar",
        onOk: () => {
          setMessage({ show: false }), handleClean();
        },
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

  const handleClean = () => {
    reset();
    tableComponentRef.current?.emptyData();
    setTableView(false);
  };

  const onSubmit = handleSubmit((filters: IContract) => {
    setTableView(true);
    tableComponentRef.current?.loadData(filters);
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormWatch({
      ...formWatch,
      [name]: value,
    });
  };

  useEffect(() => {
    if (idValue) return setSubmitDisabled(false);
    setSubmitDisabled(true);
  }, [idValue]);

  useEffect(() => {
    const { value } = formWatch;
    if (value) {
      return setSubmitDisabled(false);
    } else {
      setSubmitDisabled(false);
    }
  }, [formWatch]);

  return {
    tableComponentRef,
    setPaginateData,
    urlGetConsultBusiness,
    tableView,
    onSubmit,
    register,
    control,
    errors,
    isValid,
    business,
    tableActions,
    handleClean,
    handleChange,
    submitDisabled,
  };
};
