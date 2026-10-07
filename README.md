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

- **React components**: 30+ components for React 19 (`ref` as a regular prop, `"use client"` entry for React Server Components)
- **Web Components**: Lit-based custom elements that work with any framework, or none
- **ESM + CommonJS**: both module formats are shipped
- **TypeScript**: type definitions are included
- **Theming**: light, dark, `github-dark` or your own theme, driven by CSS custom properties; follows the system color scheme by default
- **i18n**: built-in locales for English, Chinese and French

## 📦 Packages

| Package                       | Description                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ |
| `@minerva/lib-core`           | React 19 component library. ESM + CJS, TypeScript types. Peer deps: `react` and `react-dom` `^19.0.0`. |
| `@minerva/lib-web-components` | Lit-based Web Components. Currently provides the `<minerva-button>` custom element.                    |
| `@minerva/sample` (private)   | Vite docs/demo site, deployed to GitHub Pages.                                                         |

### Components (`@minerva/lib-core`)

| Category     | Components                                                                                                                                                                                   |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| General      | `Button`, `IconButton`, `InteractiveIconButton`, `SearchButton`                                                                                                                              |
| Layout       | `Space`, `Divider`                                                                                                                                                                           |
| Data entry   | `TextField`, `AutoComplete`, `Cascader`, `Checkbox`, `Radio`, `RadioGroup`, `Switch`, `TimePicker`                                                                                           |
| Data display | `Avatar`, `AvatarGroup`, `Badge`, `Card` (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`), `Chip`, `Tag`, `Empty`, `StatusIndicator`, `Pagination`, `VirtualList` |
| Feedback     | `Alert`, `message` / `useMessage`, `ProgressIndicator`, `Skeleton`                                                                                                                           |
| Overlay      | `Dropdown`, `Popper`, `Tooltip`                                                                                                                                                              |

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
  Space,
  Switch,
  TextField,
  message,
} from "@minerva/lib-core";
import "@minerva/lib-core/style.css";

export default function App() {
  const [name, setName] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <ConfigProvider>
      <Space direction="vertical" size="medium">
        <Alert variant="info" title="Welcome" closable>
          Minerva is ready.
        </Alert>
        <TextField
          name="username"
          label="Username"
          placeholder="Enter username"
          value={name}
          onChange={setName}
          clearable
        />
        <Switch
          label="Subscribe"
          checked={subscribed}
          onChange={(checked) => setSubscribed(checked)}
        />
        <Button
          variant="primary"
          onClick={() => message.success(`Hello, ${name}`)}
        >
          Submit
        </Button>
      </Space>
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

### Message API

```tsx
import { Button, message, useMessage } from "@minerva/lib-core";

export function SaveButton() {
  const msg = useMessage();

  const save = () => {
    msg
      .loading({ content: "Saving...", duration: 1000 })
      .then(() => message.success("Saved"));
  };

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

| Command                             | Description                                                         |
| ----------------------------------- | ------------------------------------------------------------------- |
| `pnpm dev`                          | Build the libraries, then start the docs/demo site                  |
| `pnpm build`                        | Build all packages in order: lib-core → lib-web-components → sample |
| `pnpm test`                         | Run all tests: unit (all packages, docs checks) and e2e user flows  |
| `pnpm test:unit` / `pnpm test:e2e`  | Run only the unit tests / only the e2e user flows (`tests/e2e`)     |
| `pnpm test:dist`                    | Smoke-test the built `@minerva/lib-core` package (run after build)  |
| `pnpm test:coverage`                | Run all tests with coverage (thresholds enforced)                   |
| `pnpm lint`                         | Run ESLint (flat config)                                            |
| `pnpm typecheck`                    | Type-check all packages                                             |
| `pnpm format` / `pnpm format:check` | Format with Prettier / check formatting                             |
| `pnpm clean`                        | Remove build output                                                 |
| `pnpm changeset`                    | Add a changeset describing your change                              |
| `pnpm version-packages`             | Apply pending changesets: bump versions and write changelogs        |
| `pnpm release`                      | Build the libraries and publish them to npm                         |

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
pnpm release            # builds lib-core + lib-web-components, then `changeset publish`
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
