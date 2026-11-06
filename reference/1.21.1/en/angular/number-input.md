# NumberInput

Numeric field (spinbutton) with arrow-key stepping, an optional stepper, min / max clamping and fixed precision; values are committed on blur or Enter.

Package: minerva-design@1.21.1

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## NumberInput

Support: beta

Native Angular: MnNumberInput. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnNumberInput"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "number | null | undefined",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "number | null",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "min",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "max",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "step",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "precision",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "size",
    "typeText": "NumberInputSize",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "invalid",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "showStepper",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "allowEmpty",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "incrementLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "decrementLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "notANumberMessage",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "belowMinMessage",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "aboveMaxMessage",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "required",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/number-input/number-input.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "number | null | undefined",
    "required": false
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
  "css:NumberInput": {
    "kind": "cssVars",
    "source": "react/src/components/NumberInput",
    "vars": [
      {
        "name": "--number-input-height",
        "description": "Height (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--number-input-padding-x",
        "description": "Horizontal padding of the text (defaults to the density's small control padding)"
      },
      {
        "name": "--number-input-radius",
        "description": "Corner radius (defaults to --radius-md)"
      },
      {
        "name": "--number-input-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--number-input-background",
        "description": "Background color"
      },
      {
        "name": "--number-input-border-color",
        "description": "Border color at rest"
      },
      {
        "name": "--number-input-stepper-width",
        "description": "Width of the increment / decrement column"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Quantity

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnNumberInput } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnNumberInput],
  template: `
<mn-number-input aria-label="Quantity" [(value)]="value" [min]="0" [max]="20"/><output>Quantity: {{value}}</output>
  `,
})
export class Example {
  value = 3;
}

```

## Example: Step and bounds

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnNumberInput } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnNumberInput],
  template: `
<mn-number-input aria-label="Percentage" [value]="50" [step]="5" [min]="0" [max]="100"/><mn-number-input aria-label="Unavailable quantity" disabled [value]="10"/>
  `,
})
export class Example {

}

```
