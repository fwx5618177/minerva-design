import type { SupportedLanguage } from "minerva-design";

// Site languages that React ships built-in texts for (all of them today)
const LIB_LANGUAGES: readonly SupportedLanguage[] = ["en", "zh", "ja", "fr"];

/** React language for a site language ("en" when React lacks it) */
export const toLibLanguage = (language: string): SupportedLanguage => {
  const base = language.split("-")[0];
  return (LIB_LANGUAGES as readonly string[]).includes(base)
    ? (base as SupportedLanguage)
    : "en";
};
