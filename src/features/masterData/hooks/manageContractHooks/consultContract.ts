import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useYupValidationResolver from "../../../../common/hooks/form-validator.hook";
import {
  IBusiness,
  IContract,
  IManageContract,
} from "../../../../common/interfaces/accountStatement.interface";
import { ITableAction } from "../../../../common/interfaces/table.interfaces";
import { urlApiAccounting } from "../../../../common/utils/base-url";
import { AppContext } from "../../../../common/contexts/app.context";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { consultContractSchema } from "../../../../common/schemas/consultBusinessSchema";
import { useGetBusiness } from "../businessHooks/getBusinessName";
import { useGetContract } from "./getContract";
import { EResponseCodes } from "../../../../common/constants/api.enum";

export const useConsultContract = () => {
  const navigate = useNavigate();
  const tableComponentRef = useRef(null);
  const { contract } = useGetContract();
  const { business, setReload } = useGetBusiness();
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [tableView, setTableView] = useState<boolean>(false);
  const { deleted } = useCrudService(urlApiAccounting);
  const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
  const resolver = useYupValidationResolver(consultContractSchema);
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });
  const [contractId, businessCode] = watch(["id", "businessCode"]);
  const { setMessage } = useContext(AppContext);

  const urlGetConsultContract = `${urlApiAccounting}/api/v1/contract/get-paginated`;

  const tableActions: ITableAction<IManageContract>[] = [
    {
      icon: "Edit",
      onClick: (row) => {
        navigate(`/contabilidad/contrato/editar/${row.id}`);
      },
    },
    {
      icon: "Delete",
      onClick: (row) => {
        handleDelete(row);
      },
    },
  ];

  const handleDelete = (row) => {
    setMessage({
      title: " Eliminar contrato",
      description: `¿Esta segur@ de eliminar el contrato?`,
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk: () => {
        setMessage({ show: false });
        deleteContract(row);
      },
      onClose: () => setMessage({ show: false }),
      background: true,
    });
  };

  const deleteContract = async (row) => {
    try {
      const endpoint = `/api/v1/contract/${row.id}/delete-by-id`;
      setReload(new Date());
      const resp = await deleted<null>(endpoint);
      handleClean();
      setMessage({
        title: "Contrato",
        description: `Contrato eliminado exitosamente.`,
        show: true,
        okTitle: "Cerrar",
        onOk: () => {
          setMessage({ show: false });
        },
        background: true,
      });
      if (resp.operation.code === EResponseCodes.FAIL) {
        return setMessage({
          title: "Contrato en uso",
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

  useEffect(() => {
    const isValidForm = contractId || businessCode;
    setSubmitDisabled(!isValidForm);
  }, [contractId, businessCode]);

  return {
    tableComponentRef,
    setPaginateData,
    urlGetConsultContract,
    tableView,
    onSubmit,
    register,
    contract,
    control,
    errors,
    isValid,
    business,
    tableActions,
    submitDisabled,
    handleClean,
  };
};
