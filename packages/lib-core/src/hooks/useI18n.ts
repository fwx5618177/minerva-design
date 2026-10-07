import type { TFunction, i18n as I18n } from "i18next";
import { useTranslation } from "react-i18next";
import i18n from "../config/i18n";

/**
 * Translations of lib-core. Uses the library's own i18next instance so it never
 * interferes with the host application's i18next setup.
 */
const useI18n = (): { t: TFunction<"index">; i18n: I18n } => {
  const { t } = useTranslation("index", { i18n });

  return { t, i18n };
};

export default useI18n;
