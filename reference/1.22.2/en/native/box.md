# Box

A polymorphic container with spacing, size, background, radius and shadow shorthands.

Package: minerva-design@1.22.2

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Box

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Box"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "p",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false
  },
  {
    "name": "px",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false
  },
  {
    "name": "py",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false
  },
  {
    "name": "pt",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false
  },
  {
    "name": "pr",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false
  },
  {
    "name": "pb",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false
  },
  {
    "name": "pl",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false
  },
  {
    "name": "m",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false
  },
  {
    "name": "mx",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false
  },
  {
    "name": "my",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false
  },
  {
    "name": "mt",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false
  },
  {
    "name": "mr",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false
  },
  {
    "name": "mb",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false
  },
  {
    "name": "ml",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false
  },
  {
    "name": "w",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false
  },
  {
    "name": "h",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false
  },
  {
    "name": "minW",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false
  },
  {
    "name": "minH",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false
  },
  {
    "name": "maxW",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false
  },
  {
    "name": "maxH",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false
  },
  {
    "name": "bg",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "rounded",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "boxShadow",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "enum",
    "values": [
      "lg",
      "md",
      "sm",
      "xl"
    ],
    "typeText": "\"sm\" | \"md\" | \"lg\" | \"xl\" | undefined",
    "typeRef": "type:9f3d41c278bda59652fb",
    "required": false
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
  "native:BoxProps": {
    "source": "native/src/components/Layout/index.tsx",
    "kind": "interface",
    "extends": [
      "ViewProps"
    ],
    "props": [
      {
        "name": "p",
        "type": "BoxSpace",
        "required": false
      },
      {
        "name": "px",
        "type": "BoxSpace",
        "required": false
      },
      {
        "name": "py",
        "type": "BoxSpace",
        "required": false
      },
      {
        "name": "pt",
        "type": "BoxSpace",
        "required": false
      },
      {
        "name": "pr",
        "type": "BoxSpace",
        "required": false
      },
      {
        "name": "pb",
        "type": "BoxSpace",
        "required": false
      },
      {
        "name": "pl",
        "type": "BoxSpace",
        "required": false
      },
      {
        "name": "m",
        "type": "BoxSpace",
        "required": false
      },
      {
        "name": "mx",
        "type": "BoxSpace",
        "required": false
      },
      {
        "name": "my",
        "type": "BoxSpace",
        "required": false
      },
      {
        "name": "mt",
        "type": "BoxSpace",
        "required": false
      },
      {
        "name": "mr",
        "type": "BoxSpace",
        "required": false
      },
      {
        "name": "mb",
        "type": "BoxSpace",
        "required": false
      },
      {
        "name": "ml",
        "type": "BoxSpace",
        "required": false
      },
      {
        "name": "w",
        "type": "BoxSize",
        "required": false
      },
      {
        "name": "h",
        "type": "BoxSize",
        "required": false
      },
      {
        "name": "minW",
        "type": "BoxSize",
        "required": false
      },
      {
        "name": "minH",
        "type": "BoxSize",
        "required": false
      },
      {
        "name": "maxW",
        "type": "BoxSize",
        "required": false
      },
      {
        "name": "maxH",
        "type": "BoxSize",
        "required": false
      },
      {
        "name": "bg",
        "type": "string",
        "required": false
      },
      {
        "name": "rounded",
        "type": "string",
        "required": false
      },
      {
        "name": "boxShadow",
        "type": "\"sm\" | \"md\" | \"lg\" | \"xl\"",
        "required": false
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

Numeric spacing selects tokens (4 -> var(--space-4)); bg accepts surface aliases.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/box/native/basic.tsx

```tsx
import { Text } from "react-native";
import { Box } from "minerva-design/native";
export default function Basic() {
  return (
    <Box p={4} bg="bg.subtle" rounded="lg" boxShadow="sm">
      <Text>A padded native surface using shared design tokens.</Text>
    </Box>
  );
}

```
