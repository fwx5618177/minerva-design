# Overview

Minerva Design provides React, Vue, Angular, Web Components, React Native, Taro, native WeChat and uni-app renderers with shared component contracts and design tokens.

Package: minerva-design@1.20.6

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

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
