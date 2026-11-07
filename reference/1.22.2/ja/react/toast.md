# Toast トースト

タイトル、説明、セマンティックカラーを持つ一時的な通知です。toast() でどこからでも表示でき（React コンテキスト不要）、アプリのツリー内の ToastProvider が描画するため、アプリのコンテキスト（テーマ、ロケール）を引き継ぎます。読み込み表示、Promise の追跡、その場での更新、アクション、最大表示数を備えています。サーバーレンダリングにも対応します。

Package: minerva-design@1.22.2

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "ToastProvider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "position",
    "source": "packages/react/src/components/Toast/types.ts",
    "kind": "enum",
    "values": [
      "bottom-center",
      "bottom-left",
      "bottom-right",
      "top-center",
      "top-left",
      "top-right"
    ],
    "typeText": "ToastPosition | undefined",
    "typeRef": "type:9e0fc0c4d2ae3c0412dc",
    "default": "top-right",
    "required": false,
    "description": "Where the toasts are stacked"
  },
  {
    "name": "max",
    "source": "packages/react/src/components/Toast/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Maximum number of toasts shown at once; when exceeded the oldest close first"
  },
  {
    "name": "pauseOnHover",
    "source": "packages/react/src/components/Toast/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Pauses the auto-close timer while a toast is hovered or focused"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Toast/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the toast region (used as is; the default one includes the hotkey)"
  },
  {
    "name": "closeLabel",
    "source": "packages/react/src/components/Toast/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the close buttons"
  },
  {
    "name": "hotkey",
    "source": "packages/react/src/components/Toast/types.ts",
    "kind": "array",
    "typeText": "string[] | undefined",
    "typeRef": "type:2f7bd52d63b79232027d",
    "required": false,
    "description": "Keys pressed together to move focus to the toast region (the first one holding toasts): key codes (`\"F8\"`, `\"KeyT\"`), keys or modifiers (`\"altKey\"`, `\"ctrlKey\"`, `\"metaKey\"`, `\"shiftKey\"`). Shown in the default region label, e.g. \"Notifications (F8)\". An empty array disables it"
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
  "ToastOptions": {
    "source": "react/src/components/Toast/types.ts",
    "description": "Options of a toast",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "string | number",
        "required": false,
        "description": "Identifier of the toast; generated when omitted. Showing a toast with the id of a visible one replaces it (and restarts its timer) instead of stacking a duplicate"
      },
      {
        "name": "color",
        "type": "Extract<ColorScheme, \"info\" | \"success\" | \"warning\" | \"danger\">",
        "required": false,
        "default": "\"info\"",
        "description": "Semantic color of the toast; sets its accent, icon and ARIA role (\"danger\" is announced as an alert, the others as a status)"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a spinner instead of the icon and keeps the toast open (duration defaults to 0) until it is updated or dismissed; announced as a status"
      },
      {
        "name": "title",
        "type": "ReactNode",
        "required": false,
        "description": "Main text"
      },
      {
        "name": "description",
        "type": "ReactNode",
        "required": false,
        "description": "Secondary text under the title"
      },
      {
        "name": "duration",
        "type": "number",
        "required": false,
        "default": "4000",
        "description": "Time in milliseconds before the toast closes automatically; 0 keeps it open. Loading toasts default to 0"
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Replaces the color icon (or the loading spinner); null hides it"
      },
      {
        "name": "closable",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the close button"
      },
      {
        "name": "action",
        "type": "ToastAction",
        "required": false,
        "description": "Action button rendered in the toast (e.g. \"Undo\")"
      },
      {
        "name": "onClose",
        "type": "(id: string | number) => void",
        "required": false,
        "description": "Called once with the toast id when it closes, whatever the reason (timer, close button, action, dismiss, overflow of ToastProvider max)"
      }
    ]
  },
  "ToastAction": {
    "source": "react/src/components/Toast/types.ts",
    "description": "Button rendered inside a toast; activating it also closes the toast",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "label",
        "type": "ReactNode",
        "required": true,
        "description": "Visible text of the button"
      },
      {
        "name": "onClick",
        "type": "() => void",
        "required": true,
        "description": "Called when the button is activated, before the toast closes"
      }
    ]
  },
  "ToastProviderProps": {
    "source": "react/src/components/Toast/types.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "position",
        "type": "ToastPosition",
        "required": false,
        "default": "\"top-right\"",
        "description": "Where the toasts are stacked"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Application content; the toast viewport is rendered after it"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "default": "Infinity",
        "description": "Maximum number of toasts shown at once; when exceeded the oldest close first"
      },
      {
        "name": "pauseOnHover",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Pauses the auto-close timer while a toast is hovered or focused"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "\"Notifications (F8)\" (localized)",
        "description": "Accessible label of the toast region (used as is; the default one includes the hotkey)"
      },
      {
        "name": "closeLabel",
        "type": "string",
        "required": false,
        "default": "\"Close\" (localized)",
        "description": "Accessible label of the close buttons"
      },
      {
        "name": "hotkey",
        "type": "string[]",
        "required": false,
        "default": "[\"F8\"]",
        "description": "Keys pressed together to move focus to the toast region (the first one holding toasts): key codes (`\"F8\"`, `\"KeyT\"`), keys or modifiers (`\"altKey\"`, `\"ctrlKey\"`, `\"metaKey\"`, `\"shiftKey\"`). Shown in the default region label, e.g. \"Notifications (F8)\". An empty array disables it"
      }
    ]
  },
  "ToastApi": {
    "source": "react/src/components/Toast/types.ts",
    "description": "The `toast` function, and the API returned by `useToast()` (bound to the caller's ConfigProvider scope)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "info",
        "type": "(title: ReactNode, options?: ToastOptions) => string | number",
        "required": true,
        "description": "Shows an info toast with the given title"
      },
      {
        "name": "success",
        "type": "(title: ReactNode, options?: ToastOptions) => string | number",
        "required": true,
        "description": "Shows a success toast with the given title"
      },
      {
        "name": "warning",
        "type": "(title: ReactNode, options?: ToastOptions) => string | number",
        "required": true,
        "description": "Shows a warning toast with the given title"
      },
      {
        "name": "danger",
        "type": "(title: ReactNode, options?: ToastOptions) => string | number",
        "required": true,
        "description": "Shows a danger toast with the given title"
      },
      {
        "name": "loading",
        "type": "(title: ReactNode, options?: ToastOptions) => string | number",
        "required": true,
        "description": "Shows a loading toast (spinner, no auto-close) with the given title"
      },
      {
        "name": "promise",
        "type": "<T>(promise: Promise<T>, messages: ToastPromiseMessages<T>, options?: Omit<ToastOptions, \"color\" | \"loading\" | \"title\">) => Promise<T>",
        "required": true,
        "description": "Shows a loading toast while the promise is pending, then turns the same toast into a success or danger toast. Returns the given promise"
      },
      {
        "name": "update",
        "type": "(id: string | number, options: Omit<ToastOptions, \"id\">) => void",
        "required": true,
        "description": "Changes an open toast in place (merging the options) and restarts its timer; `loading: false` turns a loading toast into a regular one (with the default duration unless one is given). Unknown ids are ignored"
      },
      {
        "name": "dismiss",
        "type": "(id?: string | number) => void",
        "required": true,
        "description": "Closes the toast with the given id, or every toast when omitted"
      }
    ]
  },
  "ToastPromiseMessages": {
    "source": "react/src/components/Toast/types.ts",
    "description": "Messages of `toast.promise`: a node, or a function of the settled value",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "loading",
        "type": "ReactNode",
        "required": true,
        "description": "Title while the promise is pending"
      },
      {
        "name": "success",
        "type": "ReactNode | ((value: T) => ReactNode)",
        "required": true,
        "description": "Title once the promise resolves"
      },
      {
        "name": "error",
        "type": "ReactNode | ((error: unknown) => ReactNode)",
        "required": true,
        "description": "Title once the promise rejects"
      }
    ]
  }
}
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

