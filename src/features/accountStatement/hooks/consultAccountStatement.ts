import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { useWidth } from "../../../common/hooks/use-width";
import {
  IAccountStatement,
  IFilterAccountStatement,
} from "../../../common/interfaces/accountStatement.interface";
import { ITableAction } from "../../../common/interfaces/table.interfaces";
import { filtersAccountStatementSchema } from "../../../common/schemas/accountStatement.schema";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { useGetContract } from "../../masterData/hooks/manageContractHooks/getContract";

export const useConsultAccountStatement = () => {
  const urlGetAccountStatement = `${urlApiAccounting}/api/v1/account-statement/get-paginated`;
  const { width } = useWidth();
  const navigate = useNavigate();
  const tableComponentRef = useRef(null);
  const [tableView, setTableView] = useState<boolean>(false);
  const { contract: contractData, setReload } = useGetContract();
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

  const [contractCode, expeditionDate, accountNum, nit] = watch([
    "contractCode",
    "expeditionDate",
    "accountNum",
    "contractCode",
    "nit",
  ]);

  const tableActions: ITableAction<IAccountStatement>[] = [
    {
      icon: "Detail",
      onClick: (row) => {
        navigate(`/contabilidad/cuenta-de-cobro/detalle/${row.id}`);
      },
    },
    {
      icon: "Edit",
      onClick: (row) => {
        navigate(`/contabilidad/cuenta-de-cobro/editar/${row.id}`);
      },
    },
    {
      icon: "Pdf",
      onClick: (row) => {
        const pdfUrl = `${urlApiAccounting}/api/v1/account-statement/${
          row.id
        }/generate-account-statement-pdf?responsive=${width < 830}`;
        window.open(pdfUrl, "_blank");
      },
    },
  ];

  const downloadCollection = async () => {
    const { page, perPage } = paginateData;
    const endpoint = `${urlApiAccounting}/api/v1/account-statement/generate-xlsx?page=${
      page + 1
    }&perPage=${perPage}&contractCode=${contractCode ?? ""}&${
      expeditionDate ?? ""
    }&${accountNum ?? ""}&${nit ?? ""}`;
    window.open(endpoint, "_blank");
  };

  const handleClean = () => {
    reset();
    setSubmitDisabled(true);
    tableComponentRef.current?.emptyData();
    setTableView(false);
  };

  const onSubmit = handleSubmit((filters: IFilterAccountStatement) => {
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
  };
};
