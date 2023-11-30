import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../common/contexts/app.context";
import useYupValidationResolver from "../../../../common/hooks/form-validator.hook";
import {
  IProperty,
  IPropertyFilters,
} from "../../../../common/interfaces/accountStatement.interface";
import { ITableAction } from "../../../../common/interfaces/table.interfaces";
import { consultPropertySchema } from "../../../../common/schemas/fixedAssets.schema";
import { urlApiAccounting } from "../../../../common/utils/base-url";
import { jsDateToISODate } from "../../../../common/utils/helpers";
import { useGetGenericItems } from "./getGenericItems";

export const useConsultProperty = () => {
  const { data: equipmentStatusData } = useGetGenericItems("ESTADO_EQUIPO");
  const navigate = useNavigate();
  const tableComponentRef = useRef(null);
  const [showFooterActions, setShowFooterActions] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [tableView, setTableView] = useState<boolean>(false);
  const { validateActionAccess } = useContext(AppContext);
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
  const urlGetConsultFurniture = `${urlApiAccounting}/api/v1/furniture/get-all-paginated`;
  const [formWatch, setFormWatch] = useState({
    plate: "",
    description: "",
  });
  const [acquisitionDate, equipmentStatus, createdFrom, createdUntil] = watch([
    "acquisitionDate",
    "equipmentStatus",
    "createdFrom",
    "createdUntil",
  ]);

  const tableActions: ITableAction<IProperty>[] = [
    {
      icon: "Detail",
      onClick: (row) => {
        navigate(`/contabilidad/activos-fijos/detalle/${row.id}`);
      },
      hide: !validateActionAccess("BIEN_MUEBLE_DETALLE"),
    },
    {
      icon: "Edit",
      onClick: (row) => {
        navigate(`/contabilidad/activos-fijos/editar/${row.id}`);
      },
      hide: !validateActionAccess("BIEN_MUEBLE_EDITAR"),
    },
  ];

  const downloadCollection = useCallback(() => {
    const { page, perPage } = paginateData;
    const { plate, description } = formWatch;
    const url = new URL(`${urlApiAccounting}/api/v1/furniture/generate-xlsx`);
    const params = new URLSearchParams();
    params.append("page", page + 1);
    params.append("perPage", perPage);
    if (plate) {
      params.append("plate", plate);
    }
    if (description) {
      params.append("description", description);
    }
    if (acquisitionDate) {
      params.append("acquisitionDate", acquisitionDate);
    }
    if (equipmentStatus) {
      params.append("equipmentStatus", equipmentStatus);
    }
    if (createdFrom) {
      params.append("createdFrom", createdFrom);
    }
    if (createdUntil) {
      params.append("createdUntil", createdUntil);
    }

    url.search = params.toString();
    window.open(url.toString(), "_blank");
  }, [
    paginateData,
    formWatch,
    acquisitionDate,
    equipmentStatus,
    createdUntil,
    createdFrom,
  ]);

  const handleClean = () => {
    reset();
    setSubmitDisabled(true);
    tableComponentRef.current?.emptyData();
    setTableView(false);
  };

  const onSubmit = handleSubmit((filters: IPropertyFilters) => {
    setTableView(true);
    tableComponentRef.current?.loadData({
      ...filters,
      acquisitionDate: jsDateToISODate(filters.acquisitionDate),
      createdFrom: jsDateToISODate(filters.createdFrom),
      createdUntil: jsDateToISODate(filters.createdUntil),
    });
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
    if (
      acquisitionDate ||
      equipmentStatus ||
      description ||
      plate ||
      createdFrom ||
      createdUntil
    ) {
      return setSubmitDisabled(false);
    }
    setSubmitDisabled(true);
  }, [acquisitionDate, equipmentStatus, formWatch, createdFrom, createdUntil]);

  return {
    downloadCollection,
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
    validateActionAccess,
    showFooterActions,
    setShowFooterActions,
  };
};
