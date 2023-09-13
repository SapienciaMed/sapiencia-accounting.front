import { useContext, useEffect, useRef, useState } from "react";
import { get, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { filtersAccountStatementSchema } from "../../../common/schemas/accountStatement.schema";
import { useGetAccountStatementByAccountNum } from "./getAccountStatementByAccountNum";
import ModalMessageComponent from "../../../common/components/modal-message.component";
import { AppContext } from "../../../common/contexts/app.context";

interface IAccount {
  accountNum: "";
}

export const useTracingAccountStatement = () => {
  const navigate = useNavigate();
  const [formWatch, setFormWatch] = useState<IAccount>({
    accountNum: "",
  });
  const { setMessage } = useContext(AppContext);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const resolver = useYupValidationResolver(filtersAccountStatementSchema);
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "onBlur" });
  const { accountStatement } = useGetAccountStatementByAccountNum();

  const onSubmit = handleSubmit((e: IAccount) => {
    if (accountStatement && Object.keys(accountStatement).length > 0) {
      navigate(`/contabilidad/cuenta-de-cobro/seguimiento/${e.accountNum}`);
    } else {
      setMessage({
        title: "Error",
        show: true,
        description: "No se encuentra el número de documento de cobro.",
        okTitle: "Aceptar",
        background: true,
      });
    }
  });
 console.log(accountStatement);
 
  const handleClean = () => {
    reset();
    setSubmitDisabled(true);
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
