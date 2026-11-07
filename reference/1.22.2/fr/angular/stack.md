# Stack

Primitives de mise en page flex (Stack, HStack, VStack) avec des espacements par jetons, des séparateurs et des groupes accolés. Les enfants ne sont pas enveloppés.

Package: minerva-design@1.22.2

Renderer: angular

Locale: fr

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

## HStack

Support: beta

Native Angular: MnHStack. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnHStack"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "direction",
    "typeText": "\"column\" | \"row\" | \"row-reverse\" | \"column-reverse\"",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "gap",
    "typeText": "string | number",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "align",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "justify",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "wrap",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "attached",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
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

## Stack

Support: beta

Native Angular: MnStack. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnStack"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "direction",
    "typeText": "\"column\" | \"row\" | \"row-reverse\" | \"column-reverse\"",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "gap",
    "typeText": "string | number",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "align",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "justify",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "wrap",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "attached",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
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

## VStack

Support: beta

Native Angular: MnVStack. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnVStack"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "direction",
    "typeText": "\"column\" | \"row\" | \"row-reverse\" | \"column-reverse\"",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "gap",
    "typeText": "string | number",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "align",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "justify",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "wrap",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "attached",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
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
  "css:Stack": {
    "kind": "cssVars",
    "source": "react/src/components/Stack",
    "vars": [
      {
        "name": "--stack-gap",
        "description": "Space between the children when the gap prop is not set (default: 0)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Horizontal and vertical

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHStack, MnVStack, MnButton } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHStack, MnVStack, MnButton],
  template: `
<mn-vstack gap="4"><mn-hstack gap="2"><button mnButton>Save</button><button mnButton variant="outline">Cancel</button></mn-hstack><p>Rows and columns share spacing tokens.</p></mn-vstack>
  `,
})
export class Example {

}

```

## Example: Wrapping layout

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnStack, MnTag } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnStack, MnTag],
  template: `
<mn-stack direction="row" wrap gap="2"><mn-tag label="Design"/><mn-tag label="Engineering"/><mn-tag label="Research"/></mn-stack>
  `,
})
export class Example {

}

```
