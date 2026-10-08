// Framework-agnostic i18n: the built-in message bundles of every supported
// language (plain data) and a tiny translator (`createTranslator` /
// `translate`) that adapters such as `minerva-design` build on.
import en from "./locales/en";
import fr from "./locales/fr";
import ja from "./locales/ja";
import zh from "./locales/zh";
import type { Messages } from "./merge";
import type { SupportedLanguage } from "./types";

export type { SupportedLanguage } from "./types";
export { mergeMessages, type Messages } from "./merge";
export {
  createTranslator,
  fallbackPluralCategory,
  getPluralCategory,
  interpolate,
  translate,
  type TranslateFunction,
  type TranslateOptions,
  type TranslatorConfig,
} from "./translate";

/** Every language Minerva ships translations for */
export const SUPPORTED_LANGUAGES: readonly SupportedLanguage[] = [
  "en",
  "zh",
  "ja",
  "fr",
];

/** Language used when none is set (and as the fallback for missing keys) */
export const DEFAULT_LANGUAGE: SupportedLanguage = "en";

/** Built-in messages per language (one merged message tree each) */
export const messages: Readonly<Record<SupportedLanguage, Messages>> = {
  en,
  zh,
  ja,
  fr,
};

/** Whether `value` is one of the `SUPPORTED_LANGUAGES` */
export const isSupportedLanguage = (
  value: unknown,
): value is SupportedLanguage =>
  typeof value === "string" &&
  (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
