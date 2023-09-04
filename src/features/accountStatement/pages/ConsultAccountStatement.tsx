import ConsultAccountStatementForm from "../forms/consultAccountStatement";
import { useConsultAccountStatement } from "../hooks/consultAccountStatement";

const ConsultAccountStatement = () => {
  const {
    urlGetAccountStatement,
    tableComponentRef,
    tableView,
    onSubmit,
    tableActions,
    register,
    control,
    errors,
    isValid,
    handleClean,
    handleChange,
    submitDisabled,
  } = useConsultAccountStatement();

  return (
    <ConsultAccountStatementForm
      urlGetAccountStatement={urlGetAccountStatement}
      tableComponentRef={tableComponentRef}
      tableView={tableView}
      onSubmit={onSubmit}
      tableActions={tableActions}
      register={register}
      control={control}
      errors={errors}
      isValid={isValid}
      handleClean={handleClean}
      handleChange={handleChange}
      submitDisabled={submitDisabled}
    />
  );
};

export default ConsultAccountStatement;
