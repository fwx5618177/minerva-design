import { useCallback, useContext, useMemo } from "react";
import { ConfigContext, ConfigProvider } from "./ConfigProvider";
import type { ThemeContextValue, ThemeProviderProps } from "./types";
import type { ThemeMode } from "../theme-utils";

/**
 * Theme + palette provider with cookie persistence: a thin preset over
 * `ConfigProvider` (one source of truth), named after the common
 * `ThemeProvider` / `useTheme` pattern.
 *
 *   <ThemeProvider defaultTheme="system" defaultPalette="editorial">
 *     <App />
 *   </ThemeProvider>
 *
 * For SSR pass the request cookies as defaults
 * (`parseThemeCookies(request.headers.get("cookie"))` from
 * `@minerva/lib-core/theme-utils`) and inline `THEME_INIT_SCRIPT` in `<head>`.
 */
export function ThemeProvider({
  defaultTheme = "system",
  defaultPalette = null,
  disableStorage = false,
  locale,
  onThemeChange,
  onPaletteChange,
  children,
}: ThemeProviderProps) {
  return (
    <ConfigProvider
      theme={defaultTheme}
      palette={defaultPalette}
      persist={!disableStorage}
      locale={locale}
      onThemeChange={
        onThemeChange
          ? (theme) => {
              if (theme === "light" || theme === "dark") onThemeChange(theme);
              else if (theme === "auto" || theme === "system")
                onThemeChange("system");
            }
          : undefined
      }
      onPaletteChange={onPaletteChange}
    >
      {children}
    </ConfigProvider>
  );
}

/**
 * Theme mode and palette of the closest `ThemeProvider` / `ConfigProvider`.
 * Throws outside of one.
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ConfigContext);
  if (!ctx) {
    throw new Error(
      "useTheme must be used within a ThemeProvider (or ConfigProvider)",
    );
  }
  const { mode, resolvedMode, palette = null, setTheme, setPalette } = ctx;
  const setMode = useCallback(
    (next: ThemeMode) => setTheme?.(next),
    [setTheme],
  );
  const changePalette = useCallback(
    (next: ThemeContextValue["palette"]) => setPalette?.(next),
    [setPalette],
  );
  return useMemo(
    () => ({
      theme: mode ?? "system",
      resolvedTheme: resolvedMode ?? "light",
      palette,
      setTheme: setMode,
      setPalette: changePalette,
    }),
    [mode, resolvedMode, palette, setMode, changePalette],
  );
}

export default ThemeProvider;