## Example: アクション・アイコン・onClose

action はトーストも閉じるボタン（「元に戻す」など）を追加します。icon はカラーのアイコンを置き換え、closable: false は閉じるボタンを隠し、onClose はトーストが閉じたときに 1 回呼ばれます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/toast/demos/action.tsx

```tsx
import { Button, HStack, toast } from "minerva-design";
import { FiBell } from "react-icons/fi";

export default function ActionDemo() {
  return (
    <HStack gap={2} wrap>
      <Button
        color="neutral"
        variant="outline"
        onClick={() =>
          toast.info("Conversation archived", {
            duration: 8000,
            action: {
              label: "Undo",
              onClick: () => toast.success("Conversation restored"),
            },
          })
        }
      >
        With action
      </Button>
      <Button
        color="neutral"
        variant="outline"
        onClick={() =>
          toast.info("Reminder set for 9:00", {
            icon: <FiBell />,
            closable: false,
          })
        }
      >
        Custom icon, no close button
      </Button>
      <Button
        color="neutral"
        variant="outline"
        onClick={() =>
          toast.success("Exported", {
            onClose: () => toast.info("Export toast closed"),
          })
        }
      >
        onClose
      </Button>
    </HStack>
  );
}

```

## Example: 基本的な使い方

Success は Saved、Danger は Request failed、Warning は Unsaved changes、Info は New version を表示します。通知は最大 3 件です。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/toast/demos/basic.tsx

