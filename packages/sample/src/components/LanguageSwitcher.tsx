import React from "react";
import { useTranslation } from "react-i18next";
import { IoLanguageOutline } from "react-icons/io5";
import { changeLanguage, type Language } from "@i18n/config";
import styles from "@styles/components/language-switcher.module.scss";

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
    { code: "fr", name: "Français" },
  ];

  const handleLanguageChange = (languageCode: string) => {
    void changeLanguage(languageCode as Language);
  };

  return (
    <div className={styles.languageSwitcher}>
      <IoLanguageOutline className={styles.icon} aria-hidden />
      <select
        aria-label={t("header.language")}
        value={i18n.resolvedLanguage ?? i18n.language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className={styles.select}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
