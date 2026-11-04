# Stack

Flex layout primitives (Stack, HStack, VStack) with token-based gaps, optional separators and attached groups. Children are not wrapped in item elements.

Package: minerva-design@1.20.2

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "ae023a943266e631be23485d1daf0a21591499a1",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:7bf77141c64cfa04bf3140efe18348e2eef528dbd35f817eea65bdca81f687b1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## HStack

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "HStack"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "wrap",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "separator",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "gap",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false
  },
  {
    "name": "align",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "enum",
    "values": [
      "baseline",
      "center",
      "end",
      "start",
      "stretch"
    ],
    "typeText": "\"center\" | \"start\" | \"end\" | \"stretch\" | \"baseline\" | undefined",
    "typeRef": "type:49858580a3b46acd1de5",
    "required": false
  },
  {
    "name": "justify",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "enum",
    "values": [
      "around",
      "between",
      "center",
      "end",
      "evenly",
      "start"
    ],
    "typeText": "\"center\" | \"start\" | \"end\" | \"between\" | \"around\" | \"evenly\" | undefined",
    "typeRef": "type:7b4b9d41c9ce64ee57c9",
    "required": false
  },
  {
    "name": "attached",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
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

## Stack

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Stack"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "direction",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "enum",
    "values": [
      "column",
      "column-reverse",
      "row",
      "row-reverse"
    ],
    "typeText": "\"row\" | \"column\" | \"row-reverse\" | \"column-reverse\" | undefined",
    "typeRef": "type:6a94a5522158a661b38a",
    "default": "column",
    "required": false
  },
  {
    "name": "gap",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false
  },
  {
    "name": "align",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "enum",
    "values": [
      "baseline",
      "center",
      "end",
      "start",
      "stretch"
    ],
    "typeText": "\"center\" | \"start\" | \"end\" | \"stretch\" | \"baseline\" | undefined",
    "typeRef": "type:49858580a3b46acd1de5",
    "required": false
  },
  {
    "name": "justify",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "enum",
    "values": [
      "around",
      "between",
      "center",
      "end",
      "evenly",
      "start"
    ],
    "typeText": "\"center\" | \"start\" | \"end\" | \"between\" | \"around\" | \"evenly\" | undefined",
    "typeRef": "type:7b4b9d41c9ce64ee57c9",
    "required": false
  },
  {
    "name": "wrap",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "separator",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "attached",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
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

## VStack

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "VStack"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "wrap",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "separator",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "gap",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false
  },
  {
    "name": "align",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "enum",
    "values": [
      "baseline",
      "center",
      "end",
      "start",
      "stretch"
    ],
    "typeText": "\"center\" | \"start\" | \"end\" | \"stretch\" | \"baseline\" | undefined",
    "typeRef": "type:49858580a3b46acd1de5",
    "required": false
  },
  {
    "name": "justify",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "enum",
    "values": [
      "around",
      "between",
      "center",
      "end",
      "evenly",
      "start"
    ],
    "typeText": "\"center\" | \"start\" | \"end\" | \"between\" | \"around\" | \"evenly\" | undefined",
    "typeRef": "type:7b4b9d41c9ce64ee57c9",
    "required": false
  },
  {
    "name": "attached",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
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
  "native:StackProps": {
    "source": "native/src/components/Layout/index.tsx",
    "kind": "interface",
    "extends": [
      "ViewProps"
    ],
    "props": [
      {
        "name": "direction",
        "type": "ViewStyle[\"flexDirection\"]",
        "required": false,
        "default": "\"column\""
      },
      {
        "name": "gap",
        "type": "BoxSpace",
        "required": false
      },
      {
        "name": "align",
        "type": "\"start\" | \"center\" | \"end\" | \"stretch\" | \"baseline\"",
        "required": false
      },
      {
        "name": "justify",
        "type": "\"start\" | \"center\" | \"end\" | \"between\" | \"around\" | \"evenly\"",
        "required": false
      },
      {
        "name": "wrap",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "separator",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "attached",
        "type": "boolean",
        "required": false,
        "default": "false"
      }
    ]
  },
  "native:HStackProps": {
    "source": "native/src/components/Layout/index.tsx",
    "kind": "alias",
    "type": "Omit<StackProps, \"direction\">"
  },
  "native:VStackProps": {
    "source": "native/src/components/Layout/index.tsx",
    "kind": "alias",
    "type": "HStackProps"
  }
}
```

## CSS variables

```json
{
  "css:Stack": {
    "kind": "cssVars",
    "source": "react/src/components/Stack",
    "vars": [
      {
        "name": "--stack-gap",
        "description": "Space between the children when the gap prop is not set (default: 0)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Vertical stack

VStack stacks children in a column and stretches them by default.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/stack/native/basic.tsx

```tsx
import { Text } from "react-native";
import { Stack, HStack, VStack, Button } from "minerva-design/native";
export default function Basic() {
  return (
    <VStack gap={4}>
      <HStack gap={2} wrap>
        <Button>Save</Button>
        <Button variant="outline">Cancel</Button>
      </HStack>
      <Stack gap={2} separator="·">
        <Text>Profile</Text>
        <Text>Preferences</Text>
      </Stack>
    </VStack>
  );
}

```
