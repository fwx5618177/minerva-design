# Radio

Lets users pick exactly one option from a set. Use RadioGroup to manage the selection of several radios.

Package: minerva-design@1.20.2

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Radio

Support: beta

Native Angular: MnRadio. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnRadio"
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
    "source": "packages/angular/src/components/radio/radio.ts"
  },
  {
    "name": "defaultChecked",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/radio/radio.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/radio/radio.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/radio/radio.ts"
  },
  {
    "name": "value",
    "typeText": "RadioValue | undefined",
    "required": false,
    "source": "packages/angular/src/components/radio/radio.ts"
  },
  {
    "name": "size",
    "typeText": "RadioSize",
    "required": false,
    "source": "packages/angular/src/components/radio/radio.ts"
  },
  {
    "name": "color",
    "typeText": "RadioColor",
    "required": false,
    "source": "packages/angular/src/components/radio/radio.ts"
  },
  {
    "name": "label",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/radio/radio.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/radio/radio.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/radio/radio.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/radio/radio.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/radio/radio.ts"
  },
  {
    "name": "required",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/radio/radio.ts"
  },
  {
    "name": "error",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/radio/radio.ts"
  },
  {
    "name": "errorIcon",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/radio/radio.ts"
  },
  {
    "name": "errorMessage",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/radio/radio.ts"
  },
  {
    "name": "helperText",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/radio/radio.ts"
  }
]
```

### events

```json
[
  {
    "name": "checkedChange",
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
    "prop": "checked",
    "event": "checkedChange",
    "syntax": "[(checked)]"
  }
]
```

## RadioGroup

Support: beta

Native Angular: MnRadioGroup. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnRadioGroup"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "RadioValue | null | undefined",
    "required": false,
    "source": "packages/angular/src/components/radio/radio-group.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "RadioValue | undefined",
    "required": false,
    "source": "packages/angular/src/components/radio/radio-group.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/radio/radio-group.ts"
  },
  {
    "name": "label",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/radio/radio-group.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/radio/radio-group.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/radio/radio-group.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/radio/radio-group.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/radio/radio-group.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/radio/radio-group.ts"
  },
  {
    "name": "direction",
    "typeText": "RadioGroupDirection",
    "required": false,
    "source": "packages/angular/src/components/radio/radio-group.ts"
  },
  {
    "name": "size",
    "typeText": "RadioSize | undefined",
    "required": false,
    "source": "packages/angular/src/components/radio/radio-group.ts"
  },
  {
    "name": "error",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/radio/radio-group.ts"
  },
  {
    "name": "helperText",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/radio/radio-group.ts"
  },
  {
    "name": "required",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/radio/radio-group.ts"
  },
  {
    "name": "color",
    "typeText": "RadioColor | undefined",
    "required": false,
    "source": "packages/angular/src/components/radio/radio-group.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "RadioValue | null | undefined",
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
  }
]
```

## CSS variables

```json
{
  "css:Radio": {
    "kind": "cssVars",
    "source": "react/src/components/Radio",
    "vars": [
      {
        "name": "--radio-checked-color",
        "description": "Color of the checked mark (defaults to the color prop's accent)"
      },
      {
        "name": "--radio-dot-color",
        "description": "Color of the inner dot of the checked mark"
      },
      {
        "name": "--radio-border-color",
        "description": "Border of the unchecked mark"
      },
      {
        "name": "--radio-background",
        "description": "Background of the unchecked mark"
      },
      {
        "name": "--radio-size",
        "description": "Width and height of the mark (every size)"
      },
      {
        "name": "--radio-gap",
        "description": "Space between the mark and the label"
      },
      {
        "name": "--radio-label-font-size",
        "description": "Font size of the label (every size)"
      },
      {
        "name": "--radio-group-gap",
        "description": "Space between the radios of a RadioGroup"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Choose a plan

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRadioGroup, MnRadio } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRadioGroup, MnRadio],
  template: `
<mn-radio-group label="Plan" [(value)]="plan"><mn-radio value="free" label="Free"/><mn-radio value="pro" label="Pro"/><mn-radio value="enterprise" label="Enterprise" disabled/></mn-radio-group><output>Plan: {{plan}}</output>
  `,
})
export class Example {
  plan = "free";
}

```

## Example: Individual options

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRadio, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRadio, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><mn-radio label="Selected" [checked]="true"/><mn-radio label="Unavailable" disabled/></mn-stack>
  `,
})
export class Example {

}

```
