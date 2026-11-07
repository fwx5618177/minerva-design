# ConfigProvider

Provides the theme and the language of the React library to your application, and exposes them through useConfig().

Package: minerva-design@1.22.2

Renderer: taro

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

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

Support: beta

Native theme token classes plus resolved custom objects/light-dark pairs/github-dark, system subscription, theme/palette storage, nested inheritance, design axes and localized toggles/actions from shared dictionaries. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Browser cookies/SSR bootstrap use native storage instead. Provider-scoped dictionaries cover controls/editors, calendar/weekdays, command defaults, page-tab actions, display actions and application navigation; global native confirm outside a provider requires explicit localized labels. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "source": "packages/taro/src/theme.tsx",
    "kind": "union",
    "typeText": "ConfigProviderTheme | undefined",
    "typeRef": "type:b2d56bdaa4bed3c93033",
    "required": false
  },
  {
    "name": "palette",
    "source": "packages/taro/src/theme.tsx",
    "kind": "enum",
    "values": [
      "cool",
      "editorial",
      "graphite",
      "tech"
    ],
    "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null | undefined",
    "typeRef": "type:b7f5e4f1c686e6b76ccf",
    "required": false
  },
  {
    "name": "primaryColor",
    "source": "packages/taro/src/theme.tsx",
    "kind": "union",
    "typeText": "PrimaryColor | null | undefined",
    "typeRef": "type:f612ad4ccbeed997ce22",
    "required": false,
    "description": "Brand color: a CSS color for both modes (the dark-mode value is derived for contrast on dark surfaces) or a `{ light, dark }` pair. Recomputes every token derived from `primary-color` and wins over the palette / custom theme's primary color. Unset: the parent provider's; `null`: the theme's own. Invalid colors are ignored with a development warning."
  },
  {
    "name": "locale",
    "source": "packages/taro/src/theme.tsx",
    "kind": "union",
    "typeText": "string | Locale | undefined",
    "typeRef": "type:4bea4c2c61106ce459b7",
    "required": false
  },
  {
    "name": "design",
    "source": "packages/taro/src/theme.tsx",
    "kind": "object",
    "typeText": "DesignOptions | undefined",
    "typeRef": "type:0d1f6356a5ba2ecc4c1b",
    "required": false
  },
  {
    "name": "persist",
    "source": "packages/taro/src/theme.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "preset",
    "source": "packages/core/src/theme/design.ts",
    "kind": "enum",
    "values": [
      "compact",
      "editorial",
      "minerva",
      "touch"
    ],
    "typeText": "\"compact\" | \"editorial\" | \"minerva\" | \"touch\" | undefined",
    "typeRef": "type:e89cc37da1adddd41a88",
    "default": "minerva",
    "required": false,
    "description": "Named combination of the axes below and a default palette: \"minerva\" (default look), \"editorial\" (restrained, reading-oriented), \"compact\" (dense, data-heavy screens) or \"touch\" (consumer mobile apps: comfortable density with 44px touch targets, large radius)"
  },
  {
    "name": "density",
    "source": "packages/core/src/theme/design.ts",
    "kind": "enum",
    "values": [
      "comfortable",
      "compact",
      "standard"
    ],
    "typeText": "\"compact\" | \"standard\" | \"comfortable\" | undefined",
    "typeRef": "type:5ea3bae44292e2cd25dd",
    "required": false,
    "description": "Spacing density of controls and rows"
  },
  {
    "name": "radius",
    "source": "packages/core/src/theme/design.ts",
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
    "description": "Corner radius scale"
  },
  {
    "name": "shadow",
    "source": "packages/core/src/theme/design.ts",
    "kind": "enum",
    "values": [
      "none",
      "standard",
      "subtle"
    ],
    "typeText": "\"none\" | \"subtle\" | \"standard\" | undefined",
    "typeRef": "type:dfccc67a99cc75bd5e58",
    "required": false,
    "description": "Elevation shadow scale"
  },
  {
    "name": "fontScale",
    "source": "packages/core/src/theme/design.ts",
    "kind": "enum",
    "values": [
      "large",
      "small",
      "standard"
    ],
    "typeText": "\"small\" | \"large\" | \"standard\" | undefined",
    "typeRef": "type:4fdefa306ab8f9ff4574",
    "required": false,
    "description": "Type scale"
  }
]
```

### events

```json
[
  {
    "name": "onThemeChange",
    "source": "packages/taro/src/theme.tsx",
    "kind": "function",
    "typeText": "((theme: ThemeMode) => void) | undefined",
    "typeRef": "type:c6375db4d574c80ea3ef",
    "parameters": [
      {
        "name": "theme",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ThemeMode",
        "typeRef": "type:49e6b37018cf95b597ae"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onPaletteChange",
    "source": "packages/taro/src/theme.tsx",
    "kind": "function",
    "typeText": "((palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null) => void) | undefined",
    "typeRef": "type:1dd3725f028e7f81bd97",
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
    "required": false
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
