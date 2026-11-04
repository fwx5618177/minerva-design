# Stack

Primitives de mise en page flex (Stack, HStack, VStack) avec des espacements par jetons, des séparateurs et des groupes accolés. Les enfants ne sont pas enveloppés.

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
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

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

## Example: Pile verticale

VStack empile les enfants en colonne et les étire par défaut.

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
