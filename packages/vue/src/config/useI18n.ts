import { computed, type ComputedRef } from "vue";
import type { SupportedLanguage, TranslateOptions } from "@minerva/core";
import { getLanguage, resolveLanguage, translateMessage } from "./i18n";
import { useThemeScope } from "../internal/scope";

/** Translate function returned by `useI18n` */
export type TranslateFn = (key: string, options?: TranslateOptions) => string;

/**
 * Translations of the built-in texts (in-house translator of @minerva/core,
 * independent of the app's i18n library). `t` follows the `locale` of the
 * closest `ConfigProvider` that sets one (on the server too), else the
 * global language. Reactive: templates using `t` re-render on changes.
 */
export function useI18n(): {
  t: TranslateFn;
  /** Language `t` translates to */
  language: ComputedRef<SupportedLanguage>;
} {
  const scope = useThemeScope();
  const lng = computed(() => scope?.value.language ?? getLanguage());
  const t: TranslateFn = (key, options) =>
    translateMessage(key, options, lng.value);
  return { t, language: computed(() => resolveLanguage(lng.value)) };
}
