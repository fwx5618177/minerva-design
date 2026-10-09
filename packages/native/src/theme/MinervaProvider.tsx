import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AccessibilityInfo,
  Platform,
  StatusBar,
  useColorScheme,
} from "react-native";
import {
  DEFAULT_LANGUAGE,
  createTranslator,
  mergeMessages,
  messages as builtInMessages,
  resolveDesign,
  resolveTokens,
  type DesignPreset,
  type Palette,
  type ResolvedDesign,
  type ThemeMode,
} from "@minerva/core";
import type {
  EdgeInsets,
  MinervaI18n,
  MinervaProviderProps,
  MinervaTheme,
} from "./types";

interface MinervaContextValue {
  theme: MinervaTheme;
  i18n: MinervaI18n;
  insets: EdgeInsets;
}

const MinervaContext = createContext<MinervaContextValue | null>(null);

/** Keeps a prop-initialized state in sync when the prop itself changes */
function usePropState<T>(prop: T): [T, (next: T) => void] {
  const [state, setState] = useState(prop);
  const [prev, setPrev] = useState(prop);
  if (!Object.is(prop, prev)) {
    setPrev(prop);
    setState(prop);
  }
  return [state, setState];
}

/** The OS "Reduce motion" setting (false until known) */
function useOsReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    let active = true;
    Promise.resolve(AccessibilityInfo.isReduceMotionEnabled?.())
      .then((value) => {
        if (active) setReduced(!!value);
      })
      .catch(() => {});
    const subscription = AccessibilityInfo.addEventListener?.(
      "reduceMotionChanged",
      (value: boolean) => setReduced(!!value),
    );
    return () => {
      active = false;
      subscription?.remove();
    };
  }, []);
  return reduced;
}

const defaultTopInset = () =>
  Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) : 0;

/**
 * Root of a Minerva React Native app: resolves the design tokens for the
 * color mode (light / dark / system via `useColorScheme`), palette and
 * design preset (`touch` by default: 44pt touch targets), and provides them
 * with the built-in texts (en / zh / ja / fr) and the safe-area insets to
 * every component. Nested providers inherit what they do not set.
 *
 *   <MinervaProvider theme="system" palette="tech" locale={{ language: "zh" }}>
 *     <App />
 *   </MinervaProvider>
 */