```tsx
import { useState } from "react";
import {
  Button,
  HStack,
  ToastProvider,
  VStack,
  toast,
  type ToastPosition,
} from "minerva-design";

const positions: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

export default function BasicDemo() {
  const [position, setPosition] = useState<ToastPosition>("top-right");
  return (
    // Mount one ToastProvider near the root of the app; max={3} closes the
    // oldest toast when a fourth one appears
    <ToastProvider position={position} max={3}>
      <VStack gap={4} align="start">
        <HStack gap={2} wrap>
          <Button color="success" onClick={() => toast.success("Saved")}>
            Success
          </Button>
          <Button color="danger" onClick={() => toast.danger("Request failed")}>
            Danger
          </Button>
          <Button
            color="warning"
            onClick={() => toast.warning("Unsaved changes")}
          >
            Warning
          </Button>
          <Button
            color="neutral"
            variant="outline"
            onClick={() => toast.info("New version")}
          >
            Info
          </Button>
        </HStack>
        <HStack attached wrap aria-label="Position">
          {positions.map((name) => (
            <Button
              key={name}
              size="small"
              color={name === position ? "primary" : "neutral"}
              variant={name === position ? "solid" : "outline"}
              aria-pressed={name === position}
              onClick={() => setPosition(name)}
            >
              {name}
            </Button>
          ))}
        </HStack>
      </VStack>
    </ToastProvider>
  );
}

```

## Example: カラー

color でセマンティックカラーを選びます：info（デフォルト）、success、warning、danger。アクセントカラー、アイコン、ロールが決まり、danger は alert、それ以外は status として読み上げられます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/toast/demos/colors.tsx

```tsx
import { Button, HStack, toast } from "minerva-design";

const colors = ["info", "success", "warning", "danger"] as const;

export default function ColorsDemo() {
  return (
    <HStack gap={2} wrap>
      {colors.map((color) => (
        <Button
          key={color}
          color="neutral"
          variant="outline"
          onClick={() =>
            toast({
              color,
              title: `A ${color} toast`,
              description: "color sets the accent, the icon and the role.",
            })
          }
        >
          {color}
        </Button>
      ))}
    </HStack>
  );
}

```

## Example: 同じ id は置き換え

表示中のトーストと同じ id で表示すると、重複して積み重ねずに置き換えてタイマーを再開します（ポーリングのエラーに便利）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/toast/demos/dedupe.tsx

```tsx
import { Button, useToast } from "minerva-design";

export default function DedupeDemo() {
  const toast = useToast();
  return (
    <Button
      color="neutral"
      variant="outline"
      onClick={() =>
        // Same id: replaces the visible toast and restarts its timer
        toast.danger(`Sync failed at ${new Date().toLocaleTimeString()}`, {
          id: "sync-error",
        })
      }
    >
      Fail again
    </Button>
  );
}

```

## Example: キーボード

F8（hotkey プロパティ。領域ラベル「通知 (F8)」でも案内されます）でトーストにフォーカスを移動します。Escape でフォーカス中のトーストを閉じます。閉じた後は次のトーストの閉じるボタンへ、最後はトーストに入る前の位置へフォーカスが戻ります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/toast/demos/keyboard.tsx

