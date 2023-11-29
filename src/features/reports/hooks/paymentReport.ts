import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { consultTechActiveSchema } from "../../../common/schemas/techActives.schemas";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { IPaymentFilters } from "../../../common/interfaces/reports.interface";
import { DateTime } from "luxon";
import { jsDateToSQLDate } from "../../../common/utils/helpers";

export const usePaymentReportPage = () => {
  const navigate = useNavigate();
  const tableComponentRef = useRef(null);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [tableView, setTableView] = useState<boolean>(false);
  const { validateActionAccess } = useContext(AppContext);
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
  const urlGet = `${urlApiAccounting}/api/v1/account-statement/report/payment`;

  const [paymentDateFrom, paymentDateUntil] = watch([
    "paymentDateFrom",
    "paymentDateUntil",
  ]);

  const downloadCollection = useCallback(() => {
    const { page, perPage } = paginateData;
    const url = new URL(
      `${urlApiAccounting}/api/v1/account-statement/report/generate-payment-xlsx`
    );
    const params = new URLSearchParams();
    params.append("page", page + 1);
    params.append("perPage", perPage);
    const token = localStorage.getItem("token");
    if (paymentDateFrom) {
      params.append("paymentDateFrom", jsDateToSQLDate(paymentDateFrom));
    }
    if (paymentDateUntil) {
      params.append("paymentDateUntil", jsDateToSQLDate(paymentDateUntil));
    }
    params.append("authorization", token);
    url.search = params.toString();
    window.open(url.toString(), "_blank");
  }, [paginateData, paymentDateFrom, paymentDateUntil]);

  const handleClean = () => {
    reset();
    setSubmitDisabled(true);
    tableComponentRef.current?.emptyData();
    setTableView(false);
  };

  const onSubmit = (filters: IPaymentFilters) => {
    setTableView(true);
    tableComponentRef.current?.loadData({
      ...filters,
      paymentDateFrom: DateTime.fromJSDate(filters.paymentDateFrom).toSQL(),
      paymentDateUntil: DateTime.fromJSDate(filters.paymentDateUntil).toSQL(),
    });
  };

  useEffect(() => {
    if (paymentDateFrom && paymentDateUntil) {
      return setSubmitDisabled(false);
    }
    setSubmitDisabled(true);
  }, [paymentDateFrom, paymentDateUntil]);

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
