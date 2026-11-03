# Toast

Temporary notifications with a title, a description and a semantic color, shown with toast() from anywhere (no React context needed) and rendered by a ToastProvider inside your app tree, so they inherit your app's context (theme, locale). Loading toasts, promise tracking, in-place updates, actions and a maximum count are built in. Server rendering is safe.

Package: minerva-design@1.20.1

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### When to use which: useToast() or toast()

Inside components, call useToast(): the toasts it shows follow the nearest ConfigProvider scope. Under a nested provider they are rendered into its portal host, with its theme, palette and tokens, and their built-in labels use its language. The owning ToastProvider still renders them, with its position, max and labels.

Outside React (event buses, API clients, stores and other non-component modules), import toast() directly: no hook is available there, and its toasts use the scope of the ToastProvider, usually the root theme and language.

While a modal dialog is open (Modal, Drawer, ConfirmDialog, Command, a modal Popover or Menu), its hide-others treatment covers the toast viewport like the rest of the page: the viewport gets aria-hidden="true" and assistive technologies only see the dialog until it closes.  behaves the same way (opt out on a region with data-minerva-keep-visible).

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

## Example: Basic usage

Success shows Saved, Danger shows Request failed, Warning shows Unsaved changes and Info shows New version. Keep at most three notifications.

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
