/* eslint-disable react-refresh/only-export-components -- test helpers */
// Shared helpers of the docs-site component tests (happy-dom).
import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n, { loadLanguage } from "@i18n/config";
import { ThemeModeProvider } from "../theme/ThemeModeContext";

/** English strings, including the lazily-loaded documentation strings */
export async function setupI18n() {
  await loadLanguage("en");
  await i18n.changeLanguage("en");
  return i18n;
}

/** i18n + theme mode, like <App> (without the router / root ConfigProvider) */
export const SiteProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <I18nextProvider i18n={i18n}>
    <ThemeModeProvider>{() => children}</ThemeModeProvider>
  </I18nextProvider>
);
