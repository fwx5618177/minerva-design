/**
 * Server-safe utilities (`minerva-design/utils`): the plain functions and
 * data of `minerva-design` that are not components. The main entry is a
 * `"use client"` module, so in React Server Components its non-component
 * exports are client references (calling a function throws, data objects are
 * empty proxies); import them from here instead. No `"use client"` banner,
 * no React: this entry only re-exports `@minerva/core`.
 *
 *   import { cn, themes, resolveTheme } from "minerva-design/utils";
 */
import { computeFixedColumnLayout as computeLayout } from "@minerva/core";
import type { FixedColumnLayout, TableColumn } from "./components/Table/types";

export {
  cn,
  dark,
  githubDark,
  light,
  matchesShortcut,
  normalizeShortcuts,
  palettes,
  themes,
} from "@minerva/core";
export {
  applyThemeStyles,
  generateCSSVariables,
  getSystemTheme,
  isBilingualTheme,
  resolveTheme,
} from "@minerva/dom";
export type { ClassDictionary, ClassValue, ColorScheme } from "@minerva/core";
export { previewDocument } from "./components/HtmlPreview/previewDocument";

/** Sticky offsets of the fixed columns of a `Table` (same as the main entry's). */
export function computeFixedColumnLayout<T>(
  columns: readonly TableColumn<T>[],
): FixedColumnLayout {
  return computeLayout(columns);
}
