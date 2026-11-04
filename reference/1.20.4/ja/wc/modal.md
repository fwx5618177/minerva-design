# Modal モーダル

ページを中断して一つの作業に集中させるダイアログです。フォーカスは内部に閉じ込められ、Escape や背景クリックで閉じ、閉じるとフォーカスは開いた要素に戻ります。狭い画面ではボトムシートになります。

Package: minerva-design@1.20.4

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## Modal

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/modal",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "open",
    "typeText": "boolean",
    "attribute": "open",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string",
    "attribute": "label",
    "required": false
  },
  {
    "name": "description",
    "typeText": "string",
    "attribute": "description",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\" | \"xlarge\" | \"full\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "hideCloseButton",
    "typeText": "boolean",
    "attribute": "hide-close-button",
    "required": false
  },
  {
    "name": "closeLabel",
    "typeText": "string | undefined",
    "attribute": "close-label",
    "required": false
  },
  {
    "name": "dialogRole",
    "typeText": "\"dialog\" | \"alertdialog\"",
    "attribute": "dialog-role",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-open-change",
    "typeText": "CustomEvent<{ open: boolean; reason: ModalCloseReason; }>",
    "detailType": {
      "typeText": "{ open: boolean; reason: ModalCloseReason; }",
      "typeRef": "type:ab605e2d8b03a3c3c354"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The user asked to open / close (`detail: { open, reason }`); cancelable: `preventDefault()` keeps the current state"
  },
  {
    "name": "minerva-after-open",
    "typeText": "CustomEvent<undefined>",
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The modal is open and focus moved in"
  },
  {
    "name": "minerva-after-close",
    "typeText": "CustomEvent<undefined>",
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The modal finished closing (after its exit animation)"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Body content"
  },
  {
    "name": "header",
    "description": "Title (alternative to the `label` attribute)"
  },
  {
    "name": "footer",
    "description": "Actions row"
  },
  {
    "name": "trigger",
    "description": "Element that opens the modal when clicked"
  }
]
```

## ModalBody

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## ModalClose

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## ModalContent

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## ModalFooter

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## ModalHeader

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## ModalRoot

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## ModalTrigger

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## API

```json
{
  "wc:minerva-modal": {
    "kind": "element",
    "source": "web-components/src/components/modal/modal.ts",
    "className": "MinervaModal",
    "summary": "Modal dialog with focus trap, Escape / overlay dismissal and focus return.",
    "description": "Modal dialog (`<Modal>` of React): centered panel (bottom sheet on narrow screens) over an overlay. Focus moves in and is trapped (Tab loops), Escape (topmost layer only) and an overlay click close it, page scroll is locked, the rest of the page is hidden from assistive technologies, and focus returns to the opener on close. The behaviour (focus scope, dismissable layer stack, scroll lock, hide-others) comes from Minerva's core package and is shared with the React components. The panel is shown in the top layer (Popover API) but stays in the DOM where the element is, so it inherits the theme of its scope.",
    "properties": [
      {
        "name": "open",
        "attribute": "open",
        "type": "boolean",
        "default": "false",
        "description": "Whether the modal is open"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Title text (or use the `header` slot); names the dialog"
      },
      {
        "name": "description",
        "attribute": "description",
        "type": "string",
        "default": "\"\"",
        "description": "Description below the title (aria-describedby)"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\" | \"xlarge\" | \"full\"",
        "default": "\"medium\"",
        "description": "Width preset"
      },
      {
        "name": "hideCloseButton",
        "attribute": "hide-close-button",
        "type": "boolean",
        "default": "false",
        "description": "Hides the close (×) button"
      },
      {
        "name": "closeLabel",
        "attribute": "close-label",
        "type": "string | undefined",
        "description": "Accessible label of the close button (default: localized \"Close\")"
      },
      {
        "name": "dialogRole",
        "attribute": "dialog-role",
        "type": "\"dialog\" | \"alertdialog\"",
        "default": "\"dialog\"",
        "description": "ARIA role of the panel; \"alertdialog\" for interrupting confirmations"
      }
    ],
    "methods": [
      {
        "name": "show",
        "signature": "() => void",
        "description": "Opens the modal"
      },
      {
        "name": "hide",
        "signature": "() => void",
        "description": "Closes the modal"
      }
    ],
    "events": [
      {
        "name": "minerva-open-change",
        "description": "The user asked to open / close (`detail: { open, reason }`); cancelable: `preventDefault()` keeps the current state"
      },
      {
        "name": "minerva-after-open",
        "description": "The modal is open and focus moved in"
      },
      {
        "name": "minerva-after-close",
        "description": "The modal finished closing (after its exit animation)"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "Body content"
      },
      {
        "name": "header",
        "description": "Title (alternative to the `label` attribute)"
      },
      {
        "name": "footer",
        "description": "Actions row"
      },
      {
        "name": "trigger",
        "description": "Element that opens the modal when clicked"
      }
    ],
    "parts": [
      {
        "name": "overlay",
        "description": "The backdrop"
      },
      {
        "name": "content",
        "description": "The dialog panel (`role=\"dialog\"`)"
      },
      {
        "name": "header",
        "description": "The title (accessible name of the dialog)"
      },
      {
        "name": "description",
        "description": "The description"
      },
      {
        "name": "body",
        "description": "The scrollable body"
      },
      {
        "name": "footer",
        "description": "The actions row"
      },
      {
        "name": "close-button",
        "description": "The close (×) button"
      }
    ],
    "cssProperties": [
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

## Example: 基本的な使い方

trigger スロットでモーダルを開きます。label と description が名前と説明になります。フォーカスは内部に閉じ込められ、Escape やオーバーレイのクリックで閉じ、フォーカスは開いた要素に戻ります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/modal/wc/basic.html

```html
<minerva-modal
  id="welcome"
  label="Invite your team"
  description="Members get access to every project of the workspace."
>
  <minerva-button slot="trigger">Open modal</minerva-button>
  <p style="margin: 0">
    Focus is trapped inside; Escape, the × button or a click on the overlay
    close the modal, and focus returns to the button.
  </p>
  <minerva-button slot="footer" data-close color="neutral" variant="outline"
    >Cancel</minerva-button
  >
  <minerva-button slot="footer" data-close>Send invites</minerva-button>
</minerva-modal>

```

### apps/docs/src/docs/pages/modal/wc/basic.ts

```tsx
// The trigger slot opens the modal; footer buttons close it with hide().
export function setup(root: HTMLElement) {
  const modal = root.querySelector<HTMLElement & { hide(): void }>("#welcome")!;
  const onClick = (event: Event) => {
    if ((event.target as Element).closest("[data-close]")) modal.hide();
  };
  modal.addEventListener("click", onClick);
  return () => modal.removeEventListener("click", onClick);
}

```

## Example: イベントと閉じる操作のガード

minerva-open-change はキャンセル可能です。「Unsaved changes」がオンの間は preventDefault() でモーダルを開いたままにします。ログには理由と after-open / after-close イベントが表示されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/modal/wc/events.html

```html
<minerva-modal
  id="draft"
  label="Edit note"
  description="Closing is blocked while the note has unsaved changes."
>
  <minerva-button slot="trigger" variant="outline">Edit note</minerva-button>
  <label style="display: flex; gap: 8px; align-items: center">
    <input id="dirty" type="checkbox" checked />
    Unsaved changes
  </label>
</minerva-modal>
<pre id="draft-log" style="margin: 8px 0 0; min-height: 3em"></pre>

```

### apps/docs/src/docs/pages/modal/wc/events.ts

```tsx
// minerva-open-change is cancelable: preventDefault() keeps the modal open.
type OpenChange = CustomEvent<{ open: boolean; reason: string }>;

export function setup(root: HTMLElement) {
  const modal = root.querySelector<HTMLElement>("#draft")!;
  const dirty = root.querySelector<HTMLInputElement>("#dirty")!;
  const log = root.querySelector<HTMLElement>("#draft-log")!;
  const write = (line: string) =>
    (log.textContent = `${line}\n${log.textContent}`.split("\n", 4).join("\n"));
  const onChange = (event: Event) => {
    const { open, reason } = (event as OpenChange).detail;
    if (!open && dirty.checked) {
      event.preventDefault();
      write(`close (${reason}) blocked: unsaved changes`);
    } else write(`open-change: open=${open} (${reason})`);
  };
  const onAfterOpen = () => write("after-open");
  const onAfterClose = () => write("after-close");
  modal.addEventListener("minerva-open-change", onChange);
  modal.addEventListener("minerva-after-open", onAfterOpen);
  modal.addEventListener("minerva-after-close", onAfterClose);
  return () => {
    modal.removeEventListener("minerva-open-change", onChange);
    modal.removeEventListener("minerva-after-open", onAfterOpen);
    modal.removeEventListener("minerva-after-close", onAfterClose);
  };
}

```

## Example: モーダル内のフォーム

フッターの送信ボタンは id でフォームを指定します。ブラウザが検証した後、submit ハンドラーが保存して hide() を呼びます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/modal/wc/form.html

```html
<minerva-modal id="rename" label="Rename project" size="small">
  <minerva-button slot="trigger" variant="outline">Rename…</minerva-button>
  <form id="rename-form" style="display: grid; gap: 4px">
    <label for="project-name">Name</label>
    <input id="project-name" name="name" required value="Minerva" />
  </form>
  <minerva-button slot="footer" type="submit" form="rename-form"
    >Save</minerva-button
  >
</minerva-modal>
<p id="rename-result" style="margin: 8px 0 0"></p>

```

### apps/docs/src/docs/pages/modal/wc/form.ts

```tsx
// The form lives in the light DOM: the browser validates it, then the
// submit handler saves and closes the modal.
type Modal = HTMLElement & { hide(): void };

export function setup(root: HTMLElement) {
  const modal = root.querySelector<Modal>("#rename")!;
  const form = root.querySelector<HTMLFormElement>("#rename-form")!;
  const result = root.querySelector<HTMLElement>("#rename-result")!;
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    result.textContent = `Renamed to "${new FormData(form).get("name")}"`;
    modal.hide();
  };
  form.addEventListener("submit", onSubmit);
  return () => form.removeEventListener("submit", onSubmit);
}

```

## Example: サイズ

5 種類のサイズを show() を呼ぶ前に設定します。ここではタイトルを header スロットで指定しています。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/modal/wc/sizes.html

```html
<div id="sizes" style="display: flex; flex-wrap: wrap; gap: 8px">
  <minerva-button data-size="small" variant="outline">Small</minerva-button>
  <minerva-button data-size="medium" variant="outline">Medium</minerva-button>
  <minerva-button data-size="large" variant="outline">Large</minerva-button>
  <minerva-button data-size="xlarge" variant="outline">XLarge</minerva-button>
  <minerva-button data-size="full" variant="outline">Full</minerva-button>
</div>
<minerva-modal id="sized" description="The width follows the size preset.">
  <span slot="header" id="sized-title"></span>
  <p style="margin: 0">On narrow screens every size becomes a bottom sheet.</p>
</minerva-modal>

```

### apps/docs/src/docs/pages/modal/wc/sizes.ts

```tsx
// Without a trigger slot, set `size` and call show() (or set `open`).
type Modal = HTMLElement & { size: string; show(): void };

export function setup(root: HTMLElement) {
  const buttons = root.querySelector<HTMLElement>("#sizes")!;
  const modal = root.querySelector<Modal>("#sized")!;
  const title = root.querySelector<HTMLElement>("#sized-title")!;
  const onClick = (event: Event) => {
    const size = (event.target as Element)
      .closest("[data-size]")
      ?.getAttribute("data-size");
    if (!size) return;
    modal.size = size;
    title.textContent = `Size: ${size}`;
    modal.show();
  };
  buttons.addEventListener("click", onClick);
  return () => buttons.removeEventListener("click", onClick);
}

```
