# Toast

Temporary notifications with a title, a description and a semantic color, shown with toast() from anywhere (no React context needed) and rendered by a ToastProvider inside your app tree, so they inherit your app's context (theme, locale). Loading toasts, promise tracking, in-place updates, actions and a maximum count are built in. Server rendering is safe.

Package: minerva-design@1.20.1

Renderer: react

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

## Example: Action, icon and onClose

action adds a button (e.g. Undo) that also closes the toast; icon replaces the color icon; closable: false hides the close button; onClose runs once when the toast closes.

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

## Example: Basic usage

Success shows Saved, Danger shows Request failed, Warning shows Unsaved changes and Info shows New version. Keep at most three notifications.

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

## Example: Colors

color picks the semantic color: info (default), success, warning or danger. It sets the accent, the icon and the role: danger is announced as an alert, the others as a status.

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

## Example: Same id replaces

Showing a toast with the id of a visible one replaces it and restarts its timer, instead of stacking duplicates (handy for polling errors).

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

## Example: Keyboard

F8 (the hotkey prop, also announced in the region label "Notifications (F8)") moves focus to the toasts. Escape dismisses the focused toast; after closing one, focus moves to the next toast's close button, then back to where it was before entering the toasts.

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

## Example: Loading, update and promise

toast.loading (or the loading: true option, with any color) shows a spinner instead of the icon and stays open; toast.update(id, { loading: false, ... }) turns it into a result in place. toast.promise(promise, { loading, success, error }) does both for a promise.

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

## Example: Options

toast({ color, title, description, duration }) for full control; duration 0 keeps the toast until it is closed. toast.dismiss(id) closes one toast, toast.dismiss() all of them. Hovering or focusing a toast pauses its timer.

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

## Example: Scoped: useToast() vs toast()

Both buttons sit in a nested ConfigProvider (dark theme, tech palette, Chinese). useToast() renders its toast inside that scope (dark tokens, Chinese close label, its own viewport at the same position); toast() renders at the root, with the page theme and language.

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
