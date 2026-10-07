import type { TFunction, i18n as I18n } from "i18next";
import { useTranslation } from "react-i18next";
import i18n from "../config/i18n";
import type { SupportedLanguage } from "../contexts/types";
import { useThemeScope } from "../internal/themeScope";

/**
 * Translations of lib-core. Uses the library's own i18next instance so it never
 * interferes with the host application's i18next setup.
 *
 * `t` follows the `locale` of the closest nested `ConfigProvider` that sets
 * one, otherwise lib-core's global language (set by the root provider).
 */
const useI18n = (): {
  t: TFunction<"index">;
  i18n: I18n;
  /** Language `t` translates to */
  language: SupportedLanguage;
} => {
  const lng = useThemeScope()?.language;
  const { t } = useTranslation("index", { i18n, lng });

  return {
    t,
    i18n,
    language: (lng ?? i18n.language ?? "en") as SupportedLanguage,
  };
};

export default useI18n;
