import ManagementReportForm from "../forms/ManagementForm/ManagementReportForm";
import { useManagementReport } from "../hooks/managementReport";

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
  } = useManagementReport();
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
