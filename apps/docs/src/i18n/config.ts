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
// the translations, so they are loaded on demand:
// - `virtual:docs-meta/<lng>` (scripts/build-plugins.mjs): the title and the
//   description of every page (sidebar, search, pager, landing page)
// - one chunk per page and language, loaded with the page itself
const metaLoaders: Record<
  Language,
  () => Promise<{ default: Record<string, Messages> }>
> = {
  en: () => import("virtual:docs-meta/en"),
  zh: () => import("virtual:docs-meta/zh"),
  ja: () => import("virtual:docs-meta/ja"),
  fr: () => import("virtual:docs-meta/fr"),
};

const pageLoaders = import.meta.glob<Messages>("./locales/*/docs/*.json", {
  import: "default",
});

/**
 * Pages whose content also renders strings of other pages (beyond their
 * title / description); checked by src/i18n/config.test.ts.
 */
export const PAGE_STRING_DEPS: Record<string, readonly string[]> = {
  theming: ["theme-utils"],
};

const loaded = new Map<string, Promise<void>>();
/** Pages displayed so far: reloaded in the new language on a switch */
const requestedPages = new Set<string>();

const isLanguage = (value: string): value is Language =>
  (languages as readonly string[]).includes(value);

/** The language itself, plus the English fallback */
const withFallback = (lng: string): Language[] =>
  isLanguage(lng) && lng !== "en" ? ["en", lng] : ["en"];

const once = (key: string, load: () => Promise<void>) => {
  let promise = loaded.get(key);
  if (!promise) {
    promise = load();
    loaded.set(key, promise);
  }
  return promise;
};

const addDocs = (lng: Language, docs: Record<string, Messages>) => {
  i18n.addResourceBundle(lng, "common", { docs }, true, false);
};

const loadMeta = (lng: Language) =>
  once(`${lng}:meta`, () =>
    metaLoaders[lng]().then(({ default: meta }) => addDocs(lng, meta)),
  );

const loadPage = (lng: Language, page: string) =>
  once(`${lng}:${page}`, () => {
    const loader = pageLoaders[`./locales/${lng}/docs/${page}.json`];
    if (!loader) return Promise.resolve();
    return loader().then((messages) => addDocs(lng, { [page]: messages }));
  });

/**
 * Load the full strings of a documentation page (and of the pages it
 * depends on) in a language and its English fallback.
 */
export const loadPageStrings = (
  page: string,
  lng: string = i18n.language,
): Promise<void> => {
  const pages = [page, ...(PAGE_STRING_DEPS[page] ?? [])];
  for (const id of pages) requestedPages.add(id);
  return Promise.all(
    withFallback(lng).flatMap((target) =>
      pages.map((id) => loadPage(target, id)),
    ),
  ).then(() => undefined);
};

/**
 * Load what every route needs in a language (titles and descriptions of
 * all pages), plus the strings of the pages displayed so far.
 */
export const loadLanguage = (lng: string): Promise<void> =>
  Promise.all([
    ...withFallback(lng).map(loadMeta),
    ...[...requestedPages].map((page) => loadPageStrings(page, lng)),
  ]).then(() => undefined);

/** Every page's strings (tests and tools that render arbitrary pages) */
export const loadAllDocs = (lng: string): Promise<void> => {
  const pages = new Set(
    Object.keys(pageLoaders).map((path) =>
      path.replace(/^.*\/([^/]+)\.json$/, "$1"),
    ),
  );
  return Promise.all([
    loadLanguage(lng),
    ...[...pages].map((page) => loadPageStrings(page, lng)),
  ]).then(() => undefined);
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
