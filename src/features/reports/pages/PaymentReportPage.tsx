import PaymentReportForm from "../forms/PayAccountForm/PaymentReportForm";
import { usePaymentReportPage } from "../hooks/paymentReport";

const PaymentReportPage = () => {
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
  } = usePaymentReportPage();
  return (
    <PaymentReportForm
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

export default PaymentReportPage;
