import BusinessForm from "../../forms/businessForm/BusinessForm";
import { useConsultBusiness } from "../../hooks/businessHooks/consultBusiness";

const ConsultBusiness = () => {
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
    setPaginateData,
    submitDisabled,
    business,
    validateActionAccess,
    setShowFooterActions,
    showFooterActions,
  } = useConsultBusiness();
  return (
    <BusinessForm
      showFooterActions={showFooterActions}
      setShowFooterActions={setShowFooterActions}
      business={business}
      validateActionAccess={validateActionAccess}
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

export default ConsultBusiness;
