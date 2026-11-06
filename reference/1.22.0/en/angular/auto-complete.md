# AutoComplete

A text input that suggests matching options while the user types.

Package: minerva-design@1.22.0

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Keyboard and accessibility

Arrow Down / Arrow Up move through the visible options (wrapping around).

Enter selects the active option (disabled options are skipped) without submitting the surrounding form.

Escape closes the dropdown and keeps focus in the input; with the dropdown already closed it clears the text (onChange receives ""). Inside a Modal or Popover only the dropdown closes.

The input exposes the combobox role with aria-expanded, aria-controls and aria-activedescendant pointing to the listbox options.

## AutoComplete

Support: beta

Native Angular: MnAutoComplete. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnAutoComplete"
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
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "open",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "options",
    "typeText": "readonly AutoCompleteOption[]",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "mode",
    "typeText": "AutoCompleteMode",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "groupBy",
    "typeText": "((option: AutoCompleteOption) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "groupMode",
    "typeText": "AutoCompleteGroupMode",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "renderOption",
    "typeText": "TemplateRef<AutoCompleteOptionContext> | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "renderEmpty",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "filterOption",
    "typeText": "((inputValue: string, option: AutoCompleteOption) => boolean) | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "sortOption",
    "typeText": "((a: AutoCompleteOption, b: AutoCompleteOption) => number) | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "placement",
    "typeText": "AutoCompletePlacement",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "offset",
    "typeText": "{ x: number; y: number; }",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "animation",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "dropdownClassName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "autoHighlight",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "fillOnSelect",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "className",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "size",
    "typeText": "AutoCompleteSize",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "variant",
    "typeText": "AutoCompleteVariant",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "invalid",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "required",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "prefix",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "suffix",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "clearable",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "clearLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
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
    "typeText": "boolean",
    "required": false
  },
  {
    "name": "optionSelect",
    "typeText": "AutoCompleteOption",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "AutoCompleteOption",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "optionClick",
    "typeText": "AutoCompleteOption",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "AutoCompleteOption",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "valueSubmit",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
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

## CSS variables

```json
{
  "css:AutoComplete": {
    "kind": "cssVars",
    "source": "react/src/components/AutoComplete",
    "vars": [
      {
        "name": "--auto-complete-dropdown-background",
        "description": "Background of the dropdown"
      },
      {
        "name": "--auto-complete-dropdown-radius",
        "description": "Corner radius of the dropdown (defaults to --radius-lg)"
      },
      {
        "name": "--auto-complete-dropdown-max-height",
        "description": "Maximum height of the option list before it scrolls"
      },
      {
        "name": "--auto-complete-font-size",
        "description": "Font size of the dropdown"
      },
      {
        "name": "--auto-complete-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--auto-complete-option-padding-x",
        "description": "Horizontal padding of an option and of a group label"
      },
      {
        "name": "--auto-complete-option-hover-background",
        "description": "Background of the hovered / keyboard-focused option"
      },
      {
        "name": "--auto-complete-option-highlight-background",
        "description": "Background of options with `highlight: true`"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Search suggestions

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnAutoComplete } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnAutoComplete],
  template: `
<mn-auto-complete label="City" [options]="options" [(value)]="value"/><output>City: {{value}}</output>
  `,
})
export class Example {
  options = [
  {
    "label": "London",
    "value": "London"
  },
  {
    "label": "Lisbon",
    "value": "Lisbon"
  },
  {
    "label": "Lima",
    "value": "Lima"
  },
  {
    "label": "Tokyo",
    "value": "Tokyo"
  }
];
  value = "";
}

```

## Example: Preselected suggestion

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnAutoComplete } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnAutoComplete],
  template: `
<mn-auto-complete label="Language" [options]="options" value="TypeScript"/>
  `,
})
export class Example {
  options = [
  {
    "label": "TypeScript",
    "value": "TypeScript"
  },
  {
    "label": "JavaScript",
    "value": "JavaScript"
  },
  {
    "label": "Rust",
    "value": "Rust"
  }
];
}

```
