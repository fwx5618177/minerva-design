import React from "react";
import { RouterProvider } from "react-router";
import { I18nextProvider, useTranslation } from "react-i18next";
import { ConfigProvider } from "minerva-design";
import i18n from "@i18n/config";
import { toLibLanguage } from "@i18n/libLanguage";
import router from "./router";
import { ThemeModeProvider } from "./theme/ThemeModeContext";

const SiteConfigProvider: React.FC = () => {
  const { i18n: siteI18n } = useTranslation();
  const language = toLibLanguage(
    siteI18n.resolvedLanguage ?? siteI18n.language,
  );
  return (
    <ThemeModeProvider>
      {(resolvedTheme, palette) => (
        // The site's root provider: owns <html> (theme, palette) and
        // the React library's language. Demos nest their own providers inside it.
        <ConfigProvider
          theme={resolvedTheme}
          palette={palette}
          locale={{ language }}
        >
          <RouterProvider router={router} />
        </ConfigProvider>
      )}
    </ThemeModeProvider>
  );
};

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <SiteConfigProvider />
    </I18nextProvider>
  );
};

export default App;
