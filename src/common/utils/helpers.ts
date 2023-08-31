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
  return writtenNumber(value, { lang: "es" });
};

export const upperCaseFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const numberToPesosWord = (value: number) => {
  const decimalPortion = String(value).split(".")?.[1];
  const valueWord = numberToWord(value);
  if (!decimalPortion || Number(decimalPortion) === 0) {
    return upperCaseFirstLetter(valueWord.concat(" pesos m/l."));
  }
  const decimalWord = numberToWord(Number(decimalPortion));
  if (decimalPortion.length > 1) {
    if (Number(decimalPortion) >= 50) {
      const newDecimalPortion = value - 1;
      const newDecimalPortionWord = numberToWord(newDecimalPortion);
      return upperCaseFirstLetter(
        newDecimalPortionWord.concat(` y ${decimalWord} pesos m/l.`)
      );
    }
    return upperCaseFirstLetter(
      valueWord.concat(` y ${decimalWord} pesos m/l.`)
    );
  }

  if (Number(decimalPortion) >= 5) {
    const newDecimalPortion = value - 1;
    const newDecimalPortionWord = numberToWord(newDecimalPortion);
    return upperCaseFirstLetter(
      newDecimalPortionWord.concat(` y ${decimalWord} pesos m/l.`)
    );
  }
  return upperCaseFirstLetter(valueWord.concat(` y ${decimalWord} pesos m/l.`));
};
