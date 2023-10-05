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
    equipmentStatus,
    register,
  } = useConsultProperty();
  return (
    <ManagePropertyForm
      register={register}
      equipmentStatus={equipmentStatus}
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
