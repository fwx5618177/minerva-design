# KeyValueEditor

Edits an ordered list of string pairs with multi-line keys and values, add and remove actions; rows are tracked by a stable id.

Package: minerva-design@1.19.3

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## KeyValueEditor

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/key-value-editor",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "defaultValue",
    "typeText": "KeyValueEntry[]",
    "attribute": "value",
    "required": false
  },
  {
    "name": "keyLabel",
    "typeText": "string | undefined",
    "attribute": "key-label",
    "required": false
  },
  {
    "name": "valueLabel",
    "typeText": "string | undefined",
    "attribute": "value-label",
    "required": false
  },
  {
    "name": "addLabel",
    "typeText": "string | undefined",
    "attribute": "add-label",
    "required": false
  },
  {
    "name": "removeLabel",
    "typeText": "string | undefined",
    "attribute": "remove-label",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string",
    "attribute": "name",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "required",
    "typeText": "boolean",
    "attribute": "required",
    "required": false
  },
  {
    "name": "value",
    "typeText": "KeyValueEntry[]",
    "required": false
  },
  {
    "name": "errors",
    "typeText": "Record<string, KeyValueEntryErrors> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "Event",
    "description": "A row was committed (field blur), added or removed"
  },
  {
    "name": "minerva-input",
    "typeText": "CustomEvent<{ value: KeyValueEntry[]; }>",
    "detailType": {
      "typeText": "{ value: KeyValueEntry[]; }",
      "typeRef": "type:03e460df89fb14eeca60"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "A key or value is being typed; `detail: { value }` (the entries)"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: KeyValueEntry[]; }>",
    "detailType": {
      "typeText": "{ value: KeyValueEntry[]; }",
      "typeRef": "type:edd45eafa17f2e044fa3"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "A row was committed (field blur), added or removed; `detail: { value }`"
  }
]
```

## API

```json
{
  "wc:minerva-key-value-editor": {
    "kind": "element",
    "source": "web-components/src/components/key-value-editor/key-value-editor.ts",
    "className": "MinervaKeyValueEditor",
    "summary": "Editable list of key / value pairs.",
    "description": "Ordered list of editable string pairs (`<KeyValueEditor>` of React): multi-line keys and values with add / remove actions. Rows are tracked by their stable `id`, so duplicate keys and reordering are safe. Focus follows the actions: adding a row focuses its key field; removing one focuses the next row's remove button (else the previous one, else the add button). `value` is a JS array of `{ id, key, value }` entries (property). The `value` attribute sets the initial rows (restored by `form.reset()`) as JSON: an array of `{ key, value }` objects or a `{ \"key\": \"value\" }` object. Form-associated: submits the rows under `name` as a JSON string — an array of `{ \"key\", \"value\" }` objects in row order (ids are not submitted), e.g. `[{\"key\":\"a\",\"value\":\"1\"}]`. `required` makes an editor without rows invalid (`valueMissing`). Validation of the texts belongs to the consumer (`errors`, `setCustomValidity()`).",
    "properties": [
      {
        "name": "defaultValue",
        "attribute": "value",
        "type": "KeyValueEntry[]",
        "default": "[]",
        "description": "Initial rows, restored by `form.reset()` (the `value` attribute, JSON)"
      },
      {
        "name": "keyLabel",
        "attribute": "key-label",
        "type": "string | undefined",
        "description": "Label of the key fields (followed by the row number for screen readers)"
      },
      {
        "name": "valueLabel",
        "attribute": "value-label",
        "type": "string | undefined",
        "description": "Label of the value fields"
      },
      {
        "name": "addLabel",
        "attribute": "add-label",
        "type": "string | undefined",
        "description": "Text of the add button"
      },
      {
        "name": "removeLabel",
        "attribute": "remove-label",
        "type": "string | undefined",
        "description": "Accessible label of the remove buttons (followed by the row number)"
      },
      {
        "name": "name",
        "attribute": "name",
        "type": "string",
        "default": "\"\"",
        "description": "Name submitted with the form data"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the control (not focusable, not submitted, not validated)"
      },
      {
        "name": "required",
        "attribute": "required",
        "type": "boolean",
        "default": "false",
        "description": "The control must have a value for the form to be submitted"
      },
      {
        "name": "value",
        "type": "KeyValueEntry[]",
        "default": "[]",
        "description": "Rows (property; the `value` attribute sets `defaultValue`)"
      },
      {
        "name": "errors",
        "type": "Record<string, KeyValueEntryErrors> | undefined",
        "description": "Field errors by entry id"
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "readonly": true,
        "description": "Whether the control is disabled (itself or by a disabled fieldset)."
      },
      {
        "name": "form",
        "type": "HTMLFormElement | null",
        "readonly": true,
        "description": "The form owning the element"
      },
      {
        "name": "labels",
        "type": "NodeList | null",
        "readonly": true,
        "description": "`<label>` elements associated with the element"
      },
      {
        "name": "validity",
        "type": "ValidityState | undefined",
        "readonly": true,
        "description": "Validity state (same as `<input>.validity`)"
      },
      {
        "name": "validationMessage",
        "type": "string",
        "readonly": true,
        "description": "Message describing the current validation error (empty when valid)"
      },
      {
        "name": "willValidate",
        "type": "boolean",
        "readonly": true,
        "description": "Whether the element is a candidate for constraint validation"
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "(options?: FocusOptions) => void",
        "description": "Focuses the first key field (else the add button)"
      },
      {
        "name": "checkValidity",
        "signature": "() => boolean",
        "description": "Checks validity; fires `invalid` when invalid."
      },
      {
        "name": "reportValidity",
        "signature": "() => boolean",
        "description": "Checks validity and shows the browser's validation message."
      },
      {
        "name": "setCustomValidity",
        "signature": "(message: string) => void",
        "description": "Sets (or clears, with `\"\"`) a custom validation error."
      },
      {
        "name": "formResetCallback",
        "signature": "() => void"
      },
      {
        "name": "formDisabledCallback",
        "signature": "(disabled: boolean) => void"
      },
      {
        "name": "formStateRestoreCallback",
        "signature": "(state: string | File | FormData | null) => void"
      }
    ],
    "events": [
      {
        "name": "change",
        "description": "A row was committed (field blur), added or removed"
      },
      {
        "name": "minerva-input",
        "description": "A key or value is being typed; `detail: { value }` (the entries)"
      },
      {
        "name": "minerva-change",
        "description": "A row was committed (field blur), added or removed; `detail: { value }`"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The container"
      },
      {
        "name": "row",
        "description": "Each row (key field, value field and remove button)"
      },
      {
        "name": "row--invalid",
        "description": "Item state of `row`: invalid"
      },
      {
        "name": "remove-button",
        "description": "The remove button of a row (web components only: React renders an IconButton, styled with its own hooks)"
      },
      {
        "name": "add-button",
        "description": "The add button (web components only: React renders a Button, styled with its own hooks)"
      }
    ],
    "cssProperties": [
      {
        "name": "--icon-button-color",
        "description": "Icon color"
      },
      {
        "name": "--icon-button-hover-bg",
        "description": "Background on hover"
      },
      {
        "name": "--icon-button-pressed-color",
        "description": "Icon color of a pressed toggle"
      },
      {
        "name": "--icon-button-pressed-bg",
        "description": "Background of a pressed toggle"
      },
      {
        "name": "--icon-button-size",
        "description": "Width and height of the button (every size; defaults follow the density's control heights)"
      },
      {
        "name": "--icon-button-icon-size",
        "description": "Font size of the icon (every size)"
      },
      {
        "name": "--icon-button-radius",
        "description": "Corner radius of the square shape (defaults to --radius-lg)"
      },
      {
        "name": "--key-value-editor-gap",
        "description": "Space between the rows and the add button"
      },
      {
        "name": "--key-value-editor-column-gap",
        "description": "Space between the key, the value and the remove button of a row"
      },
      {
        "name": "--key-value-editor-control-height",
        "description": "Size of the remove button and minimum height of the key field and of the add button (defaults to the density's small control height)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:KeyValueEditor": {
    "kind": "cssVars",
    "source": "react/src/components/KeyValueEditor",
    "vars": [
      {
        "name": "--key-value-editor-gap",
        "description": "Space between the rows and the add button"
      },
      {
        "name": "--key-value-editor-column-gap",
        "description": "Space between the key, the value and the remove button of a row"
      },
      {
        "name": "--key-value-editor-control-height",
        "description": "Size of the remove button and minimum height of the key field and of the add button (defaults to the density's small control height)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

Initial rows from a JSON object in the value attribute, custom column labels; the value property (rows with stable ids) is shown after each minerva-change.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/key-value-editor/wc/basic.html

```html
<div style="display: grid; gap: 8px; max-width: 560px">
  <span id="kv-env-label">Environment variables</span>
  <minerva-key-value-editor
    id="kv-env"
    aria-labelledby="kv-env-label"
    key-label="Variable"
    value-label="Value"
    value='{"NODE_ENV":"production","PORT":"8080"}'
  ></minerva-key-value-editor>
  <pre id="kv-env-json" style="margin: 0; font-size: 12px"></pre>
</div>

```

### apps/docs/src/docs/pages/key-value-editor/wc/basic.ts

```tsx
// `value` is an array of { id, key, value } rows; `minerva-change` fires when
// a field is committed (blur) or a row is added / removed.
type Entry = { id: string; key: string; value: string };
type Editor = HTMLElement & {
  value: Entry[];
  updateComplete: Promise<boolean>;
};

export function setup(root: HTMLElement) {
  const editor = root.querySelector<Editor>("#kv-env")!;
  const output = root.querySelector<HTMLPreElement>("#kv-env-json")!;
  const show = () => {
    const pairs = editor.value.map(({ key, value }) => [key, value]);
    output.textContent = JSON.stringify(Object.fromEntries(pairs), null, 2);
  };
  editor.addEventListener("minerva-change", show);
  void editor.updateComplete.then(show);
  return () => editor.removeEventListener("minerva-change", show);
}

```

## Example: Validation and errors

Validation belongs to the page: errors (by row id) shows messages under empty or duplicate keys, and setCustomValidity() makes the element invalid in forms.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/key-value-editor/wc/errors.html

```html
<div style="display: grid; gap: 8px; max-width: 560px">
  <minerva-key-value-editor
    id="kv-headers"
    aria-label="HTTP headers"
    key-label="Header"
    value-label="Value"
    add-label="Add header"
    remove-label="Remove header"
    value='[{"key":"Accept","value":"application/json"},{"key":"accept","value":"text/html"},{"key":"","value":"orphan"}]'
  ></minerva-key-value-editor>
  <output id="kv-headers-status"></output>
</div>

```

### apps/docs/src/docs/pages/key-value-editor/wc/errors.ts

```tsx
// Validation belongs to the consumer: `errors` (by row id) shows messages
// under the fields, setCustomValidity() makes the element invalid in forms.
type Entry = { id: string; key: string; value: string };
type Editor = HTMLElement & {
  value: Entry[];
  errors?: Record<string, { key?: string; value?: string }>;
  setCustomValidity(message: string): void;
  updateComplete: Promise<boolean>;
};

export function setup(root: HTMLElement) {
  const editor = root.querySelector<Editor>("#kv-headers")!;
  const status = root.querySelector<HTMLOutputElement>("#kv-headers-status")!;
  const validate = () => {
    const errors: Record<string, { key?: string; value?: string }> = {};
    const seen = new Set<string>();
    for (const { id, key } of editor.value) {
      const name = key.trim().toLowerCase();
      if (!name) errors[id] = { key: "A header name is required." };
      else if (seen.has(name))
        errors[id] = { key: "Duplicate header (names are case-insensitive)." };
      seen.add(name);
    }
    const count = Object.keys(errors).length;
    editor.errors = errors;
    editor.setCustomValidity(count ? "Fix the highlighted headers." : "");
    status.value = count ? `${count} row(s) to fix` : "All headers are valid";
  };
  editor.addEventListener("minerva-input", validate);
  editor.addEventListener("minerva-change", validate);
  void editor.updateComplete.then(validate);
  return () => {
    editor.removeEventListener("minerva-input", validate);
    editor.removeEventListener("minerva-change", validate);
  };
}

```

## Example: In a form

The rows are submitted under name as one JSON string; required blocks an editor without rows (remove the row to try it), and reset restores the rows of the value attribute.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/key-value-editor/wc/form.html

```html
<form id="kv-form" style="display: grid; gap: 8px; max-width: 560px">
  <span id="kv-form-label">Labels (at least one)</span>
  <minerva-key-value-editor
    name="labels"
    required
    aria-labelledby="kv-form-label"
    value='[{"key":"team","value":"platform"}]'
  ></minerva-key-value-editor>
  <div style="display: flex; gap: 8px">
    <minerva-button type="submit">Save</minerva-button>
    <minerva-button type="reset" variant="ghost" color="neutral"
      >Reset</minerva-button
    >
  </div>
  <output id="kv-form-result" style="font-family: monospace"></output>
</form>

```

### apps/docs/src/docs/pages/key-value-editor/wc/form.ts

```tsx
// The rows are submitted under `name` as one JSON string ([{ key, value }],
// ids omitted); `required` blocks an empty editor (remove the row to see
// it). Reset restores the rows of the `value` attribute.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#kv-form")!;
  const result = root.querySelector<HTMLOutputElement>("#kv-form-result")!;
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const entries = [...new FormData(form)].map(
      ([key, value]) => `${key}=${value}`,
    );
    result.value = `FormData: ${entries.join(", ") || "(empty)"}`;
  };
  const onReset = () => (result.value = "");
  form.addEventListener("submit", onSubmit);
  form.addEventListener("reset", onReset);
  return () => {
    form.removeEventListener("submit", onSubmit);
    form.removeEventListener("reset", onReset);
  };
}

```
