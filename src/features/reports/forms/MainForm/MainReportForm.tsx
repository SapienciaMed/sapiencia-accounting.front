import { memo } from "react";
import { SelectComponent } from "../../../../common/components/Form";
import { REPORTS_TYPES } from "../../../../common/constants/asset";
import CausationReportPage from "../../pages/CausationReportPage";
import PaymentReportPage from "../../pages/PaymentReportPage";
import ManagementReportPage from "../../pages/ManagementReportPage";
import DefeatedReportPage from "../../pages/DefeatedReportPage";

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
      <div>
        {typeReportSelect === REPORTS_TYPES.INFORME_CAUSACION_CTAS_COBRO && (
          <div>
            <CausationReportPage></CausationReportPage>
          </div>
        )}
        {typeReportSelect === REPORTS_TYPES.INFORME_PAGO_CTAS_COBRO && (
          <div>
            <PaymentReportPage></PaymentReportPage>
          </div>
        )}
        {typeReportSelect === REPORTS_TYPES.INFORME_CARTERA_VENCIDA && (
          <div>
            <DefeatedReportPage></DefeatedReportPage>
          </div>
        )}

        {typeReportSelect ===
          REPORTS_TYPES.INFORME_RADICACIÓN_GESTION_DOCUMENTAL && (
          <div>
            <ManagementReportPage></ManagementReportPage>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(MainReportForm);
