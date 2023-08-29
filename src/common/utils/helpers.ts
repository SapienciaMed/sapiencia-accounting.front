import { DateTime } from "luxon";
import writtenNumber from "written-number";

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

export const numberToWord = (value: number) => {
  let lettersValue: string = writtenNumber(value, { lang: "es" });
  lettersValue = lettersValue.charAt(0).toUpperCase() + lettersValue.slice(1);
  return lettersValue.concat(" m/l.");
};
