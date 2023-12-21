import * as yup from "yup";

export const MainReportsSchema = yup.object({
  typeReportSelect: yup
    .string()
    .required("Selecciona un tipo de informe para buscar"),
});

export const causationReportsSchema = yup.object({
  expeditionDateFrom: yup.date().required("Selecciona una fecha para buscar"),

  expeditionDateUntil: yup
    .string()
    .required("Selecciona una fecha para buscar"),
});
