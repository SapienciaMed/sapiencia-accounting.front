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
    downloadCollection,
    setPaginateData,
  } = useConsultAccountStatement();

  return (
    <ConsultAccountStatementForm
      setPaginateData={setPaginateData}
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
      downloadCollection={downloadCollection}
    />
  );
};

export default ConsultAccountStatement;
