import { Locale } from 'date-fns';
import format from 'date-fns/esm/format';
import isAfter from 'date-fns/esm/isAfter';
import isValidDate from 'date-fns/esm/isValid';
import parse from 'date-fns/esm/parse';

const longFormatters = require('date-fns/_lib/format/longFormatters');

declare global {
  interface Window {
    __localeData__: Object;
    __localeId__: string;
  }
}

// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

/**
 * Date parsing
 * @param value
 * @param dateFormat
 * @param locale
 * @param strictParsing
 */
export function parseDate(
  value: string,
  dateFormat: string | Array<string>,
  locale?: Locale | string,
  strictParsing?: boolean,
) {
  // tslint:disable-next-line
  let parsedDate = null;
  const localeObject = getLocaleObject(locale || '') || getDefaultLocale();
  let strictParsingValueMatch = true;
  if (Array.isArray(dateFormat)) {
    dateFormat.forEach(df => {
      const tryParseDate = parse(value, df, new Date(), { locale: localeObject });
      if (strictParsing) {
        strictParsingValueMatch = isValid(tryParseDate) && value === format(tryParseDate, df);
      }
      if (isValid(tryParseDate) && strictParsingValueMatch) {
        parsedDate = tryParseDate;
      }
    });
    return parsedDate;
  }

  parsedDate = parse(value, dateFormat, new Date(), { locale: localeObject });

  if (strictParsing) {
    strictParsingValueMatch = isValid(parsedDate) && value === format(parsedDate, dateFormat);
  } else if (!isValid(parsedDate)) {
    const match = dateFormat.match(longFormattingTokensRegExp);
    const updatedDateFormat = match
      ? match
          .map(substring => {
            const firstCharacter = substring[0];
            if (firstCharacter === 'p' || firstCharacter === 'P') {
              const longFormatter = longFormatters[firstCharacter];
              return localeObject ? longFormatter(substring, localeObject.formatLong) : firstCharacter;
            }
            return substring;
          })
          .join('')
      : dateFormat;

    if (value.length > 0) {
      parsedDate = parse(value, updatedDateFormat.slice(0, value.length), new Date());
    }

    if (!isValid(parsedDate)) {
      parsedDate = new Date(value);
    }
  }

  // tslint:disable-next-line
  return isValid(parsedDate) && strictParsingValueMatch ? parsedDate : null;
}

export function getIsoDateFormat() {
  return 'yyyy-MM-dd';
}

function getLocaleObject(localeSpec: string | Locale) {
  if (typeof localeSpec === 'string') {
    // Treat it as a locale name registered by registerLocale
    // tslint:disable-next-line
    return window.__localeData__ ? window.__localeData__[localeSpec] : null;
  } else {
    // Treat it as a raw date-fns locale object
    return localeSpec;
  }
}

function getDefaultLocale() {
  return window.__localeId__;
}

function isValid(date: Date) {
  return isValidDate(date) && isAfter(date, new Date('1/1/1000'));
}

/**
 * Date Formatting
 * @param date Date
 * @param formatStr string
 * @param locale string
 */
function formatDate(date: Date, formatStr: string, locale: string | Locale = '') {
  if (locale === 'en') {
    return format(date, formatStr);
  }
  let localeObj = getLocaleObject(locale);
  if (locale && !localeObj) {
    console.warn(`A locale object was not found for the provided string ["${locale}"].`);
  }
  if (!localeObj && !!getDefaultLocale() && !!getLocaleObject(getDefaultLocale())) {
    localeObj = getLocaleObject(getDefaultLocale());
  }
  return format(date, formatStr, {
    // tslint:disable-next-line
    locale: localeObj ? localeObj : null,
  });
}

export function safeDateFormat(
  date: Date | undefined,
  { dateFormat, locale }: { dateFormat: string | Array<string>; locale?: string | Locale },
) {
  return (date && formatDate(date, Array.isArray(dateFormat) ? dateFormat[0] : dateFormat, locale)) || '';
}