```tsx
import { Button, HStack, toast } from "minerva-design";

// The ToastProvider of the first demo uses the default hotkey (F8); set
// `hotkey` (e.g. ["altKey", "KeyT"]) to change it. Show a
// few toasts, press F8 to jump to them, Tab between them, then Escape (or a
// close button): focus moves to the next toast, then back here.
export default function KeyboardDemo() {
  return (
    <HStack gap={2} wrap>
      <Button
        color="neutral"
        variant="outline"
        onClick={() => {
          toast.info("Build started", { duration: 0 });
          toast.success("Tests passed", { duration: 0 });
          toast.warning("Coverage dropped by 2%", {
            duration: 0,
            action: { label: "Details", onClick: () => {} },
          });
        }}
      >
        Show three toasts, then press F8
      </Button>
      <Button color="neutral" variant="ghost" onClick={() => toast.dismiss()}>
        Dismiss all
      </Button>
    </HStack>
  );
}

```

## Example: 読み込み・更新・Promise

toast.loading（または任意の色と loading: true オプション）はアイコンの代わりにスピナーを表示し、自動では閉じません。toast.update(id, { loading: false, ... }) でその場で結果に変えられます。toast.promise(promise, { loading, success, error }) は Promise に対してこれを自動で行います。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/toast/demos/loading.tsx

```tsx
import { Button, HStack, toast } from "minerva-design";

export default function LoadingDemo() {
  const save = () => {
    // Loading toasts stay open until they are updated or dismissed
    const id = toast.loading("Saving…");
    setTimeout(() => {
      // loading: false swaps the spinner for the icon and starts the timer
      toast.update(id, { color: "success", loading: false, title: "Saved!" });
    }, 1500);
  };

  const remove = () => {
    // Any color can be loading; it stays a polite status while pending
    const id = toast({ color: "danger", loading: true, title: "Deleting…" });
    setTimeout(() => {
      toast.update(id, { loading: false, title: "Project deleted" });
    }, 1500);
  };

  const upload = () =>
    toast
      .promise(
        new Promise<number>((resolve, reject) =>
          setTimeout(
            () => (Math.random() > 0.3 ? resolve(3) : reject(new Error())),
            1500,
          ),
        ),
        {
          loading: "Uploading files…",
          success: (count) => `${count} files uploaded`,
          error: "Upload failed, try again",
        },
      )
      .catch(() => undefined);

  return (
    <HStack gap={2} wrap>
      <Button onClick={save}>Save (update)</Button>
      <Button color="neutral" variant="outline" onClick={upload}>
        Upload (promise)
      </Button>
      <Button color="danger" variant="outline" onClick={remove}>
        Delete (loading option)
      </Button>
    </HStack>
  );
}

```

## Example: オプション

toast({ color, title, description, duration }) で細かく制御できます。duration が 0 の場合は閉じるまで表示されます。toast.dismiss(id) で 1 件、toast.dismiss() ですべて閉じます。ホバーまたはフォーカス中はタイマーが一時停止します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/toast/demos/options.tsx

```tsx
import { Button, toast } from "minerva-design";

export default function OptionsDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Button
        color="neutral"
        variant="outline"
        onClick={() =>
          toast({
            color: "success",
            title: "Book published",
            description: "Readers can now find it in the catalog.",
            duration: 8000,
          })
        }
      >
        With description
      </Button>
      <Button
        color="neutral"
        variant="outline"
        onClick={() => toast.warning("Stays until closed", { duration: 0 })}
      >
        Persistent
      </Button>
      <Button color="neutral" variant="outline" onClick={() => toast.dismiss()}>
        Dismiss all
      </Button>
    </div>
  );
}

```

## Example: スコープ：useToast() と toast()

両方のボタンはネストした ConfigProvider（ダークテーマ、tech パレット、中国語）の中にあります。useToast() はそのスコープ内にトーストを描画し（ダークのトークン、中国語の閉じるラベル、同じ位置の専用ビューポート）、toast() はページのテーマと言語でルートに描画します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/toast/demos/scoped.tsx

```tsx
import { Button, ConfigProvider, toast, useToast } from "minerva-design";

// Code outside React (API client, event bus...): no hook available, so it
// uses toast(), rendered with the root theme and language.
const notifySyncDone = () => toast.info("Synced (toast(): root scope)");

function Actions() {
  // Inside a component: bound to the nearest ConfigProvider scope
  const scopedToast = useToast();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Button
        onClick={() =>
          scopedToast.success("Saved (useToast(): dark, tech, 中文)")
        }
      >
        useToast()
      </Button>
      <Button color="neutral" variant="outline" onClick={notifySyncDone}>
        toast()
      </Button>
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
