import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { IGetAccountStatement } from "../../../common/interfaces/accountStatement.interface";
import { filtersAccountStatementSchema } from "../../../common/schemas/accountStatement.schema";
import { urlApiAccounting } from "../../../common/utils/base-url";

type IAccount = {
  accountNum: string;
};

export const useTracingAccountStatement = () => {
  const navigate = useNavigate();
  const [formWatch, setFormWatch] = useState<IAccount>({
    accountNum: "",
  });
  const { setMessage, setCurrentAccountStatement } = useContext(AppContext);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const resolver = useYupValidationResolver(filtersAccountStatementSchema);
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "onBlur" });
  const { get } = useCrudService(urlApiAccounting);

  const getAccountStatementByAccountNum = async (accountNum: string) => {
    const endpoint = `/api/v1/account-statement/${accountNum}/get-by-account-number`;
    return await get<IGetAccountStatement>(endpoint);
  };

  const onSubmit = handleSubmit(async (ev: IAccount) => {
    try {
      const { accountNum } = ev;
      const resp = await getAccountStatementByAccountNum(accountNum);
      if (resp.operation.code === EResponseCodes.FAIL) {
        setMessage({
          title: "Resultado de Búsqueda",
          show: true,
          description: resp.operation.message,
          okTitle: "Aceptar",
          background: true,
          onOk: () => setMessage({ show: false }),
        });
        return handleClean();
      }
      setCurrentAccountStatement(resp.data);
      navigate(`/contabilidad/cuenta-de-cobro/seguimiento/${accountNum}`);
    } catch (err) {
      console.log(err);
    }
  });

  const handleClean = () => {
    reset();
    setFormWatch({ accountNum: "" });
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormWatch({
      ...formWatch,
      [name]: value,
    });
  };

  useEffect(() => {
    const { accountNum } = formWatch;
    if (accountNum) {
      return setSubmitDisabled(false);
    }
    setSubmitDisabled(true);
  }, [formWatch]);

  return {
    onSubmit,
    register,
    control,
    errors,
    isValid,
    handleClean,
    handleChange,
    submitDisabled,
  };
};
