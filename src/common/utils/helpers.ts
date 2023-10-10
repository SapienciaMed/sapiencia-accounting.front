import { DateTime } from "luxon";
import moment from "moment-timezone";

export const jsDateToSQL = (jsDate: Date) => {
  return DateTime.fromJSDate(jsDate).toSQL();
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

export const tzToAmericaBogota = (date: string) => {
  const tzDate = moment.tz(date);
  return tzDate.tz("America/Bogota").format("DD/MM/YYYY");
};
