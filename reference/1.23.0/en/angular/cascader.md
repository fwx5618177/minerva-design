# Cascader

Selects a value from a hierarchy of options, one level at a time (e.g. country / region / city).

Package: minerva-design@1.23.0

Renderer: angular

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

### Keyboard and accessibility

Enter, Space or Arrow Down on the input opens the panel and moves focus into it; focusing the input alone does not open it.

Arrow Up / Arrow Down, Home and End move within a column.

Arrow Right or Enter expands the next column (also after lazy loading) and Enter selects a leaf; Arrow Left goes back to the previous column.

Escape closes the panel and returns focus to the input; Tab closes it.

The input has the combobox role. Its default placeholder and the "Clear selection" button label follow the React library's locale.

## Cascader

Support: beta

Native Angular: MnCascader. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCascader"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string",
    "required": true,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "name",
    "typeText": "string",
    "required": true,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "options",
    "typeText": "CascaderOption[]",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "value",
    "typeText": "CascaderValue | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "CascaderValue | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "open",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "displayRender",
    "typeText": "((labels: string[], selectedOptions: CascaderOption[]) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "allowClear",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "expandTrigger",
    "typeText": "\"click\" | \"hover\"",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "required",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "invalid",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "showSearch",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "filter",
    "typeText": "((inputValue: string, path: CascaderOption[]) => boolean) | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "loadData",
    "typeText": "((selectedOptions: CascaderOption[]) => void) | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "dropdownClassName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "optionRender",
    "typeText": "TemplateRef<CascaderOptionContext> | null",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "width",
    "typeText": "string | number",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "maxLevel",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "dropdownStyle",
    "typeText": "CascaderStyle | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "optionStyle",
    "typeText": "CascaderStyle | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "CascaderValue | undefined",
    "required": false
  },
  {
    "name": "openChange",
    "typeText": "boolean",
    "required": false
  },
  {
    "name": "selectionChange",
    "typeText": "CascaderSelectionChange",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "CascaderSelectionChange",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "clear",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "void",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "search",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts",
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
  "css:Cascader": {
    "kind": "cssVars",
    "source": "react/src/components/Cascader",
    "vars": [
      {
        "name": "--cascader-height",
        "description": "Minimum height of the field (defaults to the density's small control height)"
      },
      {
        "name": "--cascader-radius",
        "description": "Corner radius of the field, the dropdown and the options (defaults to --radius-sm)"
      },
      {
        "name": "--cascader-font-size",
        "description": "Font size of the field and of the options"
      },
      {
        "name": "--cascader-border-color",
        "description": "Border color of the field at rest"
      },
      {
        "name": "--cascader-column-min-width",
        "description": "Minimum width of a column of options"
      },
      {
        "name": "--cascader-dropdown-max-height",
        "description": "Maximum height of the columns before they scroll"
      },
      {
        "name": "--cascader-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--cascader-option-padding-x",
        "description": "Horizontal padding of an option (follows the density's row padding)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Hierarchical selection

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCascader } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCascader],
  template: `
<mn-cascader name="region" label="Region" [options]="options" [(value)]="value"/><output>{{value}}</output>
  `,
})
export class Example {
  options = [
  {
    "value": "europe",
    "label": "Europe",
    "children": [
      {
        "value": "france",
        "label": "France"
      },
      {
        "value": "spain",
        "label": "Spain"
      }
    ]
  },
  {
    "value": "asia",
    "label": "Asia",
    "children": [
      {
        "value": "japan",
        "label": "Japan"
      }
    ]
  }
];
  value: string[] = [];
}

```

## Example: Disabled field

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCascader } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCascader],
  template: `
<mn-cascader name="region" label="Locked region" [options]="options" disabled/>
  `,
})
export class Example {
  options = [
  {
    "value": "global",
    "label": "Global"
  }
];
}

```
