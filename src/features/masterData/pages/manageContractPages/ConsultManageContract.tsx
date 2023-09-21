import BusinessForm from "../../forms/businessForm/BusinessForm";
import ManageContractForm from "../../forms/manageContractForm/ManageContractForm";
import { useConsultBusiness } from "../../hooks/businessHooks/consultBusiness";

const ConsultManageContract = () => {
  const {
    urlGetConsultBusiness,
    tableComponentRef,
    tableView,
    onSubmit,
    tableActions,
    control,
    errors,
    isValid,
    handleClean,
    submitDisabled,
    setPaginateData,
    business,
  } = useConsultBusiness();
  return (
    <ManageContractForm
      business={business}
      setPaginateData={setPaginateData}
      urlGetConsultBusiness={urlGetConsultBusiness}
      tableComponentRef={tableComponentRef}
      tableView={tableView}
      onSubmit={onSubmit}
      tableActions={tableActions}
      control={control}
      errors={errors}
      isValid={isValid}
      handleClean={handleClean}
      submitDisabled={submitDisabled}
    />
  );
};

export default ConsultManageContract;
