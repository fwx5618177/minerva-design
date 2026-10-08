# Minerva Component Library

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/fwx5618177/minerva-design.svg?style=social&label=Stars)](https://github.com/fwx5618177/minerva-design)
[![GitHub issues](https://img.shields.io/github/issues/fwx5618177/minerva-design.svg)](https://github.com/fwx5618177/minerva-design/issues)
[![GitHub license](https://img.shields.io/github/license/fwx5618177/minerva-design.svg)](https://github.com/fwx5618177/minerva-design/blob/main/LICENSE)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/fwx5618177/minerva-design.svg)](https://github.com/fwx5618177/minerva-design/pulls)
[![GitHub contributors](https://img.shields.io/github/contributors/fwx5618177/minerva-design.svg)](https://github.com/fwx5618177/minerva-design/graphs/contributors)

[English](./README.md) | [简体中文](./README_ZH.md) | [日本語](./README_JP.md)

</div>

Minerva is a UI component library for the web: React 19 components plus the same set as framework-agnostic Web Components, published together as one npm package, [`minerva-design`](https://www.npmjs.com/package/minerva-design).

## 🌟 Demo & Documentation

Docs and live demos: [https://fwx5618177.github.io/minerva-design/](https://fwx5618177.github.io/minerva-design/)

## ✨ Features

- **React components**: 100+ components for React 19 (`ref` as a regular prop, `"use client"` entries for React Server Components)
- **Web Components**: the whole component set as standard custom elements (Lit) for plain HTML, Vue, Angular, Svelte, Solid or React: same look, tokens, keyboard and ARIA behaviour, form-associated controls, a CDN bundle and generated framework typings
- **ESM + CommonJS**: both module formats are shipped for the React library (the Web Components are ESM only)
- **TypeScript**: type definitions are included
- **Theming**: light / dark / system modes plus the `editorial`, `tech`, `graphite` and `cool` palettes, driven by CSS custom properties; cookie persistence and a no-flash `THEME_INIT_SCRIPT` for SSR (`minerva-design/theme-utils`, server-safe)
- **Design presets**: switch the whole app's look with `<ConfigProvider preset="editorial">` (restrained, reading-oriented) or the `density` / `radius` / `shadow` / `fontScale` axes; SSR-ready (`designAttributes()`, `createThemeInitScript({ design })`) and scoped by nested providers
- **Customization**: every component documents a stable set of CSS custom properties (`--button-height`, `--modal-width`, ...)
- **Entries**: `minerva-design`, `/theme-utils`, `/monaco`, `style.css` (or per-component `styles/<component>.css` + `styles/tokens.css`), `prose.scss`; tree-shakeable per component, no icon / i18n runtime dependencies
- **i18n**: built-in locales for English, Chinese, Japanese and French
- **No headless dependency**: overlays, menus, select, tabs and `asChild` are built in house on `minerva-design/core`; Floating UI is the only third-party interaction dependency

## 📦 Package

One package, [`minerva-design`](https://www.npmjs.com/package/minerva-design), with one entry per use:

| Entry                                                                          | Description                                                                                                                                                                                        |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `minerva-design`                                                               | React 19 component library. ESM + CJS, TypeScript types, `"use client"` on every client module. Optional peer deps: `react` and `react-dom` `^19.0.0` (only needed for the React entries).         |
| `minerva-design/style.css`                                                     | The global stylesheet (design tokens + every component), imported once in the app entry. Per-component `minerva-design/styles/<component>.css` and `minerva-design/tokens.css` are also published. |
| `minerva-design/utils`, `minerva-design/theme-utils`                           | Server-safe helpers (no `"use client"`, no React): `cn`, themes, theme cookies, `THEME_INIT_SCRIPT`, design presets... for React Server Components and servers.                                    |
| `minerva-design/monaco`                                                        | The Monaco-based code editor (optional peers `@monaco-editor/react` and `monaco-editor`).                                                                                                          |
| `minerva-design/web-components`                                                | Framework-agnostic Web Components (Lit): every Minerva component as a custom element (`<minerva-button>`, `<minerva-select>`, `<minerva-modal>`...). ESM only.                                     |
| `minerva-design/web-components/<element>`, `minerva-design/web-components/cdn` | One entry per element (incl. the optional `code-editor`), and a self-contained bundle for `<script type="module">` / CDN use.                                                                      |
| `minerva-design/web-components/{react,vue,svelte,solid}`                       | Framework typings of the custom elements; `minerva-design/custom-elements.json` and `minerva-design/html-custom-data.json` (VS Code) describe them for tools.                                      |
| `minerva-design/core`, `minerva-design/styling-hooks`                          | Advanced: the framework-agnostic primitives both libraries are built on (focus scope, dismissable layers, scroll lock, roving focus, positioning, theme, i18n) and the styling hooks manifest.     |

The repository is a pnpm monorepo: `packages/core` (platform-neutral), `packages/dom`, `packages/react` and `packages/web-components` hold the sources (private workspace packages; `packages/{vue,angular,native,taro,weapp,uni}` are the planned native renderers), `packages/minerva-design` is the published package their builds are assembled into, and `apps/docs` is the docs/demo site deployed to GitHub Pages (private).

### Architecture

```
minerva-design/core            framework-agnostic TypeScript (DOM only)
  interaction primitives · positioning (@floating-ui/dom) · theme · tokens · i18n
        ▲ React hooks                    ▲ Lit controllers
minerva-design               minerva-design/web-components
```

Both libraries import the same copy of the core (`dist/core/` of the package): an app that uses React components and custom elements together loads it once.

Every overlay of `minerva-design` (Modal, Drawer, Popover, Tooltip, Menu, ContextMenu, Select, AutoComplete, Cascader, TimePicker) is built on the same core primitives: one layer stack (Escape closes the innermost overlay first), one focus implementation (focus returns to the opener) and one positioning engine. See the [Architecture](https://fwx5618177.github.io/minerva-design/#/architecture) page.

### Components (`minerva-design`)

| Category     | Components                                                                                                                                                                                                                                                                                                           |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Theming      | `ConfigProvider`, `ThemeProvider` / `useTheme`, `ThemeToggle`, `PaletteToggle`                                                                                                                                                                                                                                       |
| General      | `Button`, `IconButton`                                                                                                                                                                                                                                                                                               |
| Layout       | `Box`, `Stack` / `HStack` / `VStack`, `ResponsiveGrid` / `GridItem`, `SplitLayout`, `Page` / `PageHeader` / `PageSection` / `StatCard` / `Toolbar`, `AppShell`, `Card` (+ parts), `Divider`, `VirtualList`                                                                                                           |
| Forms        | `FormControl` / `FormField` / `FormLabel` / `FormHelperText` / `FormErrorMessage`, `FormLayout`, `Input`, `Textarea`, `NumberInput`, `JsonField`, `KeyValueEditor`, `TagInput`, `AutoComplete`, `Select`, `Cascader`, `Checkbox`, `Radio` / `RadioGroup`, `Switch`, `TimePicker`, `Rating` / `RatingScale`, `Upload` |
| Data display | `Avatar` / `AvatarGroup`, `Badge`, `Tag`, `Empty`, `Table` / `DataTable` (+ parts), `DescriptionList`, `List` / `ListItem`, `TextLink`, `CodeBlock`, `Prose`, `HtmlPreview`, `MonthCalendar`, `Tooltip` / `TooltipProvider`                                                                                          |
| Feedback     | `Alert`, `toast` / `ToastProvider`, `ProgressIndicator`, `Skeleton` / `SkeletonText`, `LoadingState`                                                                                                                                                                                                                 |
| Overlays     | `Modal`, `Drawer`, `ConfirmDialog` / `confirm()` / `useConfirm`, `CommandDialog`, `Popover`, `Menu` / `ContextMenu`                                                                                                                                                                                                  |
| Navigation   | `Tabs`, `PageTabs`, `NavTree`, `Pagination`, `Steps`                                                                                                                                                                                                                                                                 |
| Editors      | `MonacoCodeEditor` (`minerva-design/monaco`)                                                                                                                                                                                                                                                                         |

Besides components, `minerva-design` exports `ConfigProvider`, `useConfig`, the hooks `useAutoTheme`, `useLocale` and `useI18n`, the utilities `applyThemeStyles` and `generateCSSVariables`, and the built-in `themes` map (`light`, `dark`, `github-dark`).

## 🚀 Quick Start

### Installation

```bash
pnpm add minerva-design
```

OR

```bash
npm install minerva-design
```

OR

```bash
yarn add minerva-design
```

Then import the global stylesheet once, in the app entry (e.g. `src/main.tsx` or the root `app/layout.tsx`):

```ts
import "minerva-design/style.css";
```

The React components require React 19 (`react` and `react-dom` `^19.0.0`). React 18 is not supported (the components use React 19 APIs such as `ref` as a regular prop). Every client module is marked `"use client"`, so it can be imported from React Server Components frameworks (e.g. the Next.js App Router) without a wrapper.

### Basic Usage

Import the stylesheet once (for example in your entry file), then use the components:

```tsx
import { useState } from "react";
import {
  Alert,
  Button,
  ConfigProvider,
  Switch,
  FormField,
  Input,
  ToastProvider,
  VStack,
  toast,
} from "minerva-design";
import "minerva-design/style.css";

export default function App() {
  const [name, setName] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <ConfigProvider>
      <ToastProvider>
        <VStack gap={4} align="start">
          <Alert color="info" title="Welcome" closable>
            Minerva is ready.
          </Alert>
          <FormField label="Username">
            <Input
              name="username"
              placeholder="Enter username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              clearable
            />
          </FormField>
          <Switch
            label="Subscribe"
            checked={subscribed}
            onChange={(checked) => setSubscribed(checked)}
          />
          <Button
            color="primary"
            onClick={() => toast.success(`Hello, ${name}`)}
          >
            Submit
          </Button>
        </VStack>
      </ToastProvider>
    </ConfigProvider>
  );
}
```

### Theming and Locale

`ConfigProvider` applies the theme by setting CSS custom properties (such as `--primary-color`, `--background-color`, `--text-gray`) on `document.documentElement`.

- `theme`: `"auto"` (default, follows `prefers-color-scheme`), `"light"`, `"dark"`, `"github-dark"`, a full theme object, or a `{ light, dark }` pair
- `locale`: `{ language: "en" | "zh" | "fr" }` (default `"en"`)

```tsx
import { ConfigProvider, themes, useConfig } from "minerva-design";

const brandTheme = {
  light: { ...themes.light, "primary-color": "#6750a4" },
  dark: { ...themes.dark, "primary-color": "#d0bcff" },
};

function CurrentTheme() {
  const { theme, locale } = useConfig();
  return <pre>{JSON.stringify({ theme, locale })}</pre>;
}

export function Root() {
  return (
    <ConfigProvider theme={brandTheme} locale={{ language: "fr" }}>
      <CurrentTheme />
    </ConfigProvider>
  );
}
```

Pass `theme="github-dark"` (or `"light"` / `"dark"`) to use a built-in theme as-is.

### Theme, palette and SSR

```tsx
// app/layout.tsx (React Server Component)
import type { ReactNode } from "react";
import { headers } from "next/headers";
import {
  THEME_INIT_SCRIPT,
  parseThemeCookies,
} from "minerva-design/theme-utils";
import { ThemeProvider } from "minerva-design";

export default async function Layout({ children }: { children: ReactNode }) {
  const { theme, palette } = parseThemeCookies((await headers()).get("cookie"));
  return (
    <html suppressHydrationWarning>
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

With a strict Content-Security-Policy (no `'unsafe-inline'`), give the inline script the request's nonce (`<script nonce={nonce} ...>`) or allow it by hash: `THEME_INIT_SCRIPT_HASH` (from `minerva-design/theme-utils`) is its `'sha256-…'` source, and `cspHash(createThemeInitScript(options))` hashes a customised script:

```ts
import { THEME_INIT_SCRIPT_HASH } from "minerva-design/theme-utils";

export const csp = `script-src 'self' ${THEME_INIT_SCRIPT_HASH}`;
```

Plain functions and data of the main entry (`cn`, `themes`, `palettes`, `resolveTheme`, `applyThemeStyles`, `matchesShortcut`, `computeFixedColumnLayout`...) are client references inside Server Components (the main entry is `"use client"`): import them from the server-safe `minerva-design/utils` entry there.

### Toast API

```tsx
import { Button, toast } from "minerva-design";

// Rendered by the <ToastProvider> mounted near the root of the app
export function SaveButton() {
  const save = () =>
    toast.promise(fetch("/api/save", { method: "POST" }), {
      loading: "Saving...",
      success: "Saved",
      error: "Could not save",
    });

  return <Button onClick={save}>Save</Button>;
}
```

### Web Components

The same components as standard custom elements, for any framework or none, from the same package (`pnpm add minerva-design`; React is not needed). They render the DOM and styles of the React components in their shadow root and reuse the `minerva-design/core` primitives, so they look and behave like the React components.

```ts
// every element...
import "minerva-design/web-components";
// ...or only the ones you use (one entry per element)
import "minerva-design/web-components/select";

// design tokens, once (already included in minerva-design/style.css)
import "minerva-design/tokens.css";
```

Or, without a build step, from a CDN:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/minerva-design@0/dist/core/tokens.css"
/>
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/minerva-design@0/dist/web-components/cdn/minerva.js"
></script>
```

Then use the tags like native elements. Form controls are form-associated (`name`, `required`, `FormData`, `form.reset()`), events are `minerva-*` CustomEvents (`minerva-change`, `minerva-open-change`...) that bubble and cross shadow roots:

```html
<minerva-config theme="system" locale="en">
  <form>
    <label for="plan">Plan</label>
    <minerva-select id="plan" name="plan" value="pro" required>
      <minerva-option value="free">Free</minerva-option>
      <minerva-option value="pro">Pro</minerva-option>
    </minerva-select>
    <minerva-switch name="newsletter" checked>Newsletter</minerva-switch>
    <minerva-button type="submit">Save</minerva-button>
  </form>
</minerva-config>

<script type="module">
  document
    .querySelector("minerva-select")
    .addEventListener("minerva-change", (event) => {
      console.log(event.detail.value);
    });
</script>
```

Typings: every element is in `HTMLElementTagNameMap`; templates are typed with

```ts
/// <reference types="minerva-design/web-components/react" />  // React 19 JSX
/// <reference types="minerva-design/web-components/svelte" /> // Svelte 5
/// <reference types="minerva-design/web-components/solid" />  // Solid
// Vue (Volar): add "minerva-design/web-components/vue" to compilerOptions.types
// VS Code: "html.customData": ["./node_modules/minerva-design/dist/web-components/html-custom-data.json"]
```

Guides for plain HTML, Vue, Angular, Svelte, forms and theming: [Web Components](https://fwx5618177.github.io/minerva-design/#/web-components).

### Styling & customization

Three public, stable layers, from the lightest touch to the most specific:

1. **Design tokens and component CSS variables** (`--primary-color`, `--radius-md`, `--button-radius`, `--input-height`...): set them on `:root`, a theme scope or any element.
2. **Styling hooks**: every React component renders `data-minerva="<component>"` and `data-part="<part>"` on its styled elements, plus state attributes from one vocabulary (`data-state="open|closed|checked|unchecked|indeterminate|active|inactive"`, `data-disabled`, `data-invalid`, `data-readonly`, `data-loading`, `data-size`, `data-variant`, `data-color`, `data-orientation`, `data-side`, `data-align`, `data-placement`...). The web components expose the same names as their tag, `::part()` and custom states (`:state()`).
3. **Cascade layer**: all library CSS ships inside `@layer minerva`, so your unlayered CSS wins without `!important`.

| Hook      | React                                        | Web Components                     |
| --------- | -------------------------------------------- | ---------------------------------- |
| Component | `[data-minerva="button"]`                    | `minerva-button`                   |
| Part      | `[data-minerva="button"][data-part="label"]` | `minerva-button::part(label)`      |
| State     | `[data-state="open"]`, `[data-disabled]`     | `:state(open)`, `:state(disabled)` |
| Keyed     | `[data-size="small"]`                        | `:state(size-small)`               |
| Item      | `[data-part="item"][data-highlighted]`       | `::part(item item--highlighted)`   |

```css
/* React */
[data-minerva="button"][data-part="root"][data-variant="solid"] {
  --button-radius: 999px; /* variables + hooks combine */
  letter-spacing: 0.01em;
}
[data-minerva="modal"][data-part="content"][data-state="open"] {
  border: 1px solid var(--border-color);
}

/* Web Components: same names */
minerva-button:state(variant-solid) {
  --button-radius: 999px;
}
minerva-modal:state(open)::part(content) {
  border: 1px solid var(--border-color);
}

/* Item states: on the item itself (React) / <part>--<state> part names */
[data-minerva="menu"][data-part="item"][data-highlighted],
minerva-menu::part(item item--highlighted) {
  background: var(--primary-color-subtle);
}
[data-minerva="data-table"][data-part="header-cell"][data-sort="ascending"],
minerva-data-table::part(header-cell header-cell--sort-ascending) {
  color: var(--primary-color);
}

/* Layered app CSS: put minerva in your layer order */
@layer reset, minerva, app;
```

Repeated items (menu items, options, rows and sorted headers, pages, steps, tree items, days, toasts, files...) carry their own states (`highlighted`, `selected`, `checked`, `current`, `expanded`, `sort`, `status`...): attributes of the item element in React; `<part>--<state>` part names next to the part name for items rendered in a shadow root (the Shoelace / Web Awesome convention), custom states for items that are elements of their own (`minerva-option:state(selected)`). Use the compound selector `[data-minerva="x"][data-part="y"]` (it also matches portalled parts such as popups and dialogs); class names and unhooked DOM are private. The hook surface of every component is listed on its docs page and in `minerva-design/styling-hooks` (machine-readable manifest), and locked by `packages/core/styling-hooks.lock.json`: adding a hook is a minor change, removing or renaming one is a major change. Guide: [Styling & customization](https://fwx5618177.github.io/minerva-design/#/styling).

## 🌐 Browser support

Minerva targets evergreen browsers. **Fully supported** (every feature below, no fallback involved): **Chrome / Edge 120+, Firefox 125+, Safari 17+** (iOS Safari 17+). Older engines down to the build baseline (Chrome / Edge 111, Firefox 113, Safari 16.4) work with the documented degradations. Server rendering needs Node `^20.19.0 || >=22.12.0`; nothing touches `window` / `document` at import time.

| Feature                                                                                       | Used by                                                                                                                                                     | Minimum (Chrome / Firefox / Safari)            | Without it                                                                                                                       |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| ES2020 (core, React) / ES2022 (web components: class fields, static blocks)                   | All JavaScript                                                                                                                                              | 80 / 80 / 14 — 94 / 93 / 16.4                  | Required (transpile the packages yourself for older targets)                                                                     |
| CSS custom properties, `:focus-visible`, logical properties (`margin-inline`, `inset`), `gap` | All styles                                                                                                                                                  | 90 / 88 / 15.4                                 | Required                                                                                                                         |
| `color-mix()`                                                                                 | Tinted shadows, hover / selected surfaces, focus rings                                                                                                      | 111 / 113 / 16.2                               | The declaration is dropped: flatter shadows and hover states                                                                     |
| Size container queries (`@container`)                                                         | `ResponsiveGrid`, `SplitLayout`, `KeyValueEditor` (responsive to their own width)                                                                           | 105 / 110 / 16                                 | The single-column (narrow) layout is kept                                                                                        |
| `:has()`                                                                                      | `Input` adornment spacing, `Modal` / `Drawer` header padding next to the close button                                                                       | 105 / 121 / 15.4                               | Slightly different padding                                                                                                       |
| `:dir()`                                                                                      | Half stars of `Rating`, `Cascader` chevrons in RTL                                                                                                          | 120 / 49 / 16.4                                | RTL only: the half star / chevron is not mirrored                                                                                |
| Dynamic viewport units (`dvh`)                                                                | `Drawer`, `AppShell` heights                                                                                                                                | 108 / 101 / 15.4                               | Required for the mobile-browser-chrome-aware height                                                                              |
| `accent-color`                                                                                | Native checkbox / radio / range tint                                                                                                                        | 93 / 92 / 15.4                                 | Browser default tint                                                                                                             |
| `ResizeObserver`                                                                              | `Tabs` indicator, `PageTabs` overflow, `Table` / `<minerva-data-table>` fixed columns, `VirtualList`                                                        | 64 / 69 / 13.1                                 | Feature-detected: measurements happen once instead of on resize                                                                  |
| `requestIdleCallback`                                                                         | `VirtualList` scroll batching                                                                                                                               | 47 / 55 / —                                    | Feature-detected: `requestAnimationFrame` only (Safari)                                                                          |
| `inert`                                                                                       | `hideOthers(..., { attribute: "inert" })` (opt-in; default is `aria-hidden`)                                                                                | 102 / 112 / 15.5                               | Use the default `aria-hidden` mode                                                                                               |
| Clipboard API (`navigator.clipboard`)                                                         | `CodeBlock` / `<minerva-code-block>` copy button                                                                                                            | 66 / 63 / 13.1, secure context                 | Feature-detected: the button reports "copy failed" (no `execCommand` fallback); HTTPS / localhost needed                         |
| Cascade layers (`@layer`)                                                                     | Every published stylesheet (`@layer minerva`), so unlayered app CSS wins                                                                                    | 99 / 97 / 15.4                                 | Required: older engines ignore the layered stylesheets                                                                           |
| **Web components only**                                                                       |                                                                                                                                                             |                                                |                                                                                                                                  |
| Custom elements v1, shadow DOM v1                                                             | Every element                                                                                                                                               | 67 / 63 / 10.1                                 | Required                                                                                                                         |
| Constructable stylesheets (`adoptedStyleSheets`)                                              | Shadow-root styles (Lit)                                                                                                                                    | 73 / 101 / 16.4                                | Lit falls back to `<style>` elements                                                                                             |
| `ElementInternals` (form-associated custom elements)                                          | Form controls: `FormData`, constraint validation, `form.reset()`, `<label for>`, `<fieldset disabled>`                                                      | 77 / 98 / 16.4                                 | Feature-detected: the controls work but do not take part in forms (polyfill: `element-internals-polyfill`)                       |
| Custom states (`CustomStateSet`, `:state()`)                                                  | Styling hooks of the web components (`minerva-modal:state(open)`)                                                                                           | 125 / 126 / 17.4 (legacy `:--name`: Chrome 90) | Feature-detected: Chromium 90-124 gets `--name` states (`:--open`); without it, use the host attributes (`[open]`, `[disabled]`) |
| Popover API (`popover`, top layer)                                                            | Overlays (popover, tooltip, menus, select / autocomplete / cascader / time-picker lists, modal, drawer, confirm, command, toasts) escape `overflow: hidden` | 114 / 125 / 17                                 | Feature-detected: `position: fixed` + `z-index` (an ancestor with `transform` / `filter` / `contain` can clip it)                |

The React components render overlays into a portal and do not need the Popover API. Polyfills are never bundled; load them before Minerva if you need them.

## 🧑‍💻 Developer Quick Start

Requirements: Node.js >= 22.12 (see `.nvmrc`) and pnpm 11 for local development. Building the packages and the docs site also works on Node.js 20.19+, which is what the GitHub Pages deploy workflow uses.

```bash
git clone https://github.com/fwx5618177/minerva-design.git
cd minerva
pnpm install
pnpm dev
```

### Scripts

| Command                             | Description                                                                  |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| `pnpm dev`                          | Build `minerva-design`, then start the docs/demo site                        |
| `pnpm build`                        | Build `minerva-design` (core → react → web components), then the docs site   |
| `pnpm test`                         | Run all tests: unit (all packages, docs checks) and e2e user flows           |
| `pnpm test:unit` / `pnpm test:e2e`  | Run only the unit tests / only the e2e user flows (`tests/e2e`)              |
| `pnpm test:dist`                    | Test the built `minerva-design` package and its packed tarball (after build) |
| `pnpm test:coverage`                | Run all tests with coverage (thresholds enforced)                            |
| `pnpm lint`                         | Run ESLint (flat config)                                                     |
| `pnpm typecheck`                    | Type-check all packages                                                      |
| `pnpm format` / `pnpm format:check` | Format with Prettier / check formatting                                      |
| `pnpm clean`                        | Remove build output                                                          |
| `pnpm changeset`                    | Add a changeset describing your change                                       |
| `pnpm version-packages`             | Apply pending changesets: bump versions and write changelogs                 |
| `pnpm release`                      | Build `minerva-design` and publish it to npm                                 |

### Tooling

- Build: Vite 8
- Testing: Vitest, Testing Library, happy-dom
- Linting and formatting: ESLint 10 + typescript-eslint, Prettier
- Git hooks: Husky, lint-staged, commitlint (Conventional Commits)
- CI: `.github/workflows/ci.yml` runs lint, typecheck, format check, tests with coverage, build, built-package tests and package checks on Node 22 for every push to `main` and every pull request
- Docs deployment: `.github/workflows/deploy.yml` builds `minerva-design` and the docs site (`apps/docs`) and publishes it to GitHub Pages on every push to `main`

### Releasing (manual npm publishing)

Versioning and changelogs are managed with [Changesets](https://github.com/changesets/changesets). Publishing is **manual**, from a maintainer's machine: there is no publish workflow in CI (`.github/workflows/ci.yml` only verifies, `deploy.yml` only deploys the docs site).

1. **Describe each change** (in its PR): `pnpm changeset`, pick the semver bump of `minerva-design` (the only published package; the `@minerva/*` workspace packages are private and ignored); commit the generated `.changeset/*.md`.
2. **Version** (on an up-to-date `main`, clean working tree):

   ```bash
   pnpm version-packages   # changeset version: bumps the version, writes CHANGELOG.md, consumes .changeset/*.md
   pnpm install            # refresh the lockfile
   ```

3. **Review** the result before anything leaves your machine: `git diff` (version, CHANGELOG entries), then run the same checks as CI on Node 22 (`.nvmrc`):

   ```bash
   pnpm lint && pnpm typecheck && pnpm format:check && pnpm test:coverage
   pnpm build && pnpm test:dist && pnpm check:package
   (cd packages/minerva-design && npm pack --dry-run)   # what would be published, nothing is uploaded
   git commit -am "chore: release" && git push
   ```

4. **Log in to npm** with an account that can publish `minerva-design`, with two-factor authentication enabled:

   ```bash
   npm login --registry https://registry.npmjs.org/
   npm whoami --registry https://registry.npmjs.org/
   ```

   The package sets `publishConfig.registry` to `https://registry.npmjs.org/`, so a mirror configured in `~/.npmrc` (e.g. npmmirror) is not used for publishing.

5. **Publish**:

   ```bash
   pnpm release            # builds minerva-design, then `changeset publish`
   git push --follow-tags  # push the minerva-design@<version> tag created by changeset publish
   ```

   `changeset publish` only publishes `minerva-design` when its version is not on npm yet (private packages are never published). With 2FA enabled for writes, npm prompts for a one-time password (or pass it up front: `pnpm release --otp <code>`, the argument is forwarded to `changeset publish`).

What the package publishes (`files` in `packages/minerva-design/package.json`; tests, sources and the docs site are never included):

| Folder                 | Contents                                                                                                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dist/react/`          | The React entries: ESM + CJS per module, `.d.ts` / `.d.cts`, `style.css`, per-component `styles/*.css`, `prose.scss`, the `./monaco`, `./theme-utils` and `./utils` entries |
| `dist/core/`           | The framework-agnostic core shared by both libraries (ESM + CJS, `.d.ts` / `.d.cts`, `tokens.css`)                                                                          |
| `dist/web-components/` | ESM per element, `elements/*` entries incl. the optional `code-editor`, `cdn/minerva.js`, framework typings in `types/`, `html-custom-data.json`                            |
| package root           | `custom-elements.json`, `README.md`, `LICENSE`, `CHANGELOG.md`                                                                                                              |

The workspace packages (`@minerva/core`, `@minerva/dom`, `@minerva/react`, `@minerva/web-components`, the planned renderers `@minerva/{vue,angular,native,taro,weapp,uni}` and `@minerva/docs`) are private and never published.

## 🤝 Contributing

We welcome contributions! Please refer to our [CONTRIBUTING.md](./CONTRIBUTING.md) for more information.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 📧 Contact

For any questions or feedback, please contact us:

- Email: [fwx5618177@gmail.com](mailto:fwx5618177@gmail.com)
- GitHub Issues: [https://github.com/fwx5618177/minerva-design/issues](https://github.com/fwx5618177/minerva-design/issues)
- GitHub Pull Requests: [https://github.com/fwx5618177/minerva-design/pulls](https://github.com/fwx5618177/minerva-design/pulls)
