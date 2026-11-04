# Checkbox

Lets users select one or more options, with indeterminate, error and custom styling support.

Package: minerva-design@1.20.6

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

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
