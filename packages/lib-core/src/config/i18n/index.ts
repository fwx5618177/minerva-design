import {
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
  messages,
  translate,
  type TranslateOptions,
} from "@minerva/core";
import type { SupportedLanguage } from "../../contexts/types";

// The message bundles and the translator are framework-agnostic and owned by
// @minerva/core; lib-core only keeps track of its global language here.
export { DEFAULT_LANGUAGE, messages };

/**
 * lib-core's global language store: a module-level value with
 * `subscribe` / `getSnapshot` for `useSyncExternalStore`. Set by the root
 * `ConfigProvider` (or `useLocale` outside of a provider) and read by
 * `useI18n` and the imperative APIs (`message`, `confirm`...).
 *
 * Nothing runs at import time besides defining these bindings.
 */
let currentLanguage: string = DEFAULT_LANGUAGE;
const listeners = new Set<() => void>();

/** Current global language (any string; unsupported ones fall back) */
export const getLanguage = (): string => currentLanguage;

/** Global language on the server / during hydration */
export const getServerLanguage = (): string => DEFAULT_LANGUAGE;

/** Sets the global language and notifies subscribers when it changes */
export const setLanguage = (language: string): void => {
  if (language === currentLanguage) return;
  currentLanguage = language;
  for (const listener of [...listeners]) listener();
};

/** Subscribes to global language changes; returns the unsubscribe function */
export const subscribeLanguage = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/** Supported language that `language` translates to */
export const resolveLanguage = (language: string): SupportedLanguage =>
  isSupportedLanguage(language) ? language : DEFAULT_LANGUAGE;

/** Translates `key` in `language` (default: the global language) */
export const translateMessage = (
  key: string,
  options?: TranslateOptions,
  language: string = currentLanguage,
): string =>
  translate(
    { messages, language, fallbackLanguage: DEFAULT_LANGUAGE },
    key,
    options,
  );

/**
 * Convenience facade over the store (`i18n.language`,
 * `i18n.changeLanguage(lng)`, `i18n.t(key)`).
 */
const i18n = {
  get language(): string {
    return currentLanguage;
  },
  changeLanguage: setLanguage,
  t: (key: string, options?: TranslateOptions): string =>
    translateMessage(key, options),
} as const;

export default i18n;
