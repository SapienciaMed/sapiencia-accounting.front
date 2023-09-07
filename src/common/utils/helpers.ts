import { DateTime } from "luxon";

export const jsDateToSQL = (jsDate: Date) => {
  return DateTime.fromJSDate(jsDate).toSQL();
};

export const jsToLocaleStringMinusOneDay = (jsDate: string) => {
  return DateTime.fromISO(jsDate).plus({ day: 1 }).toFormat("dd/MM/yyyy");
};

export const formaterNumberToCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
};
