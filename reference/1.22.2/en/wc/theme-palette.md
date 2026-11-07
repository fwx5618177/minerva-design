# Theme & Palette

Two independent axes, a light / dark / system mode and a color palette, with cookie persistence and flash-free server rendering.

Package: minerva-design@1.22.2

Renderer: wc

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

### Two axes: mode and palette

The mode decides between light and dark. The palette decides the look: colors, surfaces, shadows and font stacks. Any palette works with any mode, so four palettes give eight complete themes, plus Minerva's default look when no palette is set.

Value

Mode: always light or always dark.

Mode: follows prefers-color-scheme and updates live when the operating system setting changes. ConfigProvider also accepts "auto", an alias kept for compatibility.

Palette: warm paper backgrounds, ink-blue primary and a rust accent, for content-heavy pages.

Palette: crisp neutral surfaces with a bright blue primary, for dashboards and developer tools.

Palette: monochrome grays with a restrained accent, for dense, professional interfaces.

Palette: cool blue-gray surfaces with a teal-blue primary, calm and airy.

No palette: Minerva's default look (the built-in light and dark themes, written as inline variables).

### ThemeProvider and useTheme

ThemeProvider is the shortest way to get both axes: it renders a ConfigProvider with the given mode and palette, persists changes in cookies and exposes everything through useTheme(). ThemeToggle and PaletteToggle are ready-made switches bound to the closest provider.

ThemeProvider is a preset over ConfigProvider, so both share one source of truth. Use ConfigProvider directly when you also need built-in themes such as github-dark, custom theme objects or a controlled theme prop:

useTheme() returns the chosen mode, the applied mode, the palette and their setters. It works under ThemeProvider and under ConfigProvider, and throws outside of both.

### How the theme is applied

The provider always writes the resolved mode to data-theme and color-scheme on . With a palette and a light, dark or system theme it also sets data-palette, and the tokens come from the palette blocks bundled in style.css; the inline theme variables are removed. Without a palette, or with github-dark or a custom theme object, the theme's tokens are written as inline CSS variables on , as before.

When several sources define the same token, the most specific one wins:

Inline CSS variables on  (custom theme objects, github-dark, or no palette) beat everything declared in a stylesheet.

Palette blocks ([data-palette][data-theme]) beat the defaults declared on :root.

The :root defaults of style.css, including the derived color-mix() tokens, apply when nothing else matches.

The palette prop is ignored for github-dark and custom theme objects: those themes carry their own tokens.

Only the outermost provider writes to  and the cookies. A nested ThemeProvider or ConfigProvider inherits the mode and palette of its parent, and scopes its own defaultTheme / defaultPalette (or theme / palette) to its subtree and the overlays opened from it, without touching  (see Scoped palettes below).

### Cookie persistence

ThemeProvider (and ConfigProvider with persist) writes the choice to two cookies: theme ("light", "dark" or "system") and palette (a palette name; removed for the default look). They last one year, use path=/ and SameSite=Lax, and are readable on the server, which is what makes flash-free SSR possible. After hydration the provider restores the cookie values once. Pass disableStorage to ThemeProvider (or leave persist off) to keep the choice in memory only. The same helpers are available for your own server code:

### Server rendering without a flash

The server cannot know the visitor's system color scheme, and React only applies the theme after hydration. Two pieces close that gap: read the cookies on the server and pass them as defaults to the provider, and inline THEME_INIT_SCRIPT in . That small render-blocking script reads the cookies (falling back to prefers-color-scheme) and sets data-theme, data-palette and color-scheme before the first paint, so the page never flashes the wrong theme.

Next.js App Router

Any other SSR setup

The init script changes attributes of  before React hydrates, so the server markup and the DOM differ on purpose. Add suppressHydrationWarning to  and to the  element; it only silences that one element's attribute warnings, not those of its children. Import everything server-side from minerva-design/theme-utils: it has no "use client" banner and can be called in a Server Component.

### createThemeInitScript

THEME_INIT_SCRIPT is createThemeInitScript() with the default options. Build your own when the defaults should differ:

