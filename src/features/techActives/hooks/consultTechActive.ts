import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import {
  ITechActives,
  ITechActivesFilters,
} from "../../../common/interfaces/accountStatement.interface";
import { ITableAction } from "../../../common/interfaces/table.interfaces";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { jsDateToISODate } from "../../../common/utils/helpers";
import { useGetGenericItems } from "../../fixedAssets/hooks/propertyHooks/getGenericItems";
import { AppContext } from "../../../common/contexts/app.context";
import { consultTechActiveSchema } from "../../../common/schemas/techActives.schemas";
import { useGetAllWorkersAllInfoHook } from "./getAllWorkersAllInfo.hook";

export const useConsultTechActive = () => {
  const navigate = useNavigate();
  const tableComponentRef = useRef(null);
  const { data: sede } = useGetGenericItems("SEDES");
  const { data: typeActive } = useGetGenericItems("TIPO_ACTIVOS");
  const { fullInfo } = useGetAllWorkersAllInfoHook();
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [tableView, setTableView] = useState<boolean>(false);
  const { validateActionAccess } = useContext(AppContext);
  const [showFooterActions, setShowFooterActions] = useState(false);
  const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
  const resolver = useYupValidationResolver(consultTechActiveSchema);
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });
  const urlGetConsultTechActive = `${urlApiAccounting}/api/v1/asset/get-all-paginated`;
  const [formWatch, setFormWatch] = useState({
    plate: "",
    serial: "",
  });
  const [type, campus, ownerId] = watch(["type", "campus", "ownerId"]);

  const tableActions: ITableAction<ITechActives>[] = [
    {
      icon: "Detail",
      onClick: (row) => {
        navigate(`/contabilidad/activos-tecnologicos/detalle/${row.id}`);
      },
      // hide: !validateActionAccess("BIEN_MUEBLE_DETALLE"),
    },
    {
      icon: "Edit",
      onClick: (row) => {
        navigate(`/contabilidad/activos-tecnologicos/editar/${row.id}`);
      },
      // hide: !validateActionAccess("BIEN_MUEBLE_EDITAR"),
    },
  ];

  const downloadCollection = useCallback(() => {
    const { page, perPage } = paginateData;
    const { plate, serial } = formWatch;
    const url = new URL(`${urlApiAccounting}/api/v1/asset/generate-xlsx`);
    const params = new URLSearchParams();
    params.append("page", page + 1);
    params.append("perPage", perPage);
    if (plate) {
      params.append("plate", plate);
    }
    if (serial) {
      params.append("serial", serial);
    }
    if (ownerId) {
      params.append("ownerId", ownerId);
    }
    if (type) {
      params.append("type", type);
    }
    if (campus) {
      params.append("campus", campus);
    }
    url.search = params.toString();
    window.open(url.toString(), "_blank");
  }, [paginateData, formWatch, type, campus]);

  const handleClean = () => {
    reset();
    setSubmitDisabled(true);
    tableComponentRef.current?.emptyData();
    setTableView(false);
  };

  const onSubmit = handleSubmit((filters: ITechActivesFilters) => {
    setTableView(true);
    tableComponentRef.current?.loadData({
      ...filters,
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
    const { plate, serial } = formWatch;
    if (type || campus || serial || ownerId || plate) {
      return setSubmitDisabled(false);
    }
    setSubmitDisabled(true);
  }, [type, campus, ownerId, formWatch]);

  return {
    downloadCollection,
    tableComponentRef,
    setShowFooterActions,
    setPaginateData,
    sede,
    fullInfo,
    typeActive,
    urlGetConsultTechActive,
    tableView,
    onSubmit,
    register,
    control,
    errors,
    isValid,
    tableActions,
    submitDisabled,
    showFooterActions,
    handleChange,
    handleClean,
    validateActionAccess,
  };
};
