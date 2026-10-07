import { useEffect, useState } from "react";
import {
  Button,
  ConfigProvider,
  Tag,
  useConfig,
  useI18n,
  type SupportedLanguage,
} from "@minerva/lib-core";

// a key from lib-core's built-in translations
const AVATAR_KEY = "avatar.default";
const LANGUAGES: SupportedLanguage[] = ["en", "zh", "fr"];

function Preview() {
  const { locale } = useConfig();
  const { t } = useI18n();
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 8,
      }}
    >
      locale: <Tag variant="primary">{locale?.language}</Tag> {AVATAR_KEY}:{" "}
      <Tag variant="info">{t(AVATAR_KEY)}</Tag>
    </div>
  );
}

export default function LocaleDemo() {
  // Reuse the outer provider's theme so the nested one doesn't change it
  const { theme } = useConfig();
  const { i18n } = useI18n();
  const [language, setLanguage] = useState<SupportedLanguage>("en");

  // lib-core's language is global: restore the default when leaving
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
        {LANGUAGES.map((lng) => (
          <Button
            key={lng}
            size="small"
            variant={lng === language ? "primary" : "secondary"}
            aria-pressed={lng === language}
            onClick={() => setLanguage(lng)}
          >
            {lng}
          </Button>
        ))}
      </div>
      <ConfigProvider theme={theme} locale={{ language }}>
        <Preview />
      </ConfigProvider>
    </div>
  );
}
