# Theme utilities

Functions and theme objects to resolve, apply and inspect themes outside of ConfigProvider.

Package: minerva-design@1.22.2

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

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

## API

```json
{
  "ThemeProps": {
    "source": "core/src/theme/types.ts",
    "description": "Base design tokens. Every key is written to the document root as a CSS custom property named `--<key>` (e.g. `\"primary-color\"` -> `--primary-color`) by `applyThemeStyles` / `ConfigProvider`. Components never read these values directly from JS: their styles consume the CSS variables, so switching theme is a pure CSS-variable swap. Most semantic tokens (see `ComponentThemeProps`) are derived from these keys with `color-mix()`, so a custom theme only has to provide the base keys below.",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "primary-color",
        "type": "string",
        "required": true,
        "description": "Brand / accent color: primary buttons, active states, focus rings."
      },
      {
        "name": "secondary-color",
        "type": "string",
        "required": true,
        "description": "Neutral accent used by `secondary` variants."
      },
      {
        "name": "success-color",
        "type": "string",
        "required": true,
        "description": "Positive status color (success variants)."
      },
      {
        "name": "danger-color",
        "type": "string",
        "required": true,
        "description": "Destructive / danger status color (danger variants)."
      },
      {
        "name": "warning-color",
        "type": "string",
        "required": true,
        "description": "Warning status color."
      },
      {
        "name": "info-color",
        "type": "string",
        "required": true,
        "description": "Informational status color."
      },
      {
        "name": "light-color",
        "type": "string",
        "required": true,
        "description": "A light neutral (legacy; light variants)."
      },
      {
        "name": "dark-color",
        "type": "string",
        "required": true,
        "description": "A dark neutral (legacy; dark variants)."
      },
      {
        "name": "background-color",
        "type": "string",
        "required": true,
        "description": "Page background. Default for `--surface-color`."
      },
      {
        "name": "foreground-color",
        "type": "string",
        "required": true,
        "description": "Main text color. Default for `--text-color`."
      },
      {
        "name": "border-color",
        "type": "string",
        "required": true,
        "description": "Default border / divider color."
      },
      {
        "name": "text-gray",
        "type": "string",
        "required": true,
        "description": "Secondary, low-emphasis text (should keep >= 4.5:1 on the background)."
      },
      {
        "name": "primary-gradient-start",
        "type": "string",
        "required": true
      },
      {
        "name": "primary-gradient-end",
        "type": "string",
        "required": true
      },
      {
        "name": "secondary-gradient-start",
        "type": "string",
        "required": true
      },
      {
        "name": "secondary-gradient-end",
        "type": "string",
        "required": true
      },
      {
        "name": "highlight-color",
        "type": "string",
        "required": true,
        "description": "Highlight / mark color."
      },
      {
        "name": "shadow-color",
        "type": "string",
        "required": true,
        "description": "Base shadow color used by `--shadow-sm|md|lg`."
      },
      {
        "name": "muted-color",
        "type": "string",
        "required": true,
        "description": "Muted UI color (placeholders, icons, inactive controls)."
      },
      {
        "name": "link-color",
        "type": "string",
        "required": true
      },
      {
        "name": "link-hover-color",
        "type": "string",
        "required": true
      },
      {
        "name": "link-active-color",
        "type": "string",
        "required": true
      },
      {
        "name": "link-visited-color",
        "type": "string",
        "required": true
      }
    ]
  },
  "SemanticThemeProps": {
    "source": "core/src/theme/types.ts",
    "description": "Optional semantic tokens. All of them have defaults declared on `:root` in `minerva-design/tokens.css` (`tokens/default-theme.ts`), derived from the base `ThemeProps` keys with `color-mix()`, so they follow any theme (including custom ones). Set them in a theme only when the derived value is not what you want (the built-in dark themes set explicit surface and text colors, for example).",
    "kind": "interface",
    "extends": [
      "ThemeRoleTokens"
    ],
    "props": [
      {
        "name": "surface-color",
        "type": "string",
        "required": false,
        "description": "Background of cards, inputs and other component surfaces."
      },
      {
        "name": "surface-muted-color",
        "type": "string",
        "required": false,
        "description": "Hovered rows, disabled controls, tracks."
      },
      {
        "name": "surface-elevated-color",
        "type": "string",
        "required": false,
        "description": "Popovers, menus, dropdowns, tooltips."
      },
      {
        "name": "surface-subtle-color",
        "type": "string",
        "required": false,
        "description": "Very soft background (sidebars, table headers, code blocks)."
      },
      {
        "name": "canvas-color",
        "type": "string",
        "required": false,
        "description": "Application background behind surfaces (e.g. AppShell canvas)."
      },
      {
        "name": "control-color",
        "type": "string",
        "required": false,
        "description": "Background of form controls (inputs, selects)."
      },
      {
        "name": "hover-color",
        "type": "string",
        "required": false,
        "description": "Hovered rows and items."
      },
      {
        "name": "selected-color",
        "type": "string",
        "required": false,
        "description": "Selected rows, items and tabs."
      },
      {
        "name": "accent-color",
        "type": "string",
        "required": false,
        "description": "Secondary accent (CTAs, ratings, highlights). Defaults to the primary color."
      },
      {
        "name": "overlay-color",
        "type": "string",
        "required": false,
        "description": "Backdrop / modal overlay."
      },
      {
        "name": "border-strong-color",
        "type": "string",
        "required": false,
        "description": "Emphasized decorative border (panels, hovered separators)."
      },
      {
        "name": "readonly-surface-color",
        "type": "string",
        "required": false,
        "description": "Read-only field surface; content keeps normal text contrast and focus."
      },
      {
        "name": "control-border-color",
        "type": "string",
        "required": false,
        "description": "Necessary boundary of editable controls; distinct from decorative dividers."
      },
      {
        "name": "text-color",
        "type": "string",
        "required": false,
        "description": "Main text color (defaults to `--foreground-color`)."
      },
      {
        "name": "text-secondary-color",
        "type": "string",
        "required": false,
        "description": "Secondary text (descriptions, helper text)."
      },
      {
        "name": "text-muted-color",
        "type": "string",
        "required": false,
        "description": "Low-emphasis text (captions, helper text)."
      },
      {
        "name": "text-disabled-color",
        "type": "string",
        "required": false,
        "description": "Disabled text."
      },
      {
        "name": "text-inverse-color",
        "type": "string",
        "required": false,
        "description": "Text drawn on filled role backgrounds (e.g. a primary button)."
      },
      {
        "name": "focus-ring-color",
        "type": "string",
        "required": false,
        "description": "Focus outline / ring color."
      },
      {
        "name": "shadow-sm",
        "type": "string",
        "required": false
      },
      {
        "name": "shadow-md",
        "type": "string",
        "required": false
      },
      {
        "name": "shadow-lg",
        "type": "string",
        "required": false
      },
      {
        "name": "shadow-xl",
        "type": "string",
        "required": false
      },
      {
        "name": "font-family-sans",
        "type": "string",
        "required": false,
        "description": "Body font stack."
      },
      {
        "name": "font-family-display",
        "type": "string",
        "required": false,
        "description": "Headings / display font stack."
      },
      {
        "name": "font-family-mono",
        "type": "string",
        "required": false,
        "description": "Code font stack."
      },
      {
        "name": "radius-sm",
        "type": "string",
        "required": false
      },
      {
        "name": "radius-md",
        "type": "string",
        "required": false
      },
      {
        "name": "radius-lg",
        "type": "string",
        "required": false
      }
    ]
  },
  "ComponentThemeProps": {
    "source": "core/src/theme/types.ts",
    "description": "Optional per-component overrides. Components fall back to the semantic tokens when these are not set.",
    "kind": "interface",
    "extends": [
      "SemanticThemeProps"
    ],
    "props": [
      {
        "name": "btn-bg-color-success",
        "type": "string",
        "required": false,
        "description": "Overrides the background of `success` buttons."
      },
      {
        "name": "btn-bg-color-danger",
        "type": "string",
        "required": false
      },
      {
        "name": "btn-bg-color-warning",
        "type": "string",
        "required": false
      },
      {
        "name": "btn-bg-color-info",
        "type": "string",
        "required": false
      },
      {
        "name": "btn-bg-color-hover",
        "type": "string",
        "required": false,
        "description": "Overrides the hover background of primary buttons."
      },
      {
        "name": "btn-bg-color-active",
        "type": "string",
        "required": false,
        "description": "Overrides the active background of primary buttons."
      },
      {
        "name": "avatar-bg-color-info",
        "type": "string",
        "required": false
      },
      {
        "name": "avatar-bg-color-success",
        "type": "string",
        "required": false
      },
      {
        "name": "avatar-bg-color-danger",
        "type": "string",
        "required": false
      },
      {
        "name": "avatar-bg-color-warning",
        "type": "string",
        "required": false
      },
      {
        "name": "card-bg-color",
        "type": "string",
        "required": false,
        "description": "Card background (defaults to `--surface-color`)."
      },
      {
        "name": "card-bg-color-content",
        "type": "string",
        "required": false,
        "description": "Card content background (defaults to `--surface-color`)."
      },
      {
        "name": "card-border-color",
        "type": "string",
        "required": false,
        "description": "Card border (defaults to `--border-color`)."
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Resolving a theme value

How resolveTheme resolves each kind of theme value for a given system scheme, and what isBilingualTheme / getSystemTheme return.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/theme-utils/demos/resolve-theme.tsx

```tsx
import { useState } from "react";
import {
  Tag,
  Select,
  SelectItem,
  getSystemTheme,
  isBilingualTheme,
  resolveTheme,
  themes,
  type DefaultTheme,
  type Theme,
} from "minerva-design";

const INPUTS: Record<string, Theme> = {
  '"auto"': "auto",
  '"light"': "light",
  '"dark"': "dark",
  '"github-dark"': "github-dark",
  "{ light, dark } pair": {
    light: { ...themes.light, "primary-color": "#7c3aed" },
    dark: { ...themes.dark, "primary-color": "#a78bfa" },
  },
  "custom object": { ...themes.light, "primary-color": "#0d9488" },
};

// resolveTheme / isBilingualTheme / getSystemTheme are pure helpers:
// they compute values and never touch the DOM.
export default function ResolveThemeDemo() {
  const [input, setInput] = useState('"auto"');
  const [scheme, setScheme] = useState<DefaultTheme>(getSystemTheme);

  const theme = INPUTS[input];
  const resolved = resolveTheme(theme, scheme);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <label>
          theme{" "}
          <Select aria-label="theme" value={input} onChange={setInput}>
            {Object.keys(INPUTS).map((key) => (
              <SelectItem key={key} value={key}>
                {key}
              </SelectItem>
            ))}
          </Select>
        </label>
        <label>
          systemTheme{" "}
          <Select
            aria-label="systemTheme"
            value={scheme}
            onChange={(value) => setScheme(value as DefaultTheme)}
          >
            <SelectItem value="light">light</SelectItem>
            <SelectItem value="dark">dark</SelectItem>
          </Select>
        </label>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        getSystemTheme(): <Tag color="info">{getSystemTheme()}</Tag>{" "}
        isBilingualTheme(theme):{" "}
        <Tag color="info">{String(isBilingualTheme(theme))}</Tag>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: 12,
          borderRadius: 8,
          background: resolved["background-color"],
          color: resolved["foreground-color"],
          border: `1px solid ${resolved["border-color"]}`,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: resolved["primary-color"],
          }}
        />
        <span style={{ fontFamily: "monospace", fontSize: 13 }}>
          primary-color: {resolved["primary-color"]} · background-color:{" "}
          {resolved["background-color"]}
        </span>
      </div>
    </div>
  );
}

```

## Example: Previewing a theme in an element

generateCSSVariables writes a resolved theme on a container's style, so only the components inside it change.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/theme-utils/demos/scoped-preview.tsx

```tsx
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  generateCSSVariables,
  HStack,
  Input,
  resolveTheme,
  Switch,
  themes,
  type ThemeName,
} from "minerva-design";

const NAMES = Object.keys(themes) as ThemeName[];

// generateCSSVariables writes a theme to any style declaration. Pointing it
// at an element (instead of <html>, like applyThemeStyles does) previews a
// theme inside that element only.
export default function ScopedPreviewDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [name, setName] = useState<ThemeName>("github-dark");

  useEffect(() => {
    if (ref.current)
      generateCSSVariables(ref.current.style, resolveTheme(name));
  }, [name]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div role="group" aria-label="Theme" style={{ display: "flex", gap: 8 }}>
        {NAMES.map((n) => (
          <Button
            key={n}
            size="small"
            color={n === name ? "primary" : "neutral"}
            variant={n === name ? "solid" : "outline"}
            aria-pressed={n === name}
            onClick={() => setName(n)}
          >
            {n}
          </Button>
        ))}
      </div>
      <div
        ref={ref}
        style={{
          padding: 16,
          borderRadius: 8,
          background: "var(--background-color)",
          color: "var(--text-color)",
          border: "1px solid var(--border-color)",
        }}
      >
        <HStack gap={4} wrap>
          <Button color="primary">Primary</Button>
          <Button color="success">Success</Button>
          <Switch label="Switch" defaultChecked />
          <Checkbox label="Checkbox" defaultChecked />
          <div style={{ width: 220 }}>
            <Input name="preview" aria-label="Name" placeholder="Jane Doe" />
          </div>
        </HStack>
      </div>
    </div>
  );
}

```

## Example: Built-in themes

Reads token values from the themes map and renders them as swatches. No CSS variable is written.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/theme-utils/demos/theme-swatches.tsx

```tsx
import { themes } from "minerva-design";

const TOKENS = [
  "primary-color",
  "secondary-color",
  "success-color",
  "warning-color",
  "danger-color",
  "info-color",
  "background-color",
  "foreground-color",
  "border-color",
] as const;

// `themes` is a plain object: reading it has no side effects
export default function ThemeSwatchesDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {Object.entries(themes).map(([name, theme]) => (
        <figure
          key={name}
          style={{
            margin: 0,
            padding: 12,
            borderRadius: 8,
            background: theme["background-color"],
            color: theme["foreground-color"],
            border: `1px solid ${theme["border-color"]}`,
          }}
        >
          <figcaption style={{ fontWeight: 600, marginBottom: 8 }}>
            {name}
          </figcaption>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {TOKENS.map((token) => (
              <li
                key={token}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 12,
                  lineHeight: "22px",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    background: theme[token],
                    border: `1px solid ${theme["border-color"]}`,
                  }}
                />
                <span style={{ flex: 1, fontFamily: "monospace" }}>
                  {token}
                </span>
                <span style={{ fontFamily: "monospace" }}>{theme[token]}</span>
              </li>
            ))}
          </ul>
        </figure>
      ))}
    </div>
  );
}

```
