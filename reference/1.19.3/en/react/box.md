# Box

A polymorphic container with spacing, size, background, radius and shadow shorthands.

Package: minerva-design@1.19.3

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Box

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "as",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "ElementType | undefined",
    "typeRef": "type:a576b79e37ed7758f7d3",
    "parameters": [
      {
        "name": "props",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "any",
        "typeRef": "type:60147dc54bd779d71e81"
      }
    ],
    "returnType": {
      "typeText": "ReactNode | Promise<ReactNode>",
      "typeRef": "type:e41c0ac1000472a34131"
    },
    "default": "div",
    "required": false,
    "description": "Element or component to render"
  },
  {
    "name": "p",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false,
    "description": "Padding on all sides (spacing token or CSS value)"
  },
  {
    "name": "px",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false,
    "description": "Horizontal padding (left and right)"
  },
  {
    "name": "py",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false,
    "description": "Vertical padding (top and bottom)"
  },
  {
    "name": "pt",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false,
    "description": "Top padding"
  },
  {
    "name": "pr",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false,
    "description": "Right padding"
  },
  {
    "name": "pb",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false,
    "description": "Bottom padding"
  },
  {
    "name": "pl",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false,
    "description": "Left padding"
  },
  {
    "name": "m",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false,
    "description": "Margin on all sides (spacing token or CSS value such as \"auto\")"
  },
  {
    "name": "mx",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false,
    "description": "Horizontal margin (left and right)"
  },
  {
    "name": "my",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false,
    "description": "Vertical margin (top and bottom)"
  },
  {
    "name": "mt",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false,
    "description": "Top margin"
  },
  {
    "name": "mr",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false,
    "description": "Right margin"
  },
  {
    "name": "mb",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false,
    "description": "Bottom margin"
  },
  {
    "name": "ml",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false,
    "description": "Left margin"
  },
  {
    "name": "w",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "BoxSize | undefined",
    "typeRef": "type:00f70bb1b653d0a437fe",
    "required": false,
    "description": "Width: numbers are pixels, strings are CSS lengths"
  },
  {
    "name": "h",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "BoxSize | undefined",
    "typeRef": "type:00f70bb1b653d0a437fe",
    "required": false,
    "description": "Height: numbers are pixels, strings are CSS lengths"
  },
  {
    "name": "minW",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "BoxSize | undefined",
    "typeRef": "type:00f70bb1b653d0a437fe",
    "required": false,
    "description": "Minimum width"
  },
  {
    "name": "minH",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "BoxSize | undefined",
    "typeRef": "type:00f70bb1b653d0a437fe",
    "required": false,
    "description": "Minimum height"
  },
  {
    "name": "maxW",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "BoxSize | undefined",
    "typeRef": "type:00f70bb1b653d0a437fe",
    "required": false,
    "description": "Maximum width"
  },
  {
    "name": "maxH",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "union",
    "typeText": "BoxSize | undefined",
    "typeRef": "type:00f70bb1b653d0a437fe",
    "required": false,
    "description": "Maximum height"
  },
  {
    "name": "bg",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Background: a surface alias (`\"bg\"`, `\"bg.subtle\"`, `\"bg.muted\"`, `\"bg.canvas\"`, `\"bg.elevated\"`, `\"bg.emphasis\"`) or any CSS background value"
  },
  {
    "name": "rounded",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Border radius: a radius token (none, sm, md, lg, xl, 2xl, full) or any CSS value"
  },
  {
    "name": "boxShadow",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Box shadow: a shadow token (sm, md, lg, xl) or any CSS value"
  },
  {
    "name": "border",
    "source": "packages/react/src/components/Box/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "CSS border shorthand, used as-is"
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
  "BoxProps": {
    "source": "react/src/components/Box/types.ts",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLElement>"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLElement>",
        "required": false,
        "description": "Ref to the rendered element"
      },
      {
        "name": "as",
        "type": "ElementType",
        "required": false,
        "default": "\"div\"",
        "description": "Element or component to render"
      },
      {
        "name": "p",
        "type": "BoxSpace",
        "required": false,
        "description": "Padding on all sides (spacing token or CSS value)"
      },
      {
        "name": "px",
        "type": "BoxSpace",
        "required": false,
        "description": "Horizontal padding (left and right)"
      },
      {
        "name": "py",
        "type": "BoxSpace",
        "required": false,
        "description": "Vertical padding (top and bottom)"
      },
      {
        "name": "pt",
        "type": "BoxSpace",
        "required": false,
        "description": "Top padding"
      },
      {
        "name": "pr",
        "type": "BoxSpace",
        "required": false,
        "description": "Right padding"
      },
      {
        "name": "pb",
        "type": "BoxSpace",
        "required": false,
        "description": "Bottom padding"
      },
      {
        "name": "pl",
        "type": "BoxSpace",
        "required": false,
        "description": "Left padding"
      },
      {
        "name": "m",
        "type": "BoxSpace",
        "required": false,
        "description": "Margin on all sides (spacing token or CSS value such as \"auto\")"
      },
      {
        "name": "mx",
        "type": "BoxSpace",
        "required": false,
        "description": "Horizontal margin (left and right)"
      },
      {
        "name": "my",
        "type": "BoxSpace",
        "required": false,
        "description": "Vertical margin (top and bottom)"
      },
      {
        "name": "mt",
        "type": "BoxSpace",
        "required": false,
        "description": "Top margin"
      },
      {
        "name": "mr",
        "type": "BoxSpace",
        "required": false,
        "description": "Right margin"
      },
      {
        "name": "mb",
        "type": "BoxSpace",
        "required": false,
        "description": "Bottom margin"
      },
      {
        "name": "ml",
        "type": "BoxSpace",
        "required": false,
        "description": "Left margin"
      },
      {
        "name": "w",
        "type": "BoxSize",
        "required": false,
        "description": "Width: numbers are pixels, strings are CSS lengths"
      },
      {
        "name": "h",
        "type": "BoxSize",
        "required": false,
        "description": "Height: numbers are pixels, strings are CSS lengths"
      },
      {
        "name": "minW",
        "type": "BoxSize",
        "required": false,
        "description": "Minimum width"
      },
      {
        "name": "minH",
        "type": "BoxSize",
        "required": false,
        "description": "Minimum height"
      },
      {
        "name": "maxW",
        "type": "BoxSize",
        "required": false,
        "description": "Maximum width"
      },
      {
        "name": "maxH",
        "type": "BoxSize",
        "required": false,
        "description": "Maximum height"
      },
      {
        "name": "bg",
        "type": "string",
        "required": false,
        "description": "Background: a surface alias (`\"bg\"`, `\"bg.subtle\"`, `\"bg.muted\"`, `\"bg.canvas\"`, `\"bg.elevated\"`, `\"bg.emphasis\"`) or any CSS background value"
      },
      {
        "name": "rounded",
        "type": "string",
        "required": false,
        "description": "Border radius: a radius token (none, sm, md, lg, xl, 2xl, full) or any CSS value"
      },
      {
        "name": "boxShadow",
        "type": "string",
        "required": false,
        "description": "Box shadow: a shadow token (sm, md, lg, xl) or any CSS value"
      },
      {
        "name": "border",
        "type": "string",
        "required": false,
        "description": "CSS border shorthand, used as-is"
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

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/box/demos/basic.tsx

```tsx
import { Box } from "minerva-design";

export default function BasicDemo() {
  return (
    <Box
      p={4}
      bg="bg.subtle"
      rounded="md"
      border="1px solid var(--border-color)"
    >
      Padding token 4, subtle surface, medium radius.
    </Box>
  );
}

```

## Example: Polymorphic element

Use as to render semantic elements such as ul / li or section.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/box/demos/polymorphic.tsx

```tsx
import { Box } from "minerva-design";

export default function PolymorphicDemo() {
  return (
    <Box as="ul" m={0} pl={5} mt={2}>
      <Box as="li" mb={1}>
        Rendered as a list item
      </Box>
      <Box as="li">Spacing props still apply</Box>
    </Box>
  );
}

```

## Example: Sizing and centering

Size props take pixels or CSS lengths; mx="auto" centers a bounded box.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/box/demos/sizing.tsx

```tsx
import { Box } from "minerva-design";

export default function SizingDemo() {
  return (
    <Box as="section" aria-label="Centered" w="100%" py={6} bg="bg.muted">
      <Box maxW={360} mx="auto" p={4} bg="bg" rounded="lg" boxShadow="md">
        maxW=360 with mx=&quot;auto&quot; centers the card.
      </Box>
    </Box>
  );
}

```
