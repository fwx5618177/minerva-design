# Empty

Contenu de remplacement affiché lorsqu’il n’y a aucune donnée à afficher.

Package: minerva-design@1.20.5

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

## Empty

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Empty"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "title",
    "source": "packages/native/src/components/Empty/Empty.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Heading of the empty state; also its accessible name"
  },
  {
    "name": "description",
    "source": "packages/native/src/components/Empty/Empty.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Description text; `null` hides it"
  },
  {
    "name": "image",
    "source": "packages/native/src/components/Empty/Empty.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Custom illustration replacing the built-in box; `null` hides it"
  },
  {
    "name": "icon",
    "source": "packages/native/src/components/Empty/Empty.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Custom icon (web contract name of `image`); `null` hides it"
  },
  {
    "name": "action",
    "source": "packages/native/src/components/Empty/Empty.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Primary call to action (e.g. a Button)"
  },
  {
    "name": "secondaryAction",
    "source": "packages/native/src/components/Empty/Empty.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Secondary action rendered after `action`"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Empty/Empty.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "EmptySize | undefined",
    "typeRef": "type:23508df583e2352f6f11",
    "default": "medium",
    "required": false,
    "description": "Illustration, text sizes and padding"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/Empty/Empty.tsx",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false,
    "description": "Width of the container"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/Empty/Empty.tsx",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false,
    "description": "Height of the container"
  },
  {
    "name": "showShadow",
    "source": "packages/native/src/components/Empty/Empty.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Adds a drop shadow (and a surface background)"
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## API

```json
{
  "native:EmptyProps": {
    "source": "native/src/components/Empty/Empty.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "title",
        "type": "ReactNode",
        "required": false,
        "description": "Heading of the empty state; also its accessible name"
      },
      {
        "name": "description",
        "type": "ReactNode | null",
        "required": false,
        "default": "the \"empty.description\" message",
        "description": "Description text; `null` hides it"
      },
      {
        "name": "image",
        "type": "ReactNode | null",
        "required": false,
        "description": "Custom illustration replacing the built-in box; `null` hides it"
      },
      {
        "name": "icon",
        "type": "ReactNode | null",
        "required": false,
        "description": "Custom icon (web contract name of `image`); `null` hides it"
      },
      {
        "name": "action",
        "type": "ReactNode",
        "required": false,
        "description": "Primary call to action (e.g. a Button)"
      },
      {
        "name": "secondaryAction",
        "type": "ReactNode",
        "required": false,
        "description": "Secondary action rendered after `action`"
      },
      {
        "name": "size",
        "type": "EmptySize",
        "required": false,
        "default": "\"medium\"",
        "description": "Illustration, text sizes and padding"
      },
      {
        "name": "width",
        "type": "DimensionValue",
        "required": false,
        "description": "Width of the container"
      },
      {
        "name": "height",
        "type": "DimensionValue",
        "required": false,
        "description": "Height of the container"
      },
      {
        "name": "showShadow",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Adds a drop shadow (and a surface background)"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Extra content under the description"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the root view"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Empty": {
    "kind": "cssVars",
    "source": "react/src/components/Empty",
    "vars": [
      {
        "name": "--empty-padding",
        "description": "Padding (every size; defaults to the padding of the size)"
      },
      {
        "name": "--empty-gap",
        "description": "Space between the icon, title, description and actions (sized layout)"
      },
      {
        "name": "--empty-icon-size",
        "description": "Size of the illustration icon (every size)"
      },
      {
        "name": "--empty-color",
        "description": "Text color of the description"
      },
      {
        "name": "--empty-background",
        "description": "Background of the framed (unsized) layout"
      },
      {
        "name": "--empty-radius",
        "description": "Corner radius of the framed (unsized) layout (defaults to --radius-sm)"
      },
      {
        "name": "--empty-description-max-width",
        "description": "Maximum width of the description (sized layout)"
      },
      {
        "name": "--empty-icon-background",
        "description": "Background of the icon tile (sized layout)"
      },
      {
        "name": "--empty-icon-border-color",
        "description": "Ring color of the icon tile (sized layout)"
      },
      {
        "name": "--empty-icon-radius",
        "description": "Corner radius of the icon tile (sized layout; defaults to --radius-lg)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

L’icône par défaut avec la description « No Data ».

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/empty/native/basic.tsx

```tsx
import { Empty } from "minerva-design/native";
export default function Basic() {
  return (
    <Empty
      title="No records"
      description="Create your first record to get started."
    />
  );
}

```
