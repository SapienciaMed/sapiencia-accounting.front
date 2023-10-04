import ManagePropertyForm from "../../forms/propertyForm/ManagePropertyForm";
import { useConsultProperty } from "../../hooks/propertyHooks/consultProperty";

const ConsultProperty = () => {
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
  } = useConsultProperty();
  return (
    <ManagePropertyForm
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

export default ConsultProperty;
