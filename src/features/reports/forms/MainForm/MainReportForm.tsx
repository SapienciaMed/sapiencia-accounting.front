import { memo } from "react";
import { SelectComponent } from "../../../../common/components/Form";
import { REPORTS_TYPES } from "../../../../common/constants/asset";
import CausationReportPage from "../../pages/CausationReportPage";
import PaymentReportPage from "../../pages/PaymentReportPage";
import ManagementReportPage from "../../pages/ManagementReport";

export const Title = ({ title }: { title: string }) => (
  <div className="grid-form-3-container gap-25">
    <span className="text-black jumbo bold grid-span-3-columns ml-45px mt-8px">
      {title}
    </span>
  </div>
);
const MainReportForm = ({ errors, control, selectData, typeReportSelect }) => {
  return (
    <div className="mt-24px ml-16px mr-16px p-0">
      <Title title="Informes" />
      <div className="container-sections-forms ml-20px mr-20px">
        <div className="grid-form-3-container gap-25 mt-5px">
          <SelectComponent
            idInput="typeReportSelect"
            control={control}
            errors={errors}
            label={<>Seleccione Tipo de informe</>}
            className="select-basic medium"
            classNameLabel="text-black big bold"
            placeholder="Seleccionar"
            data={selectData}
            filter
          />
        </div>
      </div>
      {typeReportSelect === REPORTS_TYPES.INFORME_CAUSACION_CTAS_COBRO && (
        <>
          <CausationReportPage></CausationReportPage>
        </>
      )}
      {typeReportSelect === REPORTS_TYPES.INFORME_PAGO_CTAS_COBRO && (
        <>
          <PaymentReportPage></PaymentReportPage>
        </>
      )}
      {typeReportSelect === REPORTS_TYPES.INFORME_CARTERA_VENCIDA && <></>}
      {typeReportSelect ===
        REPORTS_TYPES.INFORME_RADICACIÓN_GESTION_DOCUMENTAL && (
        <>
          <ManagementReportPage></ManagementReportPage>
        </>
      )}
    </div>
  );
};

export default memo(MainReportForm);
