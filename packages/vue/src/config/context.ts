import { inject, type InjectionKey } from "vue";
import type {
  ComponentTheme,
  CustomBilingualTheme,
  DefaultTheme,
  Palette,
  ResolvedDesign,
  ResolvedThemeMode,
  SupportTheme,
  SupportedLanguage,
  ThemeMap,
  ThemeMode,
  ThemeName,
} from "@minerva/core";

/** Themes accepted by `ConfigProvider` (same as the React renderer) */
export type ConfigProviderTheme =
  | "auto"
  | "system"
  | CustomBilingualTheme
  | SupportTheme
  | ThemeMap
  | DefaultTheme;

/** Language of the built-in texts */
export interface Locale {
  language?: SupportedLanguage;
}

/** What `useConfig()` returns: the settings of the closest provider. */
export interface ConfigContext {
  /** Current theme (an "auto" / "system" theme follows the OS) */
  readonly theme: ConfigProviderTheme;
  /** Theme name or resolved token map after applying the OS preference */
  readonly resolvedTheme: ThemeName | ComponentTheme;
  readonly locale: Locale;
  /** light / dark / system, for mode-like themes */
  readonly mode: ThemeMode | undefined;
  /** Applied light / dark mode, when it can be determined */
  readonly resolvedMode: ResolvedThemeMode | undefined;
  readonly palette: Palette | null;
  /** Resolved design axes (preset, density, radius, shadow, font scale) */
  readonly design: ResolvedDesign;
  setTheme(theme: ConfigProviderTheme): void;
  setPalette(palette: Palette | null): void;
}

export const CONFIG_KEY: InjectionKey<ConfigContext> = Symbol("minerva-config");

/**
 * Settings of the closest `ConfigProvider` (reactive object: read its fields
 * in templates / computed). Throws outside of a provider.
 */
export function useConfig(): ConfigContext {
  const config = inject(CONFIG_KEY, null);
  if (!config)
    throw new Error("useConfig must be used within a ConfigProvider");
  return config;
}

/** Like `useConfig`, `null` outside of a provider. */
export const useOptionalConfig = (): ConfigContext | null =>
  inject(CONFIG_KEY, null);
