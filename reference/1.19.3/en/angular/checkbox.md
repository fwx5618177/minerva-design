# Checkbox

Lets users select one or more options, with indeterminate, error and custom styling support.

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

## Checkbox

Support: beta

Native Angular: MnCheckbox. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCheckbox"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "checked",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  },
  {
    "name": "defaultChecked",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  },
  {
    "name": "indeterminate",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  },
  {
    "name": "shape",
    "typeText": "CheckboxShape",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  },
  {
    "name": "size",
    "typeText": "CheckboxSize",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  },
  {
    "name": "label",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  },
  {
    "name": "color",
    "typeText": "CheckboxColor",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  },
  {
    "name": "value",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  },
  {
    "name": "icon",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  },
  {
    "name": "required",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  },
  {
    "name": "error",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  },
  {
    "name": "errorIcon",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  },
  {
    "name": "helperText",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  },
  {
    "name": "labelPlacement",
    "typeText": "CheckboxLabelPlacement",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts"
  }
]
```

### events

```json
[
  {
    "name": "checkedChange",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/checkbox/checkbox.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
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

## Example: Selection

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCheckbox } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCheckbox],
  template: `
<mn-checkbox label="Accept the terms" [(checked)]="accepted"/><output>{{accepted?'Accepted':'Not accepted'}}</output>
  `,
})
export class Example {
  accepted = false;
}

```

## Example: States

Disabled checkboxes, and required for use in native forms.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCheckbox, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCheckbox, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><mn-checkbox label="Selected" [checked]="true"/><mn-checkbox label="Mixed" indeterminate/><mn-checkbox label="Disabled" disabled/></mn-stack>
  `,
})
export class Example {

}

```
