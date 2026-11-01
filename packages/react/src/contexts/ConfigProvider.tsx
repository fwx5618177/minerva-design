import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type {
  ComponentTheme,
  ConfigContextProps,
  ConfigContextProviderProps,
  ConfigProviderThemeProps,
  DefaultTheme,
  Locale,
  ThemeMap,
} from "./types";
import { DEFAULT_LANGUAGE, getLanguage, setLanguage } from "../config/i18n";
import {
  THEME_SCOPE_ATTRIBUTE,
  ThemeScopeContext,
  type ThemeScope,
} from "../internal/themeScope";
import { warnOnce } from "../internal/devWarnings";
import {
  designAttributes,
  formatDevMessage,
  invalidPrimaryColorMessage,
  palettes,
  presetPalette,
  resolveDesign,
  resolvePrimaryColor,
  isPalette,
  type Palette,
  type PrimaryColorPair,
  type ResolvedDesign,
  type ResolvedThemeMode,
  type ThemeMode,
} from "@minerva/core";
import {
  PALETTE_COOKIE_NAME,
  THEME_COOKIE_NAME,
  applyDesignAttributes,
  generateCSSVariables,
  getSystemTheme,
  isBilingualTheme,
  parsePaletteCookie,
  parseThemeCookie,
  primaryColorCss,
  primaryColorTheme,
  readCookieValue,
  resolveTheme,
  serializeThemeCookie,
} from "@minerva/dom";

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

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Theme tokens as inline CSS custom properties (`--<key>`). */
const themeVariables = (theme: ComponentTheme | ThemeMap) =>
  Object.fromEntries(
    Object.entries(theme)
      .filter(
        ([, value]) => value !== undefined && value !== null && value !== "",
      )
      .map(([key, value]) => [`--${key}`, String(value)]),
  ) as React.CSSProperties;

const setAttribute = (
  element: HTMLElement,
  name: string,
  value: string | null | undefined,
) => {
  if (value === null || value === undefined) element.removeAttribute(name);
  else element.setAttribute(name, value);
};

const DESIGN_ATTRIBUTE_NAMES = [
  "data-density",
  "data-radius",
  "data-shadow",
  "data-font-scale",
];

/**
 * Global configuration: theme (+ palette), design axes (preset, density,
 * radius, shadow, font scale), and the language of the React library's built-in texts.
 *
 * Root provider (no `ConfigProvider` above it) - owns the document:
 * - `data-theme` (resolved light / dark) and `color-scheme` on `<html>`
 * - with a `palette` and a light / dark / system theme: `data-palette` on
 *   `<html>`, tokens come from the palette blocks of `style.css`
 * - otherwise the theme's tokens are written as inline CSS variables
 * - with a `primaryColor`: the brand tokens of the resolved mode as inline
 *   CSS variables (over the theme / palette ones), plus a `<style>` element
 *   with both modes' values (keyed on `data-theme`) so server-rendered
 *   markup has the brand color before hydration
 * - the design axes that differ from the standard look: `data-density`,
 *   `data-radius`, `data-shadow`, `data-font-scale` on `<html>`
 * - the `theme` / `palette` cookies (`persist`) and the React library's global language
 * Everything it wrote on `<html>` is restored when it unmounts.
 *
 * Nested provider - never touches `<html>`, cookies or the global language.
 * It inherits every setting it does not override from its parent. When it
 * overrides `theme`, `palette` and / or a design axis, they are applied to its
 * subtree only: a `display: contents` wrapper element carries `data-theme` /
 * `data-palette` / the design attributes / the tokens, and portalled content (Modal, Popover, Select, Toast...) is
 * rendered into a matching scope container on `document.body`. An overridden
 * `locale` only applies to the components of its subtree.
 */
