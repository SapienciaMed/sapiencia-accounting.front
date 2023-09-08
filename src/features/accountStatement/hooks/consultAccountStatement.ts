import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import {
  IAccountStatement,
  IFilterAccountStatement,
} from "../../../common/interfaces/accountStatement.interface";
import { ITableAction } from "../../../common/interfaces/table.interfaces";
import { filtersAccountStatementSchema } from "../../../common/schemas/accountStatement.schema";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { AppContext } from "../../../common/contexts/app.context";
import { useWidth } from "../../../common/hooks/use-width";

export const useConsultAccountStatement = () => {
  const urlGetAccountStatement = `${urlApiAccounting}/api/v1/account-statement/get-paginated`;
  const navigate = useNavigate();
  const tableComponentRef = useRef(null);
  const [tableView, setTableView] = useState<boolean>(false);
  const [formWatch, setFormWatch] = useState({
    accountNum: "",
    nit: "",
  });
  const { width } = useWidth();
  const resultRespons = width < 720 ? 1 : 0;
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const resolver = useYupValidationResolver(filtersAccountStatementSchema);
  const { validateActionAccess } = useContext(AppContext);
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
        const pdfUrl = `https://sapiencia-accounting-api-ukyunq2uxa-uc.a.run.app/api/v1/account-statement/${row.id}/generate-account-statement-pdf?responsive=${resultRespons}`;
        window.open(pdfUrl, "_blank");
      },
    },
  ];

  const handleClean = () => {
    reset();
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
    urlGetAccountStatement,
    tableComponentRef,
    tableView,
    onSubmit,
    register,
    control,
    errors,
    isValid,
    tableActions,
    handleClean,
    handleChange,
    submitDisabled,
  };
};
