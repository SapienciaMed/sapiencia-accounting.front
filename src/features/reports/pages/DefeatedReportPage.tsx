import DefeatedPorfolioForm from "../forms/DefeatedPorfolioForm/DefeatedPorfolioForm";
import { useDefeatedReport } from "../hooks/defeatedReport";

const DefeatedReportPage = () => {
  const {
    urlGet,
    statementStatusData,
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
  } = useDefeatedReport();
  return (
    <DefeatedPorfolioForm
      validateActionAccess={validateActionAccess}
      statementStatusData={statementStatusData}
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

export default DefeatedReportPage;
