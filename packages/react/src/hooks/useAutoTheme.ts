import { useContext, useEffect, useState, useSyncExternalStore } from "react";
import { ThemeScopeContext } from "../internal/themeScope";
import {
  applyThemeStyles,
  getSystemTheme,
  isBilingualTheme,
} from "@minerva/dom";
import type { DefaultTheme, Theme } from "../contexts/types";

const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";

const subscribeToScheme = (onChange: () => void) => {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mediaQuery = window.matchMedia(DARK_SCHEME_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
};
const subscribeNever = () => () => {};
const getServerTheme = (): DefaultTheme => "light";

/**
 * Manage the active theme and apply it as CSS variables.
 *
 * When the theme is "auto" (or a `{ light, dark }` pair) the hook subscribes to
 * `prefers-color-scheme` changes and unsubscribes on unmount / theme change.
 * SSR-safe: renders as "light" on the server and touches the document only in
 * effects.
 *
 * Inside a `ConfigProvider` the root provider owns `<html>`: the hook then only
 * manages the state (pass it to a nested `<ConfigProvider theme={theme}>` to
 * apply it to a subtree).
 *
 * @returns `[theme, setTheme, systemTheme]`
 */
const useAutoTheme = (initialTheme: Theme = "auto") => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  // Follow a new theme passed by the caller (adjusting state while rendering
  // instead of in an effect avoids an extra render with the stale theme)
  const [prevInitialTheme, setPrevInitialTheme] = useState(initialTheme);
  if (initialTheme !== prevInitialTheme) {
    setPrevInitialTheme(initialTheme);
    setTheme(initialTheme);
  }

  const followsSystem =
    theme === "auto" || theme === "system" || isBilingualTheme(theme);
  const systemTheme = useSyncExternalStore<DefaultTheme>(
    followsSystem ? subscribeToScheme : subscribeNever,
    getSystemTheme,
    getServerTheme,
  );

  const insideProvider = useContext(ThemeScopeContext) !== null;
  useEffect(() => {
    if (insideProvider) return;
    applyThemeStyles(theme, systemTheme);
  }, [insideProvider, theme, systemTheme]);

  return [theme, setTheme, systemTheme] as const;
};

export default useAutoTheme;
