import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import {
  IAccountStatement,
  IFilterAccountStatement,
} from "../../../common/interfaces/accountStatement.interface";
import { ITableAction } from "../../../common/interfaces/table.interfaces";
import { filtersAccountStatementSchema } from "../../../common/schemas/accountStatement.schema";
import { urlApiAccounting } from "../../../common/utils/base-url";
import {
  jsDateToISODate,
  jsDateToSQLDate,
} from "../../../common/utils/helpers";
import { useGetContract } from "../../masterData/hooks/manageContractHooks/getContract";

export const useConsultAccountStatement = () => {
  const urlGetAccountStatement = `${urlApiAccounting}/api/v1/account-statement/get-paginated`;
  const navigate = useNavigate();
  const { validateActionAccess, authorization } = useContext(AppContext);
  const tableComponentRef = useRef(null);
  const [showFooterActions, setShowFooterActions] = useState(false);
  const [tableView, setTableView] = useState<boolean>(false);
  const { contract: contractData } = useGetContract();
  const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
  const [formWatch, setFormWatch] = useState({
    accountNum: "",
    nit: "",
  });
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const resolver = useYupValidationResolver(filtersAccountStatementSchema);
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "onBlur" });

  const [contractCode, expeditionDate] = watch([
    "contractCode",
    "expeditionDate",
  ]);

  const tableActions: ITableAction<IAccountStatement>[] = [
    {
      icon: "Detail",
      onClick: (row) => {
        navigate(`/contabilidad/cuenta-de-cobro/detalle/${row.id}`);
      },
      hide: !validateActionAccess("CUENTA_COBRO_DETALLE"),
    },
    {
      icon: "Edit",
      onClick: (row) => {
        navigate(`/contabilidad/cuenta-de-cobro/editar/${row.id}`);
      },
      hide: !validateActionAccess("CUENTA_COBRO_EDITAR"),
    },
    {
      icon: "Pdf",
      onClick: (row) => {
        const token = localStorage.getItem("token");
        const pdfUrl = `${urlApiAccounting}/api/v1/account-statement/${row.id}/generate-account-statement-pdf?authorization=${token}&permissions=${authorization.encryptedAccess}`;
        window.open(pdfUrl, "_blank");
      },
      hide: !validateActionAccess("CUENTA_COBRO_PDF"),
    },
  ];
  const downloadCollection = useCallback(() => {
    const token = localStorage.getItem("token");
    const { page, perPage } = paginateData;
    const { accountNum, nit } = formWatch;
    const url = new URL(
      `${urlApiAccounting}/api/v1/account-statement/generate-xlsx`
    );
    const params = new URLSearchParams();
    params.append("page", page + 1);
    params.append("perPage", perPage);
    params.append("authorization", token);
    params.append("permissions", authorization.encryptedAccess);
    if (contractCode) {
      params.append("contractCode", contractCode);
    }
    if (expeditionDate) {
      params.append("expeditionDate", jsDateToSQLDate(expeditionDate));
    }
    if (accountNum) {
      params.append("accountNum", accountNum);
    }
    if (nit) {
      params.append("nit", nit);
    }
    url.search = params.toString();
    window.open(url.toString(), "_blank");
  }, [paginateData, formWatch, contractCode, expeditionDate]);

  const handleClean = () => {
    reset();
    setFormWatch({
      accountNum: "",
      nit: "",
    });
    setSubmitDisabled(true);
    tableComponentRef.current?.emptyData();
    setTableView(false);
  };

  const onSubmit = handleSubmit(async (filters: IFilterAccountStatement) => {
    setTableView(true);
    try {
      const resp = await tableComponentRef.current?.loadData({
        ...filters,
        expeditionDate: jsDateToISODate(expeditionDate),
      });
    } catch (err) {
      console.log(err);
      handleClean();
    }
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormWatch({
      ...formWatch,
      [name]: value,
    });
  };

  useEffect(() => {
    const { accountNum, nit } = formWatch;
    if (contractCode || expeditionDate || accountNum || nit) {
      return setSubmitDisabled(false);
    }
    setSubmitDisabled(true);
  }, [contractCode, expeditionDate, formWatch]);

  return {
    errors,
    control,
    isValid,
    register,
    onSubmit,
    tableView,
    contractData,
    handleClean,
    handleChange,
    tableActions,
    submitDisabled,
    setPaginateData,
    tableComponentRef,
    downloadCollection,
    urlGetAccountStatement,
    validateActionAccess,
    showFooterActions,
    setShowFooterActions,
  };
};
