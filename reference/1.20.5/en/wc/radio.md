# Radio

Lets users pick exactly one option from a set. Use RadioGroup to manage the selection of several radios.

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

## Radio

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/radio",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string",
    "attribute": "value",
    "required": false
  },
  {
    "name": "checked",
    "typeText": "boolean",
    "attribute": "checked",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string",
    "attribute": "label",
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
    "typeText": "RadioColor",
    "attribute": "color",
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
    "name": "errorMessage",
    "typeText": "string",
    "attribute": "error-message",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ checked: true; value: string; }>",
    "detailType": {
      "typeText": "{ checked: true; value: string; }",
      "typeRef": "type:f97e56eeb0e601839cf4"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "A standalone radio was checked by the user; `detail: { checked: true, value }` (inside a group, the group fires it)"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Label content (alternative to the `label` attribute)"
  }
]
```

## RadioGroup

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/radio-group",
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
    "name": "error",
    "typeText": "boolean",
    "attribute": "error",
    "required": false
  },
  {
    "name": "direction",
    "typeText": "\"horizontal\" | \"vertical\"",
    "attribute": "direction",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\" | undefined",
    "attribute": "size",
    "required": false
  },
  {
    "name": "color",
    "typeText": "RadioColor | undefined",
    "attribute": "color",
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
    "description": "The user selected another radio (like native radios)"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:4cdb8fc9d05a20b7419c"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The user selected another radio; `detail: { value }`"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "The `<minerva-radio>` options"
  }
]
```

## API

