# Confirm 確認

操作の確認をユーザーに求めます。テーマに合わせた window.confirm の代替です。宣言的な ConfirmDialog を使うか、どこからでも confirm() を await できます。ConfirmProvider があればダイアログはアプリのツリー内に描画され、なければ独立したホストを必要に応じてマウントし、サーバーでは confirm() は false を返します。

Package: minerva-design@1.21.0

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "boolean",
    "typeText": "boolean",
    "typeRef": "type:7087acd01ef7dd9f1d5c",
    "required": true,
    "description": "Whether the dialog is open (controlled)."
  },
  {
    "name": "title",
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true,
    "description": "Title (the dialog's accessible name)."
  },
  {
    "name": "description",
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Explanation below the title (the dialog's accessible description)."
  },
  {
    "name": "confirmLabel",
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Label of the confirm button; defaults to the localized \"Confirm\", or \"Delete\" for `color=\"danger\"`."
  },
  {
    "name": "cancelLabel",
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Label of the cancel button; defaults to the localized \"Cancel\"."
  },
  {
    "name": "closeLabel",
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the close (×) button; defaults to the localized \"Close\"."
  },
  {
    "name": "color",
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "enum",
    "values": [
      "danger",
      "primary",
      "warning"
    ],
    "typeText": "\"primary\" | \"warning\" | \"danger\" | undefined",
    "typeRef": "type:ea01c2fe738cc1655d61",
    "default": "primary",
    "required": false,
    "description": "Semantic color of the confirm button; `danger` marks a destructive action (and defaults its label to \"Delete\")"
  },
  {
    "name": "loading",
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a spinner on the confirm button and disables cancel (e.g. while an async `onConfirm` runs)"
  },
  {
    "name": "confirmDisabled",
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Natively disables the confirm button (removes it from the tab order). While `loading` alone it stays focusable but cannot be activated again"
  }
]
```

### events

```json
[
  {
    "name": "onOpenChange",
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "function",
    "typeText": "(open: boolean) => void",
    "typeRef": "type:67c80af2081fe4d9df82",
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
    "required": true,
    "description": "Called with `false` when the user cancels (cancel button, close, Escape, overlay click)."
  },
  {
    "name": "onConfirm",
    "source": "packages/react/src/components/Confirm/types.ts",
    "kind": "function",
    "typeText": "() => void | Promise<void>",
    "typeRef": "type:a9703415be5393478909",
    "parameters": [],
    "returnType": {
      "typeText": "void | Promise<void>",
      "typeRef": "type:3c4871f2062b3b734ba0"
    },
    "required": true,
    "description": "Called when the confirm button is pressed. The dialog does not close by itself."
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

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
  "ConfirmDialogProps": {
    "source": "react/src/components/Confirm/types.ts",
    "description": "Props of the declarative `ConfirmDialog`.",
    "kind": "interface",
    "extends": [
      "ConfirmOptions"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "required": true,
        "description": "Whether the dialog is open (controlled)."
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": true,
        "description": "Called with `false` when the user cancels (cancel button, close, Escape, overlay click)."
      },
      {
        "name": "onConfirm",
        "type": "() => void | Promise<void>",
        "required": true,
        "description": "Called when the confirm button is pressed. The dialog does not close by itself."
      }
    ]
  },
  "ConfirmOptions": {
    "source": "react/src/components/Confirm/types.ts",
    "description": "Content of a confirmation, shared by `ConfirmDialog` and `confirm()`.",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "title",
        "type": "ReactNode",
        "required": true,
        "description": "Title (the dialog's accessible name)."
      },
      {
        "name": "description",
        "type": "ReactNode",
        "required": false,
        "description": "Explanation below the title (the dialog's accessible description)."
      },
      {
        "name": "confirmLabel",
        "type": "ReactNode",
        "required": false,
        "description": "Label of the confirm button; defaults to the localized \"Confirm\", or \"Delete\" for `color=\"danger\"`."
      },
      {
        "name": "cancelLabel",
        "type": "ReactNode",
        "required": false,
        "description": "Label of the cancel button; defaults to the localized \"Cancel\"."
      },
      {
        "name": "closeLabel",
        "type": "string",
        "required": false,
        "description": "Accessible label of the close (×) button; defaults to the localized \"Close\"."
      },
      {
        "name": "color",
        "type": "Extract<ColorScheme, \"primary\" | \"danger\" | \"warning\">",
        "required": false,
        "default": "\"primary\"",
        "description": "Semantic color of the confirm button; `danger` marks a destructive action (and defaults its label to \"Delete\")"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a spinner on the confirm button and disables cancel (e.g. while an async `onConfirm` runs)"
      },
      {
        "name": "confirmDisabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Natively disables the confirm button (removes it from the tab order). While `loading` alone it stays focusable but cannot be activated again"
      }
    ]
  },
  "ConfirmProviderProps": {
    "source": "react/src/components/Confirm/types.ts",
    "description": "Props of `ConfirmProvider`.",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Application subtree; `useConfirm()` / `confirm()` render their dialogs here (`useConfirm()` dialogs inside the caller's ConfigProvider scope)."
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: カラー

color で確認ボタンのトーンを指定します：primary（デフォルト）、warning、または破壊的な操作向けの danger（ラベルの既定は「削除」）。キャンセルボタンは常に neutral のアウトラインボタンです。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/demos/colors.tsx

```tsx
import { useState } from "react";
import { Button, confirm, type ConfirmOptions } from "minerva-design";

const examples: Array<{ label: string; options: ConfirmOptions }> = [
  {
    label: "Publish",
    options: { title: "Publish this chapter?", color: "primary" },
  },
  {
    label: "Reset",
    options: {
      title: "Reset all settings?",
      description: "Your preferences go back to their defaults.",
      color: "warning",
      confirmLabel: "Reset",
    },
  },
  {
    // color="danger" defaults the confirm label to "Delete"
    label: "Delete",
    options: { title: "Delete this draft?", color: "danger" },
  },
];

export default function ColorsDemo() {
  const [result, setResult] = useState("—");
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      {examples.map(({ label, options }) => (
        <Button
          key={label}
          color={options.color}
          variant="outline"
          onClick={async () => {
            const ok = await confirm(options);
            setResult(`${label}: ${ok ? "confirmed" : "cancelled"}`);
          }}
        >
          {label}
        </Button>
      ))}
      <span>Result: {result}</span>
    </div>
  );
}

```

## Example: 宣言的な ConfirmDialog

制御されたダイアログ。loading は onConfirm の実行中にスピナーを表示し、キャンセルを無効にします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/demos/declarative.tsx

```tsx
import { useState } from "react";
import { Button, ConfirmDialog } from "minerva-design";

export default function DeclarativeDemo() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const archive = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    setOpen(false);
  };
  return (
    <>
      <Button color="warning" onClick={() => setOpen(true)}>
        Archive project
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={archive}
        loading={loading}
        color="warning"
        title="Archive this project?"
        description="It becomes read-only for everyone."
        confirmLabel="Archive"
      />
    </>
  );
}

```

## Example: 命令的な confirm()

await confirm({...}) は確認で true、キャンセル（ボタン、Escape、背景）で false を返します。プロバイダーは不要です。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/demos/imperative.tsx

```tsx
import { useState } from "react";
import { Button, confirm } from "minerva-design";

export default function ImperativeDemo() {
  const [result, setResult] = useState("—");
  const remove = async () => {
    const ok = await confirm({
      title: "Delete this book?",
      description: "Reviews and ratings are deleted too.",
      color: "danger",
    });
    setResult(ok ? "Deleted" : "Cancelled");
  };
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button color="danger" onClick={remove}>
        Delete book
      </Button>
      <span>Result: {result}</span>
    </div>
  );
}

```

## Example: ConfirmProvider と併用

useConfirm() はプロバイダーが（呼び出し元の ConfigProvider スコープ内に）描画する confirm を返すため、ダイアログはアプリのコンテキストを共有します。同時の要求は順番に一つずつ表示されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/demos/provider.tsx

```tsx
import {
  Button,
  ConfirmProvider,
  ToastProvider,
  toast,
  useConfirm,
} from "minerva-design";

function PublishButton() {
  const ask = useConfirm();
  return (
    <Button
      onClick={async () => {
        if (await ask({ title: "Publish chapter?", confirmLabel: "Publish" })) {
          toast.success("Published");
        }
      }}
    >
      Publish
    </Button>
  );
}

export default function ProviderDemo() {
  return (
    <ToastProvider>
      <ConfirmProvider>
        <PublishButton />
      </ConfirmProvider>
    </ToastProvider>
  );
}

```

## Example: スコープ：useConfirm() と confirm()

両方のボタンはネストした ConfigProvider（ダークテーマ、tech パレット、中国語）の中にあります。useConfirm() はそのスコープ内でダイアログを開き（ダークのトークン、中国語のボタンラベル）、confirm() はページのテーマと言語でルートに開きます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/demos/scoped.tsx

```tsx
import { useState } from "react";
import { Button, ConfigProvider, confirm, useConfirm } from "minerva-design";

// Code outside React (API client, event bus...): no hook available, so it
// uses confirm(), rendered with the root theme and language.
const askToRetry = () =>
  confirm({ title: "Retry the upload? (confirm(): root scope)" });

function Actions() {
  // Inside a component: bound to the nearest ConfigProvider scope
  const ask = useConfirm();
  const [answer, setAnswer] = useState<string>("—");
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Button
        color="danger"
        onClick={async () => {
          const ok = await ask({
            title: "Delete this chapter? (useConfirm(): dark, tech, 中文)",
            color: "danger",
          });
          setAnswer(String(ok));
        }}
      >
        useConfirm()
      </Button>
      <Button
        color="neutral"
        variant="outline"
        onClick={async () => setAnswer(String(await askToRetry()))}
      >
        confirm()
      </Button>
      <output style={{ alignSelf: "center" }}>{answer}</output>
    </div>
  );
}

export default function ScopedDemo() {
  return (
    <ConfigProvider theme="dark" palette="tech" locale={{ language: "zh" }}>
      <Actions />
    </ConfigProvider>
  );
}

```
