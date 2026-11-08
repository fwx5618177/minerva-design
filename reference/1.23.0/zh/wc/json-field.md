# JsonField JSON 字段

严格 JSON 文本域，带格式化按钮和无障碍语法反馈；格式化会保留数字、转义和键顺序。

Package: minerva-design@1.23.0

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## JsonField

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/json-field",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "defaultValue",
    "typeText": "string",
    "attribute": "value",
    "required": false
  },
  {
    "name": "rows",
    "typeText": "number",
    "attribute": "rows",
    "required": false
  },
  {
    "name": "hideToolbar",
    "typeText": "boolean",
    "attribute": "hide-toolbar",
    "required": false
  },
  {
    "name": "indent",
    "typeText": "number",
    "attribute": "indent",
    "required": false
  },
  {
    "name": "invalid",
    "typeText": "boolean",
    "attribute": "invalid",
    "required": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "attribute": "readonly",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string",
    "attribute": "placeholder",
    "required": false
  },
  {
    "name": "formatLabel",
    "typeText": "string | undefined",
    "attribute": "format-label",
    "required": false
  },
  {
    "name": "validLabel",
    "typeText": "string | undefined",
    "attribute": "valid-label",
    "required": false
  },
  {
    "name": "invalidLabel",
    "typeText": "string | undefined",
    "attribute": "invalid-label",
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
    "typeText": "string",
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
    "description": "The text was committed (blur) or formatted"
  },
  {
    "name": "input",
    "typeText": "Event",
    "description": "The text changed (native, composed)"
  },
  {
    "name": "minerva-input",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:200af4490601c0b05a59"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The text changed (typing or formatting); `detail: { value }`"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:9339bbecc3e7ff346485"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The text was committed (blur) or formatted; `detail: { value }`"
  }
]
```

## API

```json
{
  "wc:minerva-json-field": {
    "kind": "element",
    "source": "web-components/src/components/json-field/json-field.ts",
    "className": "MinervaJsonField",
    "summary": "JSON textarea with formatting and syntax feedback.",
    "description": "Strict-JSON textarea with a format button and accessible syntax feedback (`<JsonField>` of React): the status line is withheld while the field is focused and re-checked on blur. Formatting re-indents with `jsonc-parser` text edits (no JSON.parse round trip). Form-associated: submits the text under `name`. Validity: `required` + empty -> `valueMissing`; text that is not valid JSON -> `badInput` with the localized \"Invalid JSON: <parser error>\" message (also while focused, so the form cannot be submitted with broken JSON). Supports `form.reset()` (restores the `value` attribute), `<fieldset disabled>` and state restoration. Name it with `<label for>`, `aria-label` or `aria-labelledby`.",
    "properties": [
      {
        "name": "defaultValue",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Initial text, restored by `form.reset()` (the `value` attribute)"
      },
      {
        "name": "rows",
        "attribute": "rows",
        "type": "number",
        "default": "8",
        "description": "Rows of the textarea"
      },
      {
        "name": "hideToolbar",
        "attribute": "hide-toolbar",
        "type": "boolean",
        "default": "false",
        "description": "Hides the format button (the syntax feedback stays)"
      },
      {
        "name": "indent",
        "attribute": "indent",
        "type": "number",
        "default": "2",
        "description": "Spaces per indentation level when formatting (0 to 10; 0 compacts)"
      },
      {
        "name": "invalid",
        "attribute": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Error state (also set by a syntax error after blur)"
      },
      {
        "name": "readOnly",
        "attribute": "readonly",
        "type": "boolean",
        "default": "false",
        "description": "Read-only: focusable and submitted, not editable nor formattable"
      },
      {
        "name": "placeholder",
        "attribute": "placeholder",
        "type": "string",
        "default": "\"\"",
        "description": "Placeholder text"
      },
      {
        "name": "formatLabel",
        "attribute": "format-label",
        "type": "string | undefined",
        "description": "Accessible label of the format button (default: localized \"Format JSON\")"
      },
      {
        "name": "validLabel",
        "attribute": "valid-label",
        "type": "string | undefined",
        "description": "Status text for valid JSON (default: localized \"Valid JSON\")"
      },
      {
        "name": "invalidLabel",
        "attribute": "invalid-label",
        "type": "string | undefined",
        "description": "Status prefix for invalid JSON, before the parser error (default: localized \"Invalid JSON\")"
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
        "type": "string",
        "default": "\"\"",
        "description": "JSON text (property; the `value` attribute sets `defaultValue`)"
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
        "signature": "(options?: FocusOptions) => void"
      },
      {
        "name": "blur",
        "signature": "() => void"
      },
      {
        "name": "formatValue",
        "signature": "() => void",
        "description": "Formats the text (no-op unless it is valid JSON); does not emit"
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
        "description": "The text was committed (blur) or formatted"
      },
      {
        "name": "input",
        "description": "The text changed (native, composed)"
      },
      {
        "name": "minerva-input",
        "description": "The text changed (typing or formatting); `detail: { value }`"
      },
      {
        "name": "minerva-change",
        "description": "The text was committed (blur) or formatted; `detail: { value }`"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The wrapper"
      },
      {
        "name": "toolbar",
        "description": "The toolbar above the text (format button)"
      },
      {
        "name": "format-button",
        "description": "The format button (web components only: React renders an IconButton, styled with its own hooks)"
      },
      {
        "name": "input",
        "description": "The native <textarea> (web components only: React renders a Textarea, styled with its own hooks)"
      },
      {
        "name": "status",
        "description": "The validation status line (role=status)"
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
        "name": "--textarea-min-height",
        "description": "Minimum height (every size)"
      },
      {
        "name": "--textarea-padding-y",
        "description": "Vertical padding of the text"
      },
      {
        "name": "--textarea-padding-x",
        "description": "Horizontal padding of the text (defaults to the density's small control padding)"
      },
      {
        "name": "--textarea-radius",
        "description": "Corner radius (defaults to --radius-md)"
      },
      {
        "name": "--textarea-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--textarea-background",
        "description": "Background color of the outline variant"
      },
      {
        "name": "--textarea-border-color",
        "description": "Border color at rest"
      },
      {
        "name": "--json-field-gap",
        "description": "Space between the toolbar, the editor and the status line"
      },
      {
        "name": "--json-field-font-family",
        "description": "Font family of the editor (defaults to the monospace stack)"
      },
      {
        "name": "--json-field-font-size",
        "description": "Font size of the editor"
      },
      {
        "name": "--json-field-tab-size",
        "description": "Rendered width of a tab character in the editor"
      },
      {
        "name": "--json-field-status-font-size",
        "description": "Font size of the validation status line"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:JsonField": {
    "kind": "cssVars",
    "source": "react/src/components/JsonField",
    "vars": [
      {
        "name": "--json-field-gap",
        "description": "Space between the toolbar, the editor and the status line"
      },
      {
        "name": "--json-field-font-family",
        "description": "Font family of the editor (defaults to the monospace stack)"
      },
      {
        "name": "--json-field-font-size",
        "description": "Font size of the editor"
      },
      {
        "name": "--json-field-tab-size",
        "description": "Rendered width of a tab character in the editor"
      },
      {
        "name": "--json-field-status-font-size",
        "description": "Font size of the validation status line"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

通过 value 属性设置初始 JSON。状态行在失焦时出现；minerva-change 在失焦与格式化后触发，validity 反映语法是否正确。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/json-field/wc/basic.html

```html
<div style="display: grid; gap: 8px; max-width: 480px">
  <label for="jf-config">Configuration</label>
  <minerva-json-field
    id="jf-config"
    rows="6"
    value='{"name":"minerva","tags":["ui","web-components"],"private":false}'
  ></minerva-json-field>
  <output id="jf-config-state"></output>
</div>

```

### apps/docs/src/docs/pages/json-field/wc/basic.ts

```tsx
// The status line appears on blur; `minerva-change` fires on blur and after
// formatting. The element's validity (badInput) reflects the JSON syntax.
type JsonField = HTMLElement & {
  validity?: ValidityState;
  validationMessage: string;
};

export function setup(root: HTMLElement) {
  const field = root.querySelector<JsonField>("#jf-config")!;
  const output = root.querySelector<HTMLOutputElement>("#jf-config-state")!;
  const onChange = () => {
    output.value = field.validity?.valid
      ? "Committed valid JSON"
      : field.validationMessage;
  };
  field.addEventListener("minerva-change", onChange);
  return () => field.removeEventListener("minerva-change", onChange);
}

```

## Example: 在表单中

无效 JSON 为 badInput（聚焦时也是），因此在文本可被解析前表单无法提交；修正内容后即可发送。reset 恢复 value 属性。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/json-field/wc/form.html

```html
<form id="jf-form" style="display: grid; gap: 8px; max-width: 480px">
  <label for="jf-form-payload">Webhook payload</label>
  <minerva-json-field
    id="jf-form-payload"
    name="payload"
    rows="5"
    required
    value='{"event":"deploy",'
  ></minerva-json-field>
  <div style="display: flex; gap: 8px">
    <minerva-button type="submit">Send</minerva-button>
    <minerva-button type="reset" variant="ghost" color="neutral"
      >Reset</minerva-button
    >
  </div>
  <output id="jf-form-result"></output>
</form>

```

### apps/docs/src/docs/pages/json-field/wc/form.ts

```tsx
// Broken JSON is `badInput` (also while focused), so the form cannot be
// submitted until the text parses; the text itself is submitted. Reset
// restores the `value` attribute.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#jf-form")!;
  const result = root.querySelector<HTMLOutputElement>("#jf-form-result")!;
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

## Example: 缩进、工具栏与文案

indent="4" 并由外部按钮调用 formatValue()，无工具栏的只读字段，以及自定义格式化 / 状态文案。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/json-field/wc/options.html

```html
<div style="display: grid; gap: 12px; max-width: 480px">
  <minerva-json-field
    id="jf-indent"
    rows="5"
    indent="4"
    aria-label="Indented with 4 spaces"
    value='{"retries":3,"backoff":{"initial":100,"max":2000}}'
  ></minerva-json-field>
  <minerva-button
    id="jf-format"
    variant="outline"
    color="neutral"
    style="justify-self: start"
    >Format with formatValue()</minerva-button
  >
  <minerva-json-field
    rows="3"
    readonly
    hide-toolbar
    aria-label="Read-only, without toolbar"
    value='{ "locked": true }'
  ></minerva-json-field>
  <minerva-json-field
    rows="3"
    aria-label="Custom labels"
    format-label="Prettify"
    valid-label="Looks good"
    invalid-label="Broken JSON"
    placeholder='{ "key": "value" }'
  ></minerva-json-field>
</div>

```

### apps/docs/src/docs/pages/json-field/wc/options.ts

```tsx
// formatValue() re-indents valid JSON with `indent` spaces (no event).
export function setup(root: HTMLElement) {
  const field = root.querySelector<HTMLElement & { formatValue(): void }>(
    "#jf-indent",
  )!;
  const button = root.querySelector<HTMLElement>("#jf-format")!;
  const onClick = () => field.formatValue();
  button.addEventListener("click", onClick);
  return () => button.removeEventListener("click", onClick);
}

```
