import { createContext, useContext, useState, useEffect, useRef } from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import {
  miniTokenClassNames,
  cn,
  isThemeMode,
  isPalette,
  type Palette,
  type DesignOptions,
  type ThemeMode,
  type ResolvedThemeMode,
  type ComponentTheme,
  type SupportedLanguage,
  resolveTokens,
  githubDark,
  createTranslator,
  messages,
  isSupportedLanguage,
} from "@minerva/core";
import { Button } from "./components";
import type { NativeProps } from "./shared";
export type { ThemeMode } from "@minerva/core";
export type ConfigProviderTheme =
  | ThemeMode
  | "auto"
  | "github-dark"
  | Partial<ComponentTheme>
  | { light: Partial<ComponentTheme>; dark: Partial<ComponentTheme> };
export type Locale = { language?: SupportedLanguage };
interface ThemeContextValue {
  tokens: ReturnType<typeof resolveTokens>;
  definition: ConfigProviderTheme;
  theme: ThemeMode;
  resolvedTheme: ResolvedThemeMode;
  setTheme: (theme: ThemeMode) => void;
  palette: Palette | null;
  setPalette: (palette: Palette | null) => void;
  design: DesignOptions;
  setDesign: (design: DesignOptions) => void;
  locale: string;
}
const ThemeContext = createContext<ThemeContextValue | null>(null);
export interface ConfigProviderProps extends NativeProps, DesignOptions {
  theme?: ConfigProviderTheme;
  palette?: Palette | null;
  locale?: string | Locale;
  design?: DesignOptions;
  persist?: boolean;
  onThemeChange?: (theme: ThemeMode) => void;
  onPaletteChange?: (palette: Palette | null) => void;
}
function readPreference(key: string) {
  try {
    return Taro.getStorageSync(key);
  } catch {
    return undefined;
  }
}
function systemTheme(): ResolvedThemeMode {
  try {
    return Taro.getSystemInfoSync().theme === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}
export function ConfigProvider({
  theme,
  palette,
  locale,
  design,
  preset,
  density,
  radius,
  shadow,
  fontScale,
  children,
  persist = false,
  onThemeChange,
  onPaletteChange,
  ...props
}: ConfigProviderProps) {
  const parent = useContext(ThemeContext);
  const canPersist = persist && !parent;
  const [definition, setDefinition] = useState<ConfigProviderTheme>(() => {
    const stored = canPersist ? readPreference("minerva-theme") : undefined;
    return isThemeMode(stored)
      ? stored
      : (theme ?? parent?.definition ?? "light");
  });
  const [currentPalette, setPaletteState] = useState<Palette | null>(() => {
    const stored = canPersist ? readPreference("minerva-palette") : undefined;
    return isPalette(stored)
      ? stored
      : palette === undefined
        ? (parent?.palette ?? null)
        : palette;
  });
  const [system, setSystem] = useState(systemTheme),
    [overrides, setDesign] = useState<DesignOptions>({});
  const mode: ThemeMode =
    typeof definition === "string"
      ? definition === "auto"
        ? "system"
        : definition === "github-dark"
          ? "dark"
          : definition
      : "light" in definition && "dark" in definition
        ? "system"
        : (parent?.theme ?? "light");
  const previousTheme = useRef([theme, parent?.definition]);
  useEffect(() => {
    if (
      previousTheme.current[0] === theme &&
      previousTheme.current[1] === parent?.definition
    )
      return;
    previousTheme.current = [theme, parent?.definition];
    if (theme !== undefined) setDefinition(theme);
    else if (parent) setDefinition(parent.definition);
  }, [theme, parent?.definition]);
  const previousPalette = useRef([palette, parent?.palette]);
  useEffect(() => {
    if (
      previousPalette.current[0] === palette &&
      previousPalette.current[1] === parent?.palette
    )
      return;
    previousPalette.current = [palette, parent?.palette];
    if (palette !== undefined) setPaletteState(palette);
    else if (parent) setPaletteState(parent.palette);
  }, [palette, parent?.palette]);
  useEffect(() => {
    if (mode !== "system") return;
    const listener = (event: { theme: "light" | "dark" }) =>
      setSystem(event.theme);
    Taro.onThemeChange?.(listener);
    return () => Taro.offThemeChange?.(listener);
  }, [mode]);
  const options = {
    ...parent?.design,
    ...design,
    ...(preset ? { preset } : {}),
    ...(density ? { density } : {}),
    ...(radius ? { radius } : {}),
    ...(shadow ? { shadow } : {}),
    ...(fontScale ? { fontScale } : {}),
    ...overrides,
  };
  const resolved = mode === "system" ? system : mode;
  const custom =
    typeof definition === "object"
      ? "light" in definition && "dark" in definition
        ? definition[resolved]
        : definition
      : definition === "github-dark"
        ? githubDark
        : undefined;
  const tokens = resolveTokens({
    mode: resolved,
    palette: currentPalette,
    design: options,
    overrides: custom,
  });
  const customStyle = custom
    ? Object.fromEntries(
        Object.entries(tokens.css).map(([key, value]) => [`--${key}`, value]),
      )
    : {};
  const setTheme = (next: ThemeMode) => {
    setDefinition(next);
    onThemeChange?.(next);
    if (canPersist)
      try {
        Taro.setStorageSync("minerva-theme", next);
      } catch {
        /* Storage may be unavailable on the host. */
      }
  };
  const setPalette = (next: Palette | null) => {
    setPaletteState(next);
    onPaletteChange?.(next);
    if (canPersist)
      try {
        Taro.setStorageSync("minerva-palette", next);
      } catch {
        /* Storage may be unavailable on the host. */
      }
  };
  return (
    <ThemeContext.Provider
      value={{
        tokens,
        definition,
        theme: mode,
        resolvedTheme: resolved,
        setTheme,
        palette: currentPalette,
        setPalette,
        design: options,
        setDesign,
        locale:
          (typeof locale === "string" ? locale : locale?.language) ??
          parent?.locale ??
          "en",
      }}
    >
      <View
        {...props}
        style={{ ...customStyle, ...props.style }}
        data-minerva="config-provider"
        data-theme={resolved}
        data-mode={mode}
        className={cn(
          miniTokenClassNames({
            mode: resolved,
            palette: currentPalette,
            design: options,
          }),
          props.className,
        )}
      >
        {children}
      </View>
    </ThemeContext.Provider>
  );
}
export interface ThemeProviderProps extends NativeProps {
  defaultTheme?: ThemeMode;
  defaultPalette?: Palette | null;
  disableStorage?: boolean;
  locale?: string | Locale;
  onThemeChange?: (theme: ThemeMode) => void;
  onPaletteChange?: (palette: Palette | null) => void;
}
export function ThemeProvider({
  defaultTheme,
  defaultPalette,
  children,
  locale,
  disableStorage = false,
  onThemeChange,
  onPaletteChange,
}: ThemeProviderProps) {
  const parent = useContext(ThemeContext);
  return (
    <ConfigProvider
      theme={defaultTheme ?? (parent ? undefined : "system")}
      palette={defaultPalette}
      persist={!disableStorage}
      locale={locale}
      onThemeChange={onThemeChange}
      onPaletteChange={onPaletteChange}
    >
      {children}
    </ConfigProvider>
  );
}
export function useOptionalTheme() {
  return useContext(ThemeContext);
}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme requires ConfigProvider or ThemeProvider");
  return context;
}
export function ThemeToggle({
  labels,
  showSystem = true,
  ...props
}: NativeProps & {
  showSystem?: boolean;
  labels?: Partial<Record<ThemeMode, string>>;
}) {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();
  const modes: ThemeMode[] = showSystem
    ? ["light", "dark", "system"]
    : ["light", "dark"];
  return (
    <View className={cn("mn-theme-toggle", props.className)}>
      {modes.map((mode) => (
        <Button
          key={mode}
          variant={theme === mode ? "solid" : "ghost"}
          aria-pressed={theme === mode}
          onClick={() => setTheme(mode)}
        >
          {labels?.[mode] ?? t(`themeToggle.${mode}`)}
        </Button>
      ))}
    </View>
  );
}
export function PaletteToggle({
  palettes = ["editorial", "tech", "graphite", "cool"],
  showDefault = false,
  labels,
  ...props
}: NativeProps & {
  palettes?: Palette[];
  showDefault?: boolean;
  labels?: Partial<Record<Palette | "default", string>>;
}) {
  const { palette, setPalette } = useTheme();
  const { t } = useI18n();
  return (
    <View className={cn("mn-palette-toggle", props.className)}>
      {showDefault && (
        <Button
          variant={palette === null ? "solid" : "ghost"}
          onClick={() => setPalette(null)}
        >
          {labels?.default ?? t("paletteToggle.default")}
        </Button>
      )}
      {palettes.map((p) => (
        <Button
          key={p}
          variant={palette === p ? "solid" : "ghost"}
          onClick={() => setPalette(p)}
        >
          {labels?.[p] ?? t(`paletteToggle.${p}`)}
        </Button>
      ))}
    </View>
  );
}
export function PresetToggle({
  presets = ["minerva", "touch"],
  disabled,
  ...props
}: NativeProps & {
  presets?: DesignOptions["preset"][];
  disabled?: boolean;
  size?: string;
}) {
  const { t } = useI18n();
  const { design, setDesign } = useTheme();
  return (
    <View className={cn("mn-preset-toggle", props.className)}>
      {presets.map((p) => (
        <Button
          key={p}
          size={props.size as "small" | "medium" | "large" | undefined}
          aria-pressed={design.preset === p}
          disabled={disabled}
          variant={design.preset === p ? "solid" : "ghost"}
          onClick={() => setDesign({ ...design, preset: p })}
        >
          {t(`presetToggle.${p}`)}
        </Button>
      ))}
    </View>
  );
}

export function useI18n() {
  const context = useContext(ThemeContext);
  const language = isSupportedLanguage(context?.locale) ? context.locale : "en";
  const t = createTranslator({ language, messages });
  return { t, language };
}

/** Concrete theme colors for native image assets that cannot inherit CSS variables. */
export function useThemeTokens() {
  return useContext(ThemeContext)?.tokens ?? resolveTokens();
}
