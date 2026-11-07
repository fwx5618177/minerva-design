# PageTabs ページタブ

開いているアプリのページを並べたバー（ルートナビゲーションであり ARIA の tablist ではありません）。ルート、クローズ、未保存の変更のガードはアプリ側が担います。項目はフラットな角丸の面で、長いタイトルは省略されツールチップで全文が表示されます。現在のページは常に表示範囲内に保たれ、リストがはみ出すとスクロールボタンが現れます。

Package: minerva-design@1.22.1

Renderer: native

Locale: ja

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

## PageTab

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "PageTab"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/native/src/components/PageTabs/index.tsx",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true
  },
  {
    "name": "label",
    "source": "packages/native/src/components/PageTabs/index.tsx",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true
  },
  {
    "name": "active",
    "source": "packages/native/src/components/PageTabs/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Inferred from PageTabs when provided, otherwise false."
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/PageTabs/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "icon",
    "source": "packages/native/src/components/PageTabs/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "action",
    "source": "packages/native/src/components/PageTabs/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onSelect",
    "source": "packages/native/src/components/PageTabs/index.tsx",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:7700c790f886ac2f9cc8",
    "parameters": [],
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

## PageTabs

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "PageTabs"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "activeValue",
    "source": "packages/native/src/components/PageTabs/index.tsx",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true
  },
  {
    "name": "actions",
    "source": "packages/native/src/components/PageTabs/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
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
  "native:PageTabsProps": {
    "source": "native/src/components/PageTabs/index.tsx",
    "kind": "interface",
    "extends": [
      "ViewProps"
    ],
    "props": [
      {
        "name": "activeValue",
        "type": "string",
        "required": true
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": true
      },
      {
        "name": "actions",
        "type": "ReactNode",
        "required": false
      }
    ]
  },
  "native:PageTabProps": {
    "source": "native/src/components/PageTabs/index.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"onSelect\">"
    ],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": true
      },
      {
        "name": "label",
        "type": "string",
        "required": true
      },
      {
        "name": "active",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Inferred from PageTabs when provided, otherwise false."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "action",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "onSelect",
        "type": "() => void",
        "required": false
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:PageTabs": {
    "kind": "cssVars",
    "source": "react/src/components/PageTabs",
    "vars": [
      {
        "name": "--page-tabs-height",
        "description": "Height of the tab bar"
      },
      {
        "name": "--page-tabs-background",
        "description": "Background of the tab bar"
      },
      {
        "name": "--page-tabs-gap",
        "description": "Space between the tabs"
      },
      {
        "name": "--page-tabs-item-height",
        "description": "Height of a tab"
      },
      {
        "name": "--page-tabs-item-min-width",
        "description": "Minimum width of a tab"
      },
      {
        "name": "--page-tabs-item-max-width",
        "description": "Maximum width of a tab (the label truncates)"
      },
      {
        "name": "--page-tabs-item-radius",
        "description": "Corner radius of a tab (defaults to --radius-lg)"
      },
      {
        "name": "--page-tabs-selected-background",
        "description": "Background of the active tab"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

各 PageTab はラベルボタン（アクティブ時は aria-current="page"）と、閉じるボタンなどの任意の独立したアクションを持ちます。フォーカス中の項目を閉じると、フォーカスは現在のページに移ります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/page-tabs/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { PageTabs, PageTab } from "minerva-design/native";
export default function Basic() {
  const [active, setActive] = useState("overview");
  return (
    <View>
      <PageTabs activeValue={active}>
        <PageTab
          value="overview"
          label="Overview"
          onSelect={() => setActive("overview")}
        />
        <PageTab
          value="settings"
          label="Settings"
          onSelect={() => setActive("settings")}
        />
      </PageTabs>
      <Text>{active}</Text>
    </View>
  );
}

```
