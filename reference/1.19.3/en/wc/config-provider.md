# ConfigProvider

Provides the theme and the language of the React library to your application, and exposes them through useConfig().

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
  "specifier": "minerva-design/web-components/config",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "theme",
    "typeText": "\"light\" | \"dark\" | \"system\" | \"github-dark\" | undefined",
    "attribute": "theme",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "Palette | undefined",
    "attribute": "palette",
    "required": false
  },
  {
    "name": "design",
    "typeText": "DesignPreset | undefined",
    "attribute": "design",
    "required": false
  },
  {
    "name": "density",
    "typeText": "Density | undefined",
    "attribute": "density",
    "required": false
  },
  {
    "name": "radius",
    "typeText": "RadiusScale | undefined",
    "attribute": "radius",
    "required": false
  },
  {
    "name": "shadow",
    "typeText": "ShadowScale | undefined",
    "attribute": "shadow",
    "required": false
  },
  {
    "name": "fontScale",
    "typeText": "FontScale | undefined",
    "attribute": "font-scale",
    "required": false
  },
  {
    "name": "primaryColor",
    "typeText": "PrimaryColor | undefined",
    "attribute": "primary-color",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "SupportedLanguage | undefined",
    "attribute": "locale",
    "required": false
  },
  {
    "name": "root",
    "typeText": "boolean",
    "attribute": "root",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-theme-change",
    "typeText": "CustomEvent<{ mode: \"light\" | \"dark\"; }>",
    "detailType": {
      "typeText": "{ mode: \"light\" | \"dark\"; }",
      "typeRef": "type:9bfa840eb7f37b20f5e9"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The resolved light / dark mode changed (`detail: { mode }`), e.g. the system preference with `theme=\"system\"`"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Scoped content"
  }
]
```

## API

```json
{
  "wc:minerva-config": {
    "kind": "element",
    "source": "web-components/src/components/config/config.ts",
    "className": "MinervaConfig",
    "summary": "Theme / palette / design / locale scope (ConfigProvider for Web Components).",
    "description": "Theme, palette, design and language scope for the Minerva elements inside it (and any other content): the Web Component counterpart of the React library's `ConfigProvider`. It renders as `display: contents` and writes the same attributes as a nested `ConfigProvider` (`data-theme`, `data-palette`, `data-density` / `data-radius` / `data-shadow` / `data-font-scale`, `data-minerva-theme-scope`, `lang`), so the design tokens of `minerva-design/tokens.css` (also published as `minerva-design/tokens.css`) resolve for its subtree. Scopes nest: the closest one wins. Overlays opened inside stay in the scope (they use the top layer without being moved). With `root`, the attributes go on `<html>` instead (whole page). Without `<minerva-config>`, the same attributes set on any ancestor (e.g. `<html data-theme=\"dark\" lang=\"fr\">`) work too.",
    "properties": [
      {
        "name": "theme",
        "attribute": "theme",
        "type": "\"light\" | \"dark\" | \"system\" | \"github-dark\" | undefined",
        "description": "Light, dark, follow the system, or the github-dark theme"
      },
      {
        "name": "palette",
        "attribute": "palette",
        "type": "Palette | undefined",
        "description": "Color palette (light and dark variants)"
      },
      {
        "name": "design",
        "attribute": "design",
        "type": "DesignPreset | undefined",
        "description": "Design preset (its palette applies unless `palette` is set)"
      },
      {
        "name": "density",
        "attribute": "density",
        "type": "Density | undefined",
        "description": "Spacing density (overrides the preset)"
      },
      {
        "name": "radius",
        "attribute": "radius",
        "type": "RadiusScale | undefined",
        "description": "Corner radius scale (overrides the preset)"
      },
      {
        "name": "shadow",
        "attribute": "shadow",
        "type": "ShadowScale | undefined",
        "description": "Elevation shadow scale (overrides the preset)"
      },
      {
        "name": "fontScale",
        "attribute": "font-scale",
        "type": "FontScale | undefined",
        "description": "Type scale (overrides the preset)"
      },
      {
        "name": "primaryColor",
        "attribute": "primary-color",
        "type": "PrimaryColor | undefined",
        "description": "Brand color: a CSS color (`primary-color=\"#4f46e5\"`) whose dark-mode value is derived for contrast on dark surfaces, or (as a property) a `{ light, dark }` pair. Recomputes every token derived from `primary-color` and wins over the palette's. The value of the applied mode is written inline: without `theme`, the mode of the closest ancestor with `data-theme` when applied (light when the element scopes a palette, design or scale, whose tokens render light). A brand color alone does not scope the subtree."
      },
      {
        "name": "locale",
        "attribute": "locale",
        "type": "SupportedLanguage | undefined",
        "description": "Language of the built-in texts of the elements inside"
      },
      {
        "name": "root",
        "attribute": "root",
        "type": "boolean",
        "default": "false",
        "description": "Apply to the whole document (`<html>`) instead of this subtree"
      },
      {
        "name": "resolvedMode",
        "type": "\"light\" | \"dark\" | null",
        "readonly": true,
        "description": "Light / dark mode currently applied (`null` when no theme is set)."
      }
    ],
    "methods": [],
    "events": [
      {
        "name": "minerva-theme-change",
        "description": "The resolved light / dark mode changed (`detail: { mode }`), e.g. the system preference with `theme=\"system\"`"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "Scoped content"
      }
    ],
    "parts": [],
    "cssProperties": []
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

<minerva-config> renders as display: contents and scopes the theme of everything inside it: here one light and one dark scope side by side.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/wc/basic.html

```html
<div
  style="
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  "
>
  <minerva-config theme="light">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Light scope</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config theme="dark">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Dark scope</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
</div>

```

## Example: Brand color

Scopes with primary-color: indigo as a single color (dark value #7b85f2 derived), indigo in a dark scope, and teal winning over the editorial palette primary.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/wc/brand-color.html

```html
<div
  style="
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  "
>
  <minerva-config primary-color="#4f46e5">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>primary-color="#4f46e5"</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config primary-color="#4f46e5" theme="dark">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Indigo + dark (#7b85f2)</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config primary-color="#0d9488" palette="editorial">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Teal over palette="editorial"</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
</div>

```

## Example: Locale

locale sets the language of the built-in texts of the elements inside (pagination total, empty state). Change it to see them update live.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/wc/locale.html

```html
<label style="display: inline-flex; gap: 8px; align-items: center">
  Locale
  <select id="locale">
    <option value="en">English</option>
    <option value="fr">Français</option>
    <option value="zh">中文</option>
    <option value="ja">日本語</option>
  </select>
</label>
<minerva-config id="scope" locale="en">
  <div style="display: grid; gap: 12px; margin-top: 12px">
    <minerva-pagination total="120" show-total></minerva-pagination>
    <minerva-empty></minerva-empty>
  </div>
</minerva-config>

```

### apps/docs/src/docs/pages/config-provider/wc/locale.ts

```tsx
// Built-in texts follow the `locale` of the closest <minerva-config>
// (or the closest `lang` attribute) and update live when it changes.
export function setup(root: HTMLElement) {
  const select = root.querySelector<HTMLSelectElement>("#locale")!;
  const scope = root.querySelector<HTMLElement & { locale: string }>("#scope")!;
  const onChange = () => (scope.locale = select.value);
  select.addEventListener("change", onChange);
  return () => select.removeEventListener("change", onChange);
}

```

## Example: Nested scopes and theme events

Scopes nest and the closest one wins: the inner scope stays light while the outer one follows the buttons. minerva-theme-change reports the resolved mode, also for theme="system".

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/wc/nested.html

```html
<div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center">
  <minerva-button
    id="outer-light"
    size="small"
    variant="outline"
    color="neutral"
    >Outer: light</minerva-button
  >
  <minerva-button id="outer-dark" size="small" variant="outline" color="neutral"
    >Outer: dark</minerva-button
  >
  <minerva-button
    id="outer-system"
    size="small"
    variant="outline"
    color="neutral"
    >Outer: system</minerva-button
  >
  <output id="mode" aria-live="polite"></output>
</div>
<minerva-config id="outer" theme="dark">
  <minerva-card variant="outline" padding="medium" style="margin-top: 12px">
    <minerva-card-header>
      <minerva-card-title>Outer scope</minerva-card-title>
      <minerva-card-description
        >Follows the buttons above.</minerva-card-description
      >
    </minerva-card-header>
    <minerva-card-content>
      <minerva-config theme="light" palette="cool">
        <minerva-card variant="elevated" padding="small">
          <minerva-card-content>
            Nested scope: always light with the cool palette (the closest scope
            wins).
            <minerva-button size="small" style="margin-top: 8px"
              >Nested button</minerva-button
            >
          </minerva-card-content>
        </minerva-card>
      </minerva-config>
    </minerva-card-content>
  </minerva-card>
</minerva-config>

```

### apps/docs/src/docs/pages/config-provider/wc/nested.ts

```tsx
// minerva-theme-change reports the resolved mode of a scope, including the
// system preference when theme="system".
type Config = HTMLElement & {
  theme: string;
  resolvedMode: "light" | "dark" | null;
};

export function setup(root: HTMLElement) {
  const outer = root.querySelector<Config>("#outer")!;
  const mode = root.querySelector<HTMLOutputElement>("#mode")!;
  const show = () => (mode.value = `Resolved mode: ${outer.resolvedMode}`);
  const onClick = (event: Event) => {
    const id = (event.target as Element).closest("minerva-button")?.id;
    if (id?.startsWith("outer-")) outer.theme = id.slice("outer-".length);
  };
  root.addEventListener("click", onClick);
  outer.addEventListener("minerva-theme-change", show);
  const frame = requestAnimationFrame(show);
  return () => {
    cancelAnimationFrame(frame);
    root.removeEventListener("click", onClick);
    outer.removeEventListener("minerva-theme-change", show);
  };
}

```

## Example: Palette and design

palette, design (preset) and the density / radius / shadow / font-scale overrides apply to the subtree only.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/wc/palette-design.html

```html
<div
  style="
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  "
>
  <minerva-config palette="editorial">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>palette="editorial"</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config palette="tech" theme="dark">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>palette="tech" + dark</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config design="compact" radius="none">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>design="compact" radius="none"</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config density="comfortable" radius="large" font-scale="large">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Comfortable, large</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
</div>

```