export const ConfigProvider: React.FC<ConfigContextProviderProps> = ({
  theme: themeProp,
  palette: paletteProp,
  primaryColor: primaryColorProp,
  persist = false,
  onThemeChange,
  onPaletteChange,
  locale,
  preset,
  density,
  radius,
  shadow,
  fontScale,
  children,
}) => {
  const parentScope = useContext(ThemeScopeContext);
  const parent = useContext(ConfigContext);
  const isRoot = parentScope === null;
  // A preset brings its palette unless one is given
  const paletteInput =
    paletteProp !== undefined
      ? paletteProp
      : preset !== undefined
        ? presetPalette(preset)
        : undefined;
  const ownsTheme = isRoot || themeProp !== undefined;
  const ownsPalette = isRoot || paletteInput !== undefined;
  const ownBrand = resolvePrimaryColor(primaryColorProp);
  if (process.env.NODE_ENV !== "production") {
    if (ownBrand === undefined) {
      warnOnce(
        `ConfigProvider:primaryColor:${JSON.stringify(primaryColorProp)}`,
        formatDevMessage(
          "ConfigProvider",
          invalidPrimaryColorMessage(primaryColorProp),
        ),
      );
    }
  }
  // an invalid brand color is ignored (inherited, like an unset one)
  const ownsBrand =
    isRoot || (primaryColorProp !== undefined && ownBrand !== undefined);
  const ownsDesign =
    isRoot ||
    preset !== undefined ||
    density !== undefined ||
    radius !== undefined ||
    shadow !== undefined ||
    fontScale !== undefined;
  // a nested provider overriding the theme, palette or design of its subtree
  const scoped =
    !isRoot && (ownsTheme || ownsPalette || ownsDesign || ownsBrand);

  // Design axes: unset ones follow the parent (a nested preset resets them)
  const parentDesign = isRoot ? undefined : parent?.design;
  const design = useMemo<ResolvedDesign>(
    () =>
      resolveDesign(
        { preset, density, radius, shadow, fontScale },
        parentDesign,
      ),
    [preset, density, radius, shadow, fontScale, parentDesign],
  );

  const [themeState, setThemeState] = useState<ConfigProviderThemeProps>(
    themeProp ?? "auto",
  );
  const [paletteState, setPaletteState] = useState<Palette | null>(
    paletteInput ?? null,
  );

  // Follow new props (adjusting state while rendering avoids a stale render)
  const [prevThemeProp, setPrevThemeProp] = useState(themeProp);
  if (themeProp !== prevThemeProp) {
    setPrevThemeProp(themeProp);
    setThemeState(themeProp ?? "auto");
  }
  const [prevPaletteProp, setPrevPaletteProp] = useState(paletteInput);
  if (paletteInput !== prevPaletteProp) {
    setPrevPaletteProp(paletteInput);
    setPaletteState(paletteInput ?? null);
  }

  // Settings that are not overridden follow the parent provider
  const theme: ConfigProviderThemeProps = ownsTheme
    ? themeState
    : (parent?.theme ?? "auto");
  const palette: Palette | null = ownsPalette
    ? paletteState
    : (parent?.palette ?? null);

  const followsSystem = themeModeOf(theme) === "system";
  const systemTheme = useSyncExternalStore<DefaultTheme>(
    followsSystem ? subscribeToScheme : subscribeNever,
    getSystemTheme,
    getServerTheme,
  );

  // Cookies are only readable in the browser and must not seed the initial
  // state (the server cannot see them -> hydration mismatch), so restore them
  // once after hydration. A no-op when the server already passed the values.
  // Only the root provider persists.
  const rootThemeProp = themeProp ?? "auto";
  const rootPaletteProp = paletteInput ?? null;
  const persistedFor = useRef<string | null>(null);
  useEffect(() => {
    if (!isRoot || !persist) return;
    const key = `${String(themeModeOf(rootThemeProp))}|${rootPaletteProp}`;
    if (persistedFor.current === key) return;
    persistedFor.current = key;
    const storedTheme = readCookie(THEME_COOKIE_NAME);
    const storedPalette = readCookie(PALETTE_COOKIE_NAME);
    /* eslint-disable react-hooks/set-state-in-effect -- one-time sync with the browser cookie after hydration */
    if (storedTheme !== undefined && themeModeOf(rootThemeProp) !== undefined) {
      const mode = parseThemeCookie(storedTheme, themeModeOf(rootThemeProp));
      setThemeState(
        mode === "system" && themeModeOf(rootThemeProp) === "system"
          ? rootThemeProp
          : mode,
      );
    }
    if (storedPalette !== undefined) {
      setPaletteState(parsePaletteCookie(storedPalette, rootPaletteProp));
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [isRoot, persist, rootThemeProp, rootPaletteProp]);

  const resolvedMode = resolvedModeOf(theme, systemTheme);
  const activePalette = palette && supportsPalette(theme) ? palette : null;

  // Brand color: own (root: none unless set) or the parent's, as a stable pair
  const brandInput: PrimaryColorPair | null = ownsBrand
    ? (ownBrand ?? null)
    : (parent?.primaryColor ?? null);
  const brandLight = brandInput?.light;
  const brandDark = brandInput?.dark;
  const brand = useMemo<PrimaryColorPair | null>(
    () =>
      brandLight && brandDark ? { light: brandLight, dark: brandDark } : null,
    [brandLight, brandDark],
  );

  // Inline tokens of <html> / the scope: the theme's (none with a palette:
  // they come from the stylesheet), then the brand color of the applied mode
  // (custom theme objects without a mode use the light value)
  const inlineTheme = useMemo<ThemeMap>(() => {
    const base = activePalette
      ? undefined
      : (resolveTheme(theme, systemTheme) as ThemeMap);
    if (!brand) return base ?? ({} as ThemeMap);
    const brandMode = resolvedMode ?? "light";
    return {
      ...base,
      ...primaryColorTheme(
        brand,
        brandMode,
        activePalette ? palettes[activePalette][brandMode] : base,
      ),
    } as ThemeMap;
  }, [activePalette, theme, systemTheme, brand, resolvedMode]);

  // Root brand color as a style sheet (both modes, keyed on `data-theme`):
  // part of the server-rendered markup, so there is no flash of the default
  // primary color before hydration. Independent of the system scheme (the
  // server cannot know it), so it hydrates as-is.
  const rootBrandCss = useMemo(
    () =>
      isRoot && brand
        ? primaryColorCss(brand, {
            base: {
              light: activePalette
                ? palettes[activePalette].light
                : (resolveTheme(theme, "light") as ThemeMap),
              dark: activePalette
                ? palettes[activePalette].dark
                : (resolveTheme(theme, "dark") as ThemeMap),
            },
          })
        : undefined,
    [isRoot, brand, activePalette, theme],
  );

  // Root: remember what <html> looked like before, and restore it on unmount.
  // (Declared before the effect below so it runs first.)
  useEffect(() => {
    if (!isRoot) return;
    const root = document.documentElement;
    const initialTheme = root.getAttribute("data-theme");
    const initialPalette = root.getAttribute("data-palette");
    const initialScheme = root.style.getPropertyValue("color-scheme");
    const initialDesign = DESIGN_ATTRIBUTE_NAMES.map(
      (name) => [name, root.getAttribute(name)] as const,
    );
    return () => {
      setAttribute(root, "data-theme", initialTheme);
      setAttribute(root, "data-palette", initialPalette);
      for (const [name, value] of initialDesign) {
        setAttribute(root, name, value);
      }
      if (initialScheme) root.style.setProperty("color-scheme", initialScheme);
      else root.style.removeProperty("color-scheme");
      generateCSSVariables(root.style, {} as ThemeMap);
      if (!root.getAttribute("style")) root.removeAttribute("style");
    };
  }, [isRoot]);

  // Root: apply the theme to <html>
  useEffect(() => {
    if (!isRoot) return;
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
    } else {
      delete root.dataset.palette;
    }
    // Palette tokens come from the stylesheet: only the theme's (without a
    // palette) and the brand color's are inline
    generateCSSVariables(root.style, inlineTheme);
  }, [isRoot, resolvedMode, activePalette, inlineTheme]);

  // Root: apply the design axes to <html> (standard values are omitted)
  useEffect(() => {
    if (!isRoot) return;
    applyDesignAttributes(document.documentElement, design);
  }, [isRoot, design]);

  // Scope element / portal host: every axis, so "standard" can be restored
  const scopeDesignAttributes = useMemo(
    () => (scoped ? designAttributes(design, { all: true }) : undefined),
    [scoped, design],
  );

  // Language: the root provider sets the React library's global language (also used by
  // imperative APIs such as `message`), nested ones only their subtree.
  const language =
    locale?.language ??
    (isRoot ? undefined : parent?.locale?.language) ??
    DEFAULT_LANGUAGE;
  const scopeLanguage =
    !isRoot && locale?.language ? locale.language : parentScope?.language;

  useEffect(() => {
    if (!isRoot) return;
    const initialLanguage = getLanguage();
    return () => {
      setLanguage(initialLanguage);
    };
  }, [isRoot]);

  useEffect(() => {
    if (!isRoot) return;
    setLanguage(language);
  }, [isRoot, language]);

  // Scoped theme: tokens / attributes of the subtree
  const scopeVariables = useMemo(
    () => (scoped ? themeVariables(inlineTheme) : undefined),
    [scoped, inlineTheme],
  );

  // Portal container of a scoped provider: carries the same scope attributes
  // and tokens so portalled content gets the scoped theme.
  const [portalHost, setPortalHost] = useState<HTMLElement | null>(null);
  useIsomorphicLayoutEffect(() => {
    if (!scoped) return;
    const host = document.createElement("div");
    host.setAttribute("data-minerva-portal-host", "");
    host.setAttribute(THEME_SCOPE_ATTRIBUTE, "");
    host.style.display = "contents";
    document.body.appendChild(host);
    setPortalHost(host);
    return () => {
      host.remove();
      setPortalHost(null);
    };
  }, [scoped]);

  useIsomorphicLayoutEffect(() => {
    if (!portalHost) return;
    setAttribute(portalHost, "data-theme", resolvedMode);
    setAttribute(portalHost, "data-palette", activePalette);
    applyDesignAttributes(portalHost, design, { all: true });
    if (resolvedMode)
      portalHost.style.setProperty("color-scheme", resolvedMode);
    else portalHost.style.removeProperty("color-scheme");
    generateCSSVariables(portalHost.style, inlineTheme);
  }, [portalHost, resolvedMode, activePalette, inlineTheme, design]);

  const onThemeChangeRef = useRef(onThemeChange);
  const onPaletteChangeRef = useRef(onPaletteChange);
  useEffect(() => {
    onThemeChangeRef.current = onThemeChange;
    onPaletteChangeRef.current = onPaletteChange;
  });

  const parentSetTheme = parent?.setTheme;
  const parentSetPalette = parent?.setPalette;

  const setTheme = useCallback(
    (next: ConfigProviderThemeProps) => {
      // Not overridden here: the theme belongs to the parent provider
      if (!ownsTheme) {
        parentSetTheme?.(next);
        return;
      }
      setThemeState(next);
      const mode = themeModeOf(next);
      if (isRoot && persist && mode && typeof next === "string") {
        writeCookie(THEME_COOKIE_NAME, mode);
      }
      onThemeChangeRef.current?.(next);
    },
    [ownsTheme, parentSetTheme, isRoot, persist],
  );

  const setPalette = useCallback(
    (next: Palette | null) => {
      if (!ownsPalette) {
        parentSetPalette?.(next);
        return;
      }
      const value = isPalette(next) ? next : null;
      setPaletteState(value);
      if (isRoot && persist) writeCookie(PALETTE_COOKIE_NAME, value);
      onPaletteChangeRef.current?.(value);
    },
    [ownsPalette, parentSetPalette, isRoot, persist],
  );

  const currentLocale = useMemo<Locale>(() => ({ language }), [language]);

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
      primaryColor: brand,
      design,
      setTheme,
      setPalette,
    }),
    [
      theme,
      systemTheme,
      currentLocale,
      resolvedMode,
      palette,
      brand,
      design,
      setTheme,
      setPalette,
    ],
  );

  const portalContainer = scoped
    ? portalHost
    : (parentScope?.portalContainer ?? null);
  const scope = useMemo<ThemeScope>(
    () => ({
      scoped: scoped || (parentScope?.scoped ?? false),
      portalContainer,
      language: scopeLanguage,
    }),
    [scoped, parentScope, portalContainer, scopeLanguage],
  );

  return (
    <ThemeScopeContext.Provider value={scope}>
      <ConfigContext.Provider value={value}>
        {scoped ? (
          <div
            {...{ [THEME_SCOPE_ATTRIBUTE]: "" }}
            data-theme={resolvedMode}
            data-palette={activePalette ?? undefined}
            {...scopeDesignAttributes}
            style={{
              display: "contents",
              colorScheme: resolvedMode,
              ...scopeVariables,
            }}
          >
            {children}
          </div>
        ) : (
          <>
            {rootBrandCss && (
              <style data-minerva-primary-color="">{rootBrandCss}</style>
            )}
            {children}
          </>
        )}
      </ConfigContext.Provider>
    </ThemeScopeContext.Provider>
  );
};
