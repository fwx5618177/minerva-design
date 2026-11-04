# NumberInput 数値入力

矢印キーでのステップ、任意のステッパー、min / max の制限、固定精度を備えた数値フィールド（spinbutton）。値はフォーカス喪失または Enter で確定します。

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

## NumberInput

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/number-input",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "defaultValue",
    "typeText": "number | null",
    "attribute": "value",
    "required": false
  },
  {
    "name": "min",
    "typeText": "number | undefined",
    "attribute": "min",
    "required": false
  },
  {
    "name": "max",
    "typeText": "number | undefined",
    "attribute": "max",
    "required": false
  },
  {
    "name": "step",
    "typeText": "number",
    "attribute": "step",
    "required": false
  },
  {
    "name": "precision",
    "typeText": "number | undefined",
    "attribute": "precision",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "attribute": "size",
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
    "name": "showStepper",
    "typeText": "boolean",
    "attribute": "show-stepper",
    "required": false
  },
  {
    "name": "noEmpty",
    "typeText": "boolean",
    "attribute": "no-empty",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string",
    "attribute": "placeholder",
    "required": false
  },
  {
    "name": "incrementLabel",
    "typeText": "string | undefined",
    "attribute": "increment-label",
    "required": false
  },
  {
    "name": "decrementLabel",
    "typeText": "string | undefined",
    "attribute": "decrement-label",
    "required": false
  },
  {
    "name": "notANumberMessage",
    "typeText": "string | undefined",
    "attribute": "not-a-number-message",
    "required": false
  },
  {
    "name": "belowMinMessage",
    "typeText": "string | undefined",
    "attribute": "below-min-message",
    "required": false
  },
  {
    "name": "aboveMaxMessage",
    "typeText": "string | undefined",
    "attribute": "above-max-message",
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
    "typeText": "number | null",
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
    "description": "A value was committed (blur / Enter / stepping)"
  },
  {
    "name": "input",
    "typeText": "Event",
    "description": "The draft text changed (native, composed)"
  },
  {
    "name": "minerva-input",
    "typeText": "CustomEvent<{ value: number | null; }>",
    "detailType": {
      "typeText": "{ value: number | null; }",
      "typeRef": "type:a1283d3742a92591d70a"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The draft text changed; `detail: { value }` (the parsed draft, `null` when not a number)"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: number | null; }>",
    "detailType": {
      "typeText": "{ value: number | null; }",
      "typeRef": "type:62818457da2128eb34fd"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "A new value was committed; `detail: { value }` (`null` when cleared)"
  }
]
```

## API

```json
{
  "wc:minerva-number-input": {
    "kind": "element",
    "source": "web-components/src/components/number-input/number-input.ts",
    "className": "MinervaNumberInput",
    "summary": "Numeric field with keyboard stepping, stepper, min / max and precision.",
    "description": "Numeric text field (`<NumberInput>` of React, `role=\"spinbutton\"`) with keyboard stepping, an optional stepper, min / max clamping and fixed precision. The draft may hold intermediate text (\"-\", \"1.\") while typing; it is committed on blur / Enter. Keyboard: ArrowUp / ArrowDown step, PageUp / PageDown step by 10 steps, Home / End jump to min / max (only when bounded). Mouse wheel never changes the value. Form-associated: submits the committed value (formatted with the precision; `\"\"` when empty) under `name`. Validity: `required` + empty -> `valueMissing`; a non-numeric draft -> `badInput`; a draft (or value) below `min` / above `max` -> `rangeUnderflow` / `rangeOverflow` (localized messages). Supports `form.reset()` (restores the `value` attribute), `<fieldset disabled>` and state restoration. Name it with `<label for>`, `aria-label` or `aria-labelledby`.",
    "properties": [
      {
        "name": "defaultValue",
        "attribute": "value",
        "type": "number | null",
        "default": "null",
        "description": "Initial value, restored by `form.reset()` (the `value` attribute)"
      },
      {
        "name": "min",
        "attribute": "min",
        "type": "number | undefined",
        "description": "Smallest allowed value; committed values are clamped to it"
      },
      {
        "name": "max",
        "attribute": "max",
        "type": "number | undefined",
        "description": "Largest allowed value; committed values are clamped to it"
      },
      {
        "name": "step",
        "attribute": "step",
        "type": "number",
        "default": "1",
        "description": "Amount added / removed by ArrowUp / ArrowDown and the stepper"
      },
      {
        "name": "precision",
        "attribute": "precision",
        "type": "number | undefined",
        "description": "Decimal places of the value; inferred from step when unset (0.01 -> 2)"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Field size"
      },
      {
        "name": "invalid",
        "attribute": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Error state (also set by an out-of-range or non-numeric draft)"
      },
      {
        "name": "readOnly",
        "attribute": "readonly",
        "type": "boolean",
        "default": "false",
        "description": "Focusable and submitted, but typing and stepping do not change the value"
      },
      {
        "name": "showStepper",
        "attribute": "show-stepper",
        "type": "boolean",
        "default": "false",
        "description": "Shows increment / decrement buttons (the arrow keys always work)"
      },
      {
        "name": "noEmpty",
        "attribute": "no-empty",
        "type": "boolean",
        "default": "false",
        "description": "Clearing the field falls back to min (or 0) instead of committing `null`"
      },
      {
        "name": "placeholder",
        "attribute": "placeholder",
        "type": "string",
        "default": "\"\"",
        "description": "Placeholder text"
      },
      {
        "name": "incrementLabel",
        "attribute": "increment-label",
        "type": "string | undefined",
        "description": "Accessible label of the increment button (default: localized \"Increase\")"
      },
      {
        "name": "decrementLabel",
        "attribute": "decrement-label",
        "type": "string | undefined",
        "description": "Accessible label of the decrement button (default: localized \"Decrease\")"
      },
      {
        "name": "notANumberMessage",
        "attribute": "not-a-number-message",
        "type": "string | undefined",
        "description": "Hint shown while the draft is not a number (default: localized)"
      },
      {
        "name": "belowMinMessage",
        "attribute": "below-min-message",
        "type": "string | undefined",
        "description": "Hint shown while the draft is below min (default: localized \"Minimum {min}\")"
      },
      {
        "name": "aboveMaxMessage",
        "attribute": "above-max-message",
        "type": "string | undefined",
        "description": "Hint shown while the draft is above max (default: localized \"Maximum {max}\")"
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
        "type": "number | null",
        "default": "null",
        "description": "Committed value; `null` is an empty field (property; the `value` attribute sets `defaultValue`)"
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
        "name": "stepUp",
        "signature": "() => void",
        "description": "Adds `step` (clamped); does not emit"
      },
      {
        "name": "stepDown",
        "signature": "() => void",
        "description": "Removes `step` (clamped); does not emit"
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
        "description": "A value was committed (blur / Enter / stepping)"
      },
      {
        "name": "input",
        "description": "The draft text changed (native, composed)"
      },
      {
        "name": "minerva-input",
        "description": "The draft text changed; `detail: { value }` (the parsed draft, `null` when not a number)"
      },
      {
        "name": "minerva-change",
        "description": "A new value was committed; `detail: { value }` (`null` when cleared)"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The field box (wraps the input and the stepper)"
      },
      {
        "name": "input",
        "description": "The native `<input>` (role=\"spinbutton\")"
      },
      {
        "name": "stepper",
        "description": "The increment / decrement column"
      },
      {
        "name": "increment",
        "description": "The increment button"
      },
      {
        "name": "decrement",
        "description": "The decrement button"
      }
    ],
    "cssProperties": [
      {
        "name": "--number-input-height",
        "description": "Height (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--number-input-padding-x",
        "description": "Horizontal padding of the text (defaults to the density's small control padding)"
      },
      {
        "name": "--number-input-radius",
        "description": "Corner radius (defaults to --radius-md)"
      },
      {
        "name": "--number-input-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--number-input-background",
        "description": "Background color"
      },
      {
        "name": "--number-input-border-color",
        "description": "Border color at rest"
      },
      {
        "name": "--number-input-stepper-width",
        "description": "Width of the increment / decrement column"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:NumberInput": {
    "kind": "cssVars",
    "source": "react/src/components/NumberInput",
    "vars": [
      {
        "name": "--number-input-height",
        "description": "Height (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--number-input-padding-x",
        "description": "Horizontal padding of the text (defaults to the density's small control padding)"
      },
      {
        "name": "--number-input-radius",
        "description": "Corner radius (defaults to --radius-md)"
      },
      {
        "name": "--number-input-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--number-input-background",
        "description": "Background color"
      },
      {
        "name": "--number-input-border-color",
        "description": "Border color at rest"
      },
      {
        "name": "--number-input-stepper-width",
        "description": "Width of the increment / decrement column"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

ステッパー付きの min / max。上下矢印キーでステップ、PageUp / PageDown で 10 ステップ、Home / End で上下限へ移動します。minerva-change が確定した値を通知します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/number-input/wc/basic.html

```html
<div style="display: grid; gap: 8px; max-width: 240px">
  <label for="ni-guests">Guests (1 to 12)</label>
  <minerva-number-input
    id="ni-guests"
    value="2"
    min="1"
    max="12"
    show-stepper
  ></minerva-number-input>
  <output id="ni-guests-value">Committed: 2</output>
</div>

```

### apps/docs/src/docs/pages/number-input/wc/basic.ts

```tsx
// ArrowUp / ArrowDown step, PageUp / PageDown step by 10, Home / End jump to
// min / max. `minerva-change` fires when a value is committed (blur, Enter,
// stepping), with detail.value (null when cleared).
export function setup(root: HTMLElement) {
  const input = root.querySelector<HTMLElement>("#ni-guests")!;
  const output = root.querySelector<HTMLOutputElement>("#ni-guests-value")!;
  const onChange = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: number | null }>).detail;
    output.value = `Committed: ${value ?? "empty"}`;
  };
  input.addEventListener("minerva-change", onChange);
  return () => input.removeEventListener("minerva-change", onChange);
}

```

## Example: フォーム内での利用

required と範囲外の値は、ローカライズ済みまたは独自のメッセージ（below-min-message・above-max-message）で送信を止めます。リセットで value 属性の値に戻ります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/number-input/wc/form.html

```html
<form id="ni-form" style="display: grid; gap: 8px; max-width: 280px">
  <label for="ni-form-qty">Quantity (1 to 99)</label>
  <minerva-number-input
    id="ni-form-qty"
    name="quantity"
    required
    min="1"
    max="99"
    show-stepper
    below-min-message="Order at least one item."
    above-max-message="99 items at most per order."
  ></minerva-number-input>
  <label for="ni-form-discount">Discount (%)</label>
  <minerva-number-input
    id="ni-form-discount"
    name="discount"
    value="5"
    min="0"
    max="50"
    step="0.5"
  ></minerva-number-input>
  <div style="display: flex; gap: 8px">
    <minerva-button type="submit">Order</minerva-button>
    <minerva-button type="reset" variant="ghost" color="neutral"
      >Reset</minerva-button
    >
  </div>
  <output id="ni-form-result"></output>
</form>

```

### apps/docs/src/docs/pages/number-input/wc/form.ts

```tsx
// Out-of-range or non-numeric drafts make the field invalid (custom
// below-min / above-max messages here), so submitting reports them. The
// committed value is submitted with its precision; reset restores `value`.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#ni-form")!;
  const result = root.querySelector<HTMLOutputElement>("#ni-form-result")!;
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

## Example: ステップ・精度・メソッド

小数のステップ、小数点以下 2 桁固定、no-empty。外部のボタンが stepUp() / stepDown() を呼びます。読み取り専用・無効・サイズの例も含みます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/number-input/wc/precision.html

```html
<div style="display: grid; gap: 12px; max-width: 280px">
  <label for="ni-price">Price (step 0.25, two decimals, never empty)</label>
  <div style="display: flex; gap: 8px; align-items: center">
    <minerva-number-input
      id="ni-price"
      value="9.5"
      min="0"
      step="0.25"
      precision="2"
      no-empty
    ></minerva-number-input>
    <minerva-button
      id="ni-down"
      variant="outline"
      color="neutral"
      aria-label="Step down"
      >−</minerva-button
    >
    <minerva-button
      id="ni-up"
      variant="outline"
      color="neutral"
      aria-label="Step up"
      >+</minerva-button
    >
  </div>
  <minerva-number-input
    size="small"
    value="3"
    readonly
    aria-label="Read-only"
  ></minerva-number-input>
  <minerva-number-input
    size="large"
    value="42"
    disabled
    show-stepper
    aria-label="Disabled"
  ></minerva-number-input>
</div>

```

### apps/docs/src/docs/pages/number-input/wc/precision.ts

```tsx
// stepUp() / stepDown() change the value programmatically (clamped, no event).
type NumberInput = HTMLElement & { stepUp(): void; stepDown(): void };

export function setup(root: HTMLElement) {
  const price = root.querySelector<NumberInput>("#ni-price")!;
  const up = root.querySelector<HTMLElement>("#ni-up")!;
  const down = root.querySelector<HTMLElement>("#ni-down")!;
  const onUp = () => price.stepUp();
  const onDown = () => price.stepDown();
  up.addEventListener("click", onUp);
  down.addEventListener("click", onDown);
  return () => {
    up.removeEventListener("click", onUp);
    down.removeEventListener("click", onDown);
  };
}

```
