# PageTabs 页面标签

已打开应用页面的标签栏（路由导航，而非 ARIA tablist）：路由、关闭和未保存更改的拦截由应用负责。条目为扁平的圆角表面；过长的标题会被截断并在提示中完整显示；当前页面始终保持可见，列表溢出时出现滚动按钮。

Package: minerva-design@1.19.3

Renderer: native

Locale: zh

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

## Example: 基础用法

每个 PageTab 包含一个标签按钮（激活时为 aria-current="page"）和可选的独立操作，例如关闭按钮。关闭获得焦点的条目时，焦点会移到当前页面。

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
