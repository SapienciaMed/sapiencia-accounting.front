import { DateTime } from "luxon";

export const jsDateToSQL = (jsDate: Date) => {
  return DateTime.fromJSDate(jsDate).toSQL();
};

export const jsToLocaleString = (jsDate: string) => {
  const exitDate = DateTime.fromISO(jsDate).toFormat("dd/MM/yyyy");
  console.log({ jsDate, exitDate });
  return exitDate;
};

export const formaterNumberToCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
};
