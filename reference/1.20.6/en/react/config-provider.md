# ConfigProvider

Provides the theme and the language of the React library to your application, and exposes them through useConfig().

Package: minerva-design@1.20.6

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "99b9ad1465abc6ea97d2a8c008f3026645edb983",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:d66e13eea732bfeb1a6aaa7461bf92ea0d54944072977e762c106b87e877d062"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

### Usage

Render one ConfigProvider at the root of your application. It applies the theme as CSS variables on , sets the language of the React library's built-in texts, and provides both to useConfig().

Both props are reactive: store them in state to let users switch theme or language at runtime.

Only the outermost ConfigProvider touches global state: it writes data-theme, data-palette and the theme variables on , persists the cookies and sets the React library's global language. A nested provider never does; it scopes its own settings to its subtree (see Nesting providers).

### Palette, persistence and callbacks

palette adds a color palette ("editorial", "tech", "graphite" or "cool") on top of the light, dark or system theme. persist saves theme and palette changes in the theme and palette cookies and restores them after hydration. onThemeChange and onPaletteChange are called after setTheme and setPalette change the value.

useConfig() also returns mode, resolvedMode and palette, and the setTheme and setPalette setters, so any component can switch the theme without lifting state. Server rendering, cookies and the no-flash init script are covered in

### Brand color

primaryColor sets your brand color without overriding --primary-color by hand: pass a CSS color ("#4f46e5", rgb(), a named color) for both modes, or a { light, dark } pair. It keeps the explicit theme: theme stays "light", "dark" or "system", so data-theme, useConfig().mode and ThemeToggle keep working.

Derived tokens: every token derived from primary-color (hover, active, subtle, border, text, focus ring, selected color and, unless the palette has its own, the accent tokens) is recomputed from the brand color with the default theme's formulas. A single color gets a dark-mode value mixed toward white in OKLab until it reaches a 4.5:1 contrast on dark surfaces (#4f46e5 becomes #7b85f2); colors that already pass are kept.

Precedence: primaryColor wins over the primary color of the palette and of the theme; the palette keeps its other tokens. An invalid color is ignored, with a warning in development.

Nesting: nested providers inherit the brand color, and a nested primaryColor applies to its subtree only (including its overlays); null restores the theme's own primary color.

Server rendering: the root provider renders the light and dark brand values in a  keyed on data-theme, so the server markup has the brand color before hydration (no flash with the theme init script). React Native (MinervaProvider), Taro, uni-app and WeChat mini program providers (ConfigProvider / ThemeProvider), Vue (ConfigProvider / ThemeProvider), Angular (, provideMinerva({ primaryColor })) and  accept the same value, with the same semantics.

### ConfigContext

useConfig() throws when there is no ConfigProvider above it, which catches setup mistakes early. Read ConfigContext directly when the provider is optional: it returns undefined instead of throwing.

### Nesting providers

A ConfigProvider inside another one is a nested provider. Use it to give one region of the page, a preview or a demo another theme, palette or language without affecting the rest of the page.

Inheritance: it inherits theme, palette and locale from the closest provider above it. Only the props you set are overridden, and useConfig() below it returns the merged values. Inherited settings keep following the parent when it changes.

Scoped theme: a theme or palette override applies to its subtree only. The provider renders a wrapper element with display: contents (so the layout does not change) that carries data-theme, data-palette and the theme variables. Without a theme or palette override, no wrapper is rendered.

Scoped language: a locale override only changes the built-in texts of its subtree. A provider that only sets locale never touches the theme.

Overlays: content rendered in a portal from a scoped subtree (Modal, Drawer, Popover, Select, Menu, Tooltip, Toast…) goes into a container on  that carries the same scope, so overlays get the scoped theme too. Imperative APIs rendered outside the React tree, such as a standalone confirm(), use the root theme.

Global state: a nested provider never writes to , never reads or writes the cookies (persist is ignored) and never changes the React library's global language. Unmounting it leaves the page exactly as the root provider set it, and unmounting the root provider restores what it changed. setTheme and setPalette of a nested provider change its own override, or the parent's value for a setting it does not override.