Option

Default

Mode used when the theme cookie is missing or invalid. "system" resolves to light or dark with prefers-color-scheme.

Palette used when the palette cookie is missing or invalid and  has no valid data-palette yet. null leaves data-palette unset (Minerva's default look).

Resolution order of the script: the theme cookie, else defaultTheme. The palette cookie, else a valid data-palette already rendered on , else defaultPalette. Keep the script inline (not async, not deferred) and before the stylesheet so it runs before the first paint.

### Server-safe helpers

All of these come from minerva-design/theme-utils, a tiny entry without React and without "use client". They are safe in Server Components, middleware and edge functions.

Export

Default init script as a string: cookie mode (else system), cookie palette (else the data-palette already on , else none). Inline it in .

Builds an init script with other defaults (see the options above).

Parses both cookies from a Cookie header and returns { theme, palette }, with optional defaults for missing values.

Validates a raw theme cookie value; invalid or missing values return the fallback ("system").

Validates a raw palette cookie value; invalid or missing values return the fallback (null).

Reads and URI-decodes one cookie from a Cookie header or document.cookie; undefined when absent.

Returns a Set-Cookie style string (path=/, one year, SameSite=Lax) for a theme or palette value.

Type guards for ThemeMode and Palette values.

The built-in palette names, in order: editorial, tech, graphite, cool.

Cookie names ("theme", "palette") and their lifetime in seconds (one year).

### Scoped palettes

The palette blocks of style.css are attribute selectors, so they match any element, not only . The simplest way to render a subtree with another palette or mode is a nested provider:  or  scopes it to its children and to their overlays. Without a provider, put data-palette and data-theme on a wrapper yourself: set both attributes and give the wrapper a background, because the tokens change but nothing paints them until an element uses them.

### New tokens

Palettes introduced a few semantic color tokens and a set of scale tokens. Every token has a default in style.css, so they work with or without a palette and with custom themes.

Semantic color tokens

Variable

Very soft background for sidebars, table headers and code blocks.

Application background behind surfaces, such as an app shell canvas. Defaults to the subtle surface.

Background of form controls such as inputs and selects. Defaults to the subtle surface.

Background of hovered rows and items. Defaults to the muted surface.

Background of selected rows, items and tabs: a light tint of the primary color.

Low-emphasis text for captions and helper text, between secondary and disabled text.

Secondary accent for calls to action, ratings and highlights. Defaults to the primary color; palettes set their own.

accent is also a full color role, like primary or success: --accent-color-hover, -active, -subtle, -border and -text are derived automatically.

Scale tokens

Scale tokens do not change with the mode (palettes may only swap the font stacks). Components use them through CSS variables, and numeric gap or padding props resolve to var(--space-).

Group

Variables

Spacing

A 4px-based rem scale. Fractional steps use a dash: --space-0-5 is 0.125rem.

Radius

Extra radii next to --radius-sm, -md and -lg, which stay theme tokens.

Font sizes

From 0.75rem (xs) to 3.75rem (6xl); md (0.875rem) is the body size of components.

Weights and line heights

Font weights from 400 to 700 and three line heights.

Font families

Body, display and monospace stacks. Palettes override them.

Layering

z-index layers used by dropdowns, sticky elements, overlays, modals, popovers and toasts.

Motion

Transition durations and easing curves.

Rhythm and elevation

Fluid vertical spacing between sections and blocks, and elevation aliases of the shadow tokens.

Focus

Width and offset of the focus ring.

```tsx
import { ThemeProvider, ThemeToggle, PaletteToggle } from "minerva-design";
import "minerva-design/style.css";

export default function Root() {
  return (
    // mode: "light" | "dark" | "system" (default)
    // palette: "editorial" | "tech" | "graphite" | "cool" | null (default look)
    <ThemeProvider defaultTheme="system" defaultPalette="editorial">
      <header>
        <ThemeToggle />
        <PaletteToggle showDefault />
      </header>
      <App />
    </ThemeProvider>
  );
}
```

```tsx
import { ConfigProvider, ToastProvider, toast } from "minerva-design";

// The same thing with ConfigProvider (ThemeProvider is a preset over it):
// "system" is an alias of "auto"; persist turns on the cookies.
<ConfigProvider
  theme="system"
  palette="editorial"
  persist
  onThemeChange={(theme) => toast.info(`Theme: ${theme}`)}
  onPaletteChange={(palette) => toast.info(`Palette: ${palette}`)}
>
  <ToastProvider>
    <App />
  </ToastProvider>
</ConfigProvider>;
```

```tsx
import { Button, useTheme } from "minerva-design";

function Settings() {
  const { theme, resolvedTheme, palette, setTheme, setPalette } = useTheme();
  return (
    <>
      <p>{theme} → {resolvedTheme} · {palette ?? "default"}</p>
      <Button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
        Toggle mode
      </Button>
      <Button onClick={() => setPalette("tech")}>Tech palette</Button>
    </>
  );
}
```

```html
<!-- palette + light / dark / system: tokens come from style.css -->
<html data-theme="dark" data-palette="tech" style="color-scheme: dark">

<!-- no palette, or github-dark / a custom theme object: inline variables -->
<html data-theme="light" style="color-scheme: light; --primary-color: #2563eb; ...">
```

```tsx
import {
  THEME_COOKIE_NAME,     // "theme"   -> "light" | "dark" | "system"
  PALETTE_COOKIE_NAME,   // "palette" -> "editorial" | "tech" | "graphite" | "cool"
  readCookieValue,
  parseThemeCookie,
  parsePaletteCookie,
  serializeThemeCookie,
} from "minerva-design/theme-utils";

// Read on the server (or from document.cookie)
const theme = parseThemeCookie(readCookieValue(cookieHeader, THEME_COOKIE_NAME));
const palette = parsePaletteCookie(readCookieValue(cookieHeader, PALETTE_COOKIE_NAME));

// Write from a route handler / server action (path=/, one year, SameSite=Lax)
response.headers.append("Set-Cookie", serializeThemeCookie(THEME_COOKIE_NAME, "dark"));
```

```tsx
// app/layout.tsx: a Server Component (no "use client")
import { headers } from "next/headers";
import { ThemeProvider } from "minerva-design";
import {
  THEME_INIT_SCRIPT,
  parseThemeCookies,
} from "minerva-design/theme-utils";
import "minerva-design/style.css";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { theme, palette } = parseThemeCookies((await headers()).get("cookie"), {
    palette: "editorial",
  });

  return (
    // the init script changes <html> attributes before React hydrates
    <html
      lang="en"
      suppressHydrationWarning
      data-theme={theme === "system" ? undefined : theme}
      data-palette={palette ?? undefined}
    >
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body>
        <ThemeProvider defaultTheme={theme} defaultPalette={palette}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
// server.tsx: any SSR setup (Express, Hono, a Vite SSR server...)
import { renderToString } from "react-dom/server";
import { ThemeProvider } from "minerva-design";
import { THEME_INIT_SCRIPT, parseThemeCookies } from "minerva-design/theme-utils";

app.get("*", (req, res) => {
  const { theme, palette } = parseThemeCookies(req.headers.cookie);
  const body = renderToString(
    <ThemeProvider defaultTheme={theme} defaultPalette={palette}>
      <App url={req.url} />
    </ThemeProvider>,
  );
  res.send(`<!doctype html>
<html${palette ? ` data-palette="${palette}"` : ""}>
  <head>
    <script>${THEME_INIT_SCRIPT}</script>
    <link rel="stylesheet" href="/assets/style.css" />
  </head>
  <body><div id="root">${body}</div></body>
</html>`);
});
```

```tsx
import { createThemeInitScript } from "minerva-design/theme-utils";

// Dark by default, "graphite" when the visitor has no palette cookie yet
export const themeInitScript = createThemeInitScript({
  defaultTheme: "dark",
  defaultPalette: "graphite",
});
```

```tsx
// A nested provider scopes a palette / mode to its subtree (and to the
// overlays opened from it). <html> and the cookies are left to the root one.
<ThemeProvider defaultTheme="dark" defaultPalette="tech">
  <Button color="primary">Always tech / dark</Button>
</ThemeProvider>

// Without a provider: palette token blocks match any element, not only
// <html>. Set both attributes and give the wrapper a background.
<div data-palette="tech" data-theme="dark" style={{ background: "var(--background-color)" }}>
  <Button color="primary">Always tech / dark</Button>
</div>
```

## PaletteToggle

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/palette-toggle",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "palettes",
    "typeText": "Palette[]",
    "attribute": "palettes",
    "required": false
  },
  {
    "name": "showDefault",
    "typeText": "boolean",
    "attribute": "show-default",
    "required": false
  },
  {
    "name": "persist",
    "typeText": "boolean",
    "attribute": "persist",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "Partial<Record<Palette | \"default\", string>> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null; }>",
    "detailType": {
      "typeText": "{ value: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null; }",
      "typeRef": "type:390662b672658a5fb4f5"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The user picked a palette (`detail: { value }`, `null` = default look); cancelable: `preventDefault()` keeps the current palette"
  }
]
```

## PresetToggle

Support: n/a

Mobile component of minerva-design/native (React Native); on the web use the responsive web components.

## ThemeProvider

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## ThemeToggle

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/theme-toggle",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "hideSystem",
    "typeText": "boolean",
    "attribute": "hide-system",
    "required": false
  },
  {
    "name": "persist",
    "typeText": "boolean",
    "attribute": "persist",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "Partial<Record<ThemeMode, string>> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: ThemeMode; }>",
    "detailType": {
      "typeText": "{ value: ThemeMode; }",
      "typeRef": "type:717b2ddb7749fda197ba"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The user picked a theme (`detail: { value }`); cancelable: `preventDefault()` keeps the current theme"
  }
]
```

