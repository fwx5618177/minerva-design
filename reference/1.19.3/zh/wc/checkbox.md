# Checkbox 复选框

允许用户选择一个或多个选项，支持半选、错误状态和自定义样式。

Package: minerva-design@1.19.3

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Checkbox

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/checkbox",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "defaultChecked",
    "typeText": "boolean",
    "attribute": "checked",
    "required": false
  },
  {
    "name": "indeterminate",
    "typeText": "boolean",
    "attribute": "indeterminate",
    "required": false
  },
  {
    "name": "value",
    "typeText": "string",
    "attribute": "value",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string",
    "attribute": "label",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"square\" | \"circle\" | \"rounded\"",
    "attribute": "shape",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "color",
    "typeText": "CheckboxColor",
    "attribute": "color",
    "required": false
  },
  {
    "name": "labelPlacement",
    "typeText": "\"start\" | \"end\" | \"top\" | \"bottom\"",
    "attribute": "label-placement",
    "required": false
  },
  {
    "name": "error",
    "typeText": "boolean",
    "attribute": "error",
    "required": false
  },
  {
    "name": "helperText",
    "typeText": "string",
    "attribute": "helper-text",
    "required": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "attribute": "readonly",
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
    "name": "checked",
    "typeText": "boolean",
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
    "description": "The checked state changed (re-dispatched from the inner input)"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ checked: boolean; value: string; }>",
    "detailType": {
      "typeText": "{ checked: boolean; value: string; }",
      "typeRef": "type:62b22a0eedf00e5f754b"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The user toggled the box; `detail: { checked, value }`"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Label content (alternative to the `label` attribute)"
  },
  {
    "name": "icon",
    "description": "Custom icon shown inside the box when checked"
  }
]
```

## API

```json
{
  "wc:minerva-checkbox": {
    "kind": "element",
    "source": "web-components/src/components/checkbox/checkbox.ts",
    "className": "MinervaCheckbox",
    "summary": "Checkbox with label, helper text and indeterminate state.",
    "description": "A checkbox with label, helper text and indeterminate state (`<Checkbox>` of React), rendering a native `<input type=\"checkbox\">` in its shadow root (Space toggles it; Enter does nothing, as natively). Form-associated: when checked, submits `value` (default `\"on\"`) under `name`; `required` makes it invalid until checked (`valueMissing`, with the localized \"check this box\" message); supports `form.reset()` (restores the `checked` attribute), `<fieldset disabled>` and state restoration. `indeterminate` stays applied until it is changed (as in React), also after the user toggles the box.",
    "properties": [
      {
        "name": "defaultChecked",
        "attribute": "checked",
        "type": "boolean",
        "default": "false",
        "description": "Initial checked state, restored by `form.reset()` (the `checked` attribute). Changing it also changes `checked` until the user toggles"
      },
      {
        "name": "indeterminate",
        "attribute": "indeterminate",
        "type": "boolean",
        "default": "false",
        "description": "Shows the indeterminate (partially checked) state (aria-checked=\"mixed\")"
      },
      {
        "name": "value",
        "attribute": "value",
        "type": "string",
        "default": "\"on\"",
        "description": "Value submitted with the form when checked"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Label text (alternative to the default slot)"
      },
      {
        "name": "shape",
        "attribute": "shape",
        "type": "\"square\" | \"circle\" | \"rounded\"",
        "default": "\"square\"",
        "description": "Box shape"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Checkbox size"
      },
      {
        "name": "color",
        "attribute": "color",
        "type": "CheckboxColor",
        "default": "\"primary\"",
        "description": "Semantic color of the checked / indeterminate box"
      },
      {
        "name": "labelPlacement",
        "attribute": "label-placement",
        "type": "\"start\" | \"end\" | \"top\" | \"bottom\"",
        "default": "\"end\"",
        "description": "Position of the label relative to the box"
      },
      {
        "name": "error",
        "attribute": "error",
        "type": "boolean",
        "default": "false",
        "description": "Shows the error state (sets aria-invalid)"
      },
      {
        "name": "helperText",
        "attribute": "helper-text",
        "type": "string",
        "default": "\"\"",
        "description": "Helper or error text shown below the checkbox (describes it)"
      },
      {
        "name": "readOnly",
        "attribute": "readonly",
        "type": "boolean",
        "default": "false",
        "description": "Read-only: focusable and submitted, but the user cannot toggle it"
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
        "name": "checked",
        "type": "boolean",
        "default": "false",
        "description": "Checked state (property; the `checked` attribute sets `defaultChecked`)"
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
        "name": "click",
        "signature": "() => void"
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
        "description": "The checked state changed (re-dispatched from the inner input)"
      },
      {
        "name": "minerva-change",
        "description": "The user toggled the box; `detail: { checked, value }`"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "Label content (alternative to the `label` attribute)"
      },
      {
        "name": "icon",
        "description": "Custom icon shown inside the box when checked"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The wrapper (the clickable row and the helper text)"
      },
      {
        "name": "input",
        "description": "The native `<input type=\"checkbox\">`"
      },
      {
        "name": "control",
        "description": "The visual box (draws the checkmark)"
      },
      {
        "name": "label",
        "description": "The label text"
      },
      {
        "name": "helper-text",
        "description": "The helper / error text"
      }
    ],
    "cssProperties": [
      {
        "name": "--checkbox-checked-color",
        "description": "Background / border of the checked or indeterminate box (defaults to the color prop's accent)"
      },
      {
        "name": "--checkbox-checkmark-color",
        "description": "Color of the checkmark / indeterminate dash"
      },
      {
        "name": "--checkbox-box-color",
        "description": "Background of the unchecked box"
      },
      {
        "name": "--checkbox-border-color",
        "description": "Border of the unchecked box"
      },
      {
        "name": "--checkbox-size",
        "description": "Width and height of the box (every size)"
      },
      {
        "name": "--checkbox-radius",
        "description": "Corner radius of the box for the square and rounded shapes"
      },
      {
        "name": "--checkbox-gap",
        "description": "Space between the box and the label"
      },
      {
        "name": "--checkbox-label-font-size",
        "description": "Font size of the label (every size)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Checkbox": {
    "kind": "cssVars",
    "source": "react/src/components/Checkbox",
    "vars": [
      {
        "name": "--checkbox-checked-color",
        "description": "Background / border of the checked or indeterminate box (defaults to the color prop's accent)"
      },
      {
        "name": "--checkbox-checkmark-color",
        "description": "Color of the checkmark / indeterminate dash"
      },
      {
        "name": "--checkbox-box-color",
        "description": "Background of the unchecked box"
      },
      {
        "name": "--checkbox-border-color",
        "description": "Border of the unchecked box"
      },
      {
        "name": "--checkbox-size",
        "description": "Width and height of the box (every size)"
      },
      {
        "name": "--checkbox-radius",
        "description": "Corner radius of the box for the square and rounded shapes"
      },
      {
        "name": "--checkbox-gap",
        "description": "Space between the box and the label"
      },
      {
        "name": "--checkbox-label-font-size",
        "description": "Font size of the label (every size)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

Remember me 初始未选中，Checked by default 初始选中；两者独立切换。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/wc/basic.html

```html
<div style="display: flex; flex-wrap: wrap; gap: 16px">
  <minerva-checkbox label="Remember me"></minerva-checkbox>
  <minerva-checkbox checked label="Checked by default"></minerva-checkbox>
</div>

```

## Example: 在表单中

表单关联：选中时以 name 提交 value，required 在勾选前阻止提交，reset 恢复 checked 属性。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/wc/form.html

```html
<form id="cb-form" style="display: grid; gap: 12px; justify-items: start">
  <minerva-checkbox
    name="terms"
    required
    label="I accept the terms"
  ></minerva-checkbox>
  <minerva-checkbox
    name="newsletter"
    value="weekly"
    checked
    label="Weekly newsletter"
  ></minerva-checkbox>
  <div style="display: flex; gap: 8px">
    <minerva-button type="submit">Submit</minerva-button>
    <minerva-button type="reset" variant="ghost" color="neutral"
      >Reset</minerva-button
    >
  </div>
  <output id="cb-form-result"></output>
</form>

```

### apps/docs/src/docs/pages/checkbox/wc/form.ts

```tsx
// Submitting validates first (the required box blocks it with the browser's
// message); a checked box submits its `value`, an unchecked one nothing.
// Reset restores the `checked` attributes.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#cb-form")!;
  const result = root.querySelector<HTMLOutputElement>("#cb-form-result")!;
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

## Example: 全选（半选状态）

父复选框通过 minerva-change 跟随子项：全部选中时为选中，部分选中时为半选（aria-checked="mixed"）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/wc/select-all.html

```html
<div style="display: grid; gap: 8px">
  <minerva-checkbox id="cb-all" label="All toppings"></minerva-checkbox>
  <div style="display: grid; gap: 8px; padding-inline-start: 24px">
    <minerva-checkbox
      class="cb-item"
      value="cheese"
      checked
      label="Cheese"
    ></minerva-checkbox>
    <minerva-checkbox
      class="cb-item"
      value="olives"
      label="Olives"
    ></minerva-checkbox>
    <minerva-checkbox
      class="cb-item"
      value="basil"
      label="Basil"
    ></minerva-checkbox>
  </div>
  <output id="cb-selection"></output>
</div>

```

### apps/docs/src/docs/pages/checkbox/wc/select-all.ts

```tsx
// The parent box mirrors its children: checked when all are, indeterminate
// (aria-checked="mixed") when only some are. `minerva-change` only fires
// for user toggles, so setting `checked` here does not loop.
type Checkbox = HTMLElement & {
  checked: boolean;
  indeterminate: boolean;
  value: string;
  updateComplete: Promise<boolean>;
};

export function setup(root: HTMLElement) {
  const all = root.querySelector<Checkbox>("#cb-all")!;
  const items = Array.from(root.querySelectorAll<Checkbox>(".cb-item"));
  const output = root.querySelector<HTMLOutputElement>("#cb-selection")!;
  const sync = () => {
    const checked = items.filter((item) => item.checked);
    all.checked = checked.length === items.length;
    all.indeterminate = checked.length > 0 && checked.length < items.length;
    output.value = `Selected: ${checked.map((item) => item.value).join(", ") || "none"}`;
  };
  const onAll = () => {
    items.forEach((item) => (item.checked = all.checked));
    sync();
  };
  all.addEventListener("minerva-change", onAll);
  items.forEach((item) => item.addEventListener("minerva-change", sync));
  // the `checked` attributes are applied on the first render
  void Promise.all(items.map((item) => item.updateComplete)).then(sync);
  return () => {
    all.removeEventListener("minerva-change", onAll);
    items.forEach((item) => item.removeEventListener("minerva-change", sync));
  };
}

```

## Example: 样式与状态

尺寸、形状、颜色、标签位置、icon 插槽中的自定义图标，以及带辅助文本的只读和错误状态。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/wc/styles-states.html

```html
<div style="display: grid; gap: 16px">
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center">
    <minerva-checkbox size="small" checked label="Small"></minerva-checkbox>
    <minerva-checkbox size="medium" checked label="Medium"></minerva-checkbox>
    <minerva-checkbox size="large" checked label="Large"></minerva-checkbox>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center">
    <minerva-checkbox
      shape="rounded"
      color="success"
      checked
      label="Rounded"
    ></minerva-checkbox>
    <minerva-checkbox
      shape="circle"
      color="danger"
      checked
      label="Circle"
    ></minerva-checkbox>
    <minerva-checkbox
      color="warning"
      checked
      label-placement="start"
      label="Label at start"
    ></minerva-checkbox>
    <minerva-checkbox
      color="info"
      checked
      label-placement="top"
      label="Label on top"
    ></minerva-checkbox>
    <minerva-checkbox checked label="Custom icon"
      ><span slot="icon" aria-hidden="true">★</span></minerva-checkbox
    >
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: start">
    <minerva-checkbox
      readonly
      checked
      label="Read-only"
      helper-text="Managed by your administrator."
    ></minerva-checkbox>
    <minerva-checkbox
      error
      label="I accept the terms"
      helper-text="You must accept the terms to continue."
    ></minerva-checkbox>
  </div>
</div>

```
