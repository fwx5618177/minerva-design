# VirtualList

Renders long lists efficiently by only mounting the rows that are visible in the scroll container.

Package: minerva-design@1.19.3

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## VirtualList

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "VirtualList"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "source": "packages/native/src/components/VirtualList/index.tsx",
    "kind": "array",
    "typeText": "T[]",
    "typeRef": "type:c5744996b6b127488145",
    "required": true
  },
  {
    "name": "renderItem",
    "source": "packages/native/src/components/VirtualList/index.tsx",
    "kind": "node",
    "typeText": "(item: T, index: number) => ReactNode",
    "typeRef": "type:2f964b7d2fe462505156",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "T",
        "typeRef": "type:1d64e6f093745eb93c09"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": true
  },
  {
    "name": "maxHeight",
    "source": "packages/native/src/components/VirtualList/index.tsx",
    "kind": "number",
    "typeText": "number",
    "typeRef": "type:7d1137535c313783dadd",
    "required": true
  },
  {
    "name": "itemHeight",
    "source": "packages/native/src/components/VirtualList/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "itemPadding",
    "source": "packages/native/src/components/VirtualList/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 8,
    "required": false
  },
  {
    "name": "overscan",
    "source": "packages/native/src/components/VirtualList/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 5,
    "required": false
  },
  {
    "name": "loadMoreThreshold",
    "source": "packages/native/src/components/VirtualList/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 100,
    "required": false
  },
  {
    "name": "loading",
    "source": "packages/native/src/components/VirtualList/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onLoadMore",
    "source": "packages/native/src/components/VirtualList/index.tsx",
    "kind": "function",
    "typeText": "(() => void | Promise<void>) | undefined",
    "typeRef": "type:01600a3470c182c3bf54",
    "parameters": [],
    "returnType": {
      "typeText": "void | Promise<void>",
      "typeRef": "type:3c4871f2062b3b734ba0"
    },
    "required": false
  },
  {
    "name": "onLoadError",
    "source": "packages/native/src/components/VirtualList/index.tsx",
    "kind": "function",
    "typeText": "((error: unknown) => void) | undefined",
    "typeRef": "type:2d4da7019fbbab061a27",
    "parameters": [
      {
        "name": "error",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "unknown",
        "typeRef": "type:dc96c0cac9f2d6c9a926"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onItemClick",
    "source": "packages/native/src/components/VirtualList/index.tsx",
    "kind": "function",
    "typeText": "((item: T, index: number, event: GestureResponderEvent) => void) | undefined",
    "typeRef": "type:ffb513e3982a7357660e",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "T",
        "typeRef": "type:1d64e6f093745eb93c09"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      },
      {
        "name": "event",
        "position": 2,
        "required": true,
        "rest": false,
        "typeText": "GestureResponderEvent",
        "typeRef": "type:2a25eb9466bc75075bdf"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
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
  "native:VirtualListProps": {
    "source": "native/src/components/VirtualList/index.tsx",
    "kind": "interface",
    "extends": [
      "Omit<FlatListProps<T>, \"data\" | \"renderItem\" | \"onEndReached\" | \"getItemLayout\" | \"ref\">"
    ],
    "props": [
      {
        "name": "items",
        "type": "T[]",
        "required": true
      },
      {
        "name": "renderItem",
        "type": "(item: T, index: number) => ReactNode",
        "required": true
      },
      {
        "name": "maxHeight",
        "type": "number",
        "required": true
      },
      {
        "name": "itemHeight",
        "type": "number",
        "required": false
      },
      {
        "name": "itemPadding",
        "type": "number",
        "required": false,
        "default": "8"
      },
      {
        "name": "overscan",
        "type": "number",
        "required": false,
        "default": "5"
      },
      {
        "name": "onLoadMore",
        "type": "() => Promise<void> | void",
        "required": false
      },
      {
        "name": "onLoadError",
        "type": "(error: unknown) => void",
        "required": false
      },
      {
        "name": "loadMoreThreshold",
        "type": "number",
        "required": false,
        "default": "100"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "onItemClick",
        "type": "(item: T, index: number, event: GestureResponderEvent) => void",
        "required": false
      },
      {
        "name": "ref",
        "type": "Ref<FlatList<T>>",
        "required": false
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:VirtualList": {
    "kind": "cssVars",
    "source": "react/src/components/VirtualList",
    "vars": [
      {
        "name": "--virtual-list-radius",
        "description": "Corner radius (defaults to --radius-sm)"
      },
      {
        "name": "--virtual-list-shadow",
        "description": "Shadow at rest (defaults to --shadow-sm)"
      },
      {
        "name": "--virtual-list-hover-shadow",
        "description": "Shadow while hovered (defaults to --shadow-md)"
      },
      {
        "name": "--virtual-list-scrollbar-size",
        "description": "Width of the scrollbar (WebKit / Blink)"
      },
      {
        "name": "--virtual-list-loading-padding",
        "description": "Padding of the loading indicator row"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

10,000 rows with a fixed itemHeight; only the visible rows (plus overscan) are in the DOM.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/virtual-list/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { VirtualList } from "minerva-design/native";
export default function Basic() {
  const [selected, setSelected] = useState(-1);
  const items = Array.from({ length: 1000 }, (_, id) => ({ id }));
  return (
    <View>
      <Text>Selected row: {selected}</Text>
      <VirtualList
        items={items}
        itemHeight={44}
        maxHeight={260}
        onItemClick={(_, index) => setSelected(index)}
        renderItem={(item) => <Text>Record {item.id}</Text>}
      />
    </View>
  );
}

```