## API

```json
{
  "wc:minerva-theme-toggle": {
    "kind": "element",
    "source": "web-components/src/components/theme-toggle/theme-toggle.ts",
    "className": "MinervaThemeToggle",
    "summary": "Light / dark / system theme switch.",
    "description": "Light / dark / system switch (`<ThemeToggle>` of React): a group of toggle buttons (`aria-pressed`) bound to the `theme` of the closest `<minerva-config>`, or, without one, to `<html data-theme>` (+ the `color-scheme`; \"system\" follows the OS setting). With `persist` the choice is stored in the `theme` cookie (core's `serializeThemeCookie`).",
    "properties": [
      {
        "name": "hideSystem",
        "attribute": "hide-system",
        "type": "boolean",
        "default": "false",
        "description": "Hides the \"system\" (follow the OS) option"
      },
      {
        "name": "persist",
        "attribute": "persist",
        "type": "boolean",
        "default": "false",
        "description": "Persists the choice in the `theme` / `palette` cookies (like the React library's ThemeProvider) when the toggle drives `<html>` (no `<minerva-config>`)"
      },
      {
        "name": "labels",
        "type": "Partial<Record<ThemeMode, string>> | undefined",
        "description": "Overrides of the option labels (defaults are localized)"
      },
      {
        "name": "theme",
        "type": "ThemeMode | null",
        "readonly": true,
        "description": "Current theme of the scope (`null` when the scope has none)."
      },
      {
        "name": "resolvedTheme",
        "type": "\"light\" | \"dark\"",
        "readonly": true,
        "description": "Light / dark mode currently applied."
      }
    ],
    "methods": [],
    "events": [
      {
        "name": "minerva-change",
        "description": "The user picked a theme (`detail: { value }`); cancelable: `preventDefault()` keeps the current theme"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The role=group wrapper"
      },
      {
        "name": "item",
        "description": "Every option button (aria-pressed on the selected one)"
      },
      {
        "name": "item--active",
        "description": "Item state of `item`: active"
      },
      {
        "name": "item--inactive",
        "description": "Item state of `item`: inactive"
      }
    ],
    "cssProperties": [
      {
        "name": "--theme-toggle-gap",
        "description": "Space between the options"
      },
      {
        "name": "--theme-toggle-padding",
        "description": "Inner padding of the group"
      },
      {
        "name": "--theme-toggle-radius",
        "description": "Corner radius of the group (defaults to --radius-lg; options use --radius-md)"
      },
      {
        "name": "--theme-toggle-background",
        "description": "Background of the group"
      },
      {
        "name": "--theme-toggle-item-height",
        "description": "Minimum height of an option (follows the density's control height)"
      },
      {
        "name": "--theme-toggle-item-min-width",
        "description": "Minimum width of an option"
      },
      {
        "name": "--theme-toggle-active-background",
        "description": "Background of the selected option"
      }
    ]
  },
  "wc:minerva-palette-toggle": {
    "kind": "element",
    "source": "web-components/src/components/theme-toggle/theme-toggle.ts",
    "className": "MinervaPaletteToggle",
    "summary": "Color palette switch.",
    "description": "Palette switch (`<PaletteToggle>` of React), orthogonal to the light / dark mode: bound to the `palette` of the closest `<minerva-config>`, or, without one, to `<html data-palette>`. With `persist` the choice is stored in the `palette` cookie.",
    "properties": [
      {
        "name": "palettes",
        "attribute": "palettes",
        "type": "Palette[]",
        "default": "[...PALETTES]",
        "description": "Palettes offered, in order (attribute: space / comma separated)"
      },
      {
        "name": "showDefault",
        "attribute": "show-default",
        "type": "boolean",
        "default": "false",
        "description": "Also offers Minerva's default look (no palette) as the first option"
      },
      {
        "name": "persist",
        "attribute": "persist",
        "type": "boolean",
        "default": "false",
        "description": "Persists the choice in the `theme` / `palette` cookies (like the React library's ThemeProvider) when the toggle drives `<html>` (no `<minerva-config>`)"
      },
      {
        "name": "labels",
        "type": "Partial<Record<Palette | \"default\", string>> | undefined",
        "description": "Overrides of the option labels (`default` labels the no-palette option)"
      },
      {
        "name": "palette",
        "type": "Palette | null",
        "readonly": true,
        "description": "Current palette of the scope (`null` = default look)."
      }
    ],
    "methods": [],
    "events": [
      {
        "name": "minerva-change",
        "description": "The user picked a palette (`detail: { value }`, `null` = default look); cancelable: `preventDefault()` keeps the current palette"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The role=group wrapper"
      },
      {
        "name": "item",
        "description": "Every option button (aria-pressed on the selected one)"
      },
      {
        "name": "item--active",
        "description": "Item state of `item`: active"
      },
      {
        "name": "item--inactive",
        "description": "Item state of `item`: inactive"
      }
    ],
    "cssProperties": [
      {
        "name": "--theme-toggle-gap",
        "description": "Space between the options"
      },
      {
        "name": "--theme-toggle-padding",
        "description": "Inner padding of the group"
      },
      {
        "name": "--theme-toggle-radius",
        "description": "Corner radius of the group (defaults to --radius-lg; options use --radius-md)"
      },
      {
        "name": "--theme-toggle-background",
        "description": "Background of the group"
      },
      {
        "name": "--theme-toggle-item-height",
        "description": "Minimum height of an option (follows the density's control height)"
      },
      {
        "name": "--theme-toggle-item-min-width",
        "description": "Minimum width of an option"
      },
      {
        "name": "--theme-toggle-active-background",
        "description": "Background of the selected option"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:ThemeToggle": {
    "kind": "cssVars",
    "source": "react/src/components/ThemeToggle",
    "vars": [
      {
        "name": "--theme-toggle-gap",
        "description": "Space between the options"
      },
      {
        "name": "--theme-toggle-padding",
        "description": "Inner padding of the group"
      },
      {
        "name": "--theme-toggle-radius",
        "description": "Corner radius of the group (defaults to --radius-lg; options use --radius-md)"
      },
      {
        "name": "--theme-toggle-background",
        "description": "Background of the group"
      },
      {
        "name": "--theme-toggle-item-height",
        "description": "Minimum height of an option (follows the density's control height)"
      },
      {
        "name": "--theme-toggle-item-min-width",
        "description": "Minimum width of an option"
      },
      {
        "name": "--theme-toggle-active-background",
        "description": "Background of the selected option"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Theme toggle

Light / dark / system buttons (aria-pressed) bound to the theme of the closest <minerva-config>; without one they drive <html data-theme>.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/theme-palette/wc/basic.html

```html
<minerva-config theme="light">
  <minerva-card variant="outline" padding="medium" style="max-width: 420px">
    <minerva-card-header>
      <minerva-card-title>Appearance</minerva-card-title>
      <minerva-card-description
        >The toggle drives the theme of the closest minerva-config
        only.</minerva-card-description
      >
    </minerva-card-header>
    <minerva-card-content>
      <minerva-theme-toggle></minerva-theme-toggle>
    </minerva-card-content>
  </minerva-card>
