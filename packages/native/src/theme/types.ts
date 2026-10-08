import type { ReactNode } from "react";
import type {
  ComponentTheme,
  Density,
  DesignPreset,
  FontScale,
  Messages,
  Palette,
  RadiusScale,
  ResolvedDesign,
  ResolvedThemeMode,
  ResolvedTokens,
  ShadowScale,
  SupportedLanguage,
  ThemeMode,
  TokenValue,
  TranslateFunction,
} from "@minerva/core";

/** Safe-area insets (status bar, notch, home indicator), in dp */
export interface EdgeInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/** Locale settings of the built-in texts */
export interface NativeLocale {
  /**
   * Language of the built-in texts (close / cancel labels, pagination,
   * validation messages...)
   * @default "en"
   */
  language?: SupportedLanguage;
  /** Extra / overriding messages, merged over the built-in ones */
  messages?: Messages;
}

/** Font families loaded by the app (e.g. with `expo-font`) */
export interface NativeFonts {
  /** Body text (`fontFamily` of every text) @default the platform font */
  sans?: string;
  /** Code and tabular numbers @default the platform monospace font */
  mono?: string;
}

/** Props of `MinervaProvider` (alias `ConfigProvider`) */
export interface MinervaProviderProps {
  /**
   * Color mode: "light", "dark", or "system" (follows the OS appearance
   * through `useColorScheme`). Same values as the web `ConfigProvider` modes.
   * Uncontrolled after the first render: change it with `setThemeMode`
   * (`useTheme()`) or by passing a new value.
   * @default "system"
   */
  theme?: ThemeMode;
  /**
   * Built-in palette ("editorial", "tech", "graphite", "cool"); `null` keeps
   * Minerva's default look
   * @default the preset's palette (`null` for "minerva" / "touch")
   */
  palette?: Palette | null;
  /**
   * Design preset: "minerva" (default look), "editorial", "compact" or
   * "touch" (consumer mobile apps: comfortable density, 44pt touch targets,
   * large radius)
   * @default "touch"
   */
  preset?: DesignPreset;
  /** Spacing density of controls and rows @default the preset's */
  density?: Density;
  /** Corner radius scale @default the preset's */
  radius?: RadiusScale;
  /** Elevation shadow scale @default the preset's */
  shadow?: ShadowScale;
  /** Type scale @default the preset's */
  fontScale?: FontScale;
  /**
   * Token overrides (names without `--`, e.g. `{ "primary-color": "#e11d48" }`),
   * applied over the mode / palette / design; may reference other tokens
   * (`var(--x)`) and use `color-mix()`
   */
  overrides?:
    Readonly<Record<string, TokenValue | undefined>> | Partial<ComponentTheme>;
  /** Language and extra messages of the built-in texts @default { language: "en" } */
  locale?: NativeLocale;
  /**
   * Safe-area insets used by toasts, popups, action sheets and the nav /
   * tab bars. Pass `useSafeAreaInsets()` of `react-native-safe-area-context`
   * @default { top: StatusBar height on Android, else 0, right: 0, bottom: 0, left: 0 }
   */
  insets?: Partial<EdgeInsets>;
  /** Font families loaded by the app @default the platform fonts */
  fonts?: NativeFonts;
  /**
   * Instant transitions. Follows the OS "Reduce motion" setting when unset
   * @default the OS setting
   */
  reducedMotion?: boolean;
  /** Called when the color mode changes (`setThemeMode`, ThemeToggle) */
  onThemeChange?: (theme: ThemeMode) => void;
  /** Called when the palette changes (`setPalette`) */
  onPaletteChange?: (palette: Palette | null) => void;
  /** Application content */
  children?: ReactNode;
}

/** Value of `useTheme()` */
export interface MinervaTheme {
  /** Every design token as a concrete value (`resolveTokens` output) */
  tokens: ResolvedTokens;
  /** Shortcut for `tokens.colors` */
  colors: ResolvedTokens["colors"];
  /** Mode chosen ("system" follows the OS) */
  themeMode: ThemeMode;
  /** Mode applied */
  mode: ResolvedThemeMode;
  /** Active palette (`null`: default look) */
  palette: Palette | null;
  /** Applied design axes and their preset */
  design: ResolvedDesign;
  /** Instant transitions */
  reducedMotion: boolean;
  /** Font families of the app */
  fonts: NativeFonts;
  /** Changes the color mode */
  setThemeMode: (mode: ThemeMode) => void;
  /** Changes the palette */
  setPalette: (palette: Palette | null) => void;
  /** Changes the design preset (resets the axes to the preset's) */
  setPreset: (preset: DesignPreset) => void;
}

/** Value of `useI18n()` */
export interface MinervaI18n {
  /** Translates a message key (`modal.close`, `pagination.next`...) */
  t: TranslateFunction;
  language: SupportedLanguage;
}
