# Theme & Palette

Two independent axes, a light / dark / system mode and a color palette, with cookie persistence and flash-free server rendering.

Package: minerva-design@1.23.0

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "array",
    "typeText": "readonly (\"editorial\" | \"tech\" | \"graphite\" | \"cool\")[] | undefined",
    "typeRef": "type:dc4f14752e48383655c4",
    "required": false,
    "description": "Palettes offered, in order"
  },
  {
    "name": "showDefault",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Also offer Minerva's default look (no palette) as the first option"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "object",
    "typeText": "Partial<Record<PaletteToggleValue, string>> | undefined",
    "typeRef": "type:6c6e8e3750d7f1c3960e",
    "required": false,
    "description": "Override the option labels (`default` labels the no-palette option)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "enum",
    "values": [
      "medium",
      "small"
    ],
    "typeText": "ThemeToggleSize | undefined",
    "typeRef": "type:dfbe2e25c218fbac4bd4",
    "default": "medium",
    "required": false,
    "description": "Control size"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the control"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "function",
    "typeText": "((value: PaletteToggleValue) => void) | undefined",
    "typeRef": "type:952745af5b23d9eb5fe3",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "PaletteToggleValue",
        "typeRef": "type:441fe733a26b332e271d"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the chosen palette (`\"default\"`: no palette)"
  }
]
```

## PresetToggle

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "PresetToggle"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "presets",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "array",
    "typeText": "readonly (\"editorial\" | \"minerva\" | \"compact\" | \"touch\")[] | undefined",
    "typeRef": "type:04a395374e29e221ee72",
    "required": false,
    "description": "Presets offered, in order"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "object",
    "typeText": "Partial<Record<\"editorial\" | \"minerva\" | \"compact\" | \"touch\", string>> | undefined",
    "typeRef": "type:7c2b54737942397ebdd4",
    "required": false,
    "description": "Override the option labels"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "enum",
    "values": [
      "medium",
      "small"
    ],
    "typeText": "ThemeToggleSize | undefined",
    "typeRef": "type:dfbe2e25c218fbac4bd4",
    "default": "medium",
    "required": false,
    "description": "Control size"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the control"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "function",
    "typeText": "((value: \"editorial\" | \"minerva\" | \"compact\" | \"touch\") => void) | undefined",
    "typeRef": "type:cebbc973a2c15539075f",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "\"editorial\" | \"minerva\" | \"compact\" | \"touch\"",
        "typeRef": "type:3740df1fe5f05eb49097"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the chosen preset (after `setPreset`)"
  }
]
```

