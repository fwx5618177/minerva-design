# Theme utilities

Functions and theme objects to resolve, apply and inspect themes outside of ConfigProvider.

Package: minerva-design@1.19.3

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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
