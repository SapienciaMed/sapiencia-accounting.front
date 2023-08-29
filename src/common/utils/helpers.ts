import { DateTime } from "luxon";

export const jsDateToSQL = (jsDate: Date) => {
  return DateTime.fromJSDate(jsDate).toSQL();
};
