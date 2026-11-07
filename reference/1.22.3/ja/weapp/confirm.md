# Confirm 確認

操作の確認をユーザーに求めます。テーマに合わせた window.confirm の代替です。宣言的な ConfirmDialog を使うか、どこからでも confirm() を await できます。ConfirmProvider があればダイアログはアプリのツリー内に描画され、なければ独立したホストを必要に応じてマウントし、サーバーでは confirm() は false を返します。

Package: minerva-design@1.22.3

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### 使い分け：useConfirm() か confirm() か

コンポーネント内では useConfirm() を呼びます。ダイアログは最も近い ConfigProvider のスコープに従います。ネストしたプロバイダーの下では、モーダルがそのホストにテーマ・パレット・トークン付きでポータルされ、既定のボタンラベルはその言語になります。ConfirmProvider があれば引き続きそれが描画します。

React の外（イベントバス、API クライアント、ルーターガードなどコンポーネント以外のモジュール）では confirm() を直接インポートします。そこではフックが使えず、ダイアログはルートのテーマと言語を使います。

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
