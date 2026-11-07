# Overview

Minerva Design provides React, Vue, Angular, Web Components, React Native, Taro, native WeChat and uni-app renderers with shared component contracts and design tokens.

Package: minerva-design@1.22.2

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### What is Minerva

One minerva-design package exposes a separate entry for each renderer. Implemented APIs and host-specific equivalents are listed in the platform support matrix.

Web and mini-program renderers use CSS variables; React Native resolves the same tokens to native style values. Providers control themes, palettes and design presets for each host.

### Packages

React 19 components, ConfigProvider, theme utilities and hooks, with ESM, CommonJS and TypeScript declarations. Other renderers use their documented subpath entries.

Lit-based custom elements covering the documented component catalog, usable in plain HTML and framework integrations.

### Highlights

#### Themes

Light, dark and system modes, built-in palettes and design presets, plus custom themes through ConfigProvider.

#### Internationalization

The React library ships its own translations for English, Chinese, Japanese and French with a tiny built-in translator: no i18n library dependency, fully isolated from your app's i18n setup.

#### Accessibility

semantic elements, keyboard support, visible focus rings and aria-label props for icon-only controls.

#### TypeScript

written in TypeScript; every component exports its props type, and themes are typed token maps.

#### Tree-shakable builds

Import the entry for your renderer. Build formats, stylesheets and optional host dependencies are documented in Installation and Platform support.

### A quick look

Import the stylesheet once, wrap your app in ConfigProvider and use the components:

### Explore the documentation

Every page has live examples with their source code and an API table generated from the component types.

```tsx
import { Button, ConfigProvider, HStack, Switch } from "minerva-design";
import "minerva-design/style.css";

export default function App() {
  return (
    <ConfigProvider theme="system">
      <HStack gap={4}>
        <Button color="primary">Save</Button>
        <Switch label="Notifications" defaultChecked />
      </HStack>
    </ConfigProvider>
  );
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
