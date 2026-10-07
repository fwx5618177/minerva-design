import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import zhCommon from "./locales/zh/common.json";
import jaCommon from "./locales/ja/common.json";
import frCommon from "./locales/fr/common.json";

export const languages = ["en", "zh", "ja", "fr"] as const;
export type Language = (typeof languages)[number];

type Messages = Record<string, unknown>;

// Per-page documentation strings live in locales/<lng>/docs/<page>.json and are
// exposed as `docs.<page>.*` in the "common" namespace. They are the bulk of
// the translations, so each language is loaded on demand as a single chunk.
const docLoaders: Record<
  Language,
  () => Promise<{ default: Record<string, Messages> }>
> = {
  en: () => import("./docs-en"),
  zh: () => import("./docs-zh"),
  ja: () => import("./docs-ja"),
  fr: () => import("./docs-fr"),
};

const loaded = new Map<Language, Promise<void>>();

const isLanguage = (value: string): value is Language =>
  (languages as readonly string[]).includes(value);

/** Load the documentation strings of a language (and the English fallback) */
export const loadLanguage = (lng: string): Promise<void> => {
  const targets: Language[] =
    isLanguage(lng) && lng !== "en" ? ["en", lng] : ["en"];
  return Promise.all(
    targets.map((target) => {
      let promise = loaded.get(target);
      if (!promise) {
        promise = docLoaders[target]().then(({ default: files }) => {
          const docs: Record<string, Messages> = {};
          for (const [path, messages] of Object.entries(files)) {
            docs[path.replace(/^.*\/([^/]+)\.json$/, "$1")] = messages;
          }
          i18n.addResourceBundle(target, "common", { docs }, true, false);
        });
        loaded.set(target, promise);
      }
      return promise;
    }),
  ).then(() => undefined);
};

/** Switch language once its strings are available */
export const changeLanguage = async (lng: Language) => {
  await loadLanguage(lng);
  await i18n.changeLanguage(lng);
};

const common: Record<Language, Messages> = {
  en: enCommon,
  zh: zhCommon,
  ja: jaCommon,
  fr: frCommon,
};

const STORAGE_KEY = "minerva-docs-language";

const initialLanguage = (): Language => {
  const stored =
    typeof localStorage !== "undefined"
      ? localStorage.getItem(STORAGE_KEY)
      : null;
  const candidate = stored ?? navigator.language.split("-")[0];
  return isLanguage(candidate) ? candidate : "en";
};

i18n.use(initReactI18next).init({
  resources: Object.fromEntries(
    languages.map((lng) => [lng, { common: common[lng] }]),
  ),
  defaultNS: "common",
  lng: initialLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // storage may be unavailable (private mode); ignore
  }
});
document.documentElement.lang = i18n.language;

export default i18n;
