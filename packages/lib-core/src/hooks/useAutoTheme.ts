import { useEffect, useState } from "react";
import {
  applyThemeStyles,
  getSystemTheme,
  isBilingualTheme,
} from "../utils/applyThemeStyles";
import type { DefaultTheme, Theme } from "../contexts/types";

const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";

/**
 * Manage the active theme and apply it as CSS variables.
 *
 * When the theme is "auto" (or a `{ light, dark }` pair) the hook subscribes to
 * `prefers-color-scheme` changes and unsubscribes on unmount / theme change.
 *
 * @returns `[theme, setTheme, systemTheme]`
 */
const useAutoTheme = (initialTheme: Theme = "auto") => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [systemTheme, setSystemTheme] = useState<DefaultTheme>(getSystemTheme);

  // Keep in sync when the caller passes a new theme
  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);

  const followsSystem = theme === "auto" || isBilingualTheme(theme);

  useEffect(() => {
    if (!followsSystem || typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia(DARK_SCHEME_QUERY);
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    setSystemTheme(mediaQuery.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [followsSystem]);

  useEffect(() => {
    applyThemeStyles(theme, systemTheme);
  }, [theme, systemTheme]);

  return [theme, setTheme, systemTheme] as const;
};

export default useAutoTheme;
