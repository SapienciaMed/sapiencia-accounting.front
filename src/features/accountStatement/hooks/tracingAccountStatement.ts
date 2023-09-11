import { useEffect, useRef, useState } from "react";
import { get, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { filtersAccountStatementSchema } from "../../../common/schemas/accountStatement.schema";
interface IAccount {
  accountNum: "";
}

export const useTracingAccountStatement = () => {
  const navigate = useNavigate();
  const [formWatch, setFormWatch] = useState<IAccount>({
    accountNum: "",
  });
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const resolver = useYupValidationResolver(filtersAccountStatementSchema);
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "onBlur" });
  const onSubmit = handleSubmit((e: IAccount) => {
    navigate(`/contabilidad/cuenta-de-cobro/seguimiento/${e.accountNum}`);
  });
  const handleClean = () => {
    reset();
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
