import ManageContractForm from "../../forms/manageContractForm/ManageContractForm";
import { useConsultBusiness } from "../../hooks/businessHooks/ConsultBusiness";
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
  } = useConsultContract();
  return (
    <ManageContractForm
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
