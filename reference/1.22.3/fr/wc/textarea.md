# Textarea

Saisie multiligne partageant les tailles et variantes d’Input ; le redimensionnement manuel est désactivé, utilisez rows.

Package: minerva-design@1.22.3

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Textarea

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/textarea",
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
    "name": "variant",
    "typeText": "\"outline\" | \"filled\" | \"unstyled\"",
    "attribute": "variant",
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
    "name": "placeholder",
    "typeText": "string",
    "attribute": "placeholder",
    "required": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "attribute": "readonly",
    "required": false
  },
  {
    "name": "rows",
    "typeText": "number | undefined",
    "attribute": "rows",
    "required": false
  },
  {
    "name": "minLength",
    "typeText": "number | undefined",
    "attribute": "minlength",
    "required": false
  },
  {
    "name": "maxLength",
    "typeText": "number | undefined",
    "attribute": "maxlength",
    "required": false
  },
  {
    "name": "autocomplete",
    "typeText": "string | undefined",
    "attribute": "autocomplete",
    "required": false
  },
  {
    "name": "wrap",
    "typeText": "\"soft\" | \"hard\" | \"off\" | undefined",
    "attribute": "wrap",
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
    "description": "The value was committed (blur), re-dispatched from the inner textarea"
  },
  {
    "name": "input",
    "typeText": "Event",
    "description": "The value changed (each keystroke; native, composed)"
  },
  {
    "name": "minerva-input",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:8883b1fcfef1f1056c10"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "Same as `input`, with `detail: { value }`"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:6e11b5d56d97f47d96fc"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "Same as `change`, with `detail: { value }`"
  }
]
```

## API

```json
{
  "wc:minerva-textarea": {
    "kind": "element",
    "source": "web-components/src/components/textarea/textarea.ts",
    "className": "MinervaTextarea",
    "summary": "Multi-line text field.",
    "description": "Multi-line text field sharing the input's look (`<Textarea>` of React). Manual resizing is disabled, as in React: set `rows` or size the element instead. Form-associated: submits `value` under `name`, supports `required`, `minlength` / `maxlength` validation (the browser's messages, from the inner `<textarea>`), `form.reset()` and `<fieldset disabled>`. Name it with `<label for>`, a wrapping `<label>`, `aria-label` or `aria-labelledby`.",
    "properties": [
      {
        "name": "defaultValue",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Initial value, restored by `form.reset()` (the `value` attribute). Like `<textarea>`, changing it also changes `value` until the user edits it"
      },
      {
        "name": "variant",
        "attribute": "variant",
        "type": "\"outline\" | \"filled\" | \"unstyled\"",
        "default": "\"outline\"",
        "description": "Visual style"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Font size and minimum height"
      },
      {
        "name": "invalid",
        "attribute": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Error state; sets aria-invalid"
      },
      {
        "name": "placeholder",
        "attribute": "placeholder",
        "type": "string",
        "default": "\"\"",
        "description": "Placeholder text"
      },
      {
        "name": "readOnly",
        "attribute": "readonly",
        "type": "boolean",
        "default": "false",
        "description": "Read-only: focusable and submitted, not editable"
      },
      {
        "name": "rows",
        "attribute": "rows",
        "type": "number | undefined",
        "description": "Visible text lines"
      },
      {
        "name": "minLength",
        "attribute": "minlength",
        "type": "number | undefined",
        "description": "Minimum length"
      },
      {
        "name": "maxLength",
        "attribute": "maxlength",
        "type": "number | undefined",
        "description": "Maximum length"
      },
      {
        "name": "autocomplete",
        "attribute": "autocomplete",
        "type": "string | undefined",
        "description": "Autocomplete hint"
      },
      {
        "name": "wrap",
        "attribute": "wrap",
        "type": "\"soft\" | \"hard\" | \"off\" | undefined",
        "description": "Text wrapping when submitted (\"soft\" / \"hard\" / \"off\")"
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
        "description": "Current value (property; the `value` attribute sets `defaultValue`)"
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
        "name": "select",
        "signature": "() => void",
        "description": "Selects the text"
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
        "description": "The value was committed (blur), re-dispatched from the inner textarea"
      },
      {
        "name": "input",
        "description": "The value changed (each keystroke; native, composed)"
      },
      {
        "name": "minerva-input",
        "description": "Same as `input`, with `detail: { value }`"
      },
      {
        "name": "minerva-change",
        "description": "Same as `change`, with `detail: { value }`"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The native `<textarea>`"
      }
    ],
    "cssProperties": [
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
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Textarea": {
    "kind": "cssVars",
    "source": "react/src/components/Textarea",
    "vars": [
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
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

rows fixe la hauteur visible (le redimensionnement manuel est désactivé) ; minerva-input signale chaque modification, ici pour compter les mots.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/textarea/wc/basic.html

```html
<div style="display: grid; gap: 8px; max-width: 420px">
  <label for="ta-bio">Bio</label>
  <minerva-textarea
    id="ta-bio"
    rows="4"
    placeholder="Tell us about yourself"
  ></minerva-textarea>
  <output id="ta-bio-count">0 words</output>
</div>

```

### apps/docs/src/docs/pages/textarea/wc/basic.ts

```tsx
// `minerva-input` fires on every keystroke with detail.value.
export function setup(root: HTMLElement) {
  const textarea = root.querySelector<HTMLElement>("#ta-bio")!;
  const output = root.querySelector<HTMLOutputElement>("#ta-bio-count")!;
  const onInput = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    const words = value.trim() ? value.trim().split(/\s+/).length : 0;
    output.value = `${words} word${words === 1 ? "" : "s"}`;
  };
  textarea.addEventListener("minerva-input", onInput);
  return () => textarea.removeEventListener("minerva-input", onInput);
}

```

## Example: Dans un formulaire

required, minlength et maxlength sont validés par le navigateur à l’envoi ; la valeur est envoyée sous name et reset restaure l’attribut value.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/textarea/wc/form.html

```html
<form id="ta-form" style="display: grid; gap: 8px; max-width: 420px">
  <label for="ta-form-feedback">Feedback (20 to 200 characters)</label>
  <minerva-textarea
    id="ta-form-feedback"
    name="feedback"
    rows="4"
    required
    minlength="20"
    maxlength="200"
    placeholder="What did you like? What can we improve?"
  ></minerva-textarea>
  <div style="display: flex; gap: 8px">
    <minerva-button type="submit">Send</minerva-button>
    <minerva-button type="reset" variant="ghost" color="neutral"
      >Reset</minerva-button
    >
  </div>
  <output id="ta-form-result"></output>
</form>

```

### apps/docs/src/docs/pages/textarea/wc/form.ts

```tsx
// required / minlength / maxlength use the browser's messages on submit;
// `invalid` styles the field after a failed submit until it is fixed.
// Reset restores the `value` attribute.
type Field = HTMLElement & { invalid: boolean; validity?: ValidityState };

export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#ta-form")!;
  const result = root.querySelector<HTMLOutputElement>("#ta-form-result")!;
  const onInvalid = (event: Event) => ((event.target as Field).invalid = true);
  const onInput = (event: Event) => {
    const field = event.target as Field;
    if (field.validity?.valid) field.invalid = false;
  };
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const entries = [...new FormData(form)].map(
      ([key, value]) => `${key}=${value}`,
    );
    result.value = `FormData: ${entries.join(", ")}`;
  };
  const onReset = () => {
    result.value = "";
    form
      .querySelectorAll<Field>("minerva-textarea")
      .forEach((field) => (field.invalid = false));
  };
  form.addEventListener("invalid", onInvalid, true);
  form.addEventListener("minerva-input", onInput);
  form.addEventListener("submit", onSubmit);
  form.addEventListener("reset", onReset);
  return () => {
    form.removeEventListener("invalid", onInvalid, true);
    form.removeEventListener("minerva-input", onInput);
    form.removeEventListener("submit", onSubmit);
    form.removeEventListener("reset", onReset);
  };
}

```

## Example: Tailles, variantes et états

Tailles, variante filled, et états lecture seule, désactivé et invalide.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/textarea/wc/sizes-variants.html

```html
<div style="display: grid; gap: 12px; max-width: 420px">
  <minerva-textarea
    size="small"
    rows="2"
    aria-label="Small"
    placeholder="Small"
  ></minerva-textarea>
  <minerva-textarea
    size="large"
    rows="2"
    aria-label="Large"
    placeholder="Large"
  ></minerva-textarea>
  <minerva-textarea
    variant="filled"
    rows="2"
    aria-label="Filled"
    placeholder="Filled"
  ></minerva-textarea>
  <minerva-textarea
    readonly
    rows="2"
    value="Read-only text"
    aria-label="Read-only"
  ></minerva-textarea>
  <minerva-textarea
    disabled
    rows="2"
    value="Disabled"
    aria-label="Disabled"
  ></minerva-textarea>
  <minerva-textarea
    invalid
    rows="2"
    value="Invalid"
    aria-label="Invalid"
  ></minerva-textarea>
</div>

```
