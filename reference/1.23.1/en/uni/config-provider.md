# ConfigProvider

Provides the theme and the language of the React library to your application, and exposes them through useConfig().

Package: minerva-design@1.23.1

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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

Reactive nested locale/dir, inherited mode/palette/design, shared core catalog across editable/navigation/overlay/display controls, system appearance, isolated CSS tokens. Native view scoping replaces browser root attributes. Consumer slot content remains consumer-localized. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "mode",
    "typeText": "ThemeMode | undefined",
    "required": false
  },
  {
    "name": "theme",
    "typeText": "NativeTheme | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null | undefined",
    "required": false
  },
  {
    "name": "primaryColor",
    "typeText": "PrimaryColor | null | undefined",
    "required": false
  },
  {
    "name": "design",
    "typeText": "DesignOptions | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "dir",
    "typeText": "\"ltr\" | \"rtl\" | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "themeChange",
    "typeText": "any[]"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{ mode: \"light\" | \"dark\"; palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null | undefined; }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
