import ManageContractForm from "../../forms/manageContractForm/ManageContractForm";
import { useConsultContract } from "../../hooks/manageContractHooks/consultContract";

const ConsultManageContract = () => {
  const {
    urlGetConsultContract,
    tableComponentRef,
    tableView,
    onSubmit,
    tableActions,
    control,
    errors,
    isValid,
    handleClean,
    setPaginateData,
    business,
    contract,
    submitDisabled,
    validateActionAccess,
  } = useConsultContract();
  return (
    <ManageContractForm
      validateActionAccess={validateActionAccess}
      business={business}
      contract={contract}
      submitDisabled={submitDisabled}
      setPaginateData={setPaginateData}
      urlGetConsultContract={urlGetConsultContract}
      tableComponentRef={tableComponentRef}
      tableView={tableView}
      onSubmit={onSubmit}
      tableActions={tableActions}
      control={control}
      errors={errors}
      isValid={isValid}
      handleClean={handleClean}
    />
  );
};

export default ConsultManageContract;
