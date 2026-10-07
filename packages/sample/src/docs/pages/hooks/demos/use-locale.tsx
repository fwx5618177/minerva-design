import { useEffect } from "react";
import {
  Button,
  StatusIndicator,
  Tag,
  useI18n,
  useLocale,
  type SupportedLanguage,
} from "@minerva/lib-core";

// a key from lib-core's built-in translations
const AVATAR_KEY = "avatar.default";
const LANGUAGES: SupportedLanguage[] = ["en", "zh", "fr"];

export default function UseLocaleDemo() {
  const [locale, setLocale] = useLocale({ language: "en" });
  // t() translates lib-core's own strings with its private i18next instance
  const { t, i18n } = useI18n();

  // The language of lib-core is global: restore the default when unmounting
  useEffect(
    () => () => {
      void i18n.changeLanguage("en");
    },
    [i18n],
  );

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        role="group"
        aria-label="Language"
        style={{ display: "flex", gap: 8 }}
      >
        {LANGUAGES.map((language) => (
          <Button
            key={language}
            size="small"
            variant={language === locale.language ? "primary" : "secondary"}
            aria-pressed={language === locale.language}
            onClick={() => setLocale({ language })}
          >
            {language}
          </Button>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        i18n.language: <Tag variant="primary">{i18n.language}</Tag> {AVATAR_KEY}
        : <Tag variant="info">{t(AVATAR_KEY)}</Tag>
      </div>
      {/* built-in component labels follow the library language too */}
      <StatusIndicator type="online" showLabel />
    </div>
  );
}
