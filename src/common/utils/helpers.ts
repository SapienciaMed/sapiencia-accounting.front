import { DateTime } from "luxon";

export const jsDateToISODate = (jsDate: Date) => {
  return DateTime.fromJSDate(jsDate).toISODate();
};

export const formaterNumberToCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
};
