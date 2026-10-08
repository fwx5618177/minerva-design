// Configuration, theme and i18n.
export { default as ConfigProvider } from "../config/ConfigProvider.vue";
export { useConfig } from "../config/context";
export type {
  ConfigContext,
  ConfigProviderTheme,
  Locale,
} from "../config/context";
export { useTheme } from "../config/useTheme";
export type { ThemeContextValue } from "../config/useTheme";
export { useI18n } from "../config/useI18n";
export type { TranslateFn } from "../config/useI18n";
export { useLocale } from "../config/useLocale";
export { getLanguage, setLanguage, translateMessage } from "../config/i18n";
export { provideEmbeddedScope } from "../config/embed";
export type { EmbeddedScopeOptions } from "../config/embed";
