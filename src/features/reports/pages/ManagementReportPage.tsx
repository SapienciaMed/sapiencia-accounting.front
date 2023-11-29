import ManagementReportForm from "../forms/ManagementForm/ManagementReportForm";
import { useDefeatedReport } from "../hooks/defeatedReport";

const ManagementReportPage = () => {
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
  } = useDefeatedReport();
  return (
    <ManagementReportForm
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

export default ManagementReportPage;
