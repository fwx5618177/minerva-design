import { useCallback, useSyncExternalStore } from "react";
import type { TranslateOptions } from "@minerva/core";
import {
  getLanguage,
  getServerLanguage,
  resolveLanguage,
  subscribeLanguage,
  translateMessage,
} from "../config/i18n";
import type { SupportedLanguage } from "../contexts/types";
import { useThemeScope } from "../internal/themeScope";

/** Translate function returned by `useI18n` */
export type TranslateFn = (key: string, options?: TranslateOptions) => string;

/**
 * Translations of the React library's built-in texts (in-house translator, independent
 * of any i18n library the host application uses).
 *
 * `t` follows the `locale` of the closest nested `ConfigProvider` that sets
 * one, otherwise the React library's global language (set by the root provider).
 * Components re-render when the global language changes.
 */
const useI18n = (): {
  t: TranslateFn;
  /** Language `t` translates to */
  language: SupportedLanguage;
} => {
  const scopeLanguage = useThemeScope()?.language;
  const globalLanguage = useSyncExternalStore(
    subscribeLanguage,
    getLanguage,
    getServerLanguage,
  );
  const lng = scopeLanguage ?? globalLanguage;

  const t = useCallback<TranslateFn>(
    (key, options) => translateMessage(key, options, lng),
    [lng],
  );

  return { t, language: resolveLanguage(lng) };
};

export default useI18n;
