import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { MainReportsSchema } from "../../../common/schemas/reports.schema";

export const useConsultMainReport = () => {
  const selectData = [
    {
      name: "Informe Causación Ctas Cobro",
      value: "INFORME_CAUSACION_CTAS_COBRO",
    },
    { name: "Informe Pago Ctas Cobro", value: "INFORME_PAGO_CTAS_COBRO" },

    { name: "Informe Cartera Vencida", value: "INFORME_CARTERA_VENCIDA" },
    {
      name: "Informe Radicación Gestión Documental",
      value: "INFORME_RADICACIÓN_GESTION_DOCUMENTAL",
    },
  ];

  const resolver = useYupValidationResolver(MainReportsSchema);
  const {
    control,
    watch,
    formState: { errors },
  } = useForm({ resolver, mode: "all" });

  const [typeReportSelect] = watch(["typeReportSelect"]);

  return {
    control,
    errors,
    selectData,
    typeReportSelect,
  };
};
