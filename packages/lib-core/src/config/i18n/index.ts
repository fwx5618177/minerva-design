import i18next, { type i18n as I18n } from "i18next";
import { DEFAULT_LANGUAGE, messages, type Messages } from "@minerva/core";
import type { SupportedLanguage } from "../../contexts/types";

// The message bundles are framework-agnostic data owned by @minerva/core;
// lib-core only wires them into its i18next instance.
export { DEFAULT_LANGUAGE };

/** i18next resources: every language's messages in the "index" namespace */
export const resources = {
  en: { index: messages.en },
  fr: { index: messages.fr },
  ja: { index: messages.ja },
  zh: { index: messages.zh },
} as const satisfies Record<SupportedLanguage, { index: Messages }>;

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
