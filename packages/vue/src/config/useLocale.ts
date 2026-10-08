import { ref, watch, type Ref } from "vue";
import { DEFAULT_LANGUAGE, setLanguage } from "./i18n";
import type { Locale } from "./context";
import { useThemeScope } from "../internal/scope";

/**
 * Current locale of the built-in texts. Outside of a `ConfigProvider`
 * changing it switches the global language; inside one it only holds the
 * state (pass it to `<ConfigProvider :locale>`).
 */
export function useLocale(
  initialLocale: Locale = { language: DEFAULT_LANGUAGE },
): Ref<Locale> {
  const locale = ref<Locale>({ ...initialLocale });
  const insideProvider = useThemeScope() !== null;
  if (!insideProvider && typeof window !== "undefined") {
    watch(
      () => locale.value.language,
      (language) => setLanguage(language ?? DEFAULT_LANGUAGE),
      { immediate: true },
    );
  }
  return locale;
}
