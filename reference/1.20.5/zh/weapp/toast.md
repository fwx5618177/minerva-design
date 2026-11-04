# Toast 通知

带标题、描述和语义色的临时通知，可在任意位置通过 toast() 调用（无需 React 上下文），并由应用树中的 ToastProvider 渲染，因此会继承应用的上下文（主题、语言）。内置加载状态、Promise 跟踪、原地更新、操作按钮和最大数量限制。支持服务端渲染。

Package: minerva-design@1.20.5

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

### 如何选择：useToast() 还是 toast()

在组件内调用 useToast()：它显示的通知跟随最近的 ConfigProvider 作用域。在嵌套 Provider 下，通知渲染到该作用域的 portal 容器中，使用其主题、配色方案和 token，内置文案使用其语言。通知仍由持有者 ToastProvider 渲染，沿用它的 position、max 和文案。

在 React 之外（事件总线、API 客户端、store 等非组件模块）直接导入 toast()：那里无法使用 hook，其通知使用 ToastProvider 的作用域，通常即根主题和根语言。

当模态对话框打开时（Modal、Drawer、ConfirmDialog、Command、模态 Popover 或 Menu），它的 hide-others 处理会像页面其余部分一样覆盖 Toast 视口：视口会获得 aria-hidden="true"，在对话框关闭之前辅助技术只能看到对话框。 的行为相同（可在某个区域上用 data-minerva-keep-visible 退出）。

```tsx
// Inside a component: follows the nearest ConfigProvider scope
function SaveButton() {
  const toast = useToast();
  return <Button onClick={() => toast.success("Saved")}>Save</Button>;
}

// Outside React (API client, event bus, store...): root scope
import { toast } from "minerva-design";
apiClient.onError((error) => toast.danger(error.message));
```

## ToastProvider

Support: beta

Global or isolated native toast host/store: upsert by id, update/dismiss, callbacks/actions, max overflow, timers, loading and instance promise transitions; native touch and pause/resume preserve remaining duration. scope=local creates an isolated instance store; the global convenience API requires one scope=global host. Scope is selected at mount. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/toast-provider/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "position",
    "typeText": "string",
    "required": false,
    "default": "top-right"
  },
  {
    "name": "max",
    "typeText": "number",
    "required": false,
    "default": 9007199254740991
  },
  {
    "name": "closeLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
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

## CSS variables

```json
{
  "css:Toast": {
    "kind": "cssVars",
    "source": "react/src/components/Toast",
    "vars": [
      {
        "name": "--toast-width",
        "description": "Width of the toast stack (capped by the viewport)"
      },
      {
        "name": "--toast-gap",
        "description": "Space between stacked toasts"
      },
      {
        "name": "--toast-offset",
        "description": "Distance between the stack and the viewport edges"
      },
      {
        "name": "--toast-padding",
        "description": "Padding of a toast"
      },
      {
        "name": "--toast-radius",
        "description": "Corner radius of a toast (defaults to --radius-md)"
      },
      {
        "name": "--toast-shadow",
        "description": "Shadow of a toast (defaults to --shadow-lg)"
      },
      {
        "name": "--toast-background",
        "description": "Base background of a toast (under the color tint)"
      },
      {
        "name": "--toast-z-index",
        "description": "Stacking order of the stack (defaults to --z-toast)"
      },
      {
        "name": "--toast-icon-background",
        "description": "Background of the round chip behind the status icon (defaults to the color's accent at 14%)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
