# Input

Champ de saisie sur une ligne avec tailles, variantes, contenu avant / après, bouton d'effacement, compteur de caractères et bascule de visibilité du mot de passe. Placez-le dans un FormField pour un libellé, une aide et un message d'erreur.

Package: minerva-design@1.19.3

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:c2b9c6e66069aa1acd454efc20d52cde92c1a1c820c1b3ab5302d01929cb4c39"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Input

Support: beta

Native Angular: MnInput. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnInput"
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
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "variant",
    "typeText": "InputVariant",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "size",
    "typeText": "InputSize",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "invalid",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "prefix",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "suffix",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "clearable",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "clearLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "showCharCount",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "showPasswordLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "hidePasswordLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "type",
    "typeText": "InputType",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "required",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "minLength",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "maxLength",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "pattern",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "min",
    "typeText": "string | number | undefined",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "max",
    "typeText": "string | number | undefined",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "step",
    "typeText": "string | number | undefined",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "autocomplete",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "inputmode",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts"
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
    "name": "clear",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/input/input.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "void",
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
  }
]
```

## CSS variables

```json
{
  "css:Input": {
    "kind": "cssVars",
    "source": "react/src/components/Input",
    "vars": [
      {
        "name": "--input-height",
        "description": "Minimum height of the field (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--input-padding-x",
        "description": "Horizontal padding of the text (every size)"
      },
      {
        "name": "--input-radius",
        "description": "Corner radius (defaults to --radius-lg)"
      },
      {
        "name": "--input-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--input-background",
        "description": "Background color of the outline variant"
      },
      {
        "name": "--input-border-color",
        "description": "Border color at rest"
      },
      {
        "name": "--input-focus-color",
        "description": "Border color while hovered / focused (focus: then --minerva-focus-border-color)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Controlled value

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnInput } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnInput],
  template: `
<mn-input aria-label="Project name" placeholder="Enter a project name" [(value)]="value"/><output>{{value}}</output>
  `,
})
export class Example {
  value = "";
}

```

## Example: Affixes and states

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnInput } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnInput],
  template: `
<mn-input aria-label="Website" prefix="https://" suffix=".com" placeholder="your-site"/><mn-input aria-label="Invalid value" invalid value="Needs attention"/><mn-input aria-label="Disabled field" disabled value="Unavailable"/>
  `,
})
export class Example {

}

```

## Example: Clear password and character count

clearable updates the value model; showCharCount follows maxLength. Password visibility changes the native type while preserving the bound value.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnInput, MnButton, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnInput, MnButton, MnStack],
  template: `
<mn-stack gap="3"><mn-input aria-label="Search" [(value)]="search" clearable showCharCount [maxLength]="20" clearLabel="Clear search"/><mn-input aria-label="Password" type="password" [(value)]="password" autocomplete="new-password" showPasswordLabel="Show password" hidePasswordLabel="Hide password"/><output>Search: {{search || '(empty)'}}</output><button mnButton variant="outline" (click)="search='Minerva';password='secret-pass'">Reset inputs</button></mn-stack>
  `,
})
export class Example {
  search = "Minerva";
  password = "secret-pass";
}

```

## Example: Sizes variants and read only

readOnly preserves focus and copying; disabled blocks editing and removes the control from form submission. Sizes and visual variants are independent.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnInput, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnInput, MnStack],
  template: `
<mn-stack gap="3"><mn-input aria-label="Small" size="small" placeholder="Small"/><mn-input aria-label="Medium" size="medium" placeholder="Medium"/><mn-input aria-label="Large" size="large" placeholder="Large"/><mn-input aria-label="Filled" variant="filled" placeholder="Filled"/><mn-input aria-label="Unstyled" variant="unstyled" placeholder="Unstyled"/><mn-input aria-label="Read-only account" readOnly value="account-42"/><mn-input aria-label="Disabled account" disabled value="Unavailable"/></mn-stack>
  `,
})
export class Example {

}

```

## Example: Native validation and field context

Native name/type/required attributes participate in browser validation and submission. MnFormControl links the label, helper/error text and invalid state to the inner input; submit/reset handlers keep the value model authoritative.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnInput, MnButton, MnFormControl, MnFormLabel, MnFormHelperText, MnFormErrorMessage, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnInput, MnButton, MnFormControl, MnFormLabel, MnFormHelperText, MnFormErrorMessage, MnStack],
  template: `
<form #form (submit)="$event.preventDefault();result='Submitted '+email" (reset)="email='';attempted=false;result='Reset'"><mn-stack gap="3"><mn-form-control required [invalid]="attempted && !form.checkValidity()"><mn-form-label>Email</mn-form-label><mn-input name="email" type="email" [(value)]="email" required autocomplete="email" placeholder="you@example.com"/><mn-form-helper-text>Use an address where we can reach you.</mn-form-helper-text><mn-form-error-message>Enter a valid email address.</mn-form-error-message></mn-form-control><mn-stack direction="row" wrap gap="3" align="center"><button mnButton type="submit" (click)="attempted=true">Subscribe</button><button mnButton type="reset" variant="ghost">Reset</button></mn-stack></mn-stack></form><output aria-live="polite">{{result}}</output>
  `,
})
export class Example {
  email = "";
  attempted = false;
  result = "Not submitted";
}

```
