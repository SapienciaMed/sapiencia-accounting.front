import CausationForm from "../forms/CausationAccountForm/CausationForm";
import { useCausationReportPage } from "../hooks/causationReport";

const CausationReportPage = () => {
  const {
    urlGet,
    tableComponentRef,
    tableView,
    handleSubmit,
    control,
    errors,
    isValid,
    handleClean,
    setPaginateData,
    submitDisabled,
    showFooterActions,
    setShowFooterActions,
    downloadCollection,
    validateActionAccess,
  } = useCausationReportPage();
  return (
    <CausationForm
      validateActionAccess={validateActionAccess}
      downloadCollection={downloadCollection}
      setPaginateData={setPaginateData}
      submitDisabled={submitDisabled}
      urlGet={urlGet}
      setShowFooterActions={setShowFooterActions}
      showFooterActions={showFooterActions}
      tableComponentRef={tableComponentRef}
      tableView={tableView}
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      isValid={isValid}
      handleClean={handleClean}
    />
  );
};

export default CausationReportPage;
