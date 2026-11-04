# Toast トースト

タイトル、説明、セマンティックカラーを持つ一時的な通知です。toast() でどこからでも表示でき（React コンテキスト不要）、アプリのツリー内の ToastProvider が描画するため、アプリのコンテキスト（テーマ、ロケール）を引き継ぎます。読み込み表示、Promise の追跡、その場での更新、アクション、最大表示数を備えています。サーバーレンダリングにも対応します。

Package: minerva-design@1.21.0

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

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

Full-width mobile toasts (position top / center / bottom), safe-area aware

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Toast/Toast.tsx",
    "kind": "enum",
    "values": [
      "bottom",
      "bottom-center",
      "bottom-left",
      "bottom-right",
      "center",
      "top",
      "top-center",
      "top-left",
      "top-right"
    ],
    "typeText": "ToastPosition | undefined",
    "typeRef": "type:6b0a7aa9dc596e797cc3",
    "default": "top",
    "required": false,
    "description": "Where the toasts are stacked. Mobile default \"top\" (the web default is \"top-right\"); the web corners map to \"top\" / \"bottom\" (toasts span the screen width on phones)"
  },
  {
    "name": "max",
    "source": "packages/native/src/components/Toast/Toast.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Maximum number of toasts shown at once; the oldest close first (\"overflow\")"
  },
  {
    "name": "duration",
    "source": "packages/native/src/components/Toast/Toast.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 4000,
    "required": false,
    "description": "Default auto-close delay of the toasts shown without `duration` (ms; 0 keeps them open)"
  },
  {
    "name": "closeLabel",
    "source": "packages/native/src/components/Toast/Toast.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the close buttons"
  },
  {
    "name": "accessibilityLabel",
    "source": "packages/native/src/components/Toast/Toast.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the toast layer"
  },
  {
    "name": "pauseOnPress",
    "source": "packages/native/src/components/Toast/Toast.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Pauses the auto-close timer while a toast is pressed"
  },
  {
    "name": "queue",
    "source": "packages/native/src/components/Toast/Toast.tsx",
    "kind": "object",
    "typeText": "NativeToastQueue | undefined",
    "typeRef": "type:11d289e8543bea904e64",
    "required": false,
    "description": "Queue rendered by this provider"
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
  "native:ToastOptions": {
    "source": "native/src/components/Toast/Toast.tsx",
    "description": "Options of a toast",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "ToastId",
        "required": false,
        "description": "Identifier; showing a toast with the id of a visible one replaces it (and restarts its timer). Generated when omitted"
      },
      {
        "name": "color",
        "type": "ToastColor",
        "required": false,
        "description": "Semantic color: accent, icon and role (\"alert\" for danger / warning)"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "description": "Spinner instead of the icon; no auto-close by default"
      },
      {
        "name": "title",
        "type": "ReactNode",
        "required": false,
        "description": "Main text (announced when the toast appears)"
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
        "description": "Auto-close delay in ms; 0 keeps the toast open"
      },
      {
        "name": "icon",
        "type": "ReactNode | null",
        "required": false,
        "description": "Custom icon; `null` hides it"
      },
      {
        "name": "closable",
        "type": "boolean",
        "required": false,
        "description": "Shows the close button (default true)"
      },
      {
        "name": "action",
        "type": "ToastAction",
        "required": false,
        "description": "Action button (e.g. \"Undo\")"
      },
      {
        "name": "onClose",
        "type": "(id: ToastId) => void",
        "required": false,
        "description": "Called once with the id when the toast starts closing"
      }
    ]
  },
  "native:ToastApi": {
    "source": "native/src/components/Toast/Toast.tsx",
    "description": "The `toast` function and the API returned by `useToast()`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "info",
        "type": "(title: ReactNode, options?: ToastOptions) => ToastId",
        "required": true
      },
      {
        "name": "success",
        "type": "(title: ReactNode, options?: ToastOptions) => ToastId",
        "required": true
      },
      {
        "name": "warning",
        "type": "(title: ReactNode, options?: ToastOptions) => ToastId",
        "required": true
      },
      {
        "name": "danger",
        "type": "(title: ReactNode, options?: ToastOptions) => ToastId",
        "required": true
      },
      {
        "name": "loading",
        "type": "(title: ReactNode, options?: ToastOptions) => ToastId",
        "required": true,
        "description": "Spinner toast without auto-close (update or dismiss it later)"
      },
      {
        "name": "promise",
        "type": "<T>(promise: Promise<T>, messages: ToastPromiseMessages<T>, options?: Omit<ToastOptions, \"color\" | \"loading\" | \"title\">) => Promise<T>",
        "required": true,
        "description": "Loading toast while the promise is pending, then success / danger"
      },
      {
        "name": "update",
        "type": "(id: ToastId, options: Omit<ToastOptions, \"id\">) => void",
        "required": true,
        "description": "Changes an open toast in place and restarts its timer"
      },
      {
        "name": "dismiss",
        "type": "(id?: ToastId) => void",
        "required": true,
        "description": "Closes a toast, or every toast when no id is given"
      },
      {
        "name": "dismissAll",
        "type": "() => void",
        "required": true,
        "description": "Closes every toast"
      }
    ]
  },
  "native:ToastProviderProps": {
    "source": "native/src/components/Toast/Toast.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Application content; the toast layer is drawn over it"
      },
      {
        "name": "position",
        "type": "ToastPosition",
        "required": false,
        "default": "\"top\"",
        "description": "Where the toasts are stacked. Mobile default \"top\" (the web default is \"top-right\"); the web corners map to \"top\" / \"bottom\" (toasts span the screen width on phones)"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "description": "Maximum number of toasts shown at once; the oldest close first (\"overflow\")"
      },
      {
        "name": "duration",
        "type": "number",
        "required": false,
        "default": "4000",
        "description": "Default auto-close delay of the toasts shown without `duration` (ms; 0 keeps them open)"
      },
      {
        "name": "closeLabel",
        "type": "string",
        "required": false,
        "default": "the \"toast.close\" message",
        "description": "Accessible label of the close buttons"
      },
      {
        "name": "accessibilityLabel",
        "type": "string",
        "required": false,
        "default": "the \"toast.region\" message",
        "description": "Accessible label of the toast layer"
      },
      {
        "name": "pauseOnPress",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Pauses the auto-close timer while a toast is pressed"
      },
      {
        "name": "queue",
        "type": "NativeToastQueue",
        "required": false,
        "default": "the shared `toastQueue`",
        "description": "Queue rendered by this provider"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the toast layer"
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

## Example: 基本的な使い方

Success は Saved、Danger は Request failed、Warning は Unsaved changes、Info は New version を表示します。通知は最大 3 件です。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/toast/native/basic.tsx

```tsx
import { View } from "react-native";
import { useState } from "react";
import {
  Button,
  ToastProvider,
  toast,
  type ToastPosition,
} from "minerva-design/native";

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
      <View style={{ gap: 16, alignItems: "flex-start" }}>
        <View style={{ gap: 8, flexDirection: "row", flexWrap: "wrap" }}>
          <Button color="success" onPress={() => toast.success("Saved")}>
            Success
          </Button>
          <Button color="danger" onPress={() => toast.danger("Request failed")}>
            Danger
          </Button>
          <Button
            color="warning"
            onPress={() => toast.warning("Unsaved changes")}
          >
            Warning
          </Button>
          <Button
            color="neutral"
            variant="outline"
            onPress={() => toast.info("New version")}
          >
            Info
          </Button>
        </View>
        <View
          aria-label="Position"
          style={{ gap: 4, flexDirection: "row", flexWrap: "wrap" }}
        >
          {positions.map((name) => (
            <Button
              key={name}
              size="small"
              color={name === position ? "primary" : "neutral"}
              variant={name === position ? "solid" : "outline"}
              aria-pressed={name === position}
              onPress={() => setPosition(name)}
            >
              {name}
            </Button>
          ))}
        </View>
      </View>
    </ToastProvider>
  );
}

```
