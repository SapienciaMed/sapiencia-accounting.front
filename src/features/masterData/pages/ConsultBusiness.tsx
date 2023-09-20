import BusinessForm from "../forms/BusinessForm";
import { useConsultBusiness } from "../hooks/consultBusiness";
import { useGetBusiness } from "../hooks/getBusinessName";

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
    submitDisabled,
    setPaginateData,
    business,
  } = useConsultBusiness();
  return (
    <BusinessForm
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

export default ConsultBusiness;
