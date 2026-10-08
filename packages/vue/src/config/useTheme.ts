import { computed, reactive } from "vue";
import type { Palette, ResolvedThemeMode, ThemeMode } from "@minerva/core";
import { useConfig } from "./context";

/** What `useTheme()` returns (reactive object). */
export interface ThemeContextValue {
  /** light / dark / system */
  readonly theme: ThemeMode;
  /** Applied mode */
  readonly resolvedTheme: ResolvedThemeMode;
  readonly palette: Palette | null;
  setTheme(theme: ThemeMode): void;
  setPalette(palette: Palette | null): void;
}

/**
 * Theme mode and palette of the closest `ConfigProvider`, with setters (they
 * update the provider owning the setting). Throws outside of a provider.
 */
export function useTheme(): ThemeContextValue {
  const config = useConfig();
  return reactive({
    theme: computed(() => config.mode ?? "system"),
    resolvedTheme: computed(() => config.resolvedMode ?? "light"),
    palette: computed(() => config.palette ?? null),
    setTheme: (theme: ThemeMode) => config.setTheme(theme),
    setPalette: (palette: Palette | null) => config.setPalette(palette),
  }) as ThemeContextValue;
}
