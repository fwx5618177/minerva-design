/**
 * @novel-isr/ui theme API on top of Minerva's ConfigProvider.
 */
import type { HTMLAttributes, ReactNode } from "react";
import { ThemeProvider as MinervaThemeProvider } from "../contexts/ThemeProvider";
import { useTheme as useMinervaTheme } from "../contexts/ThemeProvider";
import { ThemeToggle as MinervaThemeToggle } from "../components/ThemeToggle";
import { PaletteToggle as MinervaPaletteToggle } from "../components/ThemeToggle";
import type { Locale } from "../contexts/types";
import {
  DEFAULT_PALETTE,
  type Palette,
  type ResolvedTheme,
  type Theme,
} from "./theme-utils";

export { useDisclosure } from "../hooks/useDisclosure";
export type {
  UseDisclosureProps,
  UseDisclosureReturn,
} from "../hooks/useDisclosure";
export { cn } from "../utils/cn";

interface ThemeProviderProps {
  defaultTheme?: Theme;
  defaultPalette?: Palette;
  disableStorage?: boolean;
  /** Minerva extension: language of lib-core's built-in texts. */
  locale?: Locale;
  children: ReactNode;
}

export function ThemeProvider({
  defaultTheme = "system",
  defaultPalette = DEFAULT_PALETTE,
  disableStorage = false,
  locale,
  children,
}: ThemeProviderProps) {
  return (
    <MinervaThemeProvider
      defaultTheme={defaultTheme}
      defaultPalette={defaultPalette}
      disableStorage={disableStorage}
      locale={locale}
    >
      {children}
    </MinervaThemeProvider>
  );
}

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  palette: Palette;
  setTheme: (theme: Theme) => void;
  setPalette: (palette: Palette) => void;
}

export function useTheme(): ThemeContextValue {
  const ctx = useMinervaTheme();
  return { ...ctx, palette: ctx.palette ?? DEFAULT_PALETTE };
}

const THEME_LABELS: Record<Theme, string> = {
  light: "亮",
  dark: "暗",
  system: "跟随",
};

export interface ThemeToggleProps extends HTMLAttributes<HTMLDivElement> {
  showSystem?: boolean;
  labels?: Partial<Record<Theme, string>>;
}

export function ThemeToggle({ labels, ...rest }: ThemeToggleProps) {
  const { resolvedTheme } = useMinervaTheme();
  return (
    <MinervaThemeToggle
      aria-label={`当前主题 ${resolvedTheme}`}
      labels={{ ...THEME_LABELS, ...labels }}
      {...rest}
    />
  );
}

const PALETTE_LABELS: Record<Palette, string> = {
  editorial: "文学",
  tech: "科技",
  graphite: "石墨灰",
  cool: "冷灰蓝",
};

export interface PaletteToggleProps extends HTMLAttributes<HTMLDivElement> {
  labels?: Partial<Record<Palette, string>>;
  palettes?: Palette[];
}

export function PaletteToggle({
  labels,
  palettes = ["editorial", "tech"],
  ...rest
}: PaletteToggleProps) {
  const { palette } = useTheme();
  return (
    <MinervaPaletteToggle
      aria-label={`当前色身 ${palette}`}
      palettes={palettes}
      labels={{ ...PALETTE_LABELS, ...labels }}
      {...rest}
    />
  );
}
