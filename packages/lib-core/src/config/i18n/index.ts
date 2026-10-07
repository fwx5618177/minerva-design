import i18next, { type i18n as I18n } from "i18next";
import type { SupportedLanguage } from "../../contexts/types";

import en from "./en";
import fr from "./fr";
import zh from "./zh";

export const DEFAULT_LANGUAGE: SupportedLanguage = "en";

export const resources = {
  en,
  fr,
  zh,
} as const satisfies Record<SupportedLanguage, unknown>;

/**
 * Private i18next instance for lib-core. It is intentionally not registered
 * globally (no `initReactI18next`) so the host app's i18next stays untouched.
 */
const i18n: I18n = i18next.createInstance();

i18n.init({
  resources,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  ns: ["index"],
  defaultNS: "index",
  initAsync: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
