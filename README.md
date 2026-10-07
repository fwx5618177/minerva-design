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
- **Web Components**: Lit-based custom elements that work with any framework, or none
- **ESM + CommonJS**: both module formats are shipped
- **TypeScript**: type definitions are included
- **Theming**: light / dark / system modes plus the `editorial`, `tech`, `graphite` and `cool` palettes, driven by CSS custom properties; cookie persistence and a no-flash `THEME_INIT_SCRIPT` for SSR (`@minerva/lib-core/theme-utils`, server-safe)
- **Entries**: `@minerva/lib-core`, `/theme-utils`, `/monaco`, `style.css`, `prose.scss`
- **i18n**: built-in locales for English, Chinese, Japanese and French
- **No headless dependency**: overlays, menus, select, tabs and `asChild` are built in house on `@minerva/core`; Floating UI is the only third-party interaction dependency

## 📦 Packages

| Package                       | Description                                                                                                                                                                                        |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@minerva/core`               | Framework-agnostic interaction primitives (focus scope, dismissable layers, scroll lock, roving focus, positioning...), theme utilities, design tokens and i18n messages. Installed with lib-core. |
| `@minerva/lib-core`           | React 19 component library. ESM + CJS, TypeScript types. Peer deps: `react` and `react-dom` `^19.0.0`.                                                                                             |
| `@minerva/lib-web-components` | Lit-based Web Components. Currently provides the `<minerva-button>` custom element.                                                                                                                |
| `@minerva/sample` (private)   | Vite docs/demo site, deployed to GitHub Pages.                                                                                                                                                     |

### Architecture

```
@minerva/core            framework-agnostic TypeScript (DOM only)
  interaction primitives · positioning (@floating-ui/dom) · theme · tokens · i18n
        ▲ React hooks                    ▲ Lit controllers (later)
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

Requires React 19 (`react` and `react-dom` `^19.0.0`). Version 1.x of `@minerva/lib-core` supports React 18. The entry is marked `"use client"`, so it can be imported from React Server Components frameworks (e.g. the Next.js App Router) without a wrapper.

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

```bash
pnpm add @minerva/lib-web-components
```

Register the custom elements once:

```ts
import "@minerva/lib-web-components";
```

Then use them in any HTML:

```html
<minerva-button variant="primary" size="medium" shape="pill">
  Click me
</minerva-button>
<minerva-button variant="ghost" loading>Loading</minerva-button>
<minerva-button variant="error" disabled aria-label="Delete">
  Delete
</minerva-button>
```

`<minerva-button>` attributes:

| Attribute                       | Values                                                                                  |
| ------------------------------- | --------------------------------------------------------------------------------------- |
| `variant`                       | `primary`, `secondary`, `success`, `warning`, `error`, `info`, `ghost`, `retry`, `back` |
| `size`                          | `tiny`, `small`, `medium`, `large`                                                      |
| `shape`                         | `square`, `rounded`, `circle`, `pill`                                                   |
| `loading`, `disabled`, `active` | boolean                                                                                 |
| `aria-label`                    | string                                                                                  |

For JSX typings in a React project, add:

```ts
/// <reference types="@minerva/lib-web-components/react" />
```

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
| `pnpm test:dist`                    | Smoke-test the built `@minerva/lib-core` package (run after build)         |
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
- Docs deployment: `.github/workflows/deploy.yml` builds the docs site and publishes it to GitHub Pages on every push to `main`

### Releasing

Versioning and changelogs are managed with [Changesets](https://github.com/changesets/changesets). Publishing is done manually from a maintainer's machine:

```bash
# 1. In your PR: describe the change (choose packages + semver bump)
pnpm changeset

# 2. When releasing, on an up-to-date main branch:
pnpm version-packages   # bumps versions, updates CHANGELOG.md files, consumes .changeset/*.md
pnpm install            # refresh the lockfile if internal versions changed
git commit -am "chore: release" && git push

# 3. Publish (requires `npm login` with publish rights to the @minerva scope)
pnpm release            # builds core + lib-core + lib-web-components, then `changeset publish`
git push --follow-tags  # push the tags created by changeset publish
```

Before publishing, make sure `pnpm lint && pnpm typecheck && pnpm test && pnpm build` pass.

## 🤝 Contributing

We welcome contributions! Please refer to our [CONTRIBUTING.md](./CONTRIBUTING.md) for more information.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 📧 Contact

For any questions or feedback, please contact us:

- Email: [fwx5618177@gmail.com](mailto:fwx5618177@gmail.com)
- GitHub Issues: [https://github.com/fwx5618177/minerva/issues](https://github.com/fwx5618177/minerva/issues)
- GitHub Pull Requests: [https://github.com/fwx5618177/minerva/pulls](https://github.com/fwx5618177/minerva/pulls)
