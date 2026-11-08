# Input

Champ de saisie sur une ligne avec tailles, variantes, contenu avant / après, bouton d'effacement, compteur de caractères et bascule de visibilité du mot de passe. Placez-le dans un FormField pour un libellé, une aide et un message d'erreur.

Package: minerva-design@1.23.0

Renderer: wc

Locale: fr

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

## Input

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/input",
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
    "name": "type",
    "typeText": "\"text\" | \"email\" | \"password\" | \"search\" | \"tel\" | \"url\" | \"number\" | \"date\" | \"datetime-local\" | \"month\" | \"time\" | \"week\"",
    "attribute": "type",
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
    "name": "pattern",
    "typeText": "string | undefined",
    "attribute": "pattern",
    "required": false
  },
  {
    "name": "min",
    "typeText": "string | undefined",
    "attribute": "min",
    "required": false
  },
  {
    "name": "max",
    "typeText": "string | undefined",
    "attribute": "max",
    "required": false
  },
  {
    "name": "step",
    "typeText": "string | undefined",
    "attribute": "step",
    "required": false
  },
  {
    "name": "autocomplete",
    "typeText": "string | undefined",
    "attribute": "autocomplete",
    "required": false
  },
  {
    "name": "inputmode",
    "typeText": "string | undefined",
    "attribute": "inputmode",
    "required": false
  },
  {
    "name": "clearable",
    "typeText": "boolean",
    "attribute": "clearable",
    "required": false
  },
  {
    "name": "clearLabel",
    "typeText": "string | undefined",
    "attribute": "clear-label",
    "required": false
  },
  {
    "name": "showCharCount",
    "typeText": "boolean",
    "attribute": "show-char-count",
    "required": false
  },
  {
    "name": "showPasswordLabel",
    "typeText": "string | undefined",
    "attribute": "show-password-label",
    "required": false
  },
  {
    "name": "hidePasswordLabel",
    "typeText": "string | undefined",
    "attribute": "hide-password-label",
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
    "description": "The value was committed (blur / Enter), re-dispatched from the inner input"
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
      "typeRef": "type:8d8a5b145d3477e3a88c"
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
      "typeRef": "type:bd5274ca734871802bf6"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "Same as `change`, with `detail: { value }`"
  },
  {
    "name": "minerva-clear",
    "typeText": "CustomEvent<undefined>",
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The clear button emptied the field"
  }
]
```

### slots

```json
[
  {
    "name": "prefix",
    "description": "Content before the text (icon, \"@\")"
  },
  {
    "name": "suffix",
    "description": "Content after the text (unit, icon, button)"
  }
]
```

## API

```json
{
  "wc:minerva-input": {
    "kind": "element",
    "source": "web-components/src/components/input/input.ts",
    "className": "MinervaInput",
    "summary": "Text field with prefix / suffix, clear button and character count.",
    "description": "Single-line text field (`<Input>` of React) with prefix / suffix slots, clear button, character count and password visibility toggle. Form-associated: submits `value` under `name`, supports `required`, `minlength` / `maxlength` / `pattern` / `min` / `max` validation (the browser's messages, from the inner `<input>`), `form.reset()` and `<fieldset disabled>`. Name it with `<label for>`, a wrapping `<label>`, `aria-label` or `aria-labelledby`.",
    "properties": [
      {
        "name": "defaultValue",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Initial value, restored by `form.reset()` (the `value` attribute). Like `<input>`, changing it also changes `value` until the user edits it"
      },
      {
        "name": "type",
        "attribute": "type",
        "type": "\"text\" | \"email\" | \"password\" | \"search\" | \"tel\" | \"url\" | \"number\" | \"date\" | \"datetime-local\" | \"month\" | \"time\" | \"week\"",
        "default": "\"text\"",
        "description": "Input type"
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
        "description": "Height and font size"
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
        "name": "pattern",
        "attribute": "pattern",
        "type": "string | undefined",
        "description": "Regular expression the value must match"
      },
      {
        "name": "min",
        "attribute": "min",
        "type": "string | undefined",
        "description": "Minimum (number / date types)"
      },
      {
        "name": "max",
        "attribute": "max",
        "type": "string | undefined",
        "description": "Maximum (number / date types)"
      },
      {
        "name": "step",
        "attribute": "step",
        "type": "string | undefined",
        "description": "Step (number / date types)"
      },
      {
        "name": "autocomplete",
        "attribute": "autocomplete",
        "type": "string | undefined",
        "description": "Autocomplete hint"
      },
      {
        "name": "inputmode",
        "attribute": "inputmode",
        "type": "string | undefined",
        "description": "Virtual keyboard hint"
      },
      {
        "name": "clearable",
        "attribute": "clearable",
        "type": "boolean",
        "default": "false",
        "description": "Shows a clear button while the field has a value"
      },
      {
        "name": "clearLabel",
        "attribute": "clear-label",
        "type": "string | undefined",
        "description": "Accessible label of the clear button (default: localized \"Clear\")"
      },
      {
        "name": "showCharCount",
        "attribute": "show-char-count",
        "type": "boolean",
        "default": "false",
        "description": "Shows the number of characters (and maxlength) after the text"
      },
      {
        "name": "showPasswordLabel",
        "attribute": "show-password-label",
        "type": "string | undefined",
        "description": "Label of the password toggle while hidden (default: localized)"
      },
      {
        "name": "hidePasswordLabel",
        "attribute": "hide-password-label",
        "type": "string | undefined",
        "description": "Label of the password toggle while visible (default: localized)"
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
        "description": "The value was committed (blur / Enter), re-dispatched from the inner input"
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
      },
      {
        "name": "minerva-clear",
        "description": "The clear button emptied the field"
      }
    ],
    "slots": [
      {
        "name": "prefix",
        "description": "Content before the text (icon, \"@\")"
      },
      {
        "name": "suffix",
        "description": "Content after the text (unit, icon, button)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The field box (wraps the input and its addons)"
      },
      {
        "name": "input",
        "description": "The native `<input>`"
      },
      {
        "name": "prefix",
        "description": "The content before the text"
      },
      {
        "name": "suffix",
        "description": "The content after the text"
      },
      {
        "name": "clear-button",
        "description": "The clear button (while there is a value)"
      },
      {
        "name": "password-toggle",
        "description": "The password visibility toggle (type=password)"
      },
      {
        "name": "count",
        "description": "The character counter"
      }
    ],
    "cssProperties": [
      {
        "name": "--input-height",
        "description": "Minimum height of the field (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--input-padding-x",
        "description": "Horizontal padding of the text (every size)"
      },
      {
        "name": "--input-radius",
        "description": "Corner radius (defaults to --radius-lg)"
      },
      {
        "name": "--input-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--input-background",
        "description": "Background color of the outline variant"
      },
      {
        "name": "--input-border-color",
        "description": "Border color at rest"
      },
      {
        "name": "--input-focus-color",
        "description": "Border color while hovered / focused (focus: then --minerva-focus-border-color)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Input": {
    "kind": "cssVars",
    "source": "react/src/components/Input",
    "vars": [
      {
        "name": "--input-height",
        "description": "Minimum height of the field (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--input-padding-x",
        "description": "Horizontal padding of the text (every size)"
      },
      {
        "name": "--input-radius",
        "description": "Corner radius (defaults to --radius-lg)"
      },
      {
        "name": "--input-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--input-background",
        "description": "Background color of the outline variant"
      },
      {
        "name": "--input-border-color",
        "description": "Border color at rest"
      },
      {
        "name": "--input-focus-color",
        "description": "Border color while hovered / focused (focus: then --minerva-focus-border-color)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Compléments, effacement, compteur et mot de passe

Slots prefix et suffix, bouton d’effacement (clearable), compteur de caractères lié à maxlength et bouton d’affichage du mot de passe.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/input/wc/addons.html

```html
<div style="display: grid; gap: 12px; max-width: 360px">
  <minerva-input type="url" aria-label="Website" placeholder="example.com">
    <span slot="prefix">https://</span>
  </minerva-input>
  <minerva-input
    type="number"
    aria-label="Weight"
    value="72"
    min="0"
    step="0.5"
  >
    <span slot="suffix">kg</span>
  </minerva-input>
  <minerva-input
    type="search"
    clearable
    value="web components"
    aria-label="Search"
  >
    <span slot="prefix" aria-hidden="true">🔍</span>
  </minerva-input>
  <minerva-input
    show-char-count
    maxlength="40"
    value="Character count"
    aria-label="Title"
  ></minerva-input>
  <minerva-input
    type="password"
    value="correct horse"
    aria-label="Password"
    autocomplete="current-password"
  ></minerva-input>
</div>

```

## Example: Utilisation de base

Un champ non contrôlé et un champ dont le propriétaire synchronise la propriété value via minerva-input. Les deux peuvent être modifiés et vidés.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/input/wc/basic.html

```html
<minerva-input aria-label="Name" placeholder="Uncontrolled"></minerva-input>
<minerva-input
  id="controlled-name"
  aria-label="Controlled"
  placeholder="Controlled"
></minerva-input>

```

### apps/docs/src/docs/pages/input/wc/basic.ts

```tsx
// Web Components emit their next value in CustomEvent.detail.
// The owner writes it back through the element's value property.
export function setup(root: HTMLElement) {
  const input = root.querySelector<HTMLElement & { value: string }>(
    "#controlled-name",
  )!;
  let value = "";
  input.value = value;
  const onInput = (event: Event) => {
    value = (event as CustomEvent<{ value: string }>).detail.value;
    input.value = value;
  };
  input.addEventListener("minerva-input", onInput);
  return () => input.removeEventListener("minerva-input", onInput);
}

```

## Example: Dans un formulaire

required, type="email", minlength et pattern utilisent la validation du navigateur à l’envoi ; les champs en échec passent en invalid jusqu’à correction, et reset les restaure.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/input/wc/form.html

```html
<form id="in-form" style="display: grid; gap: 8px; max-width: 360px">
  <label for="in-form-email">Email</label>
  <minerva-input
    id="in-form-email"
    name="email"
    type="email"
    required
    placeholder="you@example.com"
  ></minerva-input>
  <label for="in-form-user">Username (3 to 16 lowercase letters)</label>
  <minerva-input
    id="in-form-user"
    name="username"
    required
    minlength="3"
    maxlength="16"
    pattern="[a-z]+"
    show-char-count
  ></minerva-input>
  <div style="display: flex; gap: 8px">
    <minerva-button type="submit">Sign up</minerva-button>
    <minerva-button type="reset" variant="ghost" color="neutral"
      >Reset</minerva-button
    >
  </div>
  <output id="in-form-result"></output>
</form>

```

### apps/docs/src/docs/pages/input/wc/form.ts

```tsx
// The browser validates the inputs on submit (required, type, minlength,
// pattern) and reports the first invalid one; `invalid` styles the fields
// that failed until they are edited. Reset restores the `value` attributes.
type Field = HTMLElement & { invalid: boolean; validity?: ValidityState };

export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#in-form")!;
  const result = root.querySelector<HTMLOutputElement>("#in-form-result")!;
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
      .querySelectorAll<Field>("minerva-input")
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

Trois tailles, les variantes outline, filled et unstyled, et les états lecture seule, désactivé et invalide.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/input/wc/sizes-variants.html

```html
<div style="display: grid; gap: 12px; max-width: 360px">
  <minerva-input
    size="small"
    aria-label="Small"
    placeholder="Small"
  ></minerva-input>
  <minerva-input
    size="medium"
    aria-label="Medium"
    placeholder="Medium (outline)"
  ></minerva-input>
  <minerva-input
    size="large"
    aria-label="Large"
    placeholder="Large"
  ></minerva-input>
  <minerva-input
    variant="filled"
    aria-label="Filled"
    placeholder="Filled"
  ></minerva-input>
  <minerva-input
    variant="unstyled"
    aria-label="Unstyled"
    placeholder="Unstyled"
  ></minerva-input>
  <minerva-input
    readonly
    value="Read-only value"
    aria-label="Read-only"
  ></minerva-input>
  <minerva-input
    disabled
    value="Disabled"
    aria-label="Disabled"
  ></minerva-input>
  <minerva-input
    invalid
    value="Invalid value"
    aria-label="Invalid"
  ></minerva-input>
</div>

```
