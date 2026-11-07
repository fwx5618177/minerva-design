# Server Components

Use Minerva with React Server Components: which entries are client boundaries, what can run on the server and where to import the CSS.

Package: minerva-design@1.22.3

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### Entries and the "use client" banner

minerva-design is published as several entries. The entries that contain components start with a "use client" directive; the theme helper entry does not, so it can run inside Server Components.

Entry

"use client"

Yes

No

All components, providers, hooks and utilities.

The Monaco-based code editor (optional peers: @monaco-editor/react and monaco-editor).

GPU charts (WebGPU, WebGL2, WebGL, Canvas2D): Chart, LineChart, BarChart, TradingChart, Scatter3DChart and 40+ more chart components.

The framework-free chart engine: createChart and formatCompact. Importing it is server-safe; charts are created in the browser.

The icon set: Icon, IconCanvas, DynamicIcon, createIcon and one component per icon (SearchIcon…). SVG icons render on the server inside client components.

The framework-free icon set: icon data, toSvg, drawIcon and the GPU icon canvases. Importing it is server-safe (toSvg works on the server); canvases are created in the browser.

Server-safe theme helpers: THEME_INIT_SCRIPT, cookie parsing and serialization, palette names.

Server-safe utilities: cn, themes, light, dark, githubDark, palettes, resolveTheme, generateCSSVariables, applyThemeStyles, getSystemTheme, isBilingualTheme, matchesShortcut, normalizeShortcuts, computeFixedColumnLayout.

### Why some entries are client boundaries

Every Minerva component uses state, effects, context or portals, so it must run in the browser. Because the main entry is marked "use client", a Server Component that imports it does not get the component code: it gets client references, placeholders that the bundler resolves to the client bundle. The components are still rendered to HTML on the server during SSR and hydrated in the browser.

A client reference is not a callable function on the server. That is fine for components, which are only rendered, but it means plain functions from a client entry cannot be executed in a Server Component. Functions needed on the server, such as parsing the theme cookie or building the init script, therefore live in a separate entry without the banner: minerva-design/theme-utils.

### Rendering components from a Server Component

Import components from minerva-design directly in a Server Component, a layout or a page: no wrapper is needed, because the entry already is a client boundary.

Props passed from a Server Component to a client component must be serializable: strings, numbers, booleans, plain objects, arrays and JSX. Functions are not, so event handlers such as onClick, render props and callbacks need a small client component of your own:

### Calling functions on the server

Call the helpers of minerva-design/theme-utils and minerva-design/utils freely on the server: in layouts, route handlers, middleware or edge functions. Do not call functions from the main entry in a Server Component (toast.success, Confirm, the hooks...), and do not read its data exports (themes, palettes...) there: they are client references. Import the plain functions and data from minerva-design/utils instead.

Imperative APIs are also safe during SSR of client components: without a document they do nothing, and promise-based dialogs such as Confirm resolve to false on the server. Trigger them from event handlers or effects, which only run in the browser.

### Content Security Policy

A strict Content-Security-Policy (no 'unsafe-inline') blocks the inline theme init script. Either render the request's nonce on the  element, or allow the script by its hash: THEME_INIT_SCRIPT_HASH is the 'sha256-…' source of THEME_INIT_SCRIPT, and cspHash() computes it for a script built with createThemeInitScript().

### Where to import the CSS

Import minerva-design/style.css once. In the Next.js App Router, global CSS belongs in the root layout, which is a Server Component and may import CSS. In other setups, import it in the client entry file. prose.scss is an optional extra, loaded the same way from your own Sass.

### Next steps

Server rendering without a theme flash: THEME_INIT_SCRIPT and theme cookies.

Packages, peer dependencies and stylesheets.

```tsx
// dist/index.js and dist/monaco.js start with
"use client";

// dist/theme-utils.js and dist/utils-entry.js do not: they hold plain
// functions and data, safe to run on the server
```

```tsx
// app/page.tsx: a Server Component (no "use client")
import { Card, Tag } from "minerva-design";
import { SaveButton } from "./save-button";

export default async function Page() {
  const posts = await getPosts(); // server-only data access

  return posts.map((post) => (
    // serializable props only: strings, numbers, booleans, JSX children...
    <Card key={post.id} padding="medium">
      <Tag color="info">{post.category}</Tag>
      <h2>{post.title}</h2>
      <SaveButton id={post.id} />
    </Card>
  ));
}
```

```tsx
// app/save-button.tsx
"use client";

import { Button, toast } from "minerva-design";

// Event handlers and imperative APIs live in a client component
export function SaveButton({ id }: { id: string }) {
  return (
    <Button
      color="primary"
      onClick={async () => {
        await fetch(`/api/save/${id}`, { method: "POST" });
        toast.success("Saved"); // shown by the ToastProvider in your layout
      }}
    >
      Save
    </Button>
  );
}
```

```tsx
// app/layout.tsx: a Server Component
import { cookies } from "next/headers";
import {
  THEME_COOKIE_NAME,
  THEME_INIT_SCRIPT,
  parseThemeCookie,
} from "minerva-design/theme-utils"; // server-safe: runs here
import { ThemeProvider } from "minerva-design"; // rendered, not called

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = parseThemeCookie((await cookies()).get(THEME_COOKIE_NAME)?.value);
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider defaultTheme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}

// Plain functions and data (cn, themes, palettes, resolveTheme...):
// import them from the server-safe utils entry, not from the main entry
import { cn, themes } from "minerva-design/utils";

// Not on the server: main-entry functions are client references there
// import { toast } from "minerva-design";
// toast.success("Hi"); // call it from a client component instead
```

```tsx
// Strict CSP, option 1: a per-request nonce on the inline script
<script
  nonce={nonce}
  suppressHydrationWarning
  dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
/>
// Content-Security-Policy: script-src 'self' 'nonce-<nonce>'

// Option 2: allow the script by its hash (static HTML, CDN caching)
import {
  THEME_INIT_SCRIPT_HASH,
  createThemeInitScript,
  cspHash,
} from "minerva-design/theme-utils";

const csp = `script-src 'self' ${THEME_INIT_SCRIPT_HASH}`;
// a customised script has its own hash:
const script = createThemeInitScript({ defaultTheme: "dark" });
const customCsp = `script-src 'self' ${cspHash(script)}`;
```

```tsx
// Next.js App Router: import global CSS once, in the root layout
// app/layout.tsx
import "minerva-design/style.css";

// Vite / other setups: import it in the client entry file (main.tsx)
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
