import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type {
  ConfigContextProps,
  ConfigContextProviderProps,
  ConfigProviderThemeProps,
  DefaultTheme,
  ThemeMap,
} from "./types";
import useLocale from "../hooks/useLocale";
import { DEFAULT_LANGUAGE } from "../config/i18n";
import {
  generateCSSVariables,
  getSystemTheme,
  isBilingualTheme,
  resolveTheme,
} from "../utils/applyThemeStyles";
import {
  PALETTE_COOKIE_NAME,
  THEME_COOKIE_NAME,
  isPalette,
  parsePaletteCookie,
  parseThemeCookie,
  readCookieValue,
  serializeThemeCookie,
  type Palette,
  type ResolvedThemeMode,
  type ThemeMode,
} from "../theme-utils";

export const ConfigContext = createContext<ConfigContextProps | undefined>(
  undefined,
);

export const useConfig = (): ConfigContextProps => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};

const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";

const subscribeToScheme = (onChange: () => void) => {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mediaQuery = window.matchMedia(DARK_SCHEME_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
};
const subscribeNever = () => () => {};
const getServerTheme = (): DefaultTheme => "light";

/** "light" / "dark" / "system" for mode-like themes, undefined otherwise. */
export const themeModeOf = (
  theme: ConfigProviderThemeProps,
): ThemeMode | undefined => {
  if (theme === "light" || theme === "dark") return theme;
  if (theme === "auto" || theme === "system" || isBilingualTheme(theme)) {
    return "system";
  }
  return undefined;
};

/** Applied light / dark mode of a theme, when it can be determined. */
const resolvedModeOf = (
  theme: ConfigProviderThemeProps,
  systemTheme: DefaultTheme,
): ResolvedThemeMode | undefined => {
  if (theme === "github-dark") return "dark";
  const mode = themeModeOf(theme);
  if (mode === "system") return systemTheme;
  return mode;
};

/** Palettes apply to the plain light / dark / system modes only. */
const supportsPalette = (theme: ConfigProviderThemeProps) =>
  theme === "light" ||
  theme === "dark" ||
  theme === "auto" ||
  theme === "system";

const readCookie = (name: string) =>
  typeof document === "undefined"
    ? undefined
    : readCookieValue(document.cookie, name);

const writeCookie = (name: string, value: string | null) => {
  if (typeof document === "undefined") return;
  document.cookie =
    value === null
      ? `${name}=; path=/; max-age=0; SameSite=Lax`
      : serializeThemeCookie(name, value);
};

/**
 * Global configuration: theme (+ palette), and the language of lib-core's
 * built-in texts.
 *
 * Theme application:
 * - `data-theme` (resolved light / dark) and `color-scheme` on `<html>`
 * - with a `palette` and a light / dark / system theme: `data-palette` on
 *   `<html>`, tokens come from the palette blocks of `style.css`
 * - otherwise the theme's tokens are written as inline CSS variables
 */
export const ConfigProvider: React.FC<ConfigContextProviderProps> = ({
  theme: themeProp = "auto",
  palette: paletteProp = null,
  persist = false,
  onThemeChange,
  onPaletteChange,
  locale,
  children,
}) => {
  const [theme, setThemeState] = useState<ConfigProviderThemeProps>(themeProp);
  const [palette, setPaletteState] = useState<Palette | null>(paletteProp);

  // Follow new props (adjusting state while rendering avoids a stale render)
  const [prevThemeProp, setPrevThemeProp] = useState(themeProp);
  if (themeProp !== prevThemeProp) {
    setPrevThemeProp(themeProp);
    setThemeState(themeProp);
  }
  const [prevPaletteProp, setPrevPaletteProp] = useState(paletteProp);
  if (paletteProp !== prevPaletteProp) {
    setPrevPaletteProp(paletteProp);
    setPaletteState(paletteProp);
  }

  const followsSystem = themeModeOf(theme) === "system";
  const systemTheme = useSyncExternalStore<DefaultTheme>(
    followsSystem ? subscribeToScheme : subscribeNever,
    getSystemTheme,
    getServerTheme,
  );

  // Cookies are only readable in the browser and must not seed the initial
  // state (the server cannot see them -> hydration mismatch), so restore them
  // once after hydration. A no-op when the server already passed the values.
  const persistedFor = useRef<string | null>(null);
  useEffect(() => {
    if (!persist) return;
    const key = `${String(themeModeOf(themeProp))}|${paletteProp}`;
    if (persistedFor.current === key) return;
    persistedFor.current = key;
    const storedTheme = readCookie(THEME_COOKIE_NAME);
    const storedPalette = readCookie(PALETTE_COOKIE_NAME);
    /* eslint-disable react-hooks/set-state-in-effect -- one-time sync with the browser cookie after hydration */
    if (storedTheme !== undefined && themeModeOf(themeProp) !== undefined) {
      const mode = parseThemeCookie(storedTheme, themeModeOf(themeProp));
      setThemeState(
        mode === "system" && themeModeOf(themeProp) === "system"
          ? themeProp
          : mode,
      );
    }
    if (storedPalette !== undefined) {
      setPaletteState(parsePaletteCookie(storedPalette, paletteProp));
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [persist, themeProp, paletteProp]);

  const resolvedMode = resolvedModeOf(theme, systemTheme);
  const activePalette = palette && supportsPalette(theme) ? palette : null;

  useEffect(() => {
    const root = document.documentElement;
    if (resolvedMode) {
      root.dataset.theme = resolvedMode;
      root.style.colorScheme = resolvedMode;
    } else {
      delete root.dataset.theme;
      root.style.removeProperty("color-scheme");
    }
    if (activePalette) {
      root.dataset.palette = activePalette;
      // Palette tokens come from the stylesheet: drop inline theme variables
      generateCSSVariables(root.style, {} as ThemeMap);
    } else {
      delete root.dataset.palette;
      generateCSSVariables(root.style, resolveTheme(theme, systemTheme));
    }
  }, [theme, systemTheme, resolvedMode, activePalette]);

  const [currentLocale] = useLocale(locale ?? { language: DEFAULT_LANGUAGE });

  const onThemeChangeRef = useRef(onThemeChange);
  const onPaletteChangeRef = useRef(onPaletteChange);
  useEffect(() => {
    onThemeChangeRef.current = onThemeChange;
    onPaletteChangeRef.current = onPaletteChange;
  });

  const setTheme = useCallback(
    (next: ConfigProviderThemeProps) => {
      setThemeState(next);
      const mode = themeModeOf(next);
      if (persist && mode && typeof next === "string") {
        writeCookie(THEME_COOKIE_NAME, mode);
      }
      onThemeChangeRef.current?.(next);
    },
    [persist],
  );

  const setPalette = useCallback(
    (next: Palette | null) => {
      const value = isPalette(next) ? next : null;
      setPaletteState(value);
      if (persist) writeCookie(PALETTE_COOKIE_NAME, value);
      onPaletteChangeRef.current?.(value);
    },
    [persist],
  );

  const value = useMemo<ConfigContextProps>(
    () => ({
      theme,
      resolvedTheme:
        theme === "auto" || theme === "system"
          ? systemTheme
          : typeof theme === "string"
            ? theme
            : resolveTheme(theme, systemTheme),
      locale: currentLocale,
      mode: themeModeOf(theme),
      resolvedMode,
      palette,
      setTheme,
      setPalette,
    }),
    [
      theme,
      systemTheme,
      currentLocale,
      resolvedMode,
      palette,
      setTheme,
      setPalette,
    ],
  );

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};
