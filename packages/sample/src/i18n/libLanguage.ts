import type { SupportedLanguage } from "@minerva/lib-core";

// Site languages that lib-core ships built-in texts for (all of them today)
const LIB_LANGUAGES: readonly SupportedLanguage[] = ["en", "zh", "ja", "fr"];

/** lib-core language for a site language ("en" when lib-core lacks it) */
export const toLibLanguage = (language: string): SupportedLanguage => {
  const base = language.split("-")[0];
  return (LIB_LANGUAGES as readonly string[]).includes(base)
    ? (base as SupportedLanguage)
    : "en";
};
