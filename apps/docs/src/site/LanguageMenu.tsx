import React from "react";
import { useTranslation } from "react-i18next";
import { IoLanguageOutline } from "react-icons/io5";
import { Menu } from "minerva-design";
import { changeLanguage, type Language } from "@i18n/config";
import styles from "./site.module.scss";

const LANGUAGES: { code: Language; name: string }[] = [
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
  { code: "fr", name: "Français" },
];

/** Language picker of the top navigation (a Minerva Menu radio group). */
const LanguageMenu: React.FC = () => {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? i18n.language;
  const label = t("header.language");
  const currentName =
    LANGUAGES.find((lang) => lang.code === current)?.name ?? current;

  return (
    <Menu
      size="small"
      align="end"
      aria-label={label}
      className={styles.menuPanel}
      items={[
        {
          type: "radio-group",
          key: "language",
          label,
          value: current,
          closeOnSelect: true,
          onValueChange: (value) => void changeLanguage(value as Language),
          items: LANGUAGES.map((lang) => ({
            value: lang.code,
            label: lang.name,
          })),
        },
      ]}
    >
      <button
        type="button"
        className={styles.languageButton}
        aria-label={`${label}: ${currentName}`}
        title={label}
      >
        <IoLanguageOutline aria-hidden />
        <span aria-hidden>{current.toUpperCase()}</span>
      </button>
    </Menu>
  );
};

export default LanguageMenu;
