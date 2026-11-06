# LoadingState

Page, route and section loading: a decorative ProgressIndicator spinner next to a visible label, inside a single polite status region.

Package: minerva-design@1.21.1

Renderer: react

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

## LoadingState

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "LoadingState"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "source": "packages/react/src/components/LoadingState/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Visible text, which is also what the status region announces"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/LoadingState/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "LoadingStateSize | undefined",
    "typeRef": "type:3726d1ab9f3b6eb4edaf",
    "default": "medium",
    "required": false,
    "description": "Minimum height: small for a section, medium for a page or route, large for tall content such as a calendar"
  }
]
```

## API

```json
{
  "LoadingStateProps": {
    "source": "react/src/components/LoadingState/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLDivElement>, \"children\">"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "required": false,
        "default": "\"Loading...\" (localized)",
        "description": "Visible text, which is also what the status region announces"
      },
      {
        "name": "size",
        "type": "LoadingStateSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Minimum height: small for a section, medium for a page or route, large for tall content such as a calendar"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root <div> element"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:LoadingState": {
    "kind": "cssVars",
    "source": "react/src/components/LoadingState",
    "vars": [
      {
        "name": "--loading-state-gap",
        "description": "Space between the spinner and the label"
      },
      {
        "name": "--loading-state-padding",
        "description": "Padding"
      },
      {
        "name": "--loading-state-min-height",
        "description": "Minimum height (every size; defaults to the height of the size)"
      },
      {
        "name": "--loading-state-color",
        "description": "Color of the label and the spinner"
      },
      {
        "name": "--loading-state-font-size",
        "description": "Font size of the label"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

The default label is localized; the visible text is what screen readers announce.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/loading-state/demos/basic.tsx

```tsx
import { LoadingState } from "minerva-design";

export default function BasicDemo() {
  return <LoadingState />;
}

```

## Example: Sizes

small, medium and large set minimum heights of 64, 160 and 240 px.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/loading-state/demos/sizes.tsx

```tsx
import { LoadingState } from "minerva-design";

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <LoadingState size="small" label="Loading records..." />
      <LoadingState size="large" label="Loading calendar..." />
    </div>
  );
}

```
