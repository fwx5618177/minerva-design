import type { Palette, ThemeMode } from "@minerva/core";

/** Props of `ThemeToggle` (same names and defaults as React). */
export interface ThemeToggleProps {
  /**
   * Show the "system" (follow the OS) option
   * @default true
   */
  showSystem?: boolean;
  /** Override the button labels (defaults come from the library's locale) */
  labels?: Partial<Record<ThemeMode, string>>;
}

/** Props of `PaletteToggle` (same names and defaults as React). */
export interface PaletteToggleProps {
  /**
   * Palettes offered, in order
   * @default ["editorial", "tech", "graphite", "cool"]
   */
  palettes?: Palette[];
  /**
   * Also offer Minerva's default look (no palette) as the first option
   * @default false
   */
  showDefault?: boolean;
  /** Override the button labels (`default` labels the no-palette option) */
  labels?: Partial<Record<Palette | "default", string>>;
}
