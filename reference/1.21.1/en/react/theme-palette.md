# Theme & Palette

Two independent axes, a light / dark / system mode and a color palette, with cookie persistence and flash-free server rendering.

Package: minerva-design@1.21.1

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

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
  "specifier": "minerva-design",
  "exports": [
    "PaletteToggle"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "palettes",
    "source": "packages/react/src/components/ThemeToggle/types.ts",
    "kind": "array",
    "typeText": "(\"editorial\" | \"tech\" | \"graphite\" | \"cool\")[] | undefined",
    "typeRef": "type:0a61f358e05925bc041d",
    "required": false,
    "description": "Palettes offered, in order"
  },
  {
    "name": "showDefault",
    "source": "packages/react/src/components/ThemeToggle/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Also offer Minerva's default look (no palette) as the first option"
  },
  {
    "name": "labels",
    "source": "packages/react/src/components/ThemeToggle/types.ts",
    "kind": "object",
    "typeText": "Partial<Record<\"default\" | \"editorial\" | \"tech\" | \"graphite\" | \"cool\", string>> | undefined",
    "typeRef": "type:d45a45bbe86657f1037e",
    "required": false,
    "description": "Override the button labels (`default` labels the no-palette option)"
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

## PresetToggle

Support: n/a

Mobile component of minerva-design/native (React Native); on the web use the responsive web components.

## ThemeProvider

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "ThemeProvider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "defaultTheme",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "dark",
      "light",
      "system"
    ],
    "typeText": "ThemeMode | undefined",
    "typeRef": "type:293f77323be9bd072cec",
    "required": false,
    "description": "Initial mode. For SSR pass the value parsed from the request cookie so the server markup matches the client."
  },
  {
    "name": "defaultPalette",
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
    "description": "Initial palette (`null` = Minerva's default look). For SSR pass the parsed `palette` cookie."
  },
  {
    "name": "primaryColor",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "union",
    "typeText": "PrimaryColor | null | undefined",
    "typeRef": "type:f612ad4ccbeed997ce22",
    "required": false,
    "description": "Brand color, as `ConfigProvider`'s `primaryColor` (a color, or `{ light, dark }`); the light / dark mode stays the user's choice"
  },
  {
    "name": "disableStorage",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Do not read / write the theme cookies (tests, embedded previews). Nested providers never use the cookies."
  },
  {
    "name": "locale",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "object",
    "typeText": "Locale | undefined",
    "typeRef": "type:faa2d1cac8abe6cb7ce4",
    "required": false,
    "description": "Language of the React library's built-in texts"
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
    "typeText": "((theme: ThemeMode) => void) | undefined",
    "typeRef": "type:500bb726e7e2dabac339",
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
    "required": false,
    "description": "Called when the mode changes"
  },
  {
    "name": "onPaletteChange",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "function",
    "typeText": "((palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null) => void) | undefined",
    "typeRef": "type:16baf768edd6ac7f1adc",
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
    "description": "Called when the palette changes"
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

## ThemeToggle

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "ThemeToggle"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "showSystem",
    "source": "packages/react/src/components/ThemeToggle/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Show the \"system\" (follow the OS) option"
  },
  {
    "name": "labels",
    "source": "packages/react/src/components/ThemeToggle/types.ts",
    "kind": "object",
    "typeText": "Partial<Record<ThemeMode, string>> | undefined",
    "typeRef": "type:e54adf9eea9935a3df48",
    "required": false,
    "description": "Override the button labels (defaults come from the React library's locale)"
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

## API

```json
{
  "ThemeProviderProps": {
    "source": "react/src/contexts/types.ts",
    "description": "Props of `ThemeProvider`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "defaultTheme",
        "type": "ThemeMode",
        "required": false,
        "default": "\"system\" (nested: the parent's theme)",
        "description": "Initial mode. For SSR pass the value parsed from the request cookie so the server markup matches the client."
      },
      {
        "name": "defaultPalette",
        "type": "Palette | null",
        "required": false,
        "default": "null (nested: the parent's palette)",
        "description": "Initial palette (`null` = Minerva's default look). For SSR pass the parsed `palette` cookie."
      },
      {
        "name": "primaryColor",
        "type": "PrimaryColor | null",
        "required": false,
        "default": "null (nested: the parent's brand color)",
        "description": "Brand color, as `ConfigProvider`'s `primaryColor` (a color, or `{ light, dark }`); the light / dark mode stays the user's choice"
      },
      {
        "name": "disableStorage",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Do not read / write the theme cookies (tests, embedded previews). Nested providers never use the cookies."
      },
      {
        "name": "locale",
        "type": "Locale",
        "required": false,
        "description": "Language of the React library's built-in texts"
      },
      {
        "name": "onThemeChange",
        "type": "(theme: ThemeMode) => void",
        "required": false,
        "description": "Called when the mode changes"
      },
      {
        "name": "onPaletteChange",
        "type": "(palette: Palette | null) => void",
        "required": false,
        "description": "Called when the palette changes"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Application content"
      }
    ]
  },
  "ThemeContextValue": {
    "source": "react/src/contexts/types.ts",
    "description": "Value returned by `useTheme()`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "theme",
        "type": "ThemeMode",
        "required": true,
        "description": "Mode chosen by the user (\"system\" follows the OS)"
      },
      {
        "name": "resolvedTheme",
        "type": "ResolvedThemeMode",
        "required": true,
        "description": "Mode actually applied (\"light\" / \"dark\")"
      },
      {
        "name": "palette",
        "type": "Palette | null",
        "required": true,
        "description": "Active palette, `null` for Minerva's default look"
      },
      {
        "name": "setTheme",
        "type": "(theme: ThemeMode) => void",
        "required": true,
        "description": "Change the mode (writes the `theme` cookie unless storage is disabled)"
      },
      {
        "name": "setPalette",
        "type": "(palette: Palette | null) => void",
        "required": true,
        "description": "Change the palette (writes the `palette` cookie unless storage is disabled)"
      }
    ]
  },
  "ThemeToggleProps": {
    "source": "react/src/components/ThemeToggle/types.ts",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLDivElement>"
    ],
    "props": [
      {
        "name": "showSystem",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Show the \"system\" (follow the OS) option"
      },
      {
        "name": "labels",
        "type": "Partial<Record<ThemeMode, string>>",
        "required": false,
        "description": "Override the button labels (defaults come from the React library's locale)"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the group element"
      }
    ]
  },
  "PaletteToggleProps": {
    "source": "react/src/components/ThemeToggle/types.ts",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLDivElement>"
    ],
    "props": [
      {
        "name": "palettes",
        "type": "Palette[]",
        "required": false,
        "default": "[\"editorial\", \"tech\", \"graphite\", \"cool\"]",
        "description": "Palettes offered, in order"
      },
      {
        "name": "showDefault",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Also offer Minerva's default look (no palette) as the first option"
      },
      {
        "name": "labels",
        "type": "Partial<Record<Palette | \"default\", string>>",
        "required": false,
        "description": "Override the button labels (`default` labels the no-palette option)"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the group element"
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

## Example: All palettes

Every palette in light and dark mode, rendered from the exported palettes object (palettes[name][mode] is a complete ComponentTheme).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/theme-palette/demos/palette-swatches.tsx

```tsx
import { palettes } from "minerva-design";
import { PALETTES } from "minerva-design/theme-utils";

const MODES = ["light", "dark"] as const;

// Tokens shown for each palette x mode (values read from `palettes`)
const TOKENS = [
  "primary-color",
  "accent-color",
  "success-color",
  "warning-color",
  "danger-color",
  "info-color",
  "border-color",
] as const;

export default function PaletteSwatchesDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 12,
      }}
    >
      {PALETTES.flatMap((name) =>
        MODES.map((mode) => {
          const tokens = palettes[name][mode];
          return (
            <figure
              key={`${name}-${mode}`}
              style={{
                margin: 0,
                padding: 14,
                borderRadius: 10,
                border: `1px solid ${tokens["border-color"]}`,
                background: tokens["background-color"],
                color: tokens["text-color"],
                fontFamily: tokens["font-family-sans"],
              }}
            >
              <figcaption
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  fontWeight: 600,
                }}
              >
                <span>{name}</span>
                <span style={{ color: tokens["text-muted-color"] }}>
                  {mode}
                </span>
              </figcaption>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {TOKENS.map((token) => (
                  <span
                    key={token}
                    title={`--${token}: ${tokens[token]}`}
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      background: tokens[token],
                      border: `1px solid ${tokens["border-strong-color"]}`,
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  marginTop: 10,
                  padding: "6px 8px",
                  borderRadius: 6,
                  background: tokens["surface-subtle-color"],
                  color: tokens["text-secondary-color"],
                  fontSize: 12,
                }}
              >
                {tokens["primary-color"]} / {tokens["accent-color"]}
              </div>
            </figure>
          );
        }),
      )}
    </div>
  );
}

