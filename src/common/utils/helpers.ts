import { DateTime } from "luxon";

export const jsDateToSQL = (jsDate: Date) => {
  return DateTime.fromJSDate(jsDate).toSQL();
};

export const jsDateToSQLDate = (jsDate: Date) => {
  return DateTime.fromJSDate(jsDate).toSQLDate();
};

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
