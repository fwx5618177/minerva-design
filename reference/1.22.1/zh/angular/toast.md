# Toast 通知

带标题、描述和语义色的临时通知，可在任意位置通过 toast() 调用（无需 React 上下文），并由应用树中的 ToastProvider 渲染，因此会继承应用的上下文（主题、语言）。内置加载状态、Promise 跟踪、原地更新、操作按钮和最大数量限制。支持服务端渲染。

Package: minerva-design@1.22.1

Renderer: angular

Locale: zh

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

Native Angular: Inject MnToastService to show/dismiss/clear notifications and render MnToastRegion in the desired scope; Angular DI supplies the service instead of a wrapper provider.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnToastService",
    "MnToastRegion"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "messages",
    "typeText": "readonly ToastMessage[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "max",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "closed",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "action",
    "typeText": "ToastMessage",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ToastMessage",
        "required": true,
        "rest": false
      }
    ]
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

## Example: Show and dismiss notifications

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnButton, MnToastRegion } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnButton, MnToastRegion],
  template: `
<button mnButton (click)="messages=[{id:'saved',title:'Changes saved',description:'Your workspace is up to date.',color:'success',action:'Undo'}]">Save changes</button><mn-toast-region [messages]="messages" (closed)="messages=[]" (action)="messages=[];result='Changes restored'"/><output>{{result}}</output>
  `,
})
export class Example {
  messages: import('minerva-design/angular').ToastMessage[] = [];
  result = "";
}

```

## Example: Error feedback

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnButton, MnToastRegion } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnButton, MnToastRegion],
  template: `
<button mnButton variant="outline" (click)="messages=[{id:'error',title:'Unable to sync',description:'Check your connection and try again.',color:'danger'}]">Simulate error</button><mn-toast-region [messages]="messages" (closed)="messages=[]"/>
  `,
})
export class Example {
  messages: import('minerva-design/angular').ToastMessage[] = [];
}

```
