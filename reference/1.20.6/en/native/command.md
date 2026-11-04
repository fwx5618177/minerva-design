# Command

A searchable command palette in a modal. Type to filter by title, description, group and keywords, move with the arrow keys, choose with Enter or a click. An optional global shortcut opens it.

Package: minerva-design@1.20.6

Renderer: native

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

## CommandDialog

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "CommandDialog"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "open",
    "source": "packages/native/src/components/Command/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "defaultOpen",
    "source": "packages/native/src/components/Command/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "items",
    "source": "packages/native/src/components/Command/index.tsx",
    "kind": "array",
    "typeText": "CommandItem[]",
    "typeRef": "type:5b75a5a1cf5cd137f5ee",
    "required": true
  },
  {
    "name": "title",
    "source": "packages/native/src/components/Command/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "description",
    "source": "packages/native/src/components/Command/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "placeholder",
    "source": "packages/native/src/components/Command/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "emptyText",
    "source": "packages/native/src/components/Command/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "maxResults",
    "source": "packages/native/src/components/Command/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 12,
    "required": false
  },
  {
    "name": "filter",
    "source": "packages/native/src/components/Command/index.tsx",
    "kind": "function",
    "typeText": "((items: CommandItem[], query: string) => CommandItem[]) | undefined",
    "typeRef": "type:ebd929855a8711c70627",
    "parameters": [
      {
        "name": "items",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "CommandItem[]",
        "typeRef": "type:5b75a5a1cf5cd137f5ee"
      },
      {
        "name": "query",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "CommandItem[]",
      "typeRef": "type:5b75a5a1cf5cd137f5ee"
    },
    "required": false
  },
  {
    "name": "resultsLabel",
    "source": "packages/native/src/components/Command/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onOpenChange",
    "source": "packages/native/src/components/Command/index.tsx",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:14cc959ec09f17e77070",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onSelect",
    "source": "packages/native/src/components/Command/index.tsx",
    "kind": "function",
    "typeText": "(item: CommandItem) => void",
    "typeRef": "type:09ad6118b922c5cfd39b",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "CommandItem",
        "typeRef": "type:f2871cebb5525058852f"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": true
  }
]
```

### bindings

```json
[
  {
    "prop": "open",
    "event": "onOpenChange",
    "syntax": "open={open} onOpenChange={handler}"
  }
]
```

## API

```json
{
  "native:CommandDialogProps": {
    "source": "native/src/components/Command/index.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "required": false
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false
      },
      {
        "name": "items",
        "type": "CommandItem[]",
        "required": true
      },
      {
        "name": "onSelect",
        "type": "(item: CommandItem) => void",
        "required": true
      },
      {
        "name": "title",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "description",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false
      },
      {
        "name": "emptyText",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "maxResults",
        "type": "number",
        "required": false,
        "default": "12"
      },
      {
        "name": "filter",
        "type": "(items: CommandItem[], query: string) => CommandItem[]",
        "required": false
      },
      {
        "name": "resultsLabel",
        "type": "string",
        "required": false
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Command": {
    "kind": "cssVars",
    "source": "react/src/components/Command",
    "vars": [
      {
        "name": "--command-search-height",
        "description": "Minimum height of the search field (defaults to --control-height-md)"
      },
      {
        "name": "--command-results-max-height",
        "description": "Maximum height of the scrolling result list"
      },
      {
        "name": "--command-item-min-height",
        "description": "Minimum height of a result row"
      },
      {
        "name": "--command-item-padding-y",
        "description": "Vertical padding of a result row (follows the density's row padding)"
      },
      {
        "name": "--command-item-padding-x",
        "description": "Horizontal padding of a result row (follows the density's row padding)"
      },
      {
        "name": "--command-item-active-background",
        "description": "Background of the hovered / active row (defaults to a 10% primary tint)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

Controlled palette; onSelect receives the chosen item and the palette closes.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/command/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { CommandDialog, Button } from "minerva-design/native";
export default function Basic() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState("");
  return (
    <View>
      <Button onPress={() => setOpen(true)}>Commands</Button>
      <Text>{choice}</Text>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        items={[
          { id: "settings", title: "Settings", keywords: "preferences" },
          { id: "profile", title: "Profile" },
        ]}
        onSelect={(item) => setChoice(item.title)}
      />
    </View>
  );
}

```
