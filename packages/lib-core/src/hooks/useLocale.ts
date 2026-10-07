import { useEffect, useState } from "react";
import i18n, { DEFAULT_LANGUAGE } from "../config/i18n";
import type { Locale } from "../contexts/types";

const useLocale = (initialLocale: Locale = { language: DEFAULT_LANGUAGE }) => {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  // Keep in sync when the caller passes a new language
  useEffect(() => {
    setLocale({ language: initialLocale.language });
  }, [initialLocale.language]);

  useEffect(() => {
    i18n.changeLanguage(locale.language ?? DEFAULT_LANGUAGE);
  }, [locale.language]);

  return [locale, setLocale] as const;
};

export default useLocale;
