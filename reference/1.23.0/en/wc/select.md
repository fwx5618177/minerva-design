# Select

A single-choice dropdown with full keyboard support, groups and form integration.

Package: minerva-design@1.23.0

Renderer: wc

Locale: en

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

### Behavior and accessibility

The trigger is a button with the combobox role (aria-haspopup="listbox"). Click, Enter, Space, Arrow Down / Arrow Up, Home or End open the listbox and focus the selected option (or the first enabled one). Arrow keys move without wrapping and skip disabled options; Home / End and Page Up / Page Down jump. Enter or Space selects, closes and returns focus to the trigger; Escape closes without selecting; Tab closes and continues to the next field.

Typing letters on the closed trigger changes the selection directly, like a native select; while open it moves the highlight. Use textValue on options whose content is not plain text.

The listbox is anchored below the trigger, at least as wide as it, flips above when there is not enough room and scrolls when its options do not fit the viewport. This is the same popper positioning as every other overlay of the library: it is predictable on touch screens and small viewports and keeps the trigger visible. Positioning the list over the trigger with the selected option aligned ("item-aligned") is a macOS idiom and was deliberately not used.

A hidden native select carries name, required and disabled: the value is part of FormData, required takes part in native constraint validation, and resetting the form restores defaultValue. The placeholder shows while the value is undefined or an empty string.

The listbox is portalled into the theme container of the closest ConfigProvider. Inside a Modal or Drawer, Escape closes only the listbox.

## Select

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/select",
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
    "name": "open",
    "typeText": "boolean",
    "attribute": "open",
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
  },
  {
    "name": "options",
    "typeText": "Array<SelectOptionData | SelectOptionGroupData>",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "input",
    "typeText": "Event",
    "description": "The value changed (native-like, composed)"
  },
  {
    "name": "change",
    "typeText": "Event",
    "description": "The value changed (native-like)"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:80ac7da3b32be412864a"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The user selected an option (`detail: { value }`)"
  },
  {
    "name": "minerva-open-change",
    "typeText": "CustomEvent<{ open: boolean; }>",
    "detailType": {
      "typeText": "{ open: boolean; }",
      "typeRef": "type:d1cfae4ed0c75ef94903"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The user opened / closed the listbox (`detail: { open }`); cancelable: `preventDefault()` keeps the current state"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "`<minerva-option>`, `<minerva-option-group>`, `<minerva-select-separator>` elements"
  }
]
```

## SelectGroup

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/option-group",
  "exports": [],
  "kind": "side-effect"
}
```

### slots

```json
[
  {
    "name": "default",
    "description": "A `<minerva-select-label>` and `<minerva-option>` elements"
  }
]
```

## SelectItem

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/option",
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
    "name": "textValue",
    "typeText": "string | undefined",
    "attribute": "text-value",
    "required": false
  },
  {
    "name": "selected",
    "typeText": "boolean",
    "required": false
  },
  {
    "name": "highlighted",
    "typeText": "boolean",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Content of the option (text, icon...)"
  }
]
```

## SelectLabel

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/select-label",
  "exports": [],
  "kind": "side-effect"
}
```

### slots

```json
[
  {
    "name": "default",
    "description": "Label text"
  }
]
```

