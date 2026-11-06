# Confirm 确认框

请用户确认某个操作，可替代 window.confirm 并跟随主题。可使用声明式的 ConfirmDialog，或在任意位置 await confirm()：挂载了 ConfirmProvider 时弹窗渲染在应用树内，没有时按需挂载独立宿主，服务端调用 confirm() 恒定返回 false。

Package: minerva-design@1.21.1

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

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

Controlled native confirmation with danger labels, busy/disabled guarding, cancel/open-change; uni awaits async confirmation. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/confirm-dialog/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "open",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "title",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "description",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "closeOnOverlayClick",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "placement",
    "typeText": "string",
    "required": false,
    "default": "right"
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": "primary"
  },
  {
    "name": "confirmLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "cancelLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "confirmDisabled",
    "typeText": "boolean",
    "required": false,
    "default": false
  }
]
```

### events

```json
[
  {
    "name": "cancel"
  },
  {
    "name": "openchange"
  },
  {
    "name": "confirm"
  }
]
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## ConfirmProvider

Support: beta

Global or scope=local isolated FIFO confirmation host: Promise<boolean> requests, confirm/cancel settlement, localized buttons and pending-request cancellation on unmount. scope=local creates an isolated instance store; the global convenience API requires one scope=global host. Scope is selected at mount. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/confirm-provider/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "scope",
    "typeText": "string",
    "required": false,
    "default": "global"
  }
]
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
