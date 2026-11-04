# NumberInput

Champ numérique (spinbutton) avec pas au clavier, boutons optionnels, bornes min / max et précision fixe ; la valeur est validée à la perte du focus ou sur Entrée.

Package: minerva-design@1.20.6

Renderer: angular

Locale: fr

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
