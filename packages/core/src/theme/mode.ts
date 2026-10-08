// Theme mode and palette names: the two orthogonal axes of the theme model,
// shared by every renderer (web, React Native, mini-programs). Pure data and
// guards; the web-only cookie helpers and no-flash init script live in
// `@minerva/dom` (theme/cookies.ts).

/** Color mode chosen by the user ("system" follows the OS). */
export type ThemeMode = "light" | "dark" | "system";

/** Color mode actually applied. */
export type ResolvedThemeMode = "light" | "dark";

/** Built-in palettes (orthogonal to the light / dark mode). */
export const PALETTES = ["editorial", "tech", "graphite", "cool"] as const;

/** A built-in palette name. */
export type Palette = (typeof PALETTES)[number];

export const isThemeMode = (value: unknown): value is ThemeMode =>
  value === "light" || value === "dark" || value === "system";

export const isPalette = (value: unknown): value is Palette =>
  typeof value === "string" && (PALETTES as readonly string[]).includes(value);
