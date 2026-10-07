# Minerva Component Library

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/fwx5618177/minerva.svg?style=social&label=Stars)](https://github.com/fwx5618177/minerva)
[![GitHub issues](https://img.shields.io/github/issues/fwx5618177/minerva.svg)](https://github.com/fwx5618177/minerva/issues)
[![GitHub license](https://img.shields.io/github/license/fwx5618177/minerva.svg)](https://github.com/fwx5618177/minerva/blob/main/LICENSE)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/fwx5618177/minerva.svg)](https://github.com/fwx5618177/minerva/pulls)
[![GitHub contributors](https://img.shields.io/github/contributors/fwx5618177/minerva.svg)](https://github.com/fwx5618177/minerva/graphs/contributors)

[English](./README.md) | [简体中文](./README_ZH.md) | [日本語](./README_JP.md)

</div>

Minerva is a UI component library for the web: a React component library plus a set of framework-agnostic Web Components, developed together in a single pnpm monorepo.

## 🌟 Demo & Documentation

Docs and live demos: [https://fwx5618177.github.io/minerva/](https://fwx5618177.github.io/minerva/)

## ✨ Features

- **React components**: 100+ components for React 19 (`ref` as a regular prop, `"use client"` entries for React Server Components)
- **Web Components**: the whole component set as standard custom elements (Lit) for plain HTML, Vue, Angular, Svelte, Solid or React: same look, tokens, keyboard and ARIA behaviour, form-associated controls, a CDN bundle and generated framework typings
- **ESM + CommonJS**: both module formats are shipped for the React library (the Web Components are ESM only)
- **TypeScript**: type definitions are included
- **Theming**: light / dark / system modes plus the `editorial`, `tech`, `graphite` and `cool` palettes, driven by CSS custom properties; cookie persistence and a no-flash `THEME_INIT_SCRIPT` for SSR (`@minerva/lib-core/theme-utils`, server-safe)
- **Design presets**: switch the whole app's look with `<ConfigProvider preset="editorial">` (restrained, reading-oriented) or the `density` / `radius` / `shadow` / `fontScale` axes; SSR-ready (`designAttributes()`, `createThemeInitScript({ design })`) and scoped by nested providers
- **Customization**: every component documents a stable set of CSS custom properties (`--button-height`, `--modal-width`, ...)
- **Entries**: `@minerva/lib-core`, `/theme-utils`, `/monaco`, `style.css` (or per-component `styles/<component>.css` + `styles/tokens.css`), `prose.scss`; tree-shakeable per component, no icon / i18n runtime dependencies
- **i18n**: built-in locales for English, Chinese, Japanese and French
- **No headless dependency**: overlays, menus, select, tabs and `asChild` are built in house on `@minerva/core`; Floating UI is the only third-party interaction dependency

## 📦 Packages

| Package                       | Description                                                                                                                                                                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@minerva/core`               | Framework-agnostic interaction primitives (focus scope, dismissable layers, scroll lock, roving focus, positioning...), theme utilities, design tokens and i18n messages. Installed with lib-core.                                                           |
| `@minerva/lib-core`           | React 19 component library. ESM + CJS, TypeScript types. Peer deps: `react` and `react-dom` `^19.0.0`.                                                                                                                                                       |
| `@minerva/lib-web-components` | Framework-agnostic Web Components (Lit): every Minerva component as a custom element (`<minerva-button>`, `<minerva-select>`, `<minerva-modal>`...). ESM only; per-element entries, a CDN bundle, `tokens.css` and typings for React, Vue, Svelte and Solid. |
| `@minerva/sample` (private)   | Vite docs/demo site, deployed to GitHub Pages.                                                                                                                                                                                                               |

### Architecture

```
@minerva/core            framework-agnostic TypeScript (DOM only)
  interaction primitives · positioning (@floating-ui/dom) · theme · tokens · i18n
        ▲ React hooks                    ▲ Lit controllers
@minerva/lib-core               @minerva/lib-web-components
```

Every overlay of `@minerva/lib-core` (Modal, Drawer, Popover, Tooltip, Menu, ContextMenu, Select, AutoComplete, Cascader, TimePicker) is built on the same core primitives: one layer stack (Escape closes the innermost overlay first), one focus implementation (focus returns to the opener) and one positioning engine. See the [Architecture](https://fwx5618177.github.io/minerva/#/architecture) page.

### Components (`@minerva/lib-core`)

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
| Editors      | `MonacoCodeEditor` (`@minerva/lib-core/monaco`)                                                                                                                                                                                                                                                                      |

Besides components, `@minerva/lib-core` exports `ConfigProvider`, `useConfig`, the hooks `useAutoTheme`, `useLocale` and `useI18n`, the utilities `applyThemeStyles` and `generateCSSVariables`, and the built-in `themes` map (`light`, `dark`, `github-dark`).

## 🚀 Quick Start

### Installation

```bash
pnpm add @minerva/lib-core react react-dom
```

OR

```bash
npm install @minerva/lib-core react react-dom
```

OR

```bash
yarn add @minerva/lib-core react react-dom
```

Requires React 19 (`react` and `react-dom` `^19.0.0`). React 18 is not supported (the components use React 19 APIs such as `ref` as a regular prop). Every client module is marked `"use client"`, so it can be imported from React Server Components frameworks (e.g. the Next.js App Router) without a wrapper.

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
} from "@minerva/lib-core";
import "@minerva/lib-core/style.css";

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
import { ConfigProvider, themes, useConfig } from "@minerva/lib-core";

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
import {
  THEME_INIT_SCRIPT,
  parseThemeCookies,
} from "@minerva/lib-core/theme-utils";
import { ThemeProvider } from "@minerva/lib-core";

export default async function Layout({ children }) {
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

### Toast API

```tsx
import { Button, toast } from "@minerva/lib-core";

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

The same components as standard custom elements, for any framework or none. They render the lib-core DOM and styles in their shadow root and reuse the `@minerva/core` primitives, so they look and behave like the React components.

```bash
pnpm add @minerva/lib-web-components
```

```ts
// every element...
import "@minerva/lib-web-components";
// ...or only the ones you use (one entry per element)
import "@minerva/lib-web-components/select";

// design tokens, once (already included in @minerva/lib-core/style.css)
import "@minerva/lib-web-components/tokens.css";
```

Or, without a build step, from a CDN:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@minerva/lib-web-components@1/dist/tokens.css"
/>
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@minerva/lib-web-components@1/dist/cdn/minerva.js"
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
/// <reference types="@minerva/lib-web-components/react" />  // React 19 JSX
/// <reference types="@minerva/lib-web-components/svelte" /> // Svelte 5
/// <reference types="@minerva/lib-web-components/solid" />  // Solid
// Vue (Volar): add "@minerva/lib-web-components/vue" to compilerOptions.types
// VS Code: "html.customData": ["./node_modules/@minerva/lib-web-components/dist/html-custom-data.json"]
```

Guides for plain HTML, Vue, Angular, Svelte, forms and theming: [Web Components](https://fwx5618177.github.io/minerva/#/web-components).

## 🧑‍💻 Developer Quick Start

Requirements: Node.js >= 22.12 (see `.nvmrc`) and pnpm 11 for local development. Building the packages and the docs site also works on Node.js 20.19+, which is what the GitHub Pages deploy workflow uses.

```bash
git clone https://github.com/fwx5618177/minerva.git
cd minerva
pnpm install
pnpm dev
```

### Scripts

| Command                             | Description                                                                |
| ----------------------------------- | -------------------------------------------------------------------------- |
| `pnpm dev`                          | Build the libraries, then start the docs/demo site                         |
| `pnpm build`                        | Build all packages in order: core → lib-core → lib-web-components → sample |
| `pnpm test`                         | Run all tests: unit (all packages, docs checks) and e2e user flows         |
| `pnpm test:unit` / `pnpm test:e2e`  | Run only the unit tests / only the e2e user flows (`tests/e2e`)            |
| `pnpm test:dist`                    | Test the built lib-core and lib-web-components packages (run after build)  |
| `pnpm test:coverage`                | Run all tests with coverage (thresholds enforced)                          |
| `pnpm lint`                         | Run ESLint (flat config)                                                   |
| `pnpm typecheck`                    | Type-check all packages                                                    |
| `pnpm format` / `pnpm format:check` | Format with Prettier / check formatting                                    |
| `pnpm clean`                        | Remove build output                                                        |
| `pnpm changeset`                    | Add a changeset describing your change                                     |
| `pnpm version-packages`             | Apply pending changesets: bump versions and write changelogs               |
| `pnpm release`                      | Build the libraries and publish them to npm                                |

### Tooling

- Build: Vite 8
- Testing: Vitest, Testing Library, happy-dom
- Linting and formatting: ESLint 10 + typescript-eslint, Prettier
- Git hooks: Husky, lint-staged, commitlint (Conventional Commits)
- CI: `.github/workflows/ci.yml` runs lint, typecheck, format check, tests with coverage, build, built-package tests and package checks on Node 22 for every push to `main` and every pull request
- Docs deployment: `.github/workflows/deploy.yml` builds the docs site and publishes it to GitHub Pages on every push to `main`

### Releasing (manual npm publishing)

Versioning and changelogs are managed with [Changesets](https://github.com/changesets/changesets). Publishing is **manual**, from a maintainer's machine: there is no publish workflow in CI (`.github/workflows/ci.yml` only verifies, `deploy.yml` only deploys the docs site).

1. **Describe each change** (in its PR): `pnpm changeset`, pick the packages and the semver bump; commit the generated `.changeset/*.md`.
2. **Version** (on an up-to-date `main`, clean working tree):

   ```bash
   pnpm version-packages   # changeset version: bumps versions, writes CHANGELOG.md, consumes .changeset/*.md
   pnpm install            # refresh the lockfile (internal dependency ranges may have changed)
   ```

3. **Review** the result before anything leaves your machine: `git diff` (versions, CHANGELOG entries, `@minerva/core` ranges in lib-core / lib-web-components), then run the same checks as CI on Node 22 (`.nvmrc`):

   ```bash
   pnpm lint && pnpm typecheck && pnpm format:check && pnpm test:coverage
   pnpm build && pnpm test:dist && pnpm check:package
   pnpm -r publish --dry-run --no-git-checks   # what would be published, nothing is uploaded
   git commit -am "chore: release" && git push
   ```

4. **Log in to npm** with an account that can publish to the `@minerva` scope, with two-factor authentication enabled:

   ```bash
   npm login --registry https://registry.npmjs.org/
   npm whoami --registry https://registry.npmjs.org/
   ```

   Each package sets `publishConfig.registry` to `https://registry.npmjs.org/`, so a mirror configured in `~/.npmrc` (e.g. npmmirror) is not used for publishing.

5. **Publish**:

   ```bash
   pnpm release            # builds core + lib-core + lib-web-components, then `changeset publish`
   git push --follow-tags  # push the <package>@<version> tags created by changeset publish
   ```

   `changeset publish` only publishes packages whose version is not on npm yet, in dependency order (`@minerva/core` before `@minerva/lib-core` and `@minerva/lib-web-components`), and replaces `workspace:*` with the real version. With 2FA enabled for writes, npm prompts for a one-time password (or pass it up front: `pnpm release --otp <code>`, the argument is forwarded to `changeset publish`).

What each package publishes (`files` in its `package.json`; tests, sources and the docs site are never included):

| Package                       | Contents                                                                                                                                                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@minerva/core`               | `dist/` (ESM + CJS, `.d.ts` / `.d.cts`, `tokens.css`), `README.md`, `LICENSE`                                                                                                                                            |
| `@minerva/lib-core`           | `dist/` (ESM + CJS per module, types, `style.css`, per-component `styles/*.css`, `prose.scss`, the `./monaco` and `./theme-utils` entries), `README.md`, `LICENSE`                                                       |
| `@minerva/lib-web-components` | `dist/` (ESM per element, `elements/*` entries incl. the optional `code-editor`, `cdn/minerva.js`, `tokens.css`, framework typings in `types/`, `html-custom-data.json`), `custom-elements.json`, `README.md`, `LICENSE` |

`@minerva/sample` (the docs site) is private and never published.

## 🤝 Contributing

We welcome contributions! Please refer to our [CONTRIBUTING.md](./CONTRIBUTING.md) for more information.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 📧 Contact

For any questions or feedback, please contact us:

- Email: [fwx5618177@gmail.com](mailto:fwx5618177@gmail.com)
- GitHub Issues: [https://github.com/fwx5618177/minerva/issues](https://github.com/fwx5618177/minerva/issues)
- GitHub Pull Requests: [https://github.com/fwx5618177/minerva/pulls](https://github.com/fwx5618177/minerva/pulls)
