# FormControl 表单控件

字段容器：关联标签、控件、帮助文本和错误信息，并将无效 / 必填 / 禁用 / 只读状态共享给控件。

Package: minerva-design@1.22.2

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

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
