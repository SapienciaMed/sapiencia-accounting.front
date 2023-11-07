import ManagePropertyForm from "../../forms/propertyForm/ManagePropertyForm";
import { useConsultProperty } from "../../hooks/propertyHooks/consultProperty";

const ConsultProperty = () => {
  const {
    urlGetConsultFurniture,
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
    equipmentStatusData,
    register,
    handleChange,
    downloadCollection,
    validateActionAccess,
  } = useConsultProperty();
  return (
    <ManagePropertyForm
      validateActionAccess={validateActionAccess}
      downloadCollection={downloadCollection}
      register={register}
      handleChange={handleChange}
      equipmentStatusData={equipmentStatusData}
      submitDisabled={submitDisabled}
      setPaginateData={setPaginateData}
      urlGetConsultFurniture={urlGetConsultFurniture}
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
