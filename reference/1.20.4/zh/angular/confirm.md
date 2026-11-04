# Confirm 确认框

请用户确认某个操作，可替代 window.confirm 并跟随主题。可使用声明式的 ConfirmDialog，或在任意位置 await confirm()：挂载了 ConfirmProvider 时弹窗渲染在应用树内，没有时按需挂载独立宿主，服务端调用 confirm() 恒定返回 false。

Package: minerva-design@1.20.4

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

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

Native Angular: MnConfirmDialog. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnConfirmDialog"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "title",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "description",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "color",
    "typeText": "\"primary\" | \"warning\" | \"danger\"",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "confirmDisabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "cancelLabel",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "confirmLabel",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "confirm",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "void",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "cancelled",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "void",
        "required": true,
        "rest": false
      }
    ]
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

Native Angular: MnConfirmProvider. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnConfirmProvider"
  ],
  "kind": "named"
}
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

## Example: Queued confirmations

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnConfirmProvider, MnButton } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnConfirmProvider, MnButton],
  template: `
<mn-confirm-provider #confirmation="mnConfirmProvider"><button mnButton (click)="confirmation.confirm({title:'Delete draft?',description:'This is the first queued request.',color:'danger'});confirmation.confirm({title:'Archive project?',description:'The second request waits for the first.'})">Queue two confirmations</button></mn-confirm-provider>
  `,
})
export class Example {

}

```

## Example: Confirm a destructive action

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnButton, MnConfirmDialog } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnButton, MnConfirmDialog],
  template: `
<button mnButton color="danger" (click)="open=true">Delete project</button><mn-confirm-dialog title="Delete this project?" description="This action cannot be undone." color="danger" [(open)]="open" (confirm)="deleted=true;open=false"/><output>{{deleted?'Project deleted':''}}</output>
  `,
})
export class Example {
  open = false;
  deleted = false;
}

```

## Example: Controlled loading and recovery

The declarative dialog emits confirm; the owner sets loading and completes or retries its operation. This example uses Complete request as an explicit stand-in for the server response and can be reopened.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnButton, MnConfirmDialog } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnButton, MnConfirmDialog],
  template: `
<button mnButton (click)="open=true;loading=false;completed=false">Preview processing</button><mn-confirm-dialog title="Processing request" description="Confirm starts the caller-owned operation; complete it below." [(open)]="open" [loading]="loading" (confirm)="loading=true"><button mnButton variant="outline" [disabled]="!loading" (click)="loading=false;open=false;completed=true">Complete request</button></mn-confirm-dialog><output>{{completed?'Request completed':loading?'Processing':'Ready'}}</output>
  `,
})
export class Example {
  open = false;
  loading = false;
  completed = false;
}

```
