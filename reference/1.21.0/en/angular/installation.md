# Installation

Add Minerva to a React project, load the stylesheet, and optionally register the Web Components.

Package: minerva-design@1.21.0

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Requirements

React and React DOM 19 for the React components (optional peer dependencies of minerva-design: the Web Components need no React). React 18 is not supported: the components rely on React 19 APIs such as ref as a regular prop, and are tested with StrictMode and React DOM 19's server renderer.

A bundler that understands ES modules and CSS imports, such as Vite, webpack, Rspack or Next.js. A CommonJS build is shipped as well.

A modern evergreen browser: the theme tokens rely on CSS custom properties and color-mix().

### Install the React components

Install minerva-design with your package manager: one package for the React components, the Web Components and the design tokens. Add react and react-dom if your project does not have them yet.

react and react-dom are optional peer dependencies (^19) so your app keeps a single copy of React. The only runtime dependencies are @floating-ui/dom (positioning), DOMPurify (HtmlPreview), jsonc-parser (JsonField) and Lit (used by the Web Components entries only; React apps never bundle it): no icon, class-name or i18n library is installed. Icons are inline SVGs.

### Import the global stylesheet once

The styles of every component and the default theme tokens are bundled in one global stylesheet, minerva-design/style.css. Import it exactly once, in your application entry, before your own CSS. Component files then import components only, never CSS.

Without minerva-design/style.css the components render unstyled. Import it only once, in the entry: importing it again from component files is harmless but unnecessary.

#### React with Vite: src/main.tsx

Vite bundles CSS imported from JavaScript: in development the stylesheet is injected by the dev server, and vite build emits it as a single hashed .css file linked from index.html. No plugin or extra configuration is needed.

#### Next.js (App Router): app/layout.tsx

The root layout is a Server Component and may import global CSS; every route then gets the styles.

#### Web Components: src/main.ts

The custom elements carry their own styles in their shadow roots; tokens.css provides the shared design tokens. Import both once, in the entry of your Vue, Angular, Svelte, Solid or plain HTML app. If the same page also uses the React components, style.css already contains the tokens.

#### In component files

Component pages show the component import only. They all rely on the global stylesheet imported above:

Optional: per-component stylesheets

Only using a few components? Import the design tokens once and the stylesheet of each component you use instead of style.css. Each file contains the styles of the component and of the components it renders (e.g. confirm.css includes the Button and Modal styles); the file name is the kebab-case component folder (tag-input.css, time-picker.css, ...). The JavaScript is tree-shaken per component as well: every module is published separately and the package is side-effect free except for its CSS.

An optional Sass file is published next to it: minerva-design/prose.scss contains mixins for long-form typography, to @use from your own Sass.

### Optional entries and peers

The Monaco-based code editor is published as a separate entry, minerva-design/monaco, so the main entry never pulls in Monaco. Its peers @monaco-editor/react and monaco-editor are optional: install them only if you import that entry.

Using Next.js or another React Server Components framework? See Server Components for the entries that are client boundaries.

### Your first component

Wrap the application in ConfigProvider and start using components:

ConfigProvider is optional for rendering components, but it applies the theme (following the system color scheme by default), sets the language of the React library's built-in texts and makes useConfig() available. Use one provider at the root of your app.

### Web Components (optional)

The same package provides the whole component set as framework-agnostic custom elements (Lit) under minerva-design/web-components, with the same design, tokens and keyboard behaviour, for plain HTML, Vue, Angular, Svelte or any other stack. The Web Components entries are ESM only and need no React; installing minerva-design is all it takes:

Import the package once to register every element, or import one entry per element so that only the elements you use are bundled. Load the design tokens once as well:

Without a build step, load the tokens and the self-contained module bundle (every element, Lit and the Minerva core) from a CDN:

Every element is typed in HTMLElementTagNameMap. For framework templates, reference the typings generated for React 19, Vue (Volar), Svelte or Solid once:

Web Components: getting started, events, typings and framework guides

### TypeScript

minerva-design ships its own type declarations; no @types package is needed. Props types (ButtonProps, TagProps, ...) and theme types (Theme, ComponentTheme, ThemeName, ...) are exported from the package root:

### Next steps

Design principles and the conventions used by every component.

Built-in themes, design tokens and custom themes.

Start with the first component page and its live examples.

### Migrating an existing application

Changing the package name alone does not migrate the legacy API. Review component exports and props: use size="small|medium|large", color instead of colorScheme, loading instead of isLoading and startIcon instead of leftIcon. Alert uses color; toast.error and legacy components may need replacements. Migrate one screen at a time and run your application’s type checks and interaction tests.

```tsx
// src/main.tsx — the only place that imports Minerva's CSS
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "minerva-design/style.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

```tsx
// app/layout.tsx — global CSS belongs in the root layout
import type { ReactNode } from "react";
import "minerva-design/style.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

```ts
// src/main.ts — register the elements and load the design tokens, once
import "minerva-design/web-components";
import "minerva-design/tokens.css";
```

```tsx
// any component file: import the component only, no CSS
import { Tag } from "minerva-design";
```

```tsx
// src/main.tsx — optional, instead of "minerva-design/style.css":
import "minerva-design/styles/tokens.css"; // design tokens, once
import "minerva-design/styles/button.css";
import "minerva-design/styles/input.css";
import "minerva-design/styles/modal.css";
```

```scss
// optional, in your own .scss: long-form typography mixins
@use "minerva-design/prose.scss" as prose;
```

```bash
pnpm add @monaco-editor/react monaco-editor
```

```tsx
import { MonacoCodeEditor } from "minerva-design/monaco";
```

```tsx
import { createRoot } from "react-dom/client";
import { Button, ConfigProvider, ToastProvider, toast } from "minerva-design";
import "minerva-design/style.css";

function App() {
  return (
    // theme: "auto" (default) | "light" | "dark" | "github-dark" | custom
    <ConfigProvider theme="auto" locale={{ language: "en" }}>
      {/* renders toast() calls inside the theme scope */}
      <ToastProvider>
        <Button color="primary" onClick={() => toast.success("Hello!")}>
          Say hello
        </Button>
      </ToastProvider>
    </ConfigProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
```

```bash
# the same package: the Web Components need no React
pnpm add minerva-design
```

```ts
// every element at once...
import "minerva-design/web-components";
// ...or only the elements you use (each entry registers one element and its parts)
import "minerva-design/web-components/select";

// design tokens, once (already included in minerva-design/style.css)
import "minerva-design/tokens.css";
```

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/minerva-design@1.21.0/dist/core/tokens.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/minerva-design@1.21.0/dist/web-components/cdn/minerva.js"></script>
```

```ts
// React 19 JSX (global.d.ts)
/// <reference types="minerva-design/web-components/react" />
// Svelte: ".../svelte", Solid: ".../solid"
// Vue (Volar): add "minerva-design/web-components/vue" to compilerOptions.types
```

```tsx
import { themes } from "minerva-design";
import type { ButtonProps, ComponentTheme } from "minerva-design";

// every component exports its props type
const saveButton: Partial<ButtonProps> = { color: "success", size: "large" };

// themes are typed too: missing or misspelled tokens are compile errors
const brand: ComponentTheme = { ...themes.light, "primary-color": "#7c3aed" };
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