## SelectSeparator

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/select-separator",
  "exports": [],
  "kind": "side-effect"
}
```

## API

```json
{
  "wc:minerva-option": {
    "kind": "element",
    "source": "web-components/src/components/select/option.ts",
    "className": "MinervaOption",
    "summary": "Selectable option of a select.",
    "description": "An option of a `<minerva-select>` (`<SelectItem>` of React). The element itself is the `role=\"option\"` (it receives focus while the listbox is open); its content is the option's label.",
    "properties": [
      {
        "name": "value",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Value of the option (must not be empty)"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Prevents selecting the option"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Text shown in the select's trigger when selected (default: the text content)"
      },
      {
        "name": "textValue",
        "attribute": "text-value",
        "type": "string | undefined",
        "description": "Text used for typeahead when the content is not plain text"
      },
      {
        "name": "selected",
        "type": "boolean",
        "default": "false",
        "description": "Whether the option is the selected one (managed by the select)"
      },
      {
        "name": "highlighted",
        "type": "boolean",
        "default": "false",
        "description": "Whether the option is highlighted (managed by the select)"
      },
      {
        "name": "text",
        "type": "string",
        "readonly": true,
        "description": "Text of the option: `textValue`, else `label`, else its text content."
      },
      {
        "name": "displayLabel",
        "type": "string",
        "readonly": true,
        "description": "Label shown in the trigger: `label`, else the text content."
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Content of the option (text, icon...)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The option row"
      },
      {
        "name": "label",
        "description": "The content wrapper"
      },
      {
        "name": "indicator",
        "description": "The check mark (while selected)"
      }
    ],
    "cssProperties": [
      {
        "name": "--select-height",
        "description": "Height of the trigger (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--select-padding-x",
        "description": "Horizontal padding of the trigger (every size)"
      },
      {
        "name": "--select-radius",
        "description": "Corner radius of the trigger and of the listbox (defaults to --radius-lg)"
      },
      {
        "name": "--select-font-size",
        "description": "Font size of the trigger (every size)"
      },
      {
        "name": "--select-border-color",
        "description": "Border color of the trigger at rest"
      },
      {
        "name": "--select-dropdown-max-height",
        "description": "Maximum height of the listbox before it scrolls"
      },
      {
        "name": "--select-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--select-option-padding-x",
        "description": "Horizontal padding of an option and of a group label (follows the density's row padding)"
      }
    ]
  },
  "wc:minerva-option-group": {
    "kind": "element",
    "source": "web-components/src/components/select/option.ts",
    "className": "MinervaOptionGroup",
    "summary": "Group of select options.",
    "description": "Groups options of a `<minerva-select>` (`<SelectGroup>` of React, `role=\"group\"`), labelled by its `<minerva-select-label>` child.",
    "properties": [],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "A `<minerva-select-label>` and `<minerva-option>` elements"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The group wrapper"
      }
    ],
    "cssProperties": [
      {
        "name": "--select-height",
        "description": "Height of the trigger (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--select-padding-x",
        "description": "Horizontal padding of the trigger (every size)"
      },
      {
        "name": "--select-radius",
        "description": "Corner radius of the trigger and of the listbox (defaults to --radius-lg)"
      },
      {
        "name": "--select-font-size",
        "description": "Font size of the trigger (every size)"
      },
      {
        "name": "--select-border-color",
        "description": "Border color of the trigger at rest"
      },
      {
        "name": "--select-dropdown-max-height",
        "description": "Maximum height of the listbox before it scrolls"
      },
      {
        "name": "--select-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--select-option-padding-x",
        "description": "Horizontal padding of an option and of a group label (follows the density's row padding)"
      }
    ]
  },
  "wc:minerva-select-label": {
    "kind": "element",
    "source": "web-components/src/components/select/option.ts",
    "className": "MinervaSelectLabel",
    "summary": "Heading of a group of select options.",
    "description": "The (non-selectable) heading of a `<minerva-option-group>` (`<SelectLabel>` of React).",
    "properties": [],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Label text"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The label"
      }
    ],
    "cssProperties": [
      {
        "name": "--select-height",
        "description": "Height of the trigger (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--select-padding-x",
        "description": "Horizontal padding of the trigger (every size)"
      },
      {
        "name": "--select-radius",
        "description": "Corner radius of the trigger and of the listbox (defaults to --radius-lg)"
      },
      {
        "name": "--select-font-size",
        "description": "Font size of the trigger (every size)"
      },
      {
        "name": "--select-border-color",
        "description": "Border color of the trigger at rest"
      },
      {
        "name": "--select-dropdown-max-height",
        "description": "Maximum height of the listbox before it scrolls"
      },
      {
        "name": "--select-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--select-option-padding-x",
        "description": "Horizontal padding of an option and of a group label (follows the density's row padding)"
      }
    ]
  },
  "wc:minerva-select-separator": {
    "kind": "element",
    "source": "web-components/src/components/select/option.ts",
    "className": "MinervaSelectSeparator",
    "summary": "Divider between select options.",
    "description": "A presentational divider between select options or groups (`<SelectSeparator>` of React), hidden from assistive technologies.",
    "properties": [],
    "methods": [],
    "events": [],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The line"
      }
    ],
    "cssProperties": [
      {
        "name": "--select-height",
        "description": "Height of the trigger (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--select-padding-x",
        "description": "Horizontal padding of the trigger (every size)"
      },
      {
        "name": "--select-radius",
        "description": "Corner radius of the trigger and of the listbox (defaults to --radius-lg)"
      },
      {
        "name": "--select-font-size",
        "description": "Font size of the trigger (every size)"
      },
      {
        "name": "--select-border-color",
        "description": "Border color of the trigger at rest"
      },
      {
        "name": "--select-dropdown-max-height",
        "description": "Maximum height of the listbox before it scrolls"
      },
      {
        "name": "--select-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--select-option-padding-x",
        "description": "Horizontal padding of an option and of a group label (follows the density's row padding)"
      }
    ]
  },
  "wc:minerva-select": {
    "kind": "element",
    "source": "web-components/src/components/select/select.ts",
    "className": "MinervaSelect",
    "summary": "Single-choice dropdown (select-only combobox + listbox).",
    "description": "Single-choice dropdown (`<Select>` of React) following the WAI-ARIA \"select-only combobox\" pattern: a `<button role=\"combobox\">` trigger and a `role=\"listbox\"` popup anchored below it (flips above when there is no room, at least as wide as the trigger, height capped to the viewport). Options are `<minerva-option>` children (optionally in `<minerva-option-group>` with a `<minerva-select-label>`, separated by `<minerva-select-separator>`) and / or the `options` property (rendered before the children). Keyboard: Enter / Space / ArrowDown / ArrowUp / Home / End open the listbox (DOM focus moves to the highlighted option); typing on the closed trigger selects the matching option without opening; in the listbox the arrows (no wrap, disabled options skipped), Home / End, PageUp / PageDown and typeahead move, Enter / Space / Alt+ArrowUp select, Escape closes (topmost layer only) and Tab closes, focus returning to the trigger. Form-associated: submits `value` under `name`, `required` makes an empty value invalid (`valueMissing`), `form.reset()` restores the `value` attribute, `<fieldset disabled>` disables it.",
    "properties": [
      {
        "name": "defaultValue",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Initially selected value, restored by `form.reset()` (the `value` attribute)"
      },
      {
        "name": "open",
        "attribute": "open",
        "type": "boolean",
        "default": "false",
        "description": "Whether the listbox is open"
      },
      {
        "name": "placeholder",
        "attribute": "placeholder",
        "type": "string",
        "default": "\"\"",
        "description": "Text shown in the trigger while nothing is selected"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Size of the trigger"
      },
      {
        "name": "invalid",
        "attribute": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Error state; sets aria-invalid"
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
        "description": "Selected value (property; the `value` attribute sets `defaultValue`)"
      },
      {
        "name": "options",
        "type": "Array<SelectOptionData | SelectOptionGroupData>",
        "default": "[]",
        "description": "Options rendered before the `<minerva-option>` children"
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
        "name": "show",
        "signature": "() => void",
        "description": "Opens the listbox"
      },
      {
        "name": "hide",
        "signature": "() => void",
        "description": "Closes the listbox"
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
        "name": "input",
        "description": "The value changed (native-like, composed)"
      },
      {
        "name": "change",
        "description": "The value changed (native-like)"
      },
      {
        "name": "minerva-change",
        "description": "The user selected an option (`detail: { value }`)"
      },
      {
        "name": "minerva-open-change",
        "description": "The user opened / closed the listbox (`detail: { open }`); cancelable: `preventDefault()` keeps the current state"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "`<minerva-option>`, `<minerva-option-group>`, `<minerva-select-separator>` elements"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The trigger (`<button role=combobox>`)"
      },
      {
        "name": "value",
        "description": "The selected label / placeholder"
      },
      {
        "name": "icon",
        "description": "The chevron"
      },
      {
        "name": "content",
        "description": "The listbox popup (`role=listbox`)"
      },
      {
        "name": "item",
        "description": "An option rendered from the `options` property"
      },
      {
        "name": "item--selected",
        "description": "Item state of `item`: selected"
      },
      {
        "name": "item--highlighted",
        "description": "Item state of `item`: highlighted"
      },
      {
        "name": "item--disabled",
        "description": "Item state of `item`: disabled"
      },
      {
        "name": "group-label",
        "description": "A group heading rendered from the `options` property"
      }
    ],
    "cssProperties": [
      {
        "name": "--select-height",
        "description": "Height of the trigger (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--select-padding-x",
        "description": "Horizontal padding of the trigger (every size)"
      },
      {
        "name": "--select-radius",
        "description": "Corner radius of the trigger and of the listbox (defaults to --radius-lg)"
      },
      {
        "name": "--select-font-size",
        "description": "Font size of the trigger (every size)"
      },
      {
        "name": "--select-border-color",
        "description": "Border color of the trigger at rest"
      },
      {
        "name": "--select-dropdown-max-height",
        "description": "Maximum height of the listbox before it scrolls"
      },
      {
        "name": "--select-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--select-option-padding-x",
        "description": "Horizontal padding of an option and of a group label (follows the density's row padding)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Select": {
    "kind": "cssVars",
    "source": "react/src/components/Select",
    "vars": [
      {
        "name": "--select-height",
        "description": "Height of the trigger (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--select-padding-x",
        "description": "Horizontal padding of the trigger (every size)"
      },
      {
        "name": "--select-radius",
        "description": "Corner radius of the trigger and of the listbox (defaults to --radius-lg)"
      },
      {
        "name": "--select-font-size",
        "description": "Font size of the trigger (every size)"
      },
      {
        "name": "--select-border-color",
        "description": "Border color of the trigger at rest"
      },
      {
        "name": "--select-dropdown-max-height",
        "description": "Maximum height of the listbox before it scrolls"
      },
      {
        "name": "--select-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--select-option-padding-x",
        "description": "Horizontal padding of an option and of a group label (follows the density's row padding)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

<minerva-option> children are the options; a wrapping <label> or aria-label names the select. size sets the trigger size, a disabled option cannot be picked.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/select/wc/basic.html

```html
<div style="display: grid; gap: 12px; max-width: 280px">
  <label style="display: grid; gap: 4px">
    Fruit
    <minerva-select placeholder="Pick a fruit">
      <minerva-option value="apple">Apple</minerva-option>
      <minerva-option value="banana">Banana</minerva-option>
      <minerva-option value="cherry">Cherry</minerva-option>
      <minerva-option value="durian" disabled
        >Durian (out of stock)</minerva-option
      >
      <minerva-option value="grape">Grape</minerva-option>
    </minerva-select>
  </label>
  <minerva-select aria-label="Small" size="small" value="s">
    <minerva-option value="s">Small</minerva-option>
    <minerva-option value="m">Medium</minerva-option>
  </minerva-select>
  <minerva-select aria-label="Large" size="large" value="l">
    <minerva-option value="m">Medium</minerva-option>
    <minerva-option value="l">Large</minerva-option>
  </minerva-select>
  <minerva-select aria-label="Disabled" placeholder="Disabled" disabled>
    <minerva-option value="a">A</minerva-option>
  </minerva-select>
</div>

```

## Example: In a form

The element is form-associated: it submits its value under name, required blocks submission while empty, Reset restores the value attribute and a disabled <fieldset> disables it.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/select/wc/form.html

```html
<form id="order" style="display: grid; gap: 12px; max-width: 320px">
  <fieldset
    id="fields"
    style="display: grid; gap: 12px; border: 0; padding: 0; margin: 0"
  >
    <label style="display: grid; gap: 4px">
      Shipping
      <minerva-select name="shipping" value="standard">
        <minerva-option value="standard">Standard (3–5 days)</minerva-option>
        <minerva-option value="express">Express (1–2 days)</minerva-option>
      </minerva-select>
    </label>
    <label style="display: grid; gap: 4px">
      Gift wrap (required)
      <minerva-select name="wrap" placeholder="Choose a wrap" required>
        <minerva-option value="none">No wrap</minerva-option>
        <minerva-option value="paper">Paper</minerva-option>
        <minerva-option value="box">Box</minerva-option>
      </minerva-select>
    </label>
  </fieldset>
  <label style="display: flex; gap: 6px; align-items: center">
    <input id="disable" type="checkbox" /> Disable the fieldset
  </label>
  <div style="display: flex; gap: 8px">
    <minerva-button type="submit">Order</minerva-button>
    <minerva-button type="reset" variant="ghost" color="neutral"
      >Reset</minerva-button
    >
  </div>
  <output id="result"></output>
</form>

```

### apps/docs/src/docs/pages/select/wc/form.ts

```tsx
// The select is form-associated: it submits `value` under `name`, `required`
// blocks submission while empty, form.reset() restores the `value`
// attribute and a disabled <fieldset> disables it.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#order")!;
  const fields = root.querySelector<HTMLFieldSetElement>("#fields")!;
  const disable = root.querySelector<HTMLInputElement>("#disable")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    result.value = JSON.stringify(Object.fromEntries(new FormData(form)));
  };
  const onReset = () => {
    result.value = "";
    fields.disabled = false;
  };
  const onToggle = () => (fields.disabled = disable.checked);
  form.addEventListener("submit", onSubmit);
  form.addEventListener("reset", onReset);
  disable.addEventListener("change", onToggle);
  return () => {
    form.removeEventListener("submit", onSubmit);
    form.removeEventListener("reset", onReset);
    disable.removeEventListener("change", onToggle);
  };
}

```

## Example: Groups and rich options

<minerva-option-group> with a <minerva-select-label> heading groups options, <minerva-select-separator> divides them. For options with rich content, label sets the text shown in the trigger and text-value the typeahead text.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/select/wc/groups.html

```html
<div style="display: grid; gap: 12px; max-width: 320px">
  <minerva-select aria-label="Time zone" placeholder="Select a time zone">
    <minerva-option-group>
      <minerva-select-label>Europe</minerva-select-label>
      <minerva-option value="europe/london">London (UTC+0)</minerva-option>
      <minerva-option value="europe/paris">Paris (UTC+1)</minerva-option>
      <minerva-option value="europe/berlin">Berlin (UTC+1)</minerva-option>
    </minerva-option-group>
    <minerva-select-separator></minerva-select-separator>
    <minerva-option-group>
      <minerva-select-label>Asia</minerva-select-label>
      <minerva-option value="asia/shanghai">Shanghai (UTC+8)</minerva-option>
      <minerva-option value="asia/tokyo">Tokyo (UTC+9)</minerva-option>
    </minerva-option-group>
  </minerva-select>
  <minerva-select aria-label="Status" value="online">
    <minerva-option value="online" label="Online" text-value="Online">
      <span aria-hidden="true">🟢</span> Online
      <small style="opacity: 0.7">— visible to everyone</small>
    </minerva-option>
    <minerva-option value="away" label="Away" text-value="Away">
      <span aria-hidden="true">🟡</span> Away
      <small style="opacity: 0.7">— notifications muted</small>
    </minerva-option>
    <minerva-option value="offline" label="Offline" text-value="Offline">
      <span aria-hidden="true">⚪</span> Offline
      <small style="opacity: 0.7">— appear offline</small>
    </minerva-option>
  </minerva-select>
</div>

```

## Example: Options from data and events

The options JS property takes flat options and labelled groups. minerva-change reports the picked value; minerva-open-change is cancelable — check the box to keep the listbox closed.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/select/wc/options-property.html

```html
<div style="display: grid; gap: 12px; max-width: 320px">
  <minerva-select
    id="country"
    aria-label="Country"
    placeholder="Choose a country"
  >
  </minerva-select>
  <label style="display: flex; gap: 6px; align-items: center">
    <input id="lock" type="checkbox" />
    Keep closed (cancel minerva-open-change)
  </label>
  <output id="log"></output>
</div>

```

### apps/docs/src/docs/pages/select/wc/options-property.ts

```tsx
// `options` is a JS property (flat options and / or labelled groups),
// rendered before any <minerva-option> children. minerva-open-change is
// cancelable: preventDefault() keeps the listbox closed.
type Option = { value: string; label: string; disabled?: boolean };
type Group = { label: string; options: Option[] };

export function setup(root: HTMLElement) {
  const select = root.querySelector<
    HTMLElement & { options: Array<Option | Group> }
  >("#country")!;
  const lock = root.querySelector<HTMLInputElement>("#lock")!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  select.options = [
    {
      label: "Europe",
      options: [
        { value: "fr", label: "France" },
        { value: "de", label: "Germany" },
        { value: "it", label: "Italy", disabled: true },
      ],
    },
    {
      label: "Asia",
      options: [
        { value: "cn", label: "China" },
        { value: "jp", label: "Japan" },
      ],
    },
  ];
  const onChange = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    log.value = `minerva-change: ${value}`;
  };
  const onOpenChange = (event: Event) => {
    if (lock.checked) event.preventDefault();
  };
  select.addEventListener("minerva-change", onChange);
  select.addEventListener("minerva-open-change", onOpenChange);
  return () => {
    select.removeEventListener("minerva-change", onChange);
    select.removeEventListener("minerva-open-change", onOpenChange);
  };
}

```
