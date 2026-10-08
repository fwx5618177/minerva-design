/**
 * Server-safe utilities (`@minerva/lib-core/utils`): the plain functions and
 * data of `@minerva/lib-core` that are not components. The main entry is a
 * `"use client"` module, so in React Server Components its non-component
 * exports are client references (calling a function throws, data objects are
 * empty proxies); import them from here instead. No `"use client"` banner,
 * no React: this entry only re-exports `@minerva/core`.
 *
 *   import { cn, themes, resolveTheme } from "@minerva/lib-core/utils";
 */
import { computeFixedColumnLayout as computeLayout } from "@minerva/core";
import type { FixedColumnLayout, TableColumn } from "./components/Table/types";

export {
  applyThemeStyles,
  cn,
  dark,
  generateCSSVariables,
  getSystemTheme,
  githubDark,
  isBilingualTheme,
  light,
  matchesShortcut,
  normalizeShortcuts,
  palettes,
  resolveTheme,
  themes,
} from "@minerva/core";
export type { ClassDictionary, ClassValue, ColorScheme } from "@minerva/core";

/** Sticky offsets of the fixed columns of a `Table` (same as the main entry's). */
export function computeFixedColumnLayout<T>(
  columns: readonly TableColumn<T>[],
): FixedColumnLayout {
  return computeLayout(columns);
}
