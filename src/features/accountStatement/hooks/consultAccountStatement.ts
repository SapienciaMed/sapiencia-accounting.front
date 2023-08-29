import { useRef, useState } from "react";
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

export const useConsultAccountStatement = () => {
  const urlGetAccountStatement = `${urlApiAccounting}/api/v1/account-statement/get-paginated`;
  const navigate = useNavigate();
  const tableComponentRef = useRef(null);
  const [tableView, setTableView] = useState<boolean>(false);
  const resolver = useYupValidationResolver(filtersAccountStatementSchema);
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IFilterAccountStatement>({ resolver, mode: "all" });

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

  return {
    urlGetAccountStatement,
    tableComponentRef,
    tableView,
    onSubmit,
    register,
    control,
    errors,
    tableActions,
    handleClean,
  };
};
