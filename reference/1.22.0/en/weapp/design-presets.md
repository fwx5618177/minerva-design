# Design presets

Switch the look of a whole app, or of one part of it, with a few props: a preset (minerva, editorial, compact, touch) or the individual design axes density, radius, shadow and font scale. Works with SSR and nested scopes.

Package: minerva-design@1.22.0

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Design axes

Attribute

The design axes are orthogonal to the color mode (theme) and the palette. Each one selects a block of design tokens through a data attribute; components read the tokens (control heights, paddings, radii, shadows, font sizes), so the whole library follows. A preset is a named combination of the four axes plus a default palette; explicit axes and an explicit palette win over the preset.

minerva: Minerva's default look. editorial: restrained and reading-oriented (editorial palette, comfortable density, small radius, subtle shadows, large type). compact: dense, data-heavy screens (compact density, small radius, small type). touch: consumer mobile apps (comfortable density with 44px minimum touch targets, large radius).

Control heights and horizontal paddings (--control-height-*, --control-padding-x-*) and the padding of rows such as menu items, options and table cells (--row-padding-y / --row-padding-x), and the minimum size of touch targets (--touch-target-min: 24px compact, 32px standard, 44px comfortable).

Corner radius scale: --radius-sm, --radius-md, --radius-lg, --radius-xl and --radius-2xl.

Elevation shadows --shadow-sm to --shadow-xl. standard keeps the shadows of the theme or palette.

Type scale: --font-size-* and the base / relaxed line heights. large is meant for reading.

### Whole app

Set the props on the root ConfigProvider: it writes the non-standard axes as data attributes on  (and the preset's palette as data-palette), and restores  when it unmounts. useConfig().design returns the resolved axes.

### Server rendering

The root provider applies the attributes after hydration. For a first paint with the right look, render them in the server HTML with designAttributes() from the server-safe minerva-design/theme-utils entry, and/or pass the same design to createThemeInitScript({ design }), which also uses the preset's palette as the default palette.

### Nested scopes

A nested ConfigProvider inherits the design of its parent and applies its overrides to its subtree only: a display: contents wrapper and the portal container of the scope carry every design attribute, so modals, popovers and toasts rendered from the subtree get the same look. A nested preset resets every axis it does not set.

### Using the tokens in your own CSS

The axes only change design tokens, so your own styles can use the same variables and stay consistent with the components. Per-component tweaks are available through each component's CSS variables (see the "CSS variables" section of every component page).

```tsx
import { ConfigProvider } from "minerva-design";
import "minerva-design/style.css";

export default function App() {
  // The whole app gets the editorial look: editorial palette, comfortable
  // density, small radius, subtle shadows and a reading-oriented type scale.
  return (
    <ConfigProvider preset="editorial" density="standard">
      {/* your app */}
    </ConfigProvider>
  );
}
```

```tsx
// app/layout.tsx (React Server Component, e.g. Next.js App Router)
import {
  createThemeInitScript,
  designAttributes,
} from "minerva-design/theme-utils";
import { Providers } from "./providers"; // "use client": <ConfigProvider preset="editorial">

const design = { preset: "editorial" } as const;
const themeScript = createThemeInitScript({ design });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-density / data-radius / data-shadow / data-font-scale in the HTML:
    // the first paint already has the right look
    <html lang="en" suppressHydrationWarning {...designAttributes(design)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

```tsx
<ConfigProvider preset="compact">
  {/* dense admin screens */}
  <ConfigProvider preset="editorial">
    {/* an article preview: editorial look, portals (Modal, Popover...) included */}
  </ConfigProvider>
  <ConfigProvider radius="none">
    {/* inherits compact, only the radius changes */}
  </ConfigProvider>
</ConfigProvider>
```

```css
/* The axes only set design tokens, so your own CSS can use them too */
.panel {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--row-padding-y) var(--row-padding-x);
  font-size: var(--font-size-md);
}

/* ...or react to the active design */
[data-density="compact"] .panel {
  gap: var(--space-1);
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
