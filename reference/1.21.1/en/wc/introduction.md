# Introduction

The ideas behind Minerva, how to read the component pages, and the conventions shared by every component.

Package: minerva-design@1.21.1

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### Design principles

#### Token-driven

colors, radii and shadows come from CSS custom properties, so every component follows the active theme, including your own.

#### Accessible by default

components render native, semantic elements, support the keyboard, show a visible focus ring and expose aria-label where a visible label may be missing.

#### Predictable APIs

the same prop names (variant, size, shape, disabled, loading...) mean the same thing across components.

#### Small and composable

components do one thing and accept className and style, so they are easy to combine with your own layout and styles.

### How to read the component pages

Every component page follows the same structure:

the exact import statement of the component. The global stylesheet is not repeated there: it is imported once, in your app entry (see Installation).

live demos covering each feature. Use "Show code" to see the complete source; every demo is self-contained and can be copied as is. Demos report what happened on the page with Minerva's own components (a toast, a dialog or an inline result), never with browser alerts or the console.

tables generated from the component's TypeScript types, with the type, the default value and a description of every prop.

### Conventions

#### Controlled and uncontrolled

Form components can manage their own state (pass defaultChecked / defaultValue, or nothing) or be controlled (pass checked / value together with onChange). Do not switch between the two modes during a component's lifetime.

#### className and style

Components accept className (and usually style) on their root element. Components that wrap a native element, such as Button, also forward the native attributes (type, name, data-*, aria-*...).

#### Accessible names

When a control has no visible text (an icon button, a search button, a close icon...), give it an accessible name with the aria-label prop. It is passed through to the interactive element.

### Browser support

Minerva targets current evergreen browsers: Chrome and Edge 111+, Firefox 113+ and Safari 16.2+. The theme relies on CSS custom properties and color-mix(); Internet Explorer is not supported. Server-side rendering works, the theme is applied on the client once React mounts.

### Contributing

Minerva is open source under the MIT license. Bug reports, ideas and pull requests are welcome on GitHub:

```tsx
import { useState } from "react";
import { Switch } from "minerva-design";

// Uncontrolled: the component keeps its own state
<Switch label="Wi-Fi" defaultChecked />;

// Controlled: you own the state and update it in onChange
function Controlled() {
  const [on, setOn] = useState(false);
  return <Switch label="Bluetooth" checked={on} onChange={setOn} />;
}
```

```tsx
import { Button, IconButton } from "minerva-design";
import { IoTrashOutline } from "react-icons/io5";

<Button className="my-button" style={{ minWidth: 120 }} type="submit">
  Save
</Button>;

// icon-only controls need an accessible name
<IconButton icon={<IoTrashOutline />} aria-label="Delete item" />;
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
