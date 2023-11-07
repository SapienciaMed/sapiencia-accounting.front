import ManageTechActivesForm from "../forms/techActiveForm/ManageTechActivesForm";
import { useConsultTechActive } from "../hooks/consultTechActive";

const ConsultTechActive = () => {
  const {
    urlGetConsultTechActive,
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
    sede,
    fullInfo,
    typeActive,
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
      sede={sede}
      fullInfo={fullInfo}
      typeActive={typeActive}
      submitDisabled={submitDisabled}
      setPaginateData={setPaginateData}
      urlGetConsultTechActive={urlGetConsultTechActive}
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
