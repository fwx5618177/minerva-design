import type { HTMLAttributes, Ref } from "react";
import type { Palette, ThemeMode } from "../../theme-utils";

export interface ThemeToggleProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Show the "system" (follow the OS) option
   * @default true
   */
  showSystem?: boolean;
  /** Override the button labels (defaults come from the React library's locale) */
  labels?: Partial<Record<ThemeMode, string>>;
  /** Ref to the group element */
  ref?: Ref<HTMLDivElement>;
}

export interface PaletteToggleProps extends HTMLAttributes<HTMLDivElement> {
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
  /** Ref to the group element */
  ref?: Ref<HTMLDivElement>;
}
