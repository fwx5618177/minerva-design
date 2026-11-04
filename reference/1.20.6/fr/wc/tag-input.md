# TagInput

Saisie libre d’étiquettes avec suggestions : Entrée, le bouton d’ajout ou la perte du focus ajoutent la saisie, les flèches choisissent une suggestion et la composition IME ne valide jamais.

Package: minerva-design@1.20.6

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "99b9ad1465abc6ea97d2a8c008f3026645edb983",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:d66e13eea732bfeb1a6aaa7461bf92ea0d54944072977e762c106b87e877d062"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

## TagInput

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/tag-input",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "defaultValue",
    "typeText": "string[]",
    "attribute": "value",
    "required": false
  },
  {
    "name": "options",
    "typeText": "string[]",
    "attribute": "options",
    "required": false
  },
  {
    "name": "separators",
    "typeText": "string[]",
    "attribute": "separators",
    "required": false
  },
  {
    "name": "noCommitOnBlur",
    "typeText": "boolean",
    "attribute": "no-commit-on-blur",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string",
    "attribute": "placeholder",
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
    "name": "emptyText",
    "typeText": "string | undefined",
    "attribute": "empty-text",
    "required": false
  },
  {
    "name": "addLabel",
    "typeText": "string | undefined",
    "attribute": "add-label",
    "required": false
  },
  {
    "name": "clearLabel",
    "typeText": "string | undefined",
    "attribute": "clear-label",
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
    "typeText": "string[]",
    "required": false
  },
  {
    "name": "removeLabel",
    "typeText": "(tag: string) => string | undefined",
    "required": false
  },
  {
    "name": "createLabel",
    "typeText": "(tag: string) => string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-change",
    "typeText": "CustomEvent",
    "description": "The tags changed (addition, removal, clearing); `detail: { value }`"
  },
  {
    "name": "minerva-input",
    "typeText": "CustomEvent",
    "description": "The typed text (draft) changed; `detail: { value }` (the draft)"
  },
  {
    "name": "minerva-open-change",
    "typeText": "CustomEvent",
    "description": "The suggestion list is about to open / close (`detail: { open }`); cancelable: `preventDefault()` keeps the current state"
  },
  {
    "name": "minerva-clear",
    "typeText": "CustomEvent",
    "description": "The clear button removed every tag"
  }
]
```

## API

```json
{
  "wc:minerva-tag-input": {
    "kind": "element",
    "source": "web-components/src/components/tag-input/tag-input.ts",
    "className": "MinervaTagInput",
    "summary": "Tag field: type, paste or pick suggestions to build a list of tags.",
    "description": "Free-form tag field with suggestions (`<TagInput>` of React). Enter, the add button and blur add the trimmed draft; typed or pasted `separators` split text into tags; ArrowUp / ArrowDown pick a suggestion (`options`); Escape discards the draft; Backspace in an empty draft removes the last tag. IME composition never commits. Duplicates are ignored. Form-associated: every tag is submitted under `name` (one entry per tag, `formData.getAll(name)`; the draft is not submitted), supports `required`, `form.reset()` (restores the `value` attribute) and `<fieldset disabled>`. Name it with `<label for>`, `aria-label` or `aria-labelledby`. The suggestion list is a `popover=\"manual\"` panel in the shadow root (top layer, anchored below the field); Escape (topmost layer only) and outside interactions close it, focus stays in the text input.",
    "properties": [
      {
        "name": "defaultValue",
        "attribute": "value",
        "type": "string[]",
        "default": "[]",
        "description": "Initial tags, restored by `form.reset()`: the `value` attribute, a JSON array (`'[\"a\",\"b\"]'`) or comma-separated text (`\"a, b\"`). Until the user edits the tags, changing it also changes `value`"
      },
      {
        "name": "options",
        "attribute": "options",
        "type": "string[]",
        "default": "[]",
        "description": "Suggestions; already selected tags are hidden and duplicates merged (`options` attribute: JSON array or comma-separated text)"
      },
      {
        "name": "separators",
        "attribute": "separators",
        "type": "string[]",
        "default": "[...DEFAULT_SEPARATORS]",
        "description": "Keys that commit the draft: a literal string (e.g. \",\" or \";\") splits the typed or pasted text into tags; \"Enter\" commits on the Enter key (and also splits pasted text on line breaks). Attribute: a JSON array or whitespace-separated values (`separators=\"; Enter\"`)"
      },
      {
        "name": "noCommitOnBlur",
        "attribute": "no-commit-on-blur",
        "type": "boolean",
        "default": "false",
        "description": "Does not add the typed draft as a tag when the field loses focus"
      },
      {
        "name": "placeholder",
        "attribute": "placeholder",
        "type": "string",
        "default": "\"\"",
        "description": "Placeholder of the text input"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Size of the text input"
      },
      {
        "name": "invalid",
        "attribute": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Error state; sets aria-invalid on the text input"
      },
      {
        "name": "readOnly",
        "attribute": "readonly",
        "type": "boolean",
        "default": "false",
        "description": "Shows the tags without editing controls (still submitted)"
      },
      {
        "name": "emptyText",
        "attribute": "empty-text",
        "type": "string | undefined",
        "description": "Text of the suggestion list when nothing matches (default: localized \"No matches\")"
      },
      {
        "name": "addLabel",
        "attribute": "add-label",
        "type": "string | undefined",
        "description": "Accessible label of the add button (default: localized \"Add tag\")"
      },
      {
        "name": "clearLabel",
        "attribute": "clear-label",
        "type": "string | undefined",
        "description": "Accessible label of the clear button (default: localized \"Clear tags\")"
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
        "type": "string[]",
        "description": "Selected tags (property only; the `value` attribute sets `defaultValue`). Assign a new array: in-place mutations are not observed"
      },
      {
        "name": "removeLabel",
        "type": "(tag: string) => string | undefined",
        "description": "Accessible label of a tag's remove button (default: localized `Remove ${tag}`)"
      },
      {
        "name": "createLabel",
        "type": "(tag: string) => string | undefined",
        "description": "Text of the \"create this tag\" suggestion (default: localized `Add \"${tag}\"`)"
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
        "name": "minerva-change",
        "description": "The tags changed (addition, removal, clearing); `detail: { value }`"
      },
      {
        "name": "minerva-input",
        "description": "The typed text (draft) changed; `detail: { value }` (the draft)"
      },
      {
        "name": "minerva-open-change",
        "description": "The suggestion list is about to open / close (`detail: { open }`); cancelable: `preventDefault()` keeps the current state"
      },
      {
        "name": "minerva-clear",
        "description": "The clear button removed every tag"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The wrapper"
      },
      {
        "name": "tags",
        "description": "The list of tags"
      },
      {
        "name": "tag",
        "description": "A tag (web components only: React renders a Tag, styled with its own hooks)"
      },
      {
        "name": "remove-button",
        "description": "The remove button of a tag (web components only, see tag)"
      },
      {
        "name": "control",
        "description": "The text field box (web components only: React renders an Input, styled with its own hooks)"
      },
      {
        "name": "input",
        "description": "The native text <input> (role=\"combobox\"; web components only, see control)"
      },
      {
        "name": "list",
        "description": "The suggestion list (role=listbox, while open)"
      },
      {
        "name": "option",
        "description": "A suggestion (role=option; the highlighted one has aria-selected=\"true\")"
      },
      {
        "name": "option--highlighted",
        "description": "Item state of `option`: highlighted"
      },
      {
        "name": "empty",
        "description": "The text shown when no suggestion matches"
      },
      {
        "name": "add-button",
        "description": "The add button (web components only: React renders an IconButton, styled with its own hooks)"
      },
      {
        "name": "clear-button",
        "description": "The clear button (web components only: React renders an IconButton, styled with its own hooks)"
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
      },
      {
        "name": "--tag-height",
        "description": "Minimum height (every size; default: the content height)"
      },
      {
        "name": "--tag-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--tag-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--tag-radius",
        "description": "Corner radius of the rounded shape (defaults to --radius-sm)"
      },
      {
        "name": "--tag-gap",
        "description": "Space between the icon, the label and the close button"
      },
      {
        "name": "--tag-ring-color",
        "description": "Color of the hairline ring of the tinted (default) variant (defaults to the text color at 16%)"
      },
      {
        "name": "--tag-input-gap",
        "description": "Space between the tags and between the tags and the entry row"
      },
      {
        "name": "--tag-input-tag-min-height",
        "description": "Minimum height of a tag (defaults to the density's small control height)"
      },
      {
        "name": "--tag-input-list-max-height",
        "description": "Maximum height of the suggestion list before it scrolls"
      },
      {
        "name": "--tag-input-list-radius",
        "description": "Corner radius of the suggestion list (defaults to --radius-md)"
      },
      {
        "name": "--tag-input-option-padding-y",
        "description": "Vertical padding of a suggestion (follows the density's row padding)"
      },
      {
        "name": "--tag-input-option-padding-x",
        "description": "Horizontal padding of a suggestion (follows the density's row padding)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:TagInput": {
    "kind": "cssVars",
    "source": "react/src/components/TagInput",
    "vars": [
      {
        "name": "--tag-input-gap",
        "description": "Space between the tags and between the tags and the entry row"
      },
      {
        "name": "--tag-input-tag-min-height",
        "description": "Minimum height of a tag (defaults to the density's small control height)"
      },
      {
        "name": "--tag-input-list-max-height",
        "description": "Maximum height of the suggestion list before it scrolls"
      },
      {
        "name": "--tag-input-list-radius",
        "description": "Corner radius of the suggestion list (defaults to --radius-md)"
      },
      {
        "name": "--tag-input-option-padding-y",
        "description": "Vertical padding of a suggestion (follows the density's row padding)"
      },
      {
        "name": "--tag-input-option-padding-x",
        "description": "Horizontal padding of a suggestion (follows the density's row padding)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

Saisissez un tag puis Entrée, ou choisissez une suggestion avec les flèches. value est une propriété ; minerva-change signale chaque nouvelle liste.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tag-input/wc/basic.html

```html
<minerva-tag-input
  id="tags"
  aria-label="Tags"
  placeholder="Type a tag and press Enter"
  value="React"
  options="React, Vue, Svelte, Solid"
></minerva-tag-input>
<output id="result" style="display: block; margin-top: 8px"></output>

```

### apps/docs/src/docs/pages/tag-input/wc/basic.ts

```tsx
// `value` is a property holding a new array after every change; the
// `value` attribute only sets the initial tags.
export function setup(root: HTMLElement) {
  const tags = root.querySelector<HTMLElement & { value: string[] }>("#tags")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  const show = () => (result.value = `Tags: ${tags.value.join(", ") || "—"}`);
  show();
  tags.addEventListener("minerva-change", show);
  return () => tags.removeEventListener("minerva-change", show);
}

```

## Example: Dans un formulaire

L'élément est associé aux formulaires : chaque tag est envoyé comme une entrée distincte sous name, required refuse une liste vide et Réinitialiser rétablit l'attribut value.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tag-input/wc/form.html

```html
<form id="article" style="display: grid; gap: 8px">
  <label for="article-tags">Article tags</label>
  <minerva-tag-input
    id="article-tags"
    name="tags"
    value='["news", "tech"]'
    options="news, tech, science, culture, sport"
    required
  ></minerva-tag-input>
  <div style="display: flex; gap: 8px">
    <minerva-button type="submit">Publish</minerva-button>
    <minerva-button type="reset" variant="ghost" color="neutral"
      >Reset</minerva-button
    >
  </div>
  <output id="result"></output>
</form>

```

### apps/docs/src/docs/pages/tag-input/wc/form.ts

```tsx
// Every tag is submitted as its own `tags` entry; `required` blocks an
// empty list and form.reset() restores the `value` attribute.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#article")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    result.value = `tags = ${JSON.stringify(new FormData(form).getAll("tags"))}`;
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

## Example: Séparateurs

separators=", ; Enter" découpe le texte saisi ou collé en tags. Avec no-commit-on-blur, quitter le champ garde le brouillon sous forme de texte.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tag-input/wc/separators.html

```html
<minerva-tag-input
  aria-label="Recipients"
  placeholder='Type or paste "a; b, c"'
  value="alice@example.com"
  separators=", ; Enter"
  no-commit-on-blur
></minerva-tag-input>

```

## Example: Tailles et états

Trois tailles, invalid, readonly (tags affichés sans contrôles d'édition, toujours envoyés) et disabled.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tag-input/wc/states.html

```html
<div style="display: grid; gap: 12px">
  <minerva-tag-input
    aria-label="Small"
    size="small"
    value="small"
  ></minerva-tag-input>
  <minerva-tag-input
    aria-label="Large"
    size="large"
    value="large"
  ></minerva-tag-input>
  <minerva-tag-input
    aria-label="Invalid"
    invalid
    value="invalid"
  ></minerva-tag-input>
  <minerva-tag-input
    aria-label="Read-only"
    readonly
    value="archived, 2024"
  ></minerva-tag-input>
  <minerva-tag-input
    aria-label="Disabled"
    disabled
    value="locked"
  ></minerva-tag-input>
</div>

```
