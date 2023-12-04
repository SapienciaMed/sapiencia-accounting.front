import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { consultTechActiveSchema } from "../../../common/schemas/techActives.schemas";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { ICausationFilters } from "../../../common/interfaces/reports.interface";
import { DateTime } from "luxon";
import { jsDateToSQLDate } from "../../../common/utils/helpers";

export const useManagementReport = () => {
  const navigate = useNavigate();
  const tableComponentRef = useRef(null);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [tableView, setTableView] = useState<boolean>(false);
  const { validateActionAccess, authorization } = useContext(AppContext);
  const [showFooterActions, setShowFooterActions] = useState(false);
  const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
  const resolver = useYupValidationResolver(consultTechActiveSchema);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });
  const urlGet = `${urlApiAccounting}/api/v1/account-statement/report/management`;

  const [expeditionDateFrom, expeditionDateUntil] = watch([
    "expeditionDateFrom",
    "expeditionDateUntil",
  ]);

  const downloadCollection = useCallback(() => {
    const { page, perPage } = paginateData;
    const url = new URL(
      `${urlApiAccounting}/api/v1/account-statement/report/generate-management-xlsx`
    );
    const params = new URLSearchParams();
    params.append("page", page + 1);
    params.append("perPage", perPage);
    const token = localStorage.getItem("token");
    if (expeditionDateFrom) {
      params.append("expeditionDateFrom", jsDateToSQLDate(expeditionDateFrom));
    }
    if (expeditionDateUntil) {
      params.append(
        "expeditionDateUntil",
        jsDateToSQLDate(expeditionDateUntil)
      );
    }
    params.append("authorization", token);
    params.append("permissions", authorization.encryptedAccess);
    url.search = params.toString();
    window.open(url.toString(), "_blank");
  }, [paginateData, expeditionDateFrom, expeditionDateUntil]);

  const handleClean = () => {
    reset();
    setSubmitDisabled(true);
    tableComponentRef.current?.emptyData();
    setTableView(false);
  };

  const onSubmit = (filters: ICausationFilters) => {
    setTableView(true);
    tableComponentRef.current?.loadData({
      ...filters,
      expeditionDateFrom: DateTime.fromJSDate(
        filters.expeditionDateFrom
      ).toSQL(),
      expeditionDateUntil: DateTime.fromJSDate(
        filters.expeditionDateUntil
      ).toSQL(),
    });
  };

  useEffect(() => {
    if (expeditionDateFrom && expeditionDateUntil) {
      return setSubmitDisabled(false);
    }
    setSubmitDisabled(true);
  }, [expeditionDateFrom, expeditionDateUntil]);

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
  };
};