## ThemeProvider

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "name": "theme",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "dark",
      "light",
      "system"
    ],
    "typeText": "ThemeMode | undefined",
    "typeRef": "type:293f77323be9bd072cec",
    "default": "system",
    "required": false,
    "description": "Color mode: \"light\", \"dark\", or \"system\" (follows the OS appearance through `useColorScheme`). Same values as the web `ConfigProvider` modes. Uncontrolled after the first render: change it with `setThemeMode` (`useTheme()`) or by passing a new value."
  },
  {
    "name": "palette",
    "source": "packages/native/src/theme/types.ts",
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
    "description": "Built-in palette (\"editorial\", \"tech\", \"graphite\", \"cool\"); `null` keeps Minerva's default look"
  },
  {
    "name": "primaryColor",
    "source": "packages/native/src/theme/types.ts",
    "kind": "union",
    "typeText": "PrimaryColor | null | undefined",
    "typeRef": "type:f612ad4ccbeed997ce22",
    "required": false,
    "description": "Brand color: a CSS color (`\"#4f46e5\"`, `rgb()`...) for both modes, or a `{ light, dark }` pair. A single color gets a lighter dark-mode value with enough contrast on dark surfaces (`derivePrimaryDark`). Every token derived from `primary-color` (hover, active, subtle, border, text, focus ring, selection...) is recomputed from it. Wins over the palette's primary color; `overrides` still win over it. Unset: the parent provider's; `null`: the theme / palette's own. Invalid colors are ignored (with a development warning)."
  },
  {
    "name": "preset",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "compact",
      "editorial",
      "minerva",
      "touch"
    ],
    "typeText": "\"editorial\" | \"minerva\" | \"compact\" | \"touch\" | undefined",
    "typeRef": "type:1c1ec4963e4ae7a8649f",
    "default": "touch",
    "required": false,
    "description": "Design preset: \"minerva\" (default look), \"editorial\", \"compact\" or \"touch\" (consumer mobile apps: comfortable density, 44pt touch targets, large radius)"
  },
  {
    "name": "density",
    "source": "packages/native/src/theme/types.ts",
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
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "none",
      "small"
    ],
    "typeText": "\"none\" | \"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:1158e24eb483a4cd6fbe",
    "required": false,
    "description": "Corner radius scale"
  },
  {
    "name": "shadow",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "none",
      "standard",
      "subtle"
    ],
    "typeText": "\"standard\" | \"none\" | \"subtle\" | undefined",
    "typeRef": "type:47bcd12f79e654091e49",
    "required": false,
    "description": "Elevation shadow scale"
  },
  {
    "name": "fontScale",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "small",
      "standard"
    ],
    "typeText": "\"standard\" | \"small\" | \"large\" | undefined",
    "typeRef": "type:86445c94907554063d7f",
    "required": false,
    "description": "Type scale"
  },
  {
    "name": "overrides",
    "source": "packages/native/src/theme/types.ts",
    "kind": "union",
    "typeText": "Readonly<Record<string, TokenValue | undefined>> | Partial<ComponentTheme> | undefined",
    "typeRef": "type:f989e4e5899a9ce2f235",
    "required": false,
    "description": "Token overrides (names without `--`, e.g. `{ \"primary-color\": \"#e11d48\" }`), applied over the mode / palette / design; may reference other tokens (`var(--x)`) and use `color-mix()`"
  },
  {
    "name": "locale",
    "source": "packages/native/src/theme/types.ts",
    "kind": "object",
    "typeText": "NativeLocale | undefined",
    "typeRef": "type:149d41d21bc4ddc91623",
    "required": false,
    "description": "Language and extra messages of the built-in texts"
  },
  {
    "name": "insets",
    "source": "packages/native/src/theme/types.ts",
    "kind": "object",
    "typeText": "Partial<EdgeInsets> | undefined",
    "typeRef": "type:d4cbbc6e4d016c5d57de",
    "required": false,
    "description": "Safe-area insets used by toasts, popups, action sheets and the nav / tab bars. Pass `useSafeAreaInsets()` of `react-native-safe-area-context`"
  },
  {
    "name": "fonts",
    "source": "packages/native/src/theme/types.ts",
    "kind": "object",
    "typeText": "NativeFonts | undefined",
    "typeRef": "type:4f09c00c9a5dff981939",
    "required": false,
    "description": "Font families loaded by the app"
  },
  {
    "name": "reducedMotion",
    "source": "packages/native/src/theme/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Instant transitions. Follows the OS \"Reduce motion\" setting when unset"
  }
]
```

### events

```json
[
  {
    "name": "onThemeChange",
    "source": "packages/native/src/theme/types.ts",
    "kind": "function",
    "typeText": "((theme: ThemeMode) => void) | undefined",
    "typeRef": "type:86dba1b7bbdbcf24a818",
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
    "description": "Called when the color mode changes (`setThemeMode`, ThemeToggle)"
  },
  {
    "name": "onPaletteChange",
    "source": "packages/native/src/theme/types.ts",
    "kind": "function",
    "typeText": "((palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null) => void) | undefined",
    "typeRef": "type:11af47bab4686310385a",
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
    "description": "Called when the palette changes (`setPalette`)"
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

## ThemeToggle

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Show the \"system\" (follow the OS) option"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "object",
    "typeText": "Partial<Record<ThemeMode, string>> | undefined",
    "typeRef": "type:e54adf9eea9935a3df48",
    "required": false,
    "description": "Override the option labels (defaults are localized)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "enum",
    "values": [
      "medium",
      "small"
    ],
    "typeText": "ThemeToggleSize | undefined",
    "typeRef": "type:dfbe2e25c218fbac4bd4",
    "default": "medium",
    "required": false,
    "description": "Control size"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the control"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "function",
    "typeText": "((value: ThemeMode) => void) | undefined",
    "typeRef": "type:8ea4ec56fab9309585ab",
    "parameters": [
      {
        "name": "value",
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
    "description": "Called with the chosen mode (after `setThemeMode`)"
  }
]
```

## API

```json
{
  "native:ThemeToggleProps": {
    "source": "native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "interface",
    "extends": [
      "ToggleBaseProps"
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
        "description": "Override the option labels (defaults are localized)"
      },
      {
        "name": "onChange",
        "type": "(value: ThemeMode) => void",
        "required": false,
        "description": "Called with the chosen mode (after `setThemeMode`)"
      }
    ]
  },
  "native:PaletteToggleProps": {
    "source": "native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "interface",
    "extends": [
      "ToggleBaseProps"
    ],
    "props": [
      {
        "name": "palettes",
        "type": "readonly Palette[]",
        "required": false,
        "default": "every built-in palette",
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
        "type": "Partial<Record<PaletteToggleValue, string>>",
        "required": false,
        "description": "Override the option labels (`default` labels the no-palette option)"
      },
      {
        "name": "onChange",
        "type": "(value: PaletteToggleValue) => void",
        "required": false,
        "description": "Called with the chosen palette (`\"default\"`: no palette)"
      }
    ]
  },
  "native:PresetToggleProps": {
    "source": "native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "interface",
    "extends": [
      "ToggleBaseProps"
    ],
    "props": [
      {
        "name": "presets",
        "type": "readonly DesignPreset[]",
        "required": false,
        "default": "every built-in preset",
        "description": "Presets offered, in order"
      },
      {
        "name": "labels",
        "type": "Partial<Record<DesignPreset, string>>",
        "required": false,
        "description": "Override the option labels"
      },
      {
        "name": "onChange",
        "type": "(value: DesignPreset) => void",
        "required": false,
        "description": "Called with the chosen preset (after `setPreset`)"
      }
    ]
  },
  "native:MinervaProviderProps": {
    "source": "native/src/theme/types.ts",
    "description": "Props of `MinervaProvider` (alias `ConfigProvider`)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "theme",
        "type": "ThemeMode",
        "required": false,
        "default": "\"system\"",
        "description": "Color mode: \"light\", \"dark\", or \"system\" (follows the OS appearance through `useColorScheme`). Same values as the web `ConfigProvider` modes. Uncontrolled after the first render: change it with `setThemeMode` (`useTheme()`) or by passing a new value."
      },
      {
        "name": "palette",
        "type": "Palette | null",
        "required": false,
        "default": "the preset's palette (`null` for \"minerva\" / \"touch\")",
        "description": "Built-in palette (\"editorial\", \"tech\", \"graphite\", \"cool\"); `null` keeps Minerva's default look"
      },
      {
        "name": "primaryColor",
        "type": "PrimaryColor | null",
        "required": false,
        "default": "undefined",
        "description": "Brand color: a CSS color (`\"#4f46e5\"`, `rgb()`...) for both modes, or a `{ light, dark }` pair. A single color gets a lighter dark-mode value with enough contrast on dark surfaces (`derivePrimaryDark`). Every token derived from `primary-color` (hover, active, subtle, border, text, focus ring, selection...) is recomputed from it. Wins over the palette's primary color; `overrides` still win over it. Unset: the parent provider's; `null`: the theme / palette's own. Invalid colors are ignored (with a development warning)."
      },
      {
        "name": "preset",
        "type": "DesignPreset",
        "required": false,
        "default": "\"touch\"",
        "description": "Design preset: \"minerva\" (default look), \"editorial\", \"compact\" or \"touch\" (consumer mobile apps: comfortable density, 44pt touch targets, large radius)"
      },
      {
        "name": "density",
        "type": "Density",
        "required": false,
        "default": "the preset's",
        "description": "Spacing density of controls and rows"
      },
      {
        "name": "radius",
        "type": "RadiusScale",
        "required": false,
        "default": "the preset's",
        "description": "Corner radius scale"
      },
      {
        "name": "shadow",
        "type": "ShadowScale",
        "required": false,
        "default": "the preset's",
        "description": "Elevation shadow scale"
      },
      {
        "name": "fontScale",
        "type": "FontScale",
        "required": false,
        "default": "the preset's",
        "description": "Type scale"
      },
      {
        "name": "overrides",
        "type": "Readonly<Record<string, TokenValue | undefined>> | Partial<ComponentTheme>",
        "required": false,
        "description": "Token overrides (names without `--`, e.g. `{ \"primary-color\": \"#e11d48\" }`), applied over the mode / palette / design; may reference other tokens (`var(--x)`) and use `color-mix()`"
      },
      {
        "name": "locale",
        "type": "NativeLocale",
        "required": false,
        "default": "{ language: \"en\" }",
        "description": "Language and extra messages of the built-in texts"
      },
      {
        "name": "insets",
        "type": "Partial<EdgeInsets>",
        "required": false,
        "default": "{ top: StatusBar height on Android, else 0, right: 0, bottom: 0, left: 0 }",
        "description": "Safe-area insets used by toasts, popups, action sheets and the nav / tab bars. Pass `useSafeAreaInsets()` of `react-native-safe-area-context`"
      },
      {
        "name": "fonts",
        "type": "NativeFonts",
        "required": false,
        "default": "the platform fonts",
        "description": "Font families loaded by the app"
      },
      {
        "name": "reducedMotion",
        "type": "boolean",
        "required": false,
        "default": "the OS setting",
        "description": "Instant transitions. Follows the OS \"Reduce motion\" setting when unset"
      },
      {
        "name": "onThemeChange",
        "type": "(theme: ThemeMode) => void",
        "required": false,
        "description": "Called when the color mode changes (`setThemeMode`, ThemeToggle)"
      },
      {
        "name": "onPaletteChange",
        "type": "(palette: Palette | null) => void",
        "required": false,
        "description": "Called when the palette changes (`setPalette`)"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Application content"
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

## Example: preset

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/theme-palette/native/preset.tsx

```tsx
import { Text, View } from "react-native";
import {
  Button,
  Cell,
  MinervaProvider,
  PresetToggle,
  useTheme,
} from "minerva-design/native";

function Screen() {
  const { colors, design, tokens } = useTheme();
  return (
    <View
      style={{
        gap: 16,
        padding: 16,
        borderRadius: 16,
        backgroundColor: colors["background-color"],
      }}
    >
      <PresetToggle />
      <PresetToggle
        size="small"
        presets={["compact", "touch"]}
        labels={{ compact: "Dense", touch: "Comfortable" }}
      />
      <Cell title="Delivery address" value="Home" />
      <Button fullWidth>Place order</Button>
      <Text style={{ color: colors["text-secondary-color"] }}>
        Preset {design.preset}: density {design.density}, radius {design.radius}
        , controls {tokens.sizes["control-height-md"]}px high
      </Text>
    </View>
  );
}

export default function Preset() {
  return (
    <MinervaProvider preset="touch">
      <Screen />
    </MinervaProvider>
  );
}

```

## Example: ThemeToggle and PaletteToggle

The nested preview starts with the editorial palette. Change its theme or palette without changing the surrounding documentation.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/theme-palette/native/toggles.tsx

```tsx
import { Text, View } from "react-native";
import {
  Button,
  MinervaProvider,
  PaletteToggle,
  Switch,
  Tag,
  ThemeToggle,
  useTheme,
} from "minerva-design/native";
function Preview() {
  const { colors, mode, palette } = useTheme();
  return (
    <View
      style={{
        gap: 16,
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors["border-color"],
        backgroundColor: colors["background-color"],
      }}
    >
      <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap" }}>
        <ThemeToggle />
        <PaletteToggle />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 16,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Button color="primary">Primary</Button>
        <Button color="neutral" variant="outline">
          Secondary
        </Button>
        <Tag color="primary">{palette ?? "default"}</Tag>
        <Tag color="info">{mode}</Tag>
        <Switch label="Switch" defaultChecked />
      </View>
      <Text style={{ color: colors["text-muted-color"] }}>
        Theme: {mode}; palette: {palette ?? "default"}
      </Text>
    </View>
  );
}
export default function Toggles() {
  return (
    <MinervaProvider theme="system" palette="editorial">
      <Preview />
    </MinervaProvider>
  );
}

```
