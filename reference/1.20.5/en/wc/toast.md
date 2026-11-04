# Toast

Temporary notifications with a title, a description and a semantic color, shown with toast() from anywhere (no React context needed) and rendered by a ToastProvider inside your app tree, so they inherit your app's context (theme, locale). Loading toasts, promise tracking, in-place updates, actions and a maximum count are built in. Server rendering is safe.

Package: minerva-design@1.20.5

Renderer: wc

Locale: en

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
  "specifier": "minerva-design/web-components/toast-region",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "position",
    "typeText": "\"top-right\" | \"top-left\" | \"top-center\" | \"bottom-right\" | \"bottom-left\" | \"bottom-center\"",
    "attribute": "position",
    "required": false
  },
  {
    "name": "max",
    "attribute": "max",
    "required": false
  },
  {
    "name": "noPauseOnHover",
    "typeText": "boolean",
    "attribute": "no-pause-on-hover",
    "required": false
  },
  {
    "name": "closeLabel",
    "typeText": "string | undefined",
    "attribute": "close-label",
    "required": false
  },
  {
    "name": "hotkey",
    "typeText": "string[]",
    "attribute": "hotkey",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-close",
    "typeText": "CustomEvent",
    "description": "A toast of this region started closing (`detail: { id, reason }`; reason: \"timeout\" | \"close-button\" | \"action\" | \"escape\" | \"dismiss\" | \"overflow\")"
  },
  {
    "name": "minerva-after-close",
    "typeText": "CustomEvent",
    "description": "A toast of this region was removed after its exit animation (`detail: { id }`)"
  }
]
```

## API

```json
{
  "wc:minerva-toast-region": {
    "kind": "element",
    "source": "web-components/src/components/toast/toast.ts",
    "className": "MinervaToastRegion",
    "summary": "Toast stack (viewport) rendering the toasts of the `toast()` API.",
    "description": "Toast region (the React library's `ToastProvider` viewport): renders the toasts shown with the `toast()` API, stacked at `position`, with the same DOM, classes, roles and keyboard behaviour as React. - Each toast is a live region: `role=\"status\"`, or `role=\"alert\"` for danger toasts (loading toasts stay a polite status). The stack is a `role=\"region\"` labelled \"Notifications (F8)\" (localized). - Toasts close after `duration` (default 4000 ms; loading toasts stay open); the countdown pauses while a toast is hovered or holds focus. - The hotkey (F8 by default) moves focus to the region; Escape closes the focused toast; closing a focused toast moves focus to the next toast, else back where it came from (never to `<body>`). - Toasts without an explicit region render in the first connected region (document order); `toast.region(el)` / `{ region }` target another one, e.g. inside a `<minerva-config>` scope (its theme and language apply). When `toast()` runs with no region on the page, one is appended to `<body>` (and removed again when a page region connects). - The stack is shown in the top layer (Popover API, `popover=\"manual\"`) and raised again when a toast appears or a Minerva overlay opens, so toasts stay above modals and stay clickable. Like the React library's `ToastProvider` viewport, the region is treated like any other page content by a modal's hide-others: while a modal dialog (modal, drawer, confirm, command, modal popover / menu) is open, the region (or its ancestor next to the dialog) gets `aria-hidden=\"true\"` and assistive technologies only see the dialog; it is exposed again when the dialog closes. Opt out on a given region with the `data-minerva-keep-visible` attribute (core's hide-others never hides such elements).",
    "properties": [
      {
        "name": "position",
        "attribute": "position",
        "type": "\"top-right\" | \"top-left\" | \"top-center\" | \"bottom-right\" | \"bottom-left\" | \"bottom-center\"",
        "default": "\"top-right\"",
        "description": "Where the toasts are stacked"
      },
      {
        "name": "max",
        "attribute": "max",
        "default": "Infinity",
        "description": "Maximum number of toasts shown at once; the oldest close first"
      },
      {
        "name": "noPauseOnHover",
        "attribute": "no-pause-on-hover",
        "type": "boolean",
        "default": "false",
        "description": "Keeps the countdown running while a toast is hovered or focused"
      },
      {
        "name": "closeLabel",
        "attribute": "close-label",
        "type": "string | undefined",
        "description": "Accessible label of the close buttons (default: localized \"Close\")"
      },
      {
        "name": "hotkey",
        "attribute": "hotkey",
        "type": "string[]",
        "default": "[\"F8\"]",
        "description": "Keys pressed together to focus the region: key codes (`F8`, `KeyT`), keys or modifiers (`altKey`, `ctrlKey`, `metaKey`, `shiftKey`). The attribute separates them with spaces / commas / \"+\" (`hotkey=\"altKey KeyT\"`); an empty value disables it. Shown in the default region label"
      },
      {
        "name": "toast",
        "type": "ToastApi",
        "readonly": true,
        "description": "The toast API bound to this region: `region.toast.success(\"Saved\")` renders in this element."
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "(options?: FocusOptions) => void",
        "description": "Moves focus to the region (as the hotkey does)."
      }
    ],
    "events": [
      {
        "name": "minerva-close",
        "description": "A toast of this region started closing (`detail: { id, reason }`; reason: \"timeout\" | \"close-button\" | \"action\" | \"escape\" | \"dismiss\" | \"overflow\")"
      },
      {
        "name": "minerva-after-close",
        "description": "A toast of this region was removed after its exit animation (`detail: { id }`)"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The fixed stack (`role=\"region\"`)"
      },
      {
        "name": "toast",
        "description": "A toast (`role=\"status\"`, or `alert` for danger)"
      },
      {
        "name": "toast--open",
        "description": "Item state of `toast`: open"
      },
      {
        "name": "toast--closed",
        "description": "Item state of `toast`: closed"
      },
      {
        "name": "toast--color-info",
        "description": "Item state of `toast`: color info"
      },
      {
        "name": "toast--color-success",
        "description": "Item state of `toast`: color success"
      },
      {
        "name": "toast--color-warning",
        "description": "Item state of `toast`: color warning"
      },
      {
        "name": "toast--color-danger",
        "description": "Item state of `toast`: color danger"
      },
      {
        "name": "toast--loading",
        "description": "Item state of `toast`: loading"
      },
      {
        "name": "icon",
        "description": "The icon of a toast (spinner while loading)"
      },
      {
        "name": "title",
        "description": "The title of a toast"
      },
      {
        "name": "description",
        "description": "The description of a toast"
      },
      {
        "name": "action",
        "description": "The action button of a toast"
      },
      {
        "name": "close-button",
        "description": "The close (×) button of a toast"
      },
      {
        "name": "progress",
        "description": "The countdown bar of a timed toast"
      }
    ],
    "cssProperties": [
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

A <minerva-toast-region> renders the toasts; region.toast is the toast() API bound to it (info, success, warning, danger). position places the stack. As with React's ToastProvider, an open modal dialog hides the region from assistive technologies (aria-hidden) until it closes.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/toast/wc/basic.html

```html
<minerva-toast-region
  id="toasts"
  position="bottom-right"
></minerva-toast-region>
<div id="toast-buttons" style="display: flex; flex-wrap: wrap; gap: 8px">
  <minerva-button data-color="info" color="info">Info</minerva-button>
  <minerva-button data-color="success" color="success">Success</minerva-button>
  <minerva-button data-color="warning" color="warning">Warning</minerva-button>
  <minerva-button data-color="danger" color="danger">Danger</minerva-button>
</div>

```

### apps/docs/src/docs/pages/toast/wc/basic.ts

```tsx
// region.toast is the toast() API bound to this region (in an app:
// import { toast } from "minerva-design/web-components/toast").
type Color = "info" | "success" | "warning" | "danger";
type ToastApi = Record<Color, (title: string) => void>;
type Region = HTMLElement & { toast: ToastApi };

const titles: Record<Color, string> = {
  info: "A new version is available",
  success: "Changes saved",
  warning: "Storage almost full",
  danger: "Upload failed",
};

export function setup(root: HTMLElement) {
  const region = root.querySelector<Region>("#toasts")!;
  const buttons = root.querySelector<HTMLElement>("#toast-buttons")!;
  const onClick = (event: Event) => {
    const color = (event.target as Element)
      .closest("[data-color]")
      ?.getAttribute("data-color") as Color | undefined;
    if (color) region.toast[color](titles[color]);
  };
  buttons.addEventListener("click", onClick);
  return () => buttons.removeEventListener("click", onClick);
}

```

## Example: Loading and promises

toast.promise() follows a promise in one toast; loading() then update() do the same by hand. Loading toasts stay open until updated; dismiss() closes every toast.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/toast/wc/loading.html

```html
<minerva-toast-region id="loading-region"></minerva-toast-region>
<div style="display: flex; flex-wrap: wrap; gap: 8px">
  <minerva-button id="deploy">Deploy (promise)</minerva-button>
  <minerva-button id="sync" variant="outline">Sync (update)</minerva-button>
  <minerva-button id="dismiss-all" variant="ghost" color="neutral"
    >Dismiss all</minerva-button
  >
</div>

```

### apps/docs/src/docs/pages/toast/wc/loading.ts

```tsx
// toast.promise() follows a promise; loading() + update() do it by hand.
// Loading toasts stay open until updated or dismissed.
type Id = string | number;
type ToastApi = {
  loading: (title: string) => Id;
  update: (
    id: Id,
    options: { loading?: boolean; color?: string; title?: string },
  ) => void;
  promise: <T>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string },
  ) => Promise<T>;
  dismiss: (id?: Id) => void;
};
type Region = HTMLElement & { toast: ToastApi };

const wait = (ms: number, fail = false) =>
  new Promise<void>((resolve, reject) =>
    setTimeout(() => (fail ? reject(new Error("failed")) : resolve()), ms),
  );

export function setup(root: HTMLElement) {
  const { toast } = root.querySelector<Region>("#loading-region")!;
  const deploy = root.querySelector<HTMLElement>("#deploy")!;
  const sync = root.querySelector<HTMLElement>("#sync")!;
  const dismissAll = root.querySelector<HTMLElement>("#dismiss-all")!;
  const onDeploy = () =>
    toast
      .promise(wait(2000, Math.random() < 0.3), {
        loading: "Deploying…",
        success: "Deployed to production",
        error: "Deployment failed",
      })
      .catch(() => {});
  const onSync = async () => {
    const id = toast.loading("Syncing 3 files…");
    await wait(1500);
    toast.update(id, { loading: false, color: "success", title: "Synced" });
  };
  const onDismiss = () => toast.dismiss();
  deploy.addEventListener("click", onDeploy);
  sync.addEventListener("click", onSync);
  dismissAll.addEventListener("click", onDismiss);
  return () => {
    deploy.removeEventListener("click", onDeploy);
    sync.removeEventListener("click", onSync);
    dismissAll.removeEventListener("click", onDismiss);
  };
}

```

## Example: Options and action

A toast with a title, a description, a longer duration and an Undo action. max keeps the newest toasts only; minerva-close tells why each toast closed.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/toast/wc/options.html

```html
<minerva-toast-region
  id="options-region"
  position="top-center"
  max="3"
></minerva-toast-region>
<minerva-button id="archive">Archive conversation</minerva-button>
<p id="options-log" style="margin: 8px 0 0"></p>

```

### apps/docs/src/docs/pages/toast/wc/options.ts

```tsx
// Options: title, description, duration, action, closable...; `max` keeps
// the 3 newest toasts. minerva-close tells why a toast closed.
type ToastOptions = {
  title?: string;
  description?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
};
type Region = HTMLElement & { toast: (options: ToastOptions) => unknown };
type Close = CustomEvent<{ id: string | number; reason: string }>;

export function setup(root: HTMLElement) {
  const region = root.querySelector<Region>("#options-region")!;
  const button = root.querySelector<HTMLElement>("#archive")!;
  const log = root.querySelector<HTMLElement>("#options-log")!;
  let count = 0;
  const onClick = () => {
    count += 1;
    const name = `Conversation #${count}`;
    region.toast({
      title: "Conversation archived",
      description: `${name} moved to the archive.`,
      duration: 8000,
      action: {
        label: "Undo",
        onClick: () => (log.textContent = `${name} restored`),
      },
    });
  };
  const onClose = (event: Event) => {
    const { id, reason } = (event as Close).detail;
    log.textContent = `Toast ${id} closed (reason: ${reason})`;
  };
  button.addEventListener("click", onClick);
  region.addEventListener("minerva-close", onClose);
  return () => {
    button.removeEventListener("click", onClick);
    region.removeEventListener("minerva-close", onClose);
  };
}

```
