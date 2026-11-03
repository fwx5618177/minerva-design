# Select

A single-choice dropdown with full keyboard support, groups and form integration.

Package: minerva-design@1.19.3

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### Behavior and accessibility

The trigger is a button with the combobox role (aria-haspopup="listbox"). Click, Enter, Space, Arrow Down / Arrow Up, Home or End open the listbox and focus the selected option (or the first enabled one). Arrow keys move without wrapping and skip disabled options; Home / End and Page Up / Page Down jump. Enter or Space selects, closes and returns focus to the trigger; Escape closes without selecting; Tab closes and continues to the next field.

Typing letters on the closed trigger changes the selection directly, like a native select; while open it moves the highlight. Use textValue on options whose content is not plain text.

The listbox is anchored below the trigger, at least as wide as it, flips above when there is not enough room and scrolls when its options do not fit the viewport. This is the same popper positioning as every other overlay of the library: it is predictable on touch screens and small viewports and keeps the trigger visible. Positioning the list over the trigger with the selected option aligned ("item-aligned") is a macOS idiom and was deliberately not used.

A hidden native select carries name, required and disabled: the value is part of FormData, required takes part in native constraint validation, and resetting the form restores defaultValue. The placeholder shows while the value is undefined or an empty string.

The listbox is portalled into the theme container of the closest ConfigProvider. Inside a Modal or Drawer, Escape closes only the listbox.

## Select

Support: beta

Native Angular: MnSelect. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSelect"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "open",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "defaultOpen",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "size",
    "typeText": "SelectSize",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "invalid",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "required",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "className",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "contentClassName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "openChange",
    "typeText": "boolean | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

### bindings

```json
[
  {
    "prop": "value",
    "event": "valueChange",
    "syntax": "[(value)]"
  },
  {
    "prop": "open",
    "event": "openChange",
    "syntax": "[(open)]"
  }
]
```

## SelectGroup

Support: beta

Native Angular: MnSelectGroup. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSelectGroup"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## SelectItem

Support: beta

Native Angular: MnSelectItem. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSelectItem"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string",
    "required": true,
    "source": "packages/angular/src/components/select/select-item.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/select/select-item.ts"
  },
  {
    "name": "textValue",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select-item.ts"
  }
]
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## SelectLabel

Support: beta

Native Angular: MnSelectLabel. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSelectLabel"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## SelectSeparator

Support: beta

Native Angular: MnSelectSeparator. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSelectSeparator"
  ],
  "kind": "named"
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

## Example: Choose a role

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSelect, MnSelectItem } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSelect, MnSelectItem],
  template: `
<mn-select aria-label="Role" [(value)]="value"><mn-select-item value="designer">Designer</mn-select-item><mn-select-item value="engineer">Engineer</mn-select-item><mn-select-item value="admin" disabled>Administrator</mn-select-item></mn-select><output>Role: {{value}}</output>
  `,
})
export class Example {
  value = "designer";
}

```

## Example: Grouped options

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSelect, MnSelectItem, MnSelectGroup, MnSelectLabel, MnSelectSeparator } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSelect, MnSelectItem, MnSelectGroup, MnSelectLabel, MnSelectSeparator],
  template: `
<mn-select aria-label="Location"><mn-select-group><mn-select-label>Europe</mn-select-label><mn-select-item value="london">London</mn-select-item><mn-select-item value="paris">Paris</mn-select-item></mn-select-group><mn-select-separator/><mn-select-item value="tokyo">Tokyo</mn-select-item></mn-select>
  `,
})
export class Example {

}

```