```tsx
import { ConfigProvider } from "minerva-design";
import "minerva-design/style.css";

export default function Root() {
  return (
    <ConfigProvider theme="auto" locale={{ language: "en" }}>
      <App />
    </ConfigProvider>
  );
}
```

```tsx
import { useState } from "react";
import { Button, ConfigProvider, type Theme } from "minerva-design";

export default function Root() {
  const [theme, setTheme] = useState<Theme>("light");
  return (
    <ConfigProvider theme={theme}>
      <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle theme
      </Button>
    </ConfigProvider>
  );
}
```

```tsx
import { Button, ConfigProvider, useConfig } from "minerva-design";

export default function Root() {
  return (
    // "system" is an alias of "auto". palette applies with light / dark / system.
    <ConfigProvider
      theme="system"
      palette="editorial"
      persist // restore / save the "theme" and "palette" cookies
      onThemeChange={(theme) => analytics.track("theme", theme)}
      onPaletteChange={(palette) => analytics.track("palette", palette)}
    >
      <App />
    </ConfigProvider>
  );
}

function Settings() {
  const { mode, resolvedMode, palette, setTheme, setPalette } = useConfig();
  // mode: "light" | "dark" | "system"; resolvedMode: "light" | "dark"
  return (
    <>
      <Button onClick={() => setTheme(resolvedMode === "dark" ? "light" : "dark")}>
        {mode}
      </Button>
      <Button onClick={() => setPalette(palette === "tech" ? null : "tech")}>
        {palette ?? "default"}
      </Button>
    </>
  );
}
```

```tsx
import { ConfigProvider, ThemeToggle } from "minerva-design";

// Indigo brand: no --primary-color overrides, no !important.
// theme stays "light" | "dark" | "system", so data-theme and ThemeToggle work.
export default function Root() {
  return (
    <ConfigProvider theme="system" persist primaryColor="#4f46e5">
      {/* dark mode derives #7b85f2 from #4f46e5 */}
      <ThemeToggle />
      <App />
    </ConfigProvider>
  );
}

// Or pick both values:
<ConfigProvider theme="light" primaryColor={{ light: "#4f46e5", dark: "#818cf8" }} />

// The palette keeps its surfaces and text colors, primaryColor wins:
<ConfigProvider palette="tech" primaryColor="#4f46e5" />
```

```tsx
import { ConfigProvider } from "minerva-design";

export default function Root() {
  return (
    // root provider: owns <html>, the cookies and the React library's global language
    <ConfigProvider theme="system" palette="editorial" persist>
      <App />

      {/* inherits theme + palette, only this subtree is in Japanese */}
      <ConfigProvider locale={{ language: "ja" }}>
        <Sidebar />
      </ConfigProvider>

      {/* dark + inherited palette for this card and its overlays only */}
      <ConfigProvider theme="dark">
        <PreviewCard />
      </ConfigProvider>
    </ConfigProvider>
  );
}
```

```tsx
import { useContext } from "react";
import { ConfigContext } from "minerva-design";

// Unlike useConfig(), reading the context directly does not throw outside a
// provider: it returns undefined, which is handy for optional integrations.
function useOptionalConfig() {
  return useContext(ConfigContext);
}
```

