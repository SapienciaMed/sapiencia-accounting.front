import { memo } from "react";
import ConsultAccountStatementForm from "../forms/consultAccountStatement";
import { useConsultAccountStatement } from "../hooks/consultAccountStatement";

const ConsultAccountStatement = () => {
  const {
    errors,
    control,
    isValid,
    onSubmit,
    register,
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
  } = useConsultAccountStatement();
  return (
    <ConsultAccountStatementForm
      errors={errors}
      control={control}
      isValid={isValid}
      onSubmit={onSubmit}
      contractData={contractData}
      register={register}
      tableView={tableView}
      handleClean={handleClean}
      tableActions={tableActions}
      handleChange={handleChange}
      submitDisabled={submitDisabled}
      setPaginateData={setPaginateData}
      tableComponentRef={tableComponentRef}
      downloadCollection={downloadCollection}
      urlGetAccountStatement={urlGetAccountStatement}
    />
  );
};

export default memo(ConsultAccountStatement);
