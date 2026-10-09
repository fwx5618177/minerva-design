import { inject, type ComputedRef } from "vue";
import type { Palette, ThemeMode } from "@minerva/core";
export interface MiniThemeContext {
  mode: ComputedRef<ThemeMode>;
  palette: ComputedRef<Palette | null>;
  setTheme: (mode: ThemeMode) => void;
  setPalette: (palette: Palette | null) => void;
}
export function useTheme() {
  const context = inject<MiniThemeContext>("minerva:theme");
  if (!context) throw new Error("useTheme requires a ThemeProvider");
  return context;
}
export function useOptionalTheme() {
  return inject<MiniThemeContext | undefined>("minerva:theme", undefined);
}
