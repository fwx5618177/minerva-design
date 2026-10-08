import { useContext, useEffect, useState } from "react";
import { ThemeScopeContext } from "../internal/themeScope";
import { DEFAULT_LANGUAGE, setLanguage } from "../config/i18n";
import type { Locale } from "../contexts/types";

/**
 * Current locale of the React library's built-in texts. Changing it switches the
 * library's global language (outside of a `ConfigProvider`).
 *
 * Inside a `ConfigProvider` the root provider owns the global language: the
 * hook then only manages the state (pass it to a nested
 * `<ConfigProvider locale={locale}>` to apply it to a subtree).
 *
 * @returns `[locale, setLocale]`
 */
const useLocale = (initialLocale: Locale = { language: DEFAULT_LANGUAGE }) => {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  // Follow a new language passed by the caller
  const [prevLanguage, setPrevLanguage] = useState(initialLocale.language);
  if (initialLocale.language !== prevLanguage) {
    setPrevLanguage(initialLocale.language);
    setLocale({ language: initialLocale.language });
  }

  const insideProvider = useContext(ThemeScopeContext) !== null;
  useEffect(() => {
    if (insideProvider) return;
    setLanguage(locale.language ?? DEFAULT_LANGUAGE);
  }, [insideProvider, locale.language]);

  return [locale, setLocale] as const;
};

export default useLocale;
