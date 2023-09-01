import { DateTime } from "luxon";

export const jsDateToSQL = (jsDate: Date) => {
  return DateTime.fromJSDate(jsDate).toSQL();
};

export const ISOToLocale = (data: string) => {
  return DateTime.fromISO(data).toLocaleString();
};

export const formaterNumberToCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
};