</minerva-config>

```

## Example: Labels and events

palettes picks the options, the labels property renames them, and minerva-change is cancelable (check Lock to keep the theme).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/theme-palette/wc/events.html

```html
<minerva-config theme="light">
  <minerva-card variant="outline" padding="medium" style="max-width: 520px">
    <minerva-card-content style="display: grid; gap: 12px">
      <minerva-theme-toggle id="theme" hide-system></minerva-theme-toggle>
      <minerva-palette-toggle
        id="palette"
        palettes="editorial graphite"
      ></minerva-palette-toggle>
      <label style="display: flex; gap: 8px; align-items: center">
        <input id="lock" type="checkbox" />
        Lock the theme (cancels minerva-change)
      </label>
      <output id="log"></output>
    </minerva-card-content>
  </minerva-card>
</minerva-config>

```

### apps/docs/src/docs/pages/theme-palette/wc/events.ts

```tsx
// labels overrides the option texts; minerva-change is cancelable.
type ThemeToggle = HTMLElement & {
  labels?: Partial<Record<"light" | "dark" | "system", string>>;
  resolvedTheme: "light" | "dark";
};
type PaletteToggle = HTMLElement & {
  labels?: Partial<Record<string, string>>;
};

export function setup(root: HTMLElement) {
  const theme = root.querySelector<ThemeToggle>("#theme")!;
  const palette = root.querySelector<PaletteToggle>("#palette")!;
  const lock = root.querySelector<HTMLInputElement>("#lock")!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  theme.labels = { light: "☀️ Day", dark: "🌙 Night" };
  palette.labels = { editorial: "Paper", graphite: "Ink" };

  const onTheme = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    if (lock.checked) {
      e.preventDefault();
      log.value = `Blocked: ${value} (still ${theme.resolvedTheme})`;
    } else log.value = `Theme: ${value}`;
  };
  const onPalette = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string | null }>).detail;
    log.value = `Palette: ${value ?? "default"}`;
  };
  theme.addEventListener("minerva-change", onTheme);
  palette.addEventListener("minerva-change", onPalette);
  return () => {
    theme.removeEventListener("minerva-change", onTheme);
    palette.removeEventListener("minerva-change", onPalette);
  };
}

```

## Example: Palette toggle

The palette is orthogonal to the mode: show-default adds Minerva's default look, hide-system keeps light and dark only.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/theme-palette/wc/palette.html

```html
<minerva-config theme="light" palette="tech">
  <minerva-card variant="outline" padding="medium" style="max-width: 520px">
    <minerva-card-content style="display: grid; gap: 12px">
      <minerva-palette-toggle show-default></minerva-palette-toggle>
      <minerva-theme-toggle hide-system></minerva-theme-toggle>
      <div style="display: flex; flex-wrap: wrap; gap: 8px">
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
        <minerva-button color="success" variant="ghost">Success</minerva-button>
      </div>
    </minerva-card-content>
  </minerva-card>
</minerva-config>

```