```json
{
  "wc:minerva-radio": {
    "kind": "element",
    "source": "web-components/src/components/radio/radio.ts",
    "className": "MinervaRadio",
    "summary": "Radio option of a radio group.",
    "description": "One option of a `<minerva-radio-group>` (`<Radio>` of React). The element itself is the radio (`role=\"radio\"`, `aria-checked`): the group drives its checked state, size, color, disabled state and roving focus (one Tab stop, arrow keys move and select). Space checks the focused radio. A radio outside a group is focusable and checks itself on click, but only the group takes part in forms.",
    "properties": [
      {
        "name": "value",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Value of the radio; identifies it within its group"
      },
      {
        "name": "checked",
        "attribute": "checked",
        "type": "boolean",
        "default": "false",
        "description": "Whether the radio is checked (set by the group)"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the radio (the group skips it)"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Label text (alternative to the default slot)"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Radio size (the group's `size` wins when set)"
      },
      {
        "name": "color",
        "attribute": "color",
        "type": "RadioColor",
        "default": "\"primary\"",
        "description": "Semantic color of the checked radio (the group's `color` wins when set)"
      },
      {
        "name": "error",
        "attribute": "error",
        "type": "boolean",
        "default": "false",
        "description": "Error state (`error-message` replaces `helper-text`)"
      },
      {
        "name": "helperText",
        "attribute": "helper-text",
        "type": "string",
        "default": "\"\"",
        "description": "Helper text shown below the radio (describes it)"
      },
      {
        "name": "errorMessage",
        "attribute": "error-message",
        "type": "string",
        "default": "\"\"",
        "description": "Message shown below the radio while `error` is set"
      },
      {
        "name": "group",
        "type": "MinervaRadioGroup | null",
        "readonly": true,
        "description": "The group the radio belongs to"
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "readonly": true,
        "description": "Whether the radio cannot be checked (itself or by its group)"
      }
    ],
    "methods": [],
    "events": [
      {
        "name": "minerva-change",
        "description": "A standalone radio was checked by the user; `detail: { checked: true, value }` (inside a group, the group fires it)"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "Label content (alternative to the `label` attribute)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The wrapper (the clickable row and the helper text)"
      },
      {
        "name": "control",
        "description": "The visual radio mark"
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
        "name": "--radio-checked-color",
        "description": "Color of the checked mark (defaults to the color prop's accent)"
      },
      {
        "name": "--radio-dot-color",
        "description": "Color of the inner dot of the checked mark"
      },
      {
        "name": "--radio-border-color",
        "description": "Border of the unchecked mark"
      },
      {
        "name": "--radio-background",
        "description": "Background of the unchecked mark"
      },
      {
        "name": "--radio-size",
        "description": "Width and height of the mark (every size)"
      },
      {
        "name": "--radio-gap",
        "description": "Space between the mark and the label"
      },
      {
        "name": "--radio-label-font-size",
        "description": "Font size of the label (every size)"
      },
      {
        "name": "--radio-group-gap",
        "description": "Space between the radios of a RadioGroup"
      }
    ]
  },
  "wc:minerva-radio-group": {
    "kind": "element",
    "source": "web-components/src/components/radio/radio.ts",
    "className": "MinervaRadioGroup",
    "summary": "Group of radios with roving focus, submitted as one form value.",
    "description": "A set of `<minerva-radio>` children of which one can be selected (`<RadioGroup>` of React), with an optional visible label and helper text. Keyboard: one Tab stop (the checked radio, else the first enabled one); arrow keys move and select, skipping disabled radios and wrapping (core's roving focus; RTL-aware); Space checks the focused radio. The GROUP is the form-associated element: it submits the selected radio's `value` under `name`, `required` makes it invalid while nothing is selected (`valueMissing`, localized \"select one of these options\"), and it supports `form.reset()` (restores the `value` attribute), `<fieldset disabled>` and state restoration. Name it with `label`, `<label for>`, `aria-label` or `aria-labelledby`.",
    "properties": [
      {
        "name": "defaultValue",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Initially selected value, restored by `form.reset()` (the `value` attribute)"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Visible label of the group (also its accessible name)"
      },
      {
        "name": "helperText",
        "attribute": "helper-text",
        "type": "string",
        "default": "\"\"",
        "description": "Helper text shown below the group (describes it)"
      },
      {
        "name": "error",
        "attribute": "error",
        "type": "boolean",
        "default": "false",
        "description": "Error state (aria-invalid)"
      },
      {
        "name": "direction",
        "attribute": "direction",
        "type": "\"horizontal\" | \"vertical\"",
        "default": "\"vertical\"",
        "description": "Layout direction of the radios"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\" | undefined",
        "description": "Size applied to every radio (each radio's own size when unset)"
      },
      {
        "name": "color",
        "attribute": "color",
        "type": "RadioColor | undefined",
        "description": "Color applied to every radio (each radio's own color when unset)"
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
        "description": "Value of the selected radio (property; the `value` attribute sets `defaultValue`)"
      },
      {
        "name": "radios",
        "type": "MinervaRadio[]",
        "readonly": true,
        "description": "The radios of the group"
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
        "description": "Focuses the checked radio (else the first enabled one)"
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
        "description": "The user selected another radio (like native radios)"
      },
      {
        "name": "minerva-change",
        "description": "The user selected another radio; `detail: { value }`"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "The `<minerva-radio>` options"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The wrapper"
      },
      {
        "name": "label",
        "description": "The visible group label"
      },
      {
        "name": "list",
        "description": "The element with role=\"radiogroup\" (the radios)"
      },
      {
        "name": "helper-text",
        "description": "The helper text"
      }
    ],
    "cssProperties": [
      {
        "name": "--radio-checked-color",
        "description": "Color of the checked mark (defaults to the color prop's accent)"
      },
      {
        "name": "--radio-dot-color",
        "description": "Color of the inner dot of the checked mark"
      },
      {
        "name": "--radio-border-color",
        "description": "Border of the unchecked mark"
      },
      {
        "name": "--radio-background",
        "description": "Background of the unchecked mark"
      },
      {
        "name": "--radio-size",
        "description": "Width and height of the mark (every size)"
      },
      {
        "name": "--radio-gap",
        "description": "Space between the mark and the label"
      },
      {
        "name": "--radio-label-font-size",
        "description": "Font size of the label (every size)"
      },
      {
        "name": "--radio-group-gap",
        "description": "Space between the radios of a RadioGroup"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Radio": {
    "kind": "cssVars",
    "source": "react/src/components/Radio",
    "vars": [
      {
        "name": "--radio-checked-color",
        "description": "Color of the checked mark (defaults to the color prop's accent)"
      },
      {
        "name": "--radio-dot-color",
        "description": "Color of the inner dot of the checked mark"
      },
      {
        "name": "--radio-border-color",
        "description": "Border of the unchecked mark"
      },
      {
        "name": "--radio-background",
        "description": "Background of the unchecked mark"
      },
      {
        "name": "--radio-size",
        "description": "Width and height of the mark (every size)"
      },
      {
        "name": "--radio-gap",
        "description": "Space between the mark and the label"
      },
      {
        "name": "--radio-label-font-size",
        "description": "Font size of the label (every size)"
      },
      {
        "name": "--radio-group-gap",
        "description": "Space between the radios of a RadioGroup"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

A labelled group with a preselected value and a disabled option. The group is one Tab stop; arrow keys move and select. minerva-change reports the new value.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/radio/wc/basic.html

```html
<div style="display: grid; gap: 12px">
  <minerva-radio-group
    id="rd-plan"
    label="Plan"
    value="pro"
    helper-text="Arrow keys move the selection; Tab leaves the group."
  >
    <minerva-radio value="free" label="Free"></minerva-radio>
    <minerva-radio value="pro" label="Pro"></minerva-radio>
    <minerva-radio value="team" label="Team"></minerva-radio>
    <minerva-radio
      value="enterprise"
      disabled
      label="Enterprise"
    ></minerva-radio>
  </minerva-radio-group>
  <output id="rd-plan-value">Selected: pro</output>
</div>

```

### apps/docs/src/docs/pages/radio/wc/basic.ts

```tsx
// The group fires `minerva-change` (detail.value) when the user selects
// another radio, by click or with the arrow keys.
export function setup(root: HTMLElement) {
  const group = root.querySelector<HTMLElement>("#rd-plan")!;
  const output = root.querySelector<HTMLOutputElement>("#rd-plan-value")!;
  const onChange = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    output.value = `Selected: ${value}`;
  };
  group.addEventListener("minerva-change", onChange);
  return () => group.removeEventListener("minerva-change", onChange);
}

```

## Example: In a form

The group is the form control: it submits the selected value under name, required blocks submission while nothing is selected, and reset restores the value attribute.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/radio/wc/form.html

```html
<form id="rd-form" style="display: grid; gap: 12px; justify-items: start">
  <minerva-radio-group
    name="size"
    label="T-shirt size"
    required
    direction="horizontal"
  >
    <minerva-radio value="s" label="S"></minerva-radio>
    <minerva-radio value="m" label="M"></minerva-radio>
    <minerva-radio value="l" label="L"></minerva-radio>
  </minerva-radio-group>
  <minerva-radio-group
    name="color"
    label="Color"
    value="blue"
    direction="horizontal"
  >
    <minerva-radio value="blue" label="Blue"></minerva-radio>
    <minerva-radio value="green" label="Green"></minerva-radio>
  </minerva-radio-group>
  <div style="display: flex; gap: 8px">
    <minerva-button type="submit">Submit</minerva-button>
    <minerva-button type="reset" variant="ghost" color="neutral"
      >Reset</minerva-button
    >
  </div>
  <output id="rd-form-result"></output>
</form>

```

### apps/docs/src/docs/pages/radio/wc/form.ts

```tsx
// The group is the form control: it submits the selected radio's value
// under its name; `required` blocks submission while nothing is selected.
// Reset restores the `value` attribute.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#rd-form")!;
  const result = root.querySelector<HTMLOutputElement>("#rd-form-result")!;
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

## Example: Styles and states

Horizontal direction, group sizes and colors, per-radio helper and error messages, and a disabled group.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/radio/wc/styles-states.html

```html
<div style="display: grid; gap: 20px">
  <minerva-radio-group
    label="Small, horizontal"
    direction="horizontal"
    size="small"
    value="a"
  >
    <minerva-radio value="a" label="Option A"></minerva-radio>
    <minerva-radio value="b" label="Option B"></minerva-radio>
    <minerva-radio value="c" label="Option C"></minerva-radio>
  </minerva-radio-group>
  <minerva-radio-group
    label="Large, success"
    direction="horizontal"
    size="large"
    color="success"
    value="b"
  >
    <minerva-radio value="a" label="Option A"></minerva-radio>
    <minerva-radio value="b" label="Option B"></minerva-radio>
    <minerva-radio value="c" label="Option C"></minerva-radio>
  </minerva-radio-group>
  <minerva-radio-group
    label="Delivery"
    value="standard"
    error
    helper-text="Express delivery is not available for your address."
  >
    <minerva-radio
      value="standard"
      label="Standard"
      helper-text="3 to 5 business days"
    ></minerva-radio>
    <minerva-radio
      value="express"
      label="Express"
      error
      error-message="Not available"
    ></minerva-radio>
  </minerva-radio-group>
  <minerva-radio-group label="Disabled group" disabled value="a">
    <minerva-radio value="a" label="Option A"></minerva-radio>
    <minerva-radio value="b" label="Option B"></minerva-radio>
  </minerva-radio-group>
</div>

```
