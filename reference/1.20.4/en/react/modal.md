# Modal

A dialog that interrupts the page for a focused task. Focus is trapped inside, Escape and a backdrop click close it, and focus returns to the opener. On narrow screens it becomes a bottom sheet.

Package: minerva-design@1.20.4

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## Modal

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Modal"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "open",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Controlled open state; leave `undefined` for uncontrolled."
  },
  {
    "name": "defaultOpen",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Initial open state while uncontrolled"
  },
  {
    "name": "trigger",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Element that opens the modal on click (rendered with `asChild`, so pass a single element)."
  },
  {
    "name": "title",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Title rendered as the dialog's accessible name."
  },
  {
    "name": "description",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Description rendered below the title (accessible description)."
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "enum",
    "values": [
      "full",
      "large",
      "medium",
      "small",
      "xlarge"
    ],
    "typeText": "ModalSize | undefined",
    "typeRef": "type:f3df198ab84f4bcc7d55",
    "default": "medium",
    "required": false,
    "description": "Width preset"
  },
  {
    "name": "hideCloseButton",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Hides the close (×) button"
  },
  {
    "name": "closeLabel",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the close button; defaults to the localized \"Close\"."
  },
  {
    "name": "role",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "enum",
    "values": [
      "alertdialog",
      "dialog"
    ],
    "typeText": "\"alertdialog\" | \"dialog\" | undefined",
    "typeRef": "type:a906bc3abf78e63c22c7",
    "default": "dialog",
    "required": false,
    "description": "ARIA role of the dialog panel; use \"alertdialog\" for confirmations that interrupt the user"
  }
]
```

### events

```json
[
  {
    "name": "onOpenChange",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:0ad46b6ec4d30d8988c0",
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
    "required": false,
    "description": "Called with the requested open state (close button, Escape, overlay click, trigger)."
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

## ModalBody

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "ModalBody"
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

## ModalClose

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "ModalClose"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "asChild",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Merges the behaviour onto the single child element instead of rendering a `<button>`"
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

## ModalContent

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "ModalContent"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "role",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "enum",
    "values": [
      "alertdialog",
      "dialog"
    ],
    "typeText": "\"alertdialog\" | \"dialog\" | undefined",
    "typeRef": "type:a906bc3abf78e63c22c7",
    "default": "dialog",
    "required": false,
    "description": "ARIA role of the dialog panel; use \"alertdialog\" for confirmations that interrupt the user"
  },
  {
    "name": "forceMount",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Keeps the panel mounted while closed (`data-state=\"closed\"`), e.g. for animation libraries"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "enum",
    "values": [
      "full",
      "large",
      "medium",
      "small",
      "xlarge"
    ],
    "typeText": "ModalSize | undefined",
    "typeRef": "type:f3df198ab84f4bcc7d55",
    "default": "medium",
    "required": false,
    "description": "Width preset"
  },
  {
    "name": "hideCloseButton",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Hides the close (×) button in the top-right corner"
  },
  {
    "name": "closeLabel",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the close button; defaults to the localized \"Close\"."
  },
  {
    "name": "description",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Visible description below the title, also used as the dialog's accessible description (`aria-describedby`, omitted without a description)."
  },
  {
    "name": "overlayClassName",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Class name of the overlay (backdrop)."
  }
]
```

### events

```json
[
  {
    "name": "onOpenAutoFocus",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "function",
    "typeText": "((event: Event) => void) | undefined",
    "typeRef": "type:b597706ae1d7d732ba3a",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "Event",
        "typeRef": "type:5914c0535b9eea3cd24b"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called before focus moves into the panel on open; `event.preventDefault()` keeps focus where it is"
  },
  {
    "name": "onCloseAutoFocus",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "function",
    "typeText": "((event: Event) => void) | undefined",
    "typeRef": "type:ab20d26e5f13c79ef911",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "Event",
        "typeRef": "type:5914c0535b9eea3cd24b"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called before focus returns to the opener on close; `event.preventDefault()` skips it"
  },
  {
    "name": "onEscapeKeyDown",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "function",
    "typeText": "((event: KeyboardEvent) => void) | undefined",
    "typeRef": "type:a348a495444a7196111b",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "KeyboardEvent",
        "typeRef": "type:cf927f12d625bb9a2516"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Escape pressed while it is the topmost layer; `event.preventDefault()` keeps it open."
  },
  {
    "name": "onPointerDownOutside",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "function",
    "typeText": "((event: PointerEvent) => void) | undefined",
    "typeRef": "type:ca686dd209f3d435002d",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "PointerEvent",
        "typeRef": "type:9b8a3135b665541031a0"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Pointer pressed outside (e.g. on the overlay); `event.preventDefault()` keeps it open."
  },
  {
    "name": "onInteractOutside",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "function",
    "typeText": "((event: PointerEvent | FocusEvent) => void) | undefined",
    "typeRef": "type:71be94e6108fcc07d7e7",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "PointerEvent | FocusEvent",
        "typeRef": "type:795729439f86fd72381f"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Pointer down or focus outside; `event.preventDefault()` keeps it open."
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

## ModalFooter

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "ModalFooter"
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

## ModalHeader

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "ModalHeader"
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

## ModalRoot

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "ModalRoot"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "open",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Controlled open state; leave `undefined` for uncontrolled."
  },
  {
    "name": "defaultOpen",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Initial open state while uncontrolled"
  },
  {
    "name": "modal",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Modal mode: renders the overlay, traps focus, locks page scrolling, blocks outside pointer interaction and hides the rest of the page from assistive technology. Non-modal dialogs close on outside click / focus instead."
  }
]
```

### events

```json
[
  {
    "name": "onOpenChange",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:f7b95e3d1343d9017993",
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
    "required": false,
    "description": "Called with the requested open state (trigger, close button, Escape, overlay click)."
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

## ModalTrigger

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "ModalTrigger"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "asChild",
    "source": "packages/react/src/components/Modal/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Merges the behaviour onto the single child element instead of rendering a `<button>`"
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
  "ModalProps": {
    "source": "react/src/components/Modal/types.ts",
    "description": "Props of the all-in-one `Modal`.",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "required": false,
        "description": "Controlled open state; leave `undefined` for uncontrolled."
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Initial open state while uncontrolled"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called with the requested open state (close button, Escape, overlay click, trigger)."
      },
      {
        "name": "trigger",
        "type": "ReactNode",
        "required": false,
        "description": "Element that opens the modal on click (rendered with `asChild`, so pass a single element)."
      },
      {
        "name": "title",
        "type": "ReactNode",
        "required": false,
        "description": "Title rendered as the dialog's accessible name."
      },
      {
        "name": "description",
        "type": "ReactNode",
        "required": false,
        "description": "Description rendered below the title (accessible description)."
      },
      {
        "name": "size",
        "type": "ModalSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Width preset"
      },
      {
        "name": "hideCloseButton",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Hides the close (×) button"
      },
      {
        "name": "closeLabel",
        "type": "string",
        "required": false,
        "description": "Accessible label of the close button; defaults to the localized \"Close\"."
      },
      {
        "name": "role",
        "type": "\"dialog\" | \"alertdialog\"",
        "required": false,
        "default": "\"dialog\"",
        "description": "ARIA role of the dialog panel; use \"alertdialog\" for confirmations that interrupt the user"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name of the dialog panel."
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the dialog element."
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Body: usually `ModalBody` + `ModalFooter`, or a `<form>` wrapping them."
      }
    ]
  },
  "ModalRootProps": {
    "source": "react/src/components/Modal/types.ts",
    "description": "Props of the compound `ModalRoot` (owns the open state).",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "required": false,
        "description": "Controlled open state; leave `undefined` for uncontrolled."
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Initial open state while uncontrolled"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called with the requested open state (trigger, close button, Escape, overlay click)."
      },
      {
        "name": "modal",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Modal mode: renders the overlay, traps focus, locks page scrolling, blocks outside pointer interaction and hides the rest of the page from assistive technology. Non-modal dialogs close on outside click / focus instead."
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Trigger and content."
      }
    ]
  },
  "ModalTriggerProps": {
    "source": "react/src/components/Modal/types.ts",
    "description": "Props of `ModalTrigger` / `ModalClose` (a native button, or the child with `asChild`).",
    "kind": "interface",
    "extends": [
      "ComponentPropsWithRef<\"button\">"
    ],
    "props": [
      {
        "name": "asChild",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Merges the behaviour onto the single child element instead of rendering a `<button>`"
      }
    ]
  },
  "ModalContentProps": {
    "source": "react/src/components/Modal/types.ts",
    "description": "Props of `ModalContent`: the portalled overlay + dialog panel.",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLDivElement>"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the dialog element."
      },
      {
        "name": "role",
        "type": "\"dialog\" | \"alertdialog\"",
        "required": false,
        "default": "\"dialog\"",
        "description": "ARIA role of the dialog panel; use \"alertdialog\" for confirmations that interrupt the user"
      },
      {
        "name": "forceMount",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Keeps the panel mounted while closed (`data-state=\"closed\"`), e.g. for animation libraries"
      },
      {
        "name": "onOpenAutoFocus",
        "type": "(event: Event) => void",
        "required": false,
        "description": "Called before focus moves into the panel on open; `event.preventDefault()` keeps focus where it is"
      },
      {
        "name": "onCloseAutoFocus",
        "type": "(event: Event) => void",
        "required": false,
        "description": "Called before focus returns to the opener on close; `event.preventDefault()` skips it"
      },
      {
        "name": "onEscapeKeyDown",
        "type": "(event: KeyboardEvent) => void",
        "required": false,
        "description": "Escape pressed while it is the topmost layer; `event.preventDefault()` keeps it open."
      },
      {
        "name": "onPointerDownOutside",
        "type": "(event: PointerEvent) => void",
        "required": false,
        "description": "Pointer pressed outside (e.g. on the overlay); `event.preventDefault()` keeps it open."
      },
      {
        "name": "onInteractOutside",
        "type": "(event: PointerEvent | FocusEvent) => void",
        "required": false,
        "description": "Pointer down or focus outside; `event.preventDefault()` keeps it open."
      },
      {
        "name": "size",
        "type": "ModalSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Width preset"
      },
      {
        "name": "hideCloseButton",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Hides the close (×) button in the top-right corner"
      },
      {
        "name": "closeLabel",
        "type": "string",
        "required": false,
        "description": "Accessible label of the close button; defaults to the localized \"Close\"."
      },
      {
        "name": "description",
        "type": "ReactNode",
        "required": false,
        "description": "Visible description below the title, also used as the dialog's accessible description (`aria-describedby`, omitted without a description)."
      },
      {
        "name": "overlayClassName",
        "type": "string",
        "required": false,
        "description": "Class name of the overlay (backdrop)."
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Modal": {
    "kind": "cssVars",
    "source": "react/src/components/Modal",
    "vars": [
      {
        "name": "--modal-width",
        "description": "Width of the panel (every size; defaults to the width of the size, capped by the viewport)"
      },
      {
        "name": "--modal-max-height",
        "description": "Maximum height of the panel (the body scrolls beyond)"
      },
      {
        "name": "--modal-padding",
        "description": "Horizontal padding of the header, description, body and footer"
      },
      {
        "name": "--modal-radius",
        "description": "Corner radius of the panel (defaults to --radius-xl)"
      },
      {
        "name": "--modal-shadow",
        "description": "Shadow of the panel (defaults to --shadow-xl)"
      },
      {
        "name": "--modal-background",
        "description": "Background of the panel"
      },
      {
        "name": "--modal-z-index",
        "description": "Stacking order of the panel (defaults to --z-modal)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

Cancel closes without deleting. Delete closes the dialog and displays Record deleted.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/modal/demos/basic.tsx

```tsx
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "minerva-design";

export default function BasicDemo() {
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Delete record</Button>
      {deleted && <p role="status">Record deleted</p>}
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Delete this record?"
        description="The record and its history are removed permanently."
        size="small"
      >
        <ModalBody>Other team members lose access immediately.</ModalBody>
        <ModalFooter>
          <Button
            color="neutral"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setDeleted(true);
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

```

## Example: Compound API

ModalRoot, ModalTrigger, ModalContent, ModalHeader, ModalBody, ModalFooter and ModalClose for full control.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/modal/demos/compound.tsx

```tsx
import {
  Button,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalRoot,
  ModalTrigger,
} from "minerva-design";

export default function CompoundDemo() {
  return (
    <ModalRoot>
      <ModalTrigger asChild>
        <Button color="neutral" variant="outline">
          Open compound modal
        </Button>
      </ModalTrigger>
      <ModalContent size="large" description="Built from the individual parts.">
        <ModalHeader>Workspace settings</ModalHeader>
        <ModalBody>Compose header, body and footer freely.</ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button>Done</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </ModalRoot>
  );
}

```

## Example: Form

Rename Quarterly report by editing Name and pressing Save. The trigger then displays the saved name.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/modal/demos/form.tsx

```tsx
import { useState } from "react";
import {
  Button,
  Input,
  FormField,
  Modal,
  ModalBody,
  ModalFooter,
} from "minerva-design";

export default function FormDemo() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Quarterly report");
  return (
    <>
      <Button onClick={() => setOpen(true)}>Rename “{name}”</Button>
      <Modal open={open} onOpenChange={setOpen} title="Rename document">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setName(new FormData(event.currentTarget).get("name") as string);
            setOpen(false);
          }}
        >
          <ModalBody>
            <FormField label="Name">
              <Input name="name" defaultValue={name} />
            </FormField>
          </ModalBody>
          <ModalFooter>
            <Button type="submit">Save</Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

```

## Example: Sizes

small, medium (default), large, xlarge and full.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/modal/demos/sizes.tsx

```tsx
import { Button, Modal, ModalBody, type ModalSize } from "minerva-design";

const SIZES: ModalSize[] = ["small", "medium", "large", "xlarge", "full"];

export default function SizesDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {SIZES.map((size) => (
        <Modal
          key={size}
          size={size}
          title={`Size: ${size}`}
          trigger={
            <Button color="neutral" variant="outline">
              {size}
            </Button>
          }
        >
          <ModalBody>
            On narrow screens every size becomes a bottom sheet.
          </ModalBody>
        </Modal>
      ))}
    </div>
  );
}

```

## Example: Uncontrolled with a trigger

Pass trigger to let the modal manage its own state.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/modal/demos/uncontrolled.tsx

```tsx
import { Button, Modal, ModalBody } from "minerva-design";

export default function UncontrolledDemo() {
  return (
    <Modal
      trigger={
        <Button color="neutral" variant="outline">
          Show details
        </Button>
      }
      title="Release notes"
    >
      <ModalBody>
        Version 2.0 adds dialogs, drawers and a command palette. Close with the
        × button, Escape or a click on the backdrop.
      </ModalBody>
    </Modal>
  );
}

```
