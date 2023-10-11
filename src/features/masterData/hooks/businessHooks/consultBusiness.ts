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
import { useGetContract } from "../manageContractHooks/getContract";
import { EResponseCodes } from "../../../../common/constants/api.enum";

export const useConsultBusiness = () => {
  const navigate = useNavigate();
  const tableComponentRef = useRef(null);
  const { contract } = useGetContract();
  const { business, setReload } = useGetBusiness();
  const { validateActionAccess } = useContext(AppContext);
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
      hide: !validateActionAccess("RAZON_SOCIAL_EDITAR"),
    },
    {
      icon: "Delete",
      onClick: (row) => {
        handleDelete(row);
      },
      hide: !validateActionAccess("RAZON_SOCIAL_ELIMINAR"),
    },
  ];

  const handleDelete = (row) => {
    setMessage({
      title: "Eliminar razón social",
      description: `¿Está segur@ de eliminar ${row.name}?`,
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
      const resp = await deleted<null>(endpoint);
      setReload(new Date());
      handleClean();
      setMessage({
        title: "Razón social",
        description: `¡Razón social ${row.name} eliminado exitosamente!`,
        show: true,
        okTitle: "Cerrar",
        onOk: () => {
          setMessage({ show: false });
        },
        background: true,
      });
      if (resp.operation.code === EResponseCodes.FAIL) {
        return setMessage({
          title: "Razón social en uso",
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
    contract,
    tableActions,
    handleClean,
    handleChange,
    submitDisabled,
  };
};