export function MinervaProvider({
  theme,
  palette,
  preset,
  density,
  radius,
  shadow,
  fontScale,
  overrides,
  locale,
  insets,
  fonts,
  reducedMotion,
  onThemeChange,
  onPaletteChange,
  children,
}: MinervaProviderProps) {
  const parent = useContext(MinervaContext);
  const scheme = useColorScheme();
  const osReducedMotion = useOsReducedMotion();

  const [themeMode, setThemeModeState] = usePropState<ThemeMode>(
    theme ?? parent?.theme.themeMode ?? "system",
  );
  const [chosenPreset, setChosenPreset] = usePropState<
    DesignPreset | undefined
  >(preset);
  const parentDesign = parent?.theme.design;
  const design: ResolvedDesign = useMemo(
    () =>
      resolveDesign(
        {
          preset: chosenPreset ?? (parentDesign ? undefined : "touch"),
          density,
          radius,
          shadow,
          fontScale,
        },
        parentDesign,
      ),
    [chosenPreset, density, radius, shadow, fontScale, parentDesign],
  );
  const [paletteState, setPaletteState] = usePropState<
    Palette | null | undefined
  >(palette);
  // unset: the parent's palette, else the preset's (resolveTokens default)
  const chosenPalette =
    paletteState !== undefined
      ? paletteState
      : chosenPreset === undefined && parent
        ? parent.theme.palette
        : undefined;

  const mode =
    themeMode === "system" ? (scheme === "dark" ? "dark" : "light") : themeMode;
  const reduced =
    reducedMotion ?? parent?.theme.reducedMotion ?? osReducedMotion;

  const tokens = useMemo(
    () =>
      resolveTokens({
        mode,
        palette: chosenPalette,
        design,
        overrides,
        reducedMotion: reduced,
      }),
    [mode, chosenPalette, design, overrides, reduced],
  );

  const setThemeMode = useCallback(
    (next: ThemeMode) => {
      setThemeModeState(next);
      onThemeChange?.(next);
    },
    [setThemeModeState, onThemeChange],
  );
  const setPalette = useCallback(
    (next: Palette | null) => {
      setPaletteState(next);
      onPaletteChange?.(next);
    },
    [setPaletteState, onPaletteChange],
  );
  const setPreset = useCallback(
    (next: DesignPreset) => {
      setChosenPreset(next);
      // the preset's own palette applies again
      setPaletteState(undefined);
    },
    [setChosenPreset, setPaletteState],
  );

  const parentFonts = parent?.theme.fonts;
  const themeValue: MinervaTheme = useMemo(
    () => ({
      tokens,
      colors: tokens.colors,
      themeMode,
      mode,
      palette: tokens.palette,
      design: tokens.design,
      reducedMotion: reduced,
      fonts: { ...parentFonts, ...fonts },
      setThemeMode,
      setPalette,
      setPreset,
    }),
    [
      tokens,
      themeMode,
      mode,
      reduced,
      parentFonts,
      fonts,
      setThemeMode,
      setPalette,
      setPreset,
    ],
  );

  const language =
    locale?.language ?? parent?.i18n.language ?? DEFAULT_LANGUAGE;
  const extraMessages = locale?.messages;
  const parentI18n = parent?.i18n;
  const i18n: MinervaI18n = useMemo(() => {
    if (!extraMessages && parentI18n?.language === language) {
      return parentI18n;
    }
    const all = extraMessages
      ? {
          ...builtInMessages,
          [language]: mergeMessages(
            builtInMessages[language] ?? {},
            extraMessages,
          ),
        }
      : builtInMessages;
    return {
      t: createTranslator({ messages: all, language }),
      language,
    };
  }, [language, extraMessages, parentI18n]);

  const parentInsets = parent?.insets;
  const top = insets?.top;
  const right = insets?.right;
  const bottom = insets?.bottom;
  const left = insets?.left;
  const insetsValue: EdgeInsets = useMemo(
    () => ({
      top: top ?? parentInsets?.top ?? defaultTopInset(),
      right: right ?? parentInsets?.right ?? 0,
      bottom: bottom ?? parentInsets?.bottom ?? 0,
      left: left ?? parentInsets?.left ?? 0,
    }),
    [top, right, bottom, left, parentInsets],
  );

  const value = useMemo(
    () => ({ theme: themeValue, i18n, insets: insetsValue }),
    [themeValue, i18n, insetsValue],
  );
  return (
    <MinervaContext.Provider value={value}>{children}</MinervaContext.Provider>
  );
}

/** `MinervaProvider` under the name of the web component library */
export const ConfigProvider = MinervaProvider;

let fallback: MinervaContextValue | null = null;

/** Context of components rendered outside `MinervaProvider` (created once) */
function defaultContext(): MinervaContextValue {
  if (!fallback) {
    const tokens = resolveTokens({ design: { preset: "touch" } });
    const noop = () => {};
    fallback = {
      theme: {
        tokens,
        colors: tokens.colors,
        themeMode: "light",
        mode: "light",
        palette: null,
        design: tokens.design,
        reducedMotion: false,
        fonts: {},
        setThemeMode: noop,
        setPalette: noop,
        setPreset: noop,
      },
      i18n: {
        t: createTranslator({
          messages: builtInMessages,
          language: DEFAULT_LANGUAGE,
        }),
        language: DEFAULT_LANGUAGE,
      },
      insets: { top: defaultTopInset(), right: 0, bottom: 0, left: 0 },
    };
  }
  return fallback;
}

/**
 * The context, or a default (light, `touch` preset, English) when a
 * component renders outside `MinervaProvider`.
 */
export function useMinervaContext(): MinervaContextValue {
  return useContext(MinervaContext) ?? defaultContext();
}

/** Theme of the closest `MinervaProvider`: tokens, mode, palette, design, setters */
export const useTheme = (): MinervaTheme => useMinervaContext().theme;

/** Design tokens of the closest `MinervaProvider` (`resolveTokens` output) */
export const useTokens = () => useMinervaContext().theme.tokens;

/** Translator and language of the built-in texts */
export const useI18n = (): MinervaI18n => useMinervaContext().i18n;

/** Safe-area insets given to `MinervaProvider` */
export const useInsets = (): EdgeInsets => useMinervaContext().insets;
