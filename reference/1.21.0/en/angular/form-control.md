# FormControl

Field container that links a label, a control, help text and an error message, and shares invalid / required / disabled / read-only state with the control.

Package: minerva-design@1.21.0

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## FormControl

Support: beta

Native Angular: MnFormControl. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnFormControl"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "invalid",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/form-control/form-control.ts"
  },
  {
    "name": "required",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/form-control/form-control.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/form-control/form-control.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/form-control/form-control.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/form-control/form-control.ts"
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

## FormErrorMessage

Support: beta

Native Angular: MnFormErrorMessage. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnFormErrorMessage"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "class",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/form-control/form-control.ts"
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

## FormField

Support: beta

Native Angular: MnFormField. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnFormField"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/form-control/form-control.ts"
  },
  {
    "name": "helperText",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/form-control/form-control.ts"
  },
  {
    "name": "errorMessage",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/form-control/form-control.ts"
  },
  {
    "name": "invalid",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/form-control/form-control.ts"
  },
  {
    "name": "required",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/form-control/form-control.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/form-control/form-control.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/form-control/form-control.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/form-control/form-control.ts"
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

## FormHelperText

Support: beta

Native Angular: MnFormHelperText. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnFormHelperText"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "class",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/form-control/form-control.ts"
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

## FormLabel

Support: beta

Native Angular: MnFormLabel. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnFormLabel"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "requiredIndicator",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/form-control/form-control.ts"
  },
  {
    "name": "htmlFor",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/form-control/form-control.ts"
  },
  {
    "name": "class",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/form-control/form-control.ts"
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
  "css:FormControl": {
    "kind": "cssVars",
    "source": "react/src/components/FormControl",
    "vars": [
      {
        "name": "--form-control-gap",
        "description": "Space between the label, the field and the helper / error text"
      },
      {
        "name": "--form-control-label-font-size",
        "description": "Font size of the label"
      },
      {
        "name": "--form-control-label-color",
        "description": "Color of the label"
      },
      {
        "name": "--form-control-helper-font-size",
        "description": "Font size of the helper and error texts"
      },
      {
        "name": "--form-control-required-color",
        "description": "Color of the required marker"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Labeled field with help

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnFormControl, MnFormHelperText, MnInput } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnFormControl, MnFormHelperText, MnInput],
  template: `
<mn-form-control label="Display name" required><mn-input [(value)]="value"/><mn-form-helper-text>Shown to your teammates.</mn-form-helper-text></mn-form-control><output>{{value}}</output>
  `,
})
export class Example {
  value = "";
}

```

## Example: Validation feedback

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnFormControl, MnFormErrorMessage, MnInput } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnFormControl, MnFormErrorMessage, MnInput],
  template: `
<mn-form-control label="Email" invalid required><mn-input value="invalid-address"/><mn-form-error-message>Enter a valid email address.</mn-form-error-message></mn-form-control>
  `,
})
export class Example {

}

```
