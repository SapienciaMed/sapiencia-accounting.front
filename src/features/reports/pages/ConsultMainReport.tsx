import MainReportForm from "../forms/MainForm/MainReportForm";
import { useConsultMainReport } from "../hooks/consultMainReport";

const ConsultMainReport = () => {
  const { control, errors, selectData, typeReportSelect } =
    useConsultMainReport();
  return (
    <MainReportForm
      control={control}
      errors={errors}
      selectData={selectData}
      typeReportSelect={typeReportSelect}
    />
  );
};

export default ConsultMainReport;
