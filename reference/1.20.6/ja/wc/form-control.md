# FormControl フォームコントロール

ラベル・コントロール・ヘルプテキスト・エラーメッセージを結び付け、無効 / 必須 / 無効化 / 読み取り専用の状態をコントロールと共有するフィールドコンテナ。

Package: minerva-design@1.20.6

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

## FormControl

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/form-control",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string",
    "attribute": "label",
    "required": false
  },
  {
    "name": "helperText",
    "typeText": "string",
    "attribute": "helper-text",
    "required": false
  },
  {
    "name": "errorMessage",
    "typeText": "string",
    "attribute": "error-message",
    "required": false
  },
  {
    "name": "invalid",
    "typeText": "boolean",
    "attribute": "invalid",
    "required": false
  },
  {
    "name": "required",
    "typeText": "boolean",
    "attribute": "required",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "attribute": "readonly",
    "required": false
  },
  {
    "name": "requiredIndicator",
    "typeText": "string",
    "attribute": "required-indicator",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "The control (one element)"
  },
  {
    "name": "label",
    "description": "Rich label content (alternative to the `label` attribute)"
  },
  {
    "name": "helper-text",
    "description": "Rich helper text (alternative to `helper-text`)"
  },
  {
    "name": "error-message",
    "description": "Rich error message (alternative to `error-message`)"
  }
]
```

## FormErrorMessage

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## FormField

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## FormHelperText

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## FormLabel

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## API

```json
{
  "wc:minerva-form-control": {
    "kind": "element",
    "source": "web-components/src/components/form-control/form-control.ts",
    "className": "MinervaFormControl",
    "summary": "Label, help text and error message around one form control.",
    "description": "Field wrapper (`<FormControl>` + `<FormField>` of React): a label with a required indicator, ONE slotted control (a Minerva form control or a native `<input>` / `<select>` / `<textarea>`), a helper text, and an error message that replaces the helper text while `invalid`. Wiring (React shares it through context; ids cannot cross shadow roots, so the field writes it onto the slotted control instead): - name: `aria-label` = the label text (unless the control has its own `aria-label`); Minerva controls forward it to their inner element - description: `aria-description` = the helper text, or the error message while invalid (forwarded the same way) - `invalid` -> the control's `invalid` (or `error`) property when it has one, and `aria-invalid=\"true\"` - `required` / `disabled` / `readonly` -> the control's `required` / `disabled` / `readonly` (`readOnly` natively) properties when present, plus `aria-required` / `aria-readonly` Everything the field set is restored when the state is turned off or the control is removed. Clicking the label focuses the control (checkboxes and switches are toggled, like a native `<label>`).",
    "properties": [
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Label text (alternative to the `label` slot)"
      },
      {
        "name": "helperText",
        "attribute": "helper-text",
        "type": "string",
        "default": "\"\"",
        "description": "Help text below the control, hidden while invalid"
      },
      {
        "name": "errorMessage",
        "attribute": "error-message",
        "type": "string",
        "default": "\"\"",
        "description": "Error message, shown (and describing the control) while invalid"
      },
      {
        "name": "invalid",
        "attribute": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field (and its control) as invalid"
      },
      {
        "name": "required",
        "attribute": "required",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as required (indicator on the label, required control)"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the control"
      },
      {
        "name": "readOnly",
        "attribute": "readonly",
        "type": "boolean",
        "default": "false",
        "description": "Makes the control read-only"
      },
      {
        "name": "requiredIndicator",
        "attribute": "required-indicator",
        "type": "string",
        "default": "\"*\"",
        "description": "Indicator shown after the label when required (hidden from assistive technology)"
      },
      {
        "name": "controlElement",
        "type": "HTMLElement | null",
        "readonly": true,
        "description": "The slotted control"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "The control (one element)"
      },
      {
        "name": "label",
        "description": "Rich label content (alternative to the `label` attribute)"
      },
      {
        "name": "helper-text",
        "description": "Rich helper text (alternative to `helper-text`)"
      },
      {
        "name": "error-message",
        "description": "Rich error message (alternative to `error-message`)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The field container"
      },
      {
        "name": "label",
        "description": "The <label>"
      },
      {
        "name": "required-indicator",
        "description": "The required marker of the label"
      },
      {
        "name": "helper-text",
        "description": "The helper text (hidden while invalid)"
      },
      {
        "name": "error-message",
        "description": "The error message (role=\"alert\", while invalid)"
      }
    ],
    "cssProperties": [
      {
        "name": "--form-control-gap",
        "description": "Space between the label, the field and the helper / error text"
      },
      {
        "name": "--form-control-label-font-size",
        "description": "Font size of the label"
      },
      {
        "name": "--form-control-label-color",
        "description": "Color of the label"
      },
      {
        "name": "--form-control-helper-font-size",
        "description": "Font size of the helper and error texts"
      },
      {
        "name": "--form-control-required-color",
        "description": "Color of the required marker"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:FormControl": {
    "kind": "cssVars",
    "source": "react/src/components/FormControl",
    "vars": [
      {
        "name": "--form-control-gap",
        "description": "Space between the label, the field and the helper / error text"
      },
      {
        "name": "--form-control-label-font-size",
        "description": "Font size of the label"
      },
      {
        "name": "--form-control-label-color",
        "description": "Color of the label"
      },
      {
        "name": "--form-control-helper-font-size",
        "description": "Font size of the helper and error texts"
      },
      {
        "name": "--form-control-required-color",
        "description": "Color of the required marker"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

Minerva またはネイティブのコントロールを 1 つ囲みます。ラベルが名前を、補助テキストが説明を与え、required で必須マークを付けます。ラベルをクリックするとコントロールにフォーカスするか、スイッチが切り替わります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/form-control/wc/basic.html

```html
<div style="display: grid; gap: 16px; max-width: 360px">
  <minerva-form-control
    label="Display name"
    helper-text="Shown on your public profile."
  >
    <minerva-input placeholder="Ada"></minerva-input>
  </minerva-form-control>
  <minerva-form-control label="Country" required>
    <select>
      <option>France</option>
      <option>Japan</option>
      <option>United States</option>
    </select>
  </minerva-form-control>
  <minerva-form-control
    label="Weekly digest"
    helper-text="Clicking the label toggles the switch."
  >
    <minerva-switch></minerva-switch>
  </minerva-form-control>
</div>

```

## Example: フォーム内での利用

novalidate を指定し、送信ハンドラーで各コントロールの checkValidity() を確認して、ブラウザーの吹き出しの代わりにフィールド自身のエラーメッセージ（invalid）を表示します。編集すると消え、リセットですべてクリアされます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/form-control/wc/form.html

```html
<form
  id="fc-form"
  novalidate
  style="display: grid; gap: 16px; max-width: 360px"
>
  <minerva-form-control
    label="Email"
    required
    error-message="Enter a valid email address."
  >
    <minerva-input name="email" type="email"></minerva-input>
  </minerva-form-control>
  <minerva-form-control
    label="Seats"
    helper-text="Between 1 and 20."
    error-message="Choose between 1 and 20 seats."
  >
    <minerva-number-input
      name="seats"
      value="1"
      min="1"
      max="20"
      show-stepper
    ></minerva-number-input>
  </minerva-form-control>
  <minerva-form-control
    label="Terms"
    required
    error-message="Accept the terms to continue."
  >
    <minerva-checkbox
      name="terms"
      label="I accept the terms"
    ></minerva-checkbox>
  </minerva-form-control>
  <div style="display: flex; gap: 8px">
    <minerva-button type="submit">Create account</minerva-button>
    <minerva-button type="reset" variant="ghost" color="neutral"
      >Reset</minerva-button
    >
  </div>
  <output id="fc-form-result"></output>
</form>

```

### apps/docs/src/docs/pages/form-control/wc/form.ts

```tsx
// `novalidate` turns off the browser bubbles: on submit, each field shows
// its own error message (`invalid`) when its control fails validation, and
// clears it once the control is valid again. Reset clears everything.
type Control = HTMLElement & {
  checkValidity(): boolean;
  validity?: ValidityState;
};
type Field = HTMLElement & { invalid: boolean; controlElement: Control | null };

export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#fc-form")!;
  const result = root.querySelector<HTMLOutputElement>("#fc-form-result")!;
  const fields = Array.from(
    form.querySelectorAll<Field>("minerva-form-control"),
  );
  const control = (field: Field) => field.controlElement!;
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    for (const field of fields) field.invalid = !control(field).checkValidity();
    const firstInvalid = fields.find((field) => field.invalid);
    if (firstInvalid) {
      control(firstInvalid).focus();
      result.value = "";
      return;
    }
    const entries = [...new FormData(form)].map(
      ([key, value]) => `${key}=${value}`,
    );
    result.value = `FormData: ${entries.join(", ")}`;
  };
  const onEdit = (event: Event) => {
    const field = (event.target as HTMLElement).closest<Field>(
      "minerva-form-control",
    );
    if (field?.invalid && control(field).validity?.valid) field.invalid = false;
  };
  const onReset = () => {
    result.value = "";
    fields.forEach((field) => (field.invalid = false));
  };
  form.addEventListener("submit", onSubmit);
  form.addEventListener("change", onEdit);
  form.addEventListener("minerva-input", onEdit);
  form.addEventListener("reset", onReset);
  return () => {
    form.removeEventListener("submit", onSubmit);
    form.removeEventListener("change", onEdit);
    form.removeEventListener("minerva-input", onEdit);
    form.removeEventListener("reset", onReset);
  };
}

```

## Example: リッチコンテンツのスロット

label・helper-text・error-message スロットには、テキスト属性の代わりにマークアップを入れられます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/form-control/wc/slots.html

```html
<div style="display: grid; gap: 16px; max-width: 360px">
  <minerva-form-control>
    <span slot="label">Website <small>(optional)</small></span>
    <minerva-input type="url" placeholder="https://"></minerva-input>
    <span slot="helper-text">Starts with <code>https://</code>.</span>
  </minerva-form-control>
  <minerva-form-control invalid>
    <span slot="label">Coupon</span>
    <minerva-input value="SPRING"></minerva-input>
    <span slot="error-message"
      >This coupon expired on <strong>May 31</strong>.</span
    >
  </minerva-form-control>
</div>

```

## Example: 状態

invalid は補助テキストをエラーメッセージに置き換えてコントロールに印を付けます。readonly・disabled・required はコントロールに引き継がれ、required-indicator でマークを変更できます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/form-control/wc/states.html

```html
<div style="display: grid; gap: 16px; max-width: 360px">
  <minerva-form-control
    id="fc-username"
    label="Username"
    helper-text="Letters and digits only."
    error-message="This username is already taken."
  >
    <minerva-input value="ada"></minerva-input>
  </minerva-form-control>
  <minerva-button
    id="fc-toggle"
    variant="outline"
    color="neutral"
    style="justify-self: start"
    >Toggle invalid</minerva-button
  >
  <minerva-form-control
    label="API key"
    readonly
    helper-text="Read-only: focusable and submitted."
  >
    <minerva-input value="sk-live-1234"></minerva-input>
  </minerva-form-control>
  <minerva-form-control label="Team" disabled>
    <minerva-number-input value="3"></minerva-number-input>
  </minerva-form-control>
  <minerva-form-control label="Notes" required required-indicator="(required)">
    <textarea rows="2"></textarea>
  </minerva-form-control>
</div>

```

### apps/docs/src/docs/pages/form-control/wc/states.ts

```tsx
// While `invalid`, the error message replaces the helper text and the
// control gets `invalid` + aria-invalid; turning it off restores both.
export function setup(root: HTMLElement) {
  const field = root.querySelector<HTMLElement & { invalid: boolean }>(
    "#fc-username",
  )!;
  const toggle = root.querySelector<HTMLElement>("#fc-toggle")!;
  const onClick = () => (field.invalid = !field.invalid);
  toggle.addEventListener("click", onClick);
  return () => toggle.removeEventListener("click", onClick);
}

```
