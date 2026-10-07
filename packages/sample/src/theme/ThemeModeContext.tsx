/* eslint-disable react-refresh/only-export-components -- context module: provider + hook + constants */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { themes } from "@minerva/lib-core";

/** Theme choice offered by the docs site ("auto" follows the OS setting). */
export type ThemeMode = "auto" | "light" | "dark" | "github-dark";
/** Built-in lib-core theme actually applied. */
export type ResolvedThemeMode = Exclude<ThemeMode, "auto">;

export const THEME_MODES: readonly ThemeMode[] = [
  "auto",
  "light",
  "dark",
  "github-dark",
];

export const THEME_STORAGE_KEY = "minerva-docs-theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

const isThemeMode = (value: unknown): value is ThemeMode =>
  typeof value === "string" && (THEME_MODES as string[]).includes(value);

const readStoredMode = (): ThemeMode => {
  try {
    const stored =
      typeof localStorage !== "undefined"
        ? localStorage.getItem(THEME_STORAGE_KEY)
        : null;
    return isThemeMode(stored) ? stored : "auto";
  } catch {
    return "auto";
  }
};

const getSystemScheme = (): "light" | "dark" =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia(DARK_QUERY).matches
    ? "dark"
    : "light";

const subscribeToScheme = (onChange: () => void) => {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const query = window.matchMedia(DARK_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const subscribeNever = () => () => {};

/** "#2563eb" -> "37, 99, 235" (null for non-hex values) */
const hexToRgbTriplet = (hex: string): string | null => {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const h =
    m[1].length === 3
      ? m[1]
          .split("")
          .map((c) => c + c)
          .join("")
      : m[1];
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(", ");
};

export interface ThemeModeContextValue {
  /** The user's choice (persisted in localStorage). */
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  /** The built-in theme currently applied. */
  resolved: ResolvedThemeMode;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(
  undefined,
);

export const ThemeModeProvider: React.FC<{
  children: (resolved: ResolvedThemeMode) => React.ReactNode;
}> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>(readStoredMode);
  const systemScheme = useSyncExternalStore(
    mode === "auto" ? subscribeToScheme : subscribeNever,
    getSystemScheme,
    () => "light" as const,
  );

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // storage unavailable (private mode): keep the in-memory choice
    }
  }, []);

  const resolved: ResolvedThemeMode = mode === "auto" ? systemScheme : mode;

  // Keep <html data-theme> (light/dark) and sample-only helpers in sync.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", resolved === "light" ? "light" : "dark");
    root.setAttribute("data-theme-name", resolved);
    const rgb = hexToRgbTriplet(String(themes[resolved]["primary-color"]));
    if (rgb) root.style.setProperty("--primary-rgb", rgb);
  }, [resolved]);

  const value = useMemo(
    () => ({ mode, setMode, resolved }),
    [mode, setMode, resolved],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      {children(resolved)}
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = (): ThemeModeContextValue => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx)
    throw new Error("useThemeMode must be used within ThemeModeProvider");
  return ctx;
};