```

## Example: ThemeToggle and PaletteToggle

The nested preview starts with the editorial palette. Change its theme or palette without changing the surrounding documentation.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/theme-palette/demos/toggles.tsx

```tsx
import {
  Button,
  HStack,
  PaletteToggle,
  Switch,
  Tag,
  ThemeProvider,
  ThemeToggle,
  useTheme,
} from "minerva-design";

// In an application, one provider at the root is all you need:
//
//   <ThemeProvider defaultPalette="editorial">
//     <ThemeToggle />
//     <PaletteToggle />
//   </ThemeProvider>
//
// Here a nested ThemeProvider is used: it scopes its mode and palette to its
// own subtree (no <html> attributes, no cookies), so the toggles re-theme
// this preview without touching the rest of the docs site.
function Preview() {
  const { resolvedTheme, palette } = useTheme();
  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        padding: 20,
        borderRadius: 12,
        border: "1px solid var(--border-color)",
        background: "var(--background-color)",
        color: "var(--text-color)",
        fontFamily: "var(--font-family-sans)",
      }}
    >
      <HStack gap={4} wrap>
        <ThemeToggle />
        <PaletteToggle />
      </HStack>
      <HStack gap={4} wrap>
        <Button color="primary">Primary</Button>
        <Button color="neutral" variant="outline">
          Secondary
        </Button>
        <Tag color="primary">{palette ?? "default"}</Tag>
        <Tag color="info">{resolvedTheme}</Tag>
        <Switch label="Switch" defaultChecked />
      </HStack>
      <p style={{ margin: 0, color: "var(--text-muted-color)" }}>
        Theme: {resolvedTheme}; palette: {palette ?? "default"}
      </p>
    </div>
  );
}

