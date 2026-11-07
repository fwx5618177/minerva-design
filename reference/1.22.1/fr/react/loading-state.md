# LoadingState

Chargement de page, de route ou de section : un spinner ProgressIndicator décoratif à côté d'un libellé visible, dans une seule région de statut polie.

Package: minerva-design@1.22.1

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

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

## Example: Utilisation de base

Le libellé par défaut est localisé ; le texte visible est celui annoncé par les lecteurs d'écran.

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

## Example: Tailles

small, medium et large fixent des hauteurs minimales de 64, 160 et 240 px.

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
