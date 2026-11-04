# Toast トースト

タイトル、説明、セマンティックカラーを持つ一時的な通知です。toast() でどこからでも表示でき（React コンテキスト不要）、アプリのツリー内の ToastProvider が描画するため、アプリのコンテキスト（テーマ、ロケール）を引き継ぎます。読み込み表示、Promise の追跡、その場での更新、アクション、最大表示数を備えています。サーバーレンダリングにも対応します。

Package: minerva-design@1.20.1

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### 使い分け：useToast() か toast() か

コンポーネント内では useToast() を呼びます。表示されるトーストは最も近い ConfigProvider のスコープに従います。ネストしたプロバイダーの下では、そのポータルホストにテーマ・パレット・トークン付きで描画され、組み込みラベルはその言語になります。描画するのは引き続きオーナーの ToastProvider で、position・max・ラベルもそのままです。

React の外（イベントバス、API クライアント、ストアなどコンポーネント以外のモジュール）では toast() を直接インポートします。そこではフックが使えず、トーストは ToastProvider のスコープ（通常はルートのテーマと言語）を使います。

モーダルダイアログ（Modal、Drawer、ConfirmDialog、Command、モーダルな Popover や Menu）が開いている間、その hide-others 処理はページの他の部分と同様にトーストのビューポートにも適用されます。ビューポートには aria-hidden="true" が付き、ダイアログが閉じるまで支援技術にはダイアログだけが見えます。 も同じ動作です（data-minerva-keep-visible でリージョンごとに除外できます）。

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
