import TracingAccountStatementForm from "../forms/tracingAccountStatement/index";
import { useTracingAccountStatement } from "../hooks/tracingAccountStatement";

const TracingAccountStatement = () => {
  const {
    onSubmit,
    register,
    errors,
    isValid,
    handleClean,
    handleChange,
    submitDisabled,
  } = useTracingAccountStatement();

  return (
    <TracingAccountStatementForm
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      isValid={isValid}
      handleClean={handleClean}
      handleChange={handleChange}
      submitDisabled={submitDisabled}
    />
  );
};

export default TracingAccountStatement;