export default function TogglesDemo() {
  return (
    <ThemeProvider defaultTheme="system" defaultPalette="editorial">
      <Preview />
    </ThemeProvider>
  );
}

```

## Example: Reading the theme

useTheme() and useConfig() of this site's provider. Change the theme or palette in the header to see the values update.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/theme-palette/demos/use-theme.tsx

```tsx
import { Tag, useConfig, useTheme } from "minerva-design";

// useTheme() reads the closest ThemeProvider / ConfigProvider. This site wraps
// every page in one: change the theme or palette in the header and the values
// below follow. (github-dark is not a light / dark / system mode, so useTheme
// falls back to "system" while useConfig().mode is undefined.)
export default function UseThemeDemo() {
  const { theme, resolvedTheme, palette } = useTheme();
  const config = useConfig();

  const rows: [string, string][] = [
    ["useTheme().theme", theme],
    ["useTheme().resolvedTheme", resolvedTheme],
    ["useTheme().palette", palette ?? "null"],
    ["useConfig().mode", config.mode ?? "undefined"],
    ["useConfig().resolvedMode", config.resolvedMode ?? "undefined"],
    ["useConfig().palette", config.palette ?? "null"],
  ];

  return (
    <dl
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "8px 16px",
        margin: 0,
      }}
    >
      {rows.map(([label, value]) => (
        <div key={label} style={{ display: "contents" }}>
          <dt>
            <code>{label}</code>
          </dt>
          <dd style={{ margin: 0 }}>
            <Tag color="primary">{value}</Tag>
          </dd>
        </div>
      ))}
    </dl>
  );
}

```
