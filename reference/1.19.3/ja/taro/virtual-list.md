# VirtualList 仮想リスト

スクロールコンテナ内で表示されている行だけをマウントし、長いリストを効率よく描画します。

Package: minerva-design@1.19.3

Renderer: taro

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## VirtualList

Support: beta

Fixed-height native ScrollView windowing with optional first-row measurement, item padding, overscan, compact short lists, native item click events, optional 16 ms scroll batching, pixel loading thresholds and Promise load-more mutual exclusion. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Both React and this renderer use one fixed row height. Native scheduling uses a 16 ms timer instead of browser requestAnimationFrame/requestIdleCallback; browser ref targets are not reproduced. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "source": "packages/taro/src/data.tsx",
    "kind": "array",
    "typeText": "T[]",
    "typeRef": "type:9301945448fcf1014d42",
    "required": true
  },
  {
    "name": "itemHeight",
    "source": "packages/taro/src/data.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "itemPadding",
    "source": "packages/taro/src/data.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "maxHeight",
    "source": "packages/taro/src/data.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "overscan",
    "source": "packages/taro/src/data.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "renderItem",
    "source": "packages/taro/src/data.tsx",
    "kind": "node",
    "typeText": "(item: T, index: number) => ReactNode",
    "typeRef": "type:9ebe34272ba535e9cd01",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "T",
        "typeRef": "type:be6701fadc622c309ae1"
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
      "typeRef": "type:a991edaa7809b6d75ba2"
    },
    "required": true
  },
  {
    "name": "loadMoreThreshold",
    "source": "packages/taro/src/data.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "loading",
    "source": "packages/taro/src/data.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "highPerformance",
    "source": "packages/taro/src/data.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
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
    "name": "onLoadMore",
    "source": "packages/taro/src/data.tsx",
    "kind": "function",
    "typeText": "(() => void | Promise<void>) | undefined",
    "typeRef": "type:b6730488f87fb9751d62",
    "parameters": [],
    "returnType": {
      "typeText": "void | Promise<void>",
      "typeRef": "type:3c4871f2062b3b734ba0"
    },
    "required": false
  },
  {
    "name": "onItemClick",
    "source": "packages/taro/src/data.tsx",
    "kind": "function",
    "typeText": "((item: T, index: number, event: ITouchEvent) => void) | undefined",
    "typeRef": "type:bb107fb1e3e0c8c52cae",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "T",
        "typeRef": "type:be6701fadc622c309ae1"
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
        "typeText": "ITouchEvent",
        "typeRef": "type:7276d9ff893f9fea3df5"
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
