import ManageTechActivesForm from "../forms/techActiveForm/ManageTechActivesForm";
import { useConsultTechActive } from "../hooks/consultTechActive";

const ConsultTechActive = () => {
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
  } = useConsultTechActive();
  return (
    <ManageTechActivesForm
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

export default ConsultTechActive;
