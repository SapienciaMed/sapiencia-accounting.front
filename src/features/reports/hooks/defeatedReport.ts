import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { consultTechActiveSchema } from "../../../common/schemas/techActives.schemas";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { IDefeatedFilters } from "../../../common/interfaces/reports.interface";
import { useGetGenericItems } from "../../fixedAssets/hooks/propertyHooks/getGenericItems";

export const useDefeatedReport = () => {
  const navigate = useNavigate();
  const tableComponentRef = useRef(null);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [tableView, setTableView] = useState<boolean>(false);
  const { validateActionAccess } = useContext(AppContext);
  const [showFooterActions, setShowFooterActions] = useState(false);
  const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
  const resolver = useYupValidationResolver(consultTechActiveSchema);
  const { data: statementStatusData } = useGetGenericItems(
    "ESTADO_CUENTA",
    true
  );
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver,
    mode: "all",
    defaultValues: { statusId: 3 },
  });
  const urlGet = `${urlApiAccounting}/api/v1/account-statement/report/defeated-portfolio`;
  const [statusId] = watch(["statusId"]);

  const downloadCollection = useCallback(() => {
    const { page, perPage } = paginateData;
    const url = new URL(
      `${urlApiAccounting}/api/v1/account-statement/report/generate-defeated-portfolio-xlsx`
    );
    const params = new URLSearchParams();
    params.append("page", page + 1);
    params.append("perPage", perPage);
    const token = localStorage.getItem("token");
    if (statusId) {
      params.append("statusId", statusId);
    }
    params.append("authorization", token);
    url.search = params.toString();
    window.open(url.toString(), "_blank");
  }, [paginateData, statusId]);

  const handleClean = () => {
    reset();
    setSubmitDisabled(false);
    tableComponentRef.current?.emptyData();
    setTableView(false);
  };

  const onSubmit = (filters: IDefeatedFilters) => {
    setTableView(true);
    tableComponentRef.current?.loadData({
      ...filters,
    });
  };

  useEffect(() => {
    if (statusId) {
      return setSubmitDisabled(false);
    }
    setSubmitDisabled(true);
  }, [statusId]);

  return {
    downloadCollection,
    tableComponentRef,
    setShowFooterActions,
    setPaginateData,
    urlGet,
    tableView,
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
    isValid,
    submitDisabled,
    showFooterActions,
    handleClean,
    validateActionAccess,
    statementStatusData,
  };
};
