# Confirm 确认框

请用户确认某个操作，可替代 window.confirm 并跟随主题。可使用声明式的 ConfirmDialog，或在任意位置 await confirm()：挂载了 ConfirmProvider 时弹窗渲染在应用树内，没有时按需挂载独立宿主，服务端调用 confirm() 恒定返回 false。

Package: minerva-design@1.23.2

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### 如何选择：useConfirm() 还是 confirm()

在组件内调用 useConfirm()：它的对话框跟随最近的 ConfigProvider 作用域。在嵌套 Provider 下，模态框渲染到该作用域的 portal 容器中，使用其主题、配色方案和 token，默认按钮文案使用其语言。存在 ConfirmProvider 时仍由它渲染。

在 React 之外（事件总线、API 客户端、路由守卫等非组件模块）直接导入 confirm()：那里无法使用 hook，其对话框使用根主题和根语言。

```tsx
// Inside a component: follows the nearest ConfigProvider scope
function DeleteButton() {
  const confirm = useConfirm();
  return (
    <Button onClick={async () => (await confirm({ title: "Delete?" })) && remove()}>
      Delete
    </Button>
  );
}

// Outside React (API client, event bus, router guard...): root scope
import { confirm } from "minerva-design";
router.beforeLeave(() => confirm({ title: "Discard changes?" }));
```

## ConfirmDialog

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "ConfirmDialog"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "open",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "boolean",
    "typeText": "boolean",
    "typeRef": "type:7087acd01ef7dd9f1d5c",
    "required": true
  },
  {
    "name": "title",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true
  },
  {
    "name": "description",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "confirmLabel",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "cancelLabel",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "closeLabel",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "color",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "enum",
    "values": [
      "danger",
      "primary",
      "warning"
    ],
    "typeText": "\"primary\" | \"warning\" | \"danger\" | undefined",
    "typeRef": "type:ea01c2fe738cc1655d61",
    "default": "primary",
    "required": false
  },
  {
    "name": "loading",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "confirmDisabled",
    "source": "packages/native/src/components/Confirm/index.tsx",
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
    "name": "onOpenChange",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "function",
    "typeText": "(open: boolean) => void",
    "typeRef": "type:6c80eab391c83c832390",
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
    "required": true
  },
  {
    "name": "onConfirm",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "function",
    "typeText": "() => void | Promise<void>",
    "typeRef": "type:7dc66a73e047680501c2",
    "parameters": [],
    "returnType": {
      "typeText": "void | Promise<void>",
      "typeRef": "type:3c4871f2062b3b734ba0"
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

## ConfirmProvider

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "ConfirmProvider"
  ],
  "kind": "named"
}
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
  "native:ConfirmDialogProps": {
    "source": "native/src/components/Confirm/index.tsx",
    "kind": "interface",
    "extends": [
      "ConfirmOptions"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "required": true
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": true
      },
      {
        "name": "onConfirm",
        "type": "() => void | Promise<void>",
        "required": true
      }
    ]
  },
  "native:ConfirmProviderProps": {
    "source": "native/src/components/Confirm/index.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": false
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { ConfirmProvider, useConfirm, Button } from "minerva-design/native";
export default function Basic() {
  return (
    <ConfirmProvider>
      <ConfirmExample />
    </ConfirmProvider>
  );
}
function ConfirmExample() {
  const confirm = useConfirm();
  const [result, setResult] = useState("");
  return (
    <View>
      <Button
        onPress={async () =>
          setResult(
            (await confirm({
              title: "Archive record?",
              description: "You can restore it later.",
            }))
              ? "Archived"
              : "Cancelled",
          )
        }
      >
        Archive
      </Button>
      <Text>{result}</Text>
    </View>
  );
}

```