## ConfigProvider

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "ConfigProvider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "theme",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "union",
    "typeText": "ConfigProviderThemeProps | undefined",
    "typeRef": "type:7e53e5511cbf3537893a",
    "required": false,
    "description": "Theme to apply: \"auto\" (follows `prefers-color-scheme`), a built-in theme name, a theme object, or a `{ light, dark }` pair. The root provider applies it to `<html>`; a nested provider inherits its parent's theme unless set, and applies an override to its own subtree only."
  },
  {
    "name": "palette",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "cool",
      "editorial",
      "graphite",
      "tech"
    ],
    "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null | undefined",
    "typeRef": "type:b7f5e4f1c686e6b76ccf",
    "required": false,
    "description": "Palette applied with the light / dark / system themes (\"editorial\", \"tech\", \"graphite\", \"cool\"); `null` keeps Minerva's default look. The root provider sets `data-palette` on `<html>`; a nested provider inherits its parent's palette unless set, and scopes an override to its subtree. Palette tokens come from `style.css`."
  },
  {
    "name": "primaryColor",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "union",
    "typeText": "PrimaryColor | null | undefined",
    "typeRef": "type:f612ad4ccbeed997ce22",
    "required": false,
    "description": "Brand color: sets `--primary-color` and recomputes every token derived from it (hover, active, subtle, border and text roles, selected, focus ring, and the accent when the palette has no accent of its own) with the default theme's formulas, without changing the light / dark mode. A single color applies to light mode and gets a dark-mode value lightened for contrast on dark surfaces (WCAG 4.5:1); pass `{ light, dark }` to choose both. Wins over the primary color of the theme and of the palette. Accepts hex, `rgb()` / `rgba()` and the basic named colors; an invalid value is ignored (development warning). A nested provider inherits its parent's brand color unless set (`null` restores the theme's own), and scopes an override to its subtree."
  },
  {
    "name": "persist",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Persist theme and palette changes in the `theme` / `palette` cookies and restore them after hydration (pair with `THEME_INIT_SCRIPT` for SSR). Root provider only: ignored by nested providers."
  },
  {
    "name": "locale",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "object",
    "typeText": "Locale | undefined",
    "typeRef": "type:faa2d1cac8abe6cb7ce4",
    "required": false,
    "description": "Language of the React library's built-in texts. The root provider sets it globally; a nested provider inherits its parent's language unless set, and applies an override to its subtree only."
  },
  {
    "name": "preset",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "compact",
      "editorial",
      "minerva",
      "touch"
    ],
    "typeText": "\"editorial\" | \"compact\" | \"minerva\" | \"touch\" | undefined",
    "typeRef": "type:57c71898ce4900e4be17",
    "required": false,
    "description": "Design preset: a named combination of the design axes below and a default palette. \"minerva\" (default look), \"editorial\" (restrained, reading-oriented: editorial palette, comfortable density, small radius, subtle shadows, large type), \"compact\" (dense, data-heavy screens) or \"touch\" (consumer mobile apps: comfortable density, 44px touch targets, large radius). Explicit axes and `palette` win over the preset. A nested provider inherits its parent's design unless set; a nested preset resets every axis it does not set."
  },
  {
    "name": "density",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "comfortable",
      "compact",
      "standard"
    ],
    "typeText": "\"compact\" | \"comfortable\" | \"standard\" | undefined",
    "typeRef": "type:6c4c4181cf4b702c1892",
    "required": false,
    "description": "Spacing density of controls (heights, paddings) and rows (menus, lists, tables): `data-density`"
  },
  {
    "name": "radius",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "none",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | \"none\" | undefined",
    "typeRef": "type:81d0cef3201cfa049ee4",
    "required": false,
    "description": "Corner radius scale (`--radius-sm` ... `--radius-2xl`): `data-radius`"
  },
  {
    "name": "shadow",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "none",
      "standard",
      "subtle"
    ],
    "typeText": "\"subtle\" | \"none\" | \"standard\" | undefined",
    "typeRef": "type:24a43819632837de5021",
    "required": false,
    "description": "Elevation shadows (`--shadow-sm` ... `--shadow-xl`): `data-shadow`. \"standard\" keeps the theme / palette shadows"
  },
  {
    "name": "fontScale",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "small",
      "standard"
    ],
    "typeText": "\"small\" | \"large\" | \"standard\" | undefined",
    "typeRef": "type:4fdefa306ab8f9ff4574",
    "required": false,
    "description": "Type scale (`--font-size-*`, line heights): `data-font-scale`. \"large\" is reading-oriented"
  }
]
```

### events

```json
[
  {
    "name": "onThemeChange",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "function",
    "typeText": "((theme: ConfigProviderThemeProps) => void) | undefined",
    "typeRef": "type:2f3ee82ad197e9845fea",
    "parameters": [
      {
        "name": "theme",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ConfigProviderThemeProps",
        "typeRef": "type:73ae73d9b67b72d0bab6"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called after `setTheme` changes the theme"
  },
  {
    "name": "onPaletteChange",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "function",
    "typeText": "((palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null) => void) | undefined",
    "typeRef": "type:413c6a7bb82a25e28be4",
    "parameters": [
      {
        "name": "palette",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null",
        "typeRef": "type:918077d2a22b5f20e063"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called after `setPalette` changes the palette"
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

### bindings

```json
[
  {
    "prop": "theme",
    "event": "onThemeChange",
    "syntax": "theme={theme} onThemeChange={handler}"
  },
  {
    "prop": "palette",
    "event": "onPaletteChange",
    "syntax": "palette={palette} onPaletteChange={handler}"
  }
]
```

## API

```json
{
  "ConfigContextProviderProps": {
    "source": "react/src/contexts/types.ts",
    "description": "Props of `ConfigProvider`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "theme",
        "type": "ConfigProviderThemeProps",
        "required": false,
        "default": "\"auto\" (nested: the parent's theme)",
        "description": "Theme to apply: \"auto\" (follows `prefers-color-scheme`), a built-in theme name, a theme object, or a `{ light, dark }` pair. The root provider applies it to `<html>`; a nested provider inherits its parent's theme unless set, and applies an override to its own subtree only."
      },
      {
        "name": "palette",
        "type": "Palette | null",
        "required": false,
        "default": "null (nested: the parent's palette)",
        "description": "Palette applied with the light / dark / system themes (\"editorial\", \"tech\", \"graphite\", \"cool\"); `null` keeps Minerva's default look. The root provider sets `data-palette` on `<html>`; a nested provider inherits its parent's palette unless set, and scopes an override to its subtree. Palette tokens come from `style.css`."
      },
      {
        "name": "primaryColor",
        "type": "PrimaryColor | null",
        "required": false,
        "default": "null (nested: the parent's brand color)",
        "description": "Brand color: sets `--primary-color` and recomputes every token derived from it (hover, active, subtle, border and text roles, selected, focus ring, and the accent when the palette has no accent of its own) with the default theme's formulas, without changing the light / dark mode. A single color applies to light mode and gets a dark-mode value lightened for contrast on dark surfaces (WCAG 4.5:1); pass `{ light, dark }` to choose both. Wins over the primary color of the theme and of the palette. Accepts hex, `rgb()` / `rgba()` and the basic named colors; an invalid value is ignored (development warning). A nested provider inherits its parent's brand color unless set (`null` restores the theme's own), and scopes an override to its subtree."
      },
      {
        "name": "persist",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Persist theme and palette changes in the `theme` / `palette` cookies and restore them after hydration (pair with `THEME_INIT_SCRIPT` for SSR). Root provider only: ignored by nested providers."
      },
      {
        "name": "onThemeChange",
        "type": "(theme: ConfigProviderThemeProps) => void",
        "required": false,
        "description": "Called after `setTheme` changes the theme"
      },
      {
        "name": "onPaletteChange",
        "type": "(palette: Palette | null) => void",
        "required": false,
        "description": "Called after `setPalette` changes the palette"
      },
      {
        "name": "locale",
        "type": "Locale",
        "required": false,
        "default": "{ language: \"en\" } (nested: the parent's locale)",
        "description": "Language of the React library's built-in texts. The root provider sets it globally; a nested provider inherits its parent's language unless set, and applies an override to its subtree only."
      },
      {
        "name": "preset",
        "type": "DesignPreset",
        "required": false,
        "default": "\"minerva\" (nested: the parent's design)",
        "description": "Design preset: a named combination of the design axes below and a default palette. \"minerva\" (default look), \"editorial\" (restrained, reading-oriented: editorial palette, comfortable density, small radius, subtle shadows, large type), \"compact\" (dense, data-heavy screens) or \"touch\" (consumer mobile apps: comfortable density, 44px touch targets, large radius). Explicit axes and `palette` win over the preset. A nested provider inherits its parent's design unless set; a nested preset resets every axis it does not set."
      },
      {
        "name": "density",
        "type": "Density",
        "required": false,
        "default": "\"standard\" (or the preset's)",
        "description": "Spacing density of controls (heights, paddings) and rows (menus, lists, tables): `data-density`"
      },
      {
        "name": "radius",
        "type": "RadiusScale",
        "required": false,
        "default": "\"medium\" (or the preset's)",
        "description": "Corner radius scale (`--radius-sm` ... `--radius-2xl`): `data-radius`"
      },
      {
        "name": "shadow",
        "type": "ShadowScale",
        "required": false,
        "default": "\"standard\" (or the preset's)",
        "description": "Elevation shadows (`--shadow-sm` ... `--shadow-xl`): `data-shadow`. \"standard\" keeps the theme / palette shadows"
      },
      {
        "name": "fontScale",
        "type": "FontScale",
        "required": false,
        "default": "\"standard\" (or the preset's)",
        "description": "Type scale (`--font-size-*`, line heights): `data-font-scale`. \"large\" is reading-oriented"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Application content"
      }
    ]
  },
  "ConfigContextProps": {
    "source": "react/src/contexts/types.ts",
    "description": "Value of `ConfigContext`, returned by `useConfig()`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "theme",
        "type": "ConfigProviderThemeProps",
        "required": false,
        "description": "Theme as configured (may be \"auto\" or a light/dark pair)"
      },
      {
        "name": "resolvedTheme",
        "type": "ThemeName | ComponentTheme",
        "required": false,
        "description": "Theme that is currently applied after resolving \"auto\" / light-dark pairs"
      },
      {
        "name": "locale",
        "type": "Locale",
        "required": false,
        "description": "Current locale of the React library's built-in texts"
      },
      {
        "name": "mode",
        "type": "ThemeMode",
        "required": false,
        "description": "Color mode of the theme: \"light\" / \"dark\" for those themes, \"system\" for \"auto\" / \"system\" / `{ light, dark }` pairs, `undefined` for other themes"
      },
      {
        "name": "resolvedMode",
        "type": "ResolvedThemeMode",
        "required": false,
        "description": "Applied color mode (`data-theme` on `<html>`, or on the scope element of a nested provider), when it can be determined"
      },
      {
        "name": "palette",
        "type": "Palette | null",
        "required": false,
        "description": "Active palette (`data-palette` on `<html>`, or on the scope element of a nested provider), `null` for Minerva's default look"
      },
      {
        "name": "primaryColor",
        "type": "PrimaryColorPair | null",
        "required": false,
        "description": "Brand color in effect (normalized light / dark pair, see `ConfigProvider`'s `primaryColor`), `null` when the theme / palette primary color applies"
      },
      {
        "name": "design",
        "type": "ResolvedDesign",
        "required": false,
        "description": "Applied design axes (`data-density` / `data-radius` / `data-shadow` / `data-font-scale`) and the preset they come from"
      },
      {
        "name": "setTheme",
        "type": "(theme: ConfigProviderThemeProps) => void",
        "required": false,
        "description": "Change the theme (persisted to the `theme` cookie when `persist` is on)"
      },
      {
        "name": "setPalette",
        "type": "(palette: Palette | null) => void",
        "required": false,
        "description": "Change the palette (persisted to the `palette` cookie when `persist` is on)"
      }
    ]
  },
  "Locale": {
    "source": "react/src/contexts/types.ts",
    "description": "Locale settings of the React library's built-in texts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "language",
        "type": "SupportedLanguage",
        "required": false,
        "default": "\"en\"",
        "description": "Language of the React library's built-in texts"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Brand color

Nested ConfigProviders with primaryColor in the site's current mode: indigo as a single color (dark value derived), as a { light, dark } pair, and teal. Switch the site theme to compare the derived dark values.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/demos/brand-color.tsx

```tsx
import { Button, ConfigProvider, Switch, useConfig } from "minerva-design";

// A brand color without overriding --primary-color by hand: each card is a
// nested <ConfigProvider primaryColor> in the site's current light / dark mode.
// A single color gets a lighter dark-mode value (contrast on dark surfaces);
// a { light, dark } pair sets both. Hover, active, subtle, border, text and
// focus ring colors are all derived from it.
const brands = [
  { label: 'primaryColor="#4f46e5"', primaryColor: "#4f46e5" },
  {
    label: 'primaryColor={{ light: "#4f46e5", dark: "#818cf8" }}',
    primaryColor: { light: "#4f46e5", dark: "#818cf8" },
  },
  { label: 'primaryColor="#0d9488"', primaryColor: "#0d9488" },
];

function Swatch() {
  const { resolvedMode = "light", primaryColor } = useConfig();
  return (
    <code style={{ color: "var(--text-muted-color)", fontSize: 12 }}>
      {resolvedMode}: {primaryColor?.[resolvedMode]}
    </code>
  );
}

export default function BrandColorDemo() {
  const { resolvedMode = "light" } = useConfig();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 12,
      }}
    >
      {brands.map(({ label, primaryColor }) => (
        <ConfigProvider
          key={label}
          theme={resolvedMode}
          primaryColor={primaryColor}
        >
          <div
            style={{
              display: "grid",
              gap: 10,
              padding: 14,
              borderRadius: 10,
              border: "1px solid var(--border-color)",
              background: "var(--background-color)",
              color: "var(--text-color)",
              fontFamily: "var(--font-family-sans)",
            }}
          >
            <code style={{ fontSize: 12, overflowWrap: "anywhere" }}>
              {label}
            </code>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Button size="small" color="primary">
                Primary
              </Button>
              <Button size="small" color="primary" variant="outline">
                Outline
              </Button>
              <Switch defaultChecked aria-label="Brand switch" />
            </div>
            <Swatch />
          </div>
        </ConfigProvider>
      ))}
    </div>
  );
}

```

## Example: Custom theme

A custom theme built from themes.light and passed to a nested ConfigProvider: only this container is re-themed, including the Select menu rendered in a portal.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/demos/custom-theme.tsx

```tsx
import {
  Button,
  ConfigProvider,
  HStack,
  Select,
  SelectItem,
  Switch,
  themes,
  type ComponentTheme,
  VStack,
} from "minerva-design";

// A custom theme: start from a built-in one and override tokens.
const sepia: ComponentTheme = {
  ...themes.light,
  "primary-color": "#9a3412",
  "primary-color-hover": "#7c2d12",
  "primary-color-active": "#6c2710",
  "background-color": "#fbf5e9",
  "foreground-color": "#3b2f2a",
  "border-color": "#e0d2b8",
  "text-gray": "#6b5b4e",
  "focus-ring-color": "rgba(154, 52, 18, 0.45)",
};

// A nested ConfigProvider applies its theme to its own subtree only (the
// site's root provider keeps <html>). Portalled content opened from inside,
// like the Select menu below, gets the same theme.
export default function CustomThemeDemo() {
  return (
    <ConfigProvider theme={sepia}>
      <div
        style={{
          padding: 16,
          borderRadius: 8,
          border: "1px solid var(--border-color)",
          background: "var(--surface-color)",
          color: "var(--text-color)",
        }}
      >
        <VStack gap={4} align="start">
          <strong>Sepia theme</strong>
          <span>Only this container uses the custom theme.</span>
          <HStack gap={4} wrap>
            <Button color="primary">Primary</Button>
            <Button color="primary" disabled>
              Disabled
            </Button>
            <Switch label="Reading mode" defaultChecked />
            <Select aria-label="Paper" defaultValue="cream">
              <SelectItem value="cream">Cream</SelectItem>
              <SelectItem value="ivory">Ivory</SelectItem>
              <SelectItem value="kraft">Kraft</SelectItem>
            </Select>
          </HStack>
        </VStack>
      </div>
    </ConfigProvider>
  );
}

```

## Example: Locale

A nested ConfigProvider that only sets locale (en, zh, ja or fr): the built-in texts of its subtree change, while the theme and palette are inherited from the site and <html> is left untouched.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/demos/locale.tsx

```tsx
import { useState } from "react";
import {
  Button,
  ConfigProvider,
  Pagination,
  Tag,
  useConfig,
  useI18n,
  type SupportedLanguage,
} from "minerva-design";

// a key from the React library's built-in translations
const AVATAR_KEY = "avatar.default";
const LANGUAGES: SupportedLanguage[] = ["en", "zh", "ja", "fr"];

function Preview() {
  const { locale, palette } = useConfig();
  const { t } = useI18n();
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        locale: <Tag color="primary">{locale?.language}</Tag> {AVATAR_KEY}:{" "}
        <Tag color="info">{t(AVATAR_KEY)}</Tag> palette:{" "}
        <Tag color="success">{palette ?? "default"}</Tag>
      </div>
      <Pagination total={50} defaultCurrent={2} showTotal />
    </div>
  );
}

export default function LocaleDemo() {
  const [language, setLanguage] = useState<SupportedLanguage>("en");

  // A nested provider that only sets `locale`: theme and palette are
  // inherited from the site's provider, <html> is left alone, and the
  // language only applies to this subtree.
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        role="group"
        aria-label="Language"
        style={{ display: "flex", gap: 8 }}
      >
        {LANGUAGES.map((lng) => (
          <Button
            key={lng}
            size="small"
            color={lng === language ? "primary" : "neutral"}
            variant={lng === language ? "solid" : "outline"}
            aria-pressed={lng === language}
            onClick={() => setLanguage(lng)}
          >
            {lng}
          </Button>
        ))}
      </div>
      <ConfigProvider locale={{ language }}>
        <Preview />
      </ConfigProvider>
    </div>
  );
}

```

## Example: Palettes

Each card is a nested ConfigProvider with its own palette, in the site's current mode. The site's root provider keeps data-palette on <html>.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/demos/palette.tsx

```tsx
import { Button, ConfigProvider, Tag, useConfig } from "minerva-design";
import { PALETTES } from "minerva-design/theme-utils";

// The site's root provider sets data-palette on <html>. Each card below is a
// nested <ConfigProvider palette={name}>: the palette (in the site's current
// light / dark mode) only applies inside the card.
export default function PaletteDemo() {
  const { resolvedMode = "light", palette } = useConfig();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 12,
      }}
    >
      {PALETTES.map((name) => (
        <ConfigProvider key={name} theme={resolvedMode} palette={name}>
          <div
            style={{
              display: "grid",
              gap: 10,
              padding: 14,
              borderRadius: 10,
              border: "1px solid var(--border-color)",
              background: "var(--background-color)",
              color: "var(--text-color)",
              fontFamily: "var(--font-family-sans)",
            }}
          >
            <strong>
              palette=&quot;{name}&quot;{" "}
              {palette === name && <Tag color="success">active</Tag>}
            </strong>
            <Button size="small" color="primary">
              Primary
            </Button>
            <span style={{ color: "var(--text-muted-color)", fontSize: 13 }}>
              data-theme=&quot;{resolvedMode}&quot;
            </span>
          </div>
        </ConfigProvider>
      ))}
    </div>
  );
}

