# Theme utilities

Functions and theme objects to resolve, apply and inspect themes outside of ConfigProvider.

Package: minerva-design@1.21.1

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### Reference

ConfigProvider and useAutoTheme are built on these helpers. Use them to apply a theme without React, to theme a single element, or to read token values.

Name

Signature

Resolves a theme and writes it as CSS variables on  (global). Variables of the previous theme that the new one doesn't define are removed.

Writes every token of a theme object as -- on the given style declaration (e.g. element.style) and removes stale ones. Use it to theme one element.

Turns any accepted theme value into a theme object: "auto" and { light, dark } pairs use systemTheme, names are looked up in themes, objects are returned as is. Throws for unknown names. Pure.

Returns the operating system color scheme from prefers-color-scheme; "light" when matchMedia is unavailable (SSR, tests).

Type guard: true for { light, dark } pairs of theme objects.

The built-in themes keyed by the names accepted by the theme prop.

The built-in theme objects, also exported individually; spread them to create custom themes.

Applying a theme globally

applyThemeStyles is what ConfigProvider calls. Use it in non-React code, or to apply the theme before the first render to avoid a flash of the default colors.

Theming one element

generateCSSVariables accepts any CSSStyleDeclaration, so the tokens can be scoped to an element: its descendants inherit them.

Resolving themes

resolveTheme, isBilingualTheme and getSystemTheme have no side effects; use them to compute token values, e.g. to style a canvas or a chart.

```tsx
import { applyThemeStyles, themes } from "minerva-design";

// Without React (or before the first render): write a theme on <html>
applyThemeStyles("dark");
applyThemeStyles({ ...themes.light, "primary-color": "#7c3aed" });

// "auto" and { light, dark } pairs need the scheme to resolve against
// (defaults to the current prefers-color-scheme)
applyThemeStyles("auto", "dark");
```

```tsx
import { generateCSSVariables, resolveTheme } from "minerva-design";

// Theme a single element (e.g. an embedded widget) instead of the page
const widget = document.querySelector<HTMLElement>("#widget")!;
generateCSSVariables(widget.style, resolveTheme("github-dark"));
```

```tsx
import {
  getSystemTheme,
  isBilingualTheme,
  resolveTheme,
  themes,
} from "minerva-design";

getSystemTheme(); // "light" | "dark" ("light" during SSR)

const pair = { light: themes.light, dark: themes.dark };
isBilingualTheme(pair); // true
isBilingualTheme("dark"); // false

resolveTheme("auto", "dark") === themes.dark; // true
resolveTheme("github-dark")["background-color"]; // "#0d1117"
resolveTheme(pair, "light") === themes.light; // true
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
