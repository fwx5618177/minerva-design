// Language of the texts and numbers the engine writes itself (tooltip row
// names, accessible names, "No data", compact units...). Every chart module
// keeps its own dictionary and resolves it with `localeLabels`, so a chart
// follows the page language without any option, and `locale` / `labels`
// options override it.

/** Built-in strings of a module: English (complete) and other languages (partial) */
export type LabelDictionary<T extends object> = { en: T } & {
  [language: string]: Partial<T> | undefined;
};

/**
 * Locale of a chart: the `locale` option, else the `lang` of the document
 * (`<html lang>`), else the browser language, else `en`
 */
export const resolveLocale = (locale?: string): string => {
  if (locale) return locale;
  const doc = (
    globalThis as { document?: { documentElement?: { lang?: string } } }
  ).document;
  const lang = doc?.documentElement?.lang;
  if (lang) return lang;
  const nav = (globalThis as { navigator?: { language?: string } }).navigator;
  return nav?.language || "en";
};

/** `zh-CN` -> `zh`, `fr_FR` -> `fr` */
export const languageOf = (locale: string): string =>
  locale.toLowerCase().split(/[-_]/)[0] || "en";

/**
 * Strings of a module for a locale: the built-in language (English for
 * unknown languages) completed with English, then the `overrides`
 */
export const localeLabels = <T extends object>(
  dictionary: LabelDictionary<T>,
  locale?: string,
  overrides?: Partial<T>,
): T => {
  const language = languageOf(resolveLocale(locale));
  const own = language === "en" ? undefined : dictionary[language];
  return { ...dictionary.en, ...own, ...overrides };
};

const numberFormats = new Map<string, Intl.NumberFormat>();

/** Cached `Intl.NumberFormat` (formatting is on hot paths: ticks, tooltips) */
export const numberFormat = (
  locale: string,
  options: Intl.NumberFormatOptions = {},
): Intl.NumberFormat => {
  const key = `${locale}|${JSON.stringify(options)}`;
  let format = numberFormats.get(key);
  if (!format) {
    try {
      format = new Intl.NumberFormat(locale, options);
    } catch {
      format = new Intl.NumberFormat("en", options);
    }
    numberFormats.set(key, format);
  }
  return format;
};

/**
 * Compact units of a language, largest first: thousands-based (k, M, B, T)
 * in English and French, ten-thousands-based (万, 亿 / 億) in Chinese and
 * Japanese
 */
export const compactUnits = (locale?: string): readonly [number, string][] => {
  switch (languageOf(resolveLocale(locale))) {
    case "zh":
      return [
        [1e12, "万亿"],
        [1e8, "亿"],
        [1e4, "万"],
      ];
    case "ja":
      return [
        [1e12, "兆"],
        [1e8, "億"],
        [1e4, "万"],
      ];
    case "fr":
      return [
        [1e12, " Bn"],
        [1e9, " Md"],
        [1e6, " M"],
        [1e3, " k"],
      ];
    default:
      return [
        [1e12, "T"],
        [1e9, "B"],
        [1e6, "M"],
        [1e3, "k"],
      ];
  }
};

const dateFormats = new Map<string, Intl.DateTimeFormat>();

/** Cached `Intl.DateTimeFormat` (time axis ticks and tooltips) */
export const dateFormat = (
  locale: string,
  options: Intl.DateTimeFormatOptions = {},
): Intl.DateTimeFormat => {
  const key = `${locale}|${JSON.stringify(options)}`;
  let format = dateFormats.get(key);
  if (!format) {
    try {
      format = new Intl.DateTimeFormat(locale, options);
    } catch {
      format = new Intl.DateTimeFormat("en", options);
    }
    dateFormats.set(key, format);
  }
  return format;
};

/**
 * Calls `onChange` when the `lang` of the document changes (charts without
 * a `locale` option follow the page language); returns the cleanup
 */
export const watchLocale = (onChange: () => void): (() => void) => {
  const doc = (globalThis as { document?: { documentElement?: Node | null } })
    .document;
  const root = doc?.documentElement;
  if (!root || typeof MutationObserver !== "function") return () => {};
  const observer = new MutationObserver(onChange);
  observer.observe(root, { attributes: true, attributeFilter: ["lang"] });
  return () => observer.disconnect();
};
