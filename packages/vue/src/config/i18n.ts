import { shallowRef } from "vue";
import {
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
  messages,
  translate,
  type SupportedLanguage,
  type TranslateOptions,
} from "@minerva/core";

// The message bundles and the translator are framework-agnostic
// (@minerva/core): the Vue renderer only keeps track of its global language.
export { DEFAULT_LANGUAGE, messages };

/**
 * Global language of the Vue renderer: set by the root `ConfigProvider` (on
 * the client) or `useLocale` outside of a provider, read by `useI18n`
 * outside of a provider and by the imperative APIs (`toast`, `confirm`).
 * A reactive ref: components re-render when it changes.
 */
const current = shallowRef<string>(DEFAULT_LANGUAGE);

/** Current global language (any string; unsupported ones fall back) */
export const getLanguage = (): string => current.value;

/** Sets the global language */
export const setLanguage = (language: string): void => {
  current.value = language;
};

/** Supported language that `language` translates to */
export const resolveLanguage = (language: string): SupportedLanguage =>
  isSupportedLanguage(language) ? language : DEFAULT_LANGUAGE;

/** Translates `key` in `language` (default: the global language) */
export const translateMessage = (
  key: string,
  options?: TranslateOptions,
  language: string = current.value,
): string =>
  translate(
    { messages, language, fallbackLanguage: DEFAULT_LANGUAGE },
    key,
    options,
  );
