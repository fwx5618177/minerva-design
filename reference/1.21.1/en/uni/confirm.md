# Confirm

Asks the user to confirm an action: a themed replacement for window.confirm. Use the declarative ConfirmDialog or await confirm() from anywhere; with a ConfirmProvider the dialog renders inside your app tree, without one a standalone host is mounted on demand, and on the server confirm() resolves false.

Package: minerva-design@1.21.1

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### When to use which: useConfirm() or confirm()

Inside components, call useConfirm(): its dialogs follow the nearest ConfigProvider scope. Under a nested provider the modal portals into its host, with its theme, palette and tokens, and the default button labels use its language. A ConfirmProvider still renders them when there is one.

Outside React (event buses, API clients, router guards and other non-component modules), import confirm() directly: no hook is available there, and its dialogs use the root theme and language.

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

Shared Modal alertdialog with small geometry/title/description/closeLabel, real Button actions, async pending repeat lock/error, controlled cancel requests and focus recovery. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "title",
    "typeText": "string",
    "required": true
  },
  {
    "name": "description",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "confirmLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "cancelLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "closeLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "color",
    "typeText": "\"warning\" | \"danger\" | \"primary\" | undefined",
    "required": false
  },
  {
    "name": "loading",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "confirmDisabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "open",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "onConfirm",
    "typeText": "(() => void | Promise<void>) | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "openChange",
    "typeText": "[open: boolean]",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "error",
    "typeText": "[error: unknown]",
    "parameters": [
      {
        "name": "error",
        "position": 0,
        "typeText": "unknown",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:open",
    "typeText": "[open: boolean]",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "cancel",
    "typeText": "[]",
    "parameters": []
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

### bindings

```json
[
  {
    "prop": "open",
    "event": "update:open",
    "syntax": "v-model:open"
  }
]
```

## ConfirmProvider

Support: beta

Real FIFO confirmation host: Promise<boolean> requests, confirm/cancel settlement, pending-request cancellation on unmount. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "default",
    "typeText": "{}"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