```

## Example: Reading the configuration

useConfig() returns the configured theme, the resolved theme, the palette and the locale of the nearest provider. Change the site theme, palette or language in the header to see it update.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/demos/use-config.tsx

```tsx
import { Tag, useConfig } from "minerva-design";

// useConfig() reads the nearest ConfigProvider. This site wraps every page in
// one, so the values below change when you pick another theme, palette or
// language in the header.
export default function UseConfigDemo() {
  const { theme, resolvedTheme, palette, locale } = useConfig();

  const describe = (value: unknown) =>
    typeof value === "string" ? value : "custom theme object";

  return (
    <dl
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "8px 16px",
        margin: 0,
      }}
    >
      <dt>theme</dt>
      <dd style={{ margin: 0 }}>
        <Tag color="primary">{describe(theme)}</Tag>
      </dd>
      <dt>resolvedTheme</dt>
      <dd style={{ margin: 0 }}>
        <Tag color="info">{describe(resolvedTheme)}</Tag>
      </dd>
      <dt>palette</dt>
      <dd style={{ margin: 0 }}>
        <Tag color="warning">{palette ?? "null"}</Tag>
      </dd>
      <dt>locale.language</dt>
      <dd style={{ margin: 0 }}>
        <Tag color="success">{locale?.language ?? "en"}</Tag>
      </dd>
    </dl>
  );
}

```
