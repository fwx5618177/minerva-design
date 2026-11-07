# Rating

Affiche une note sur cinq étoiles quelle que soit l’échelle et permet de noter à la souris ou au clavier.

Package: minerva-design@1.22.0

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Rating

Support: beta

Native Angular: MnRating. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnRating"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/rating/rating.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/rating/rating.ts"
  },
  {
    "name": "max",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/rating/rating.ts"
  },
  {
    "name": "size",
    "typeText": "RatingSize",
    "required": false,
    "source": "packages/angular/src/components/rating/rating.ts"
  },
  {
    "name": "showValue",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/rating/rating.ts"
  },
  {
    "name": "ratingCount",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/rating/rating.ts"
  },
  {
    "name": "interactive",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/rating/rating.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/rating/rating.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/rating/rating.ts"
  },
  {
    "name": "required",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/rating/rating.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/rating/rating.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/rating/rating.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/rating/rating.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "number | undefined",
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

## RatingScale

Support: beta

Native Angular: MnRatingScale. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnRatingScale"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "dimensions",
    "typeText": "readonly RatingDimension[]",
    "required": false,
    "source": "packages/angular/src/components/rating/rating-scale.ts"
  },
  {
    "name": "max",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/rating/rating-scale.ts"
  },
  {
    "name": "size",
    "typeText": "RatingSize",
    "required": false,
    "source": "packages/angular/src/components/rating/rating-scale.ts"
  },
  {
    "name": "interactive",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/rating/rating-scale.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/rating/rating-scale.ts"
  },
  {
    "name": "showValue",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/rating/rating-scale.ts"
  }
]
```

### events

```json
[
  {
    "name": "dimensionsChange",
    "typeText": "readonly RatingDimension[]",
    "required": false
  },
  {
    "name": "ratingChange",
    "typeText": "RatingScaleChange",
    "required": false,
    "source": "packages/angular/src/components/rating/rating-scale.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "RatingScaleChange",
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
    "prop": "dimensions",
    "event": "dimensionsChange",
    "syntax": "[(dimensions)]"
  }
]
```

## CSS variables

```json
{
  "css:Rating": {
    "kind": "cssVars",
    "source": "react/src/components/Rating",
    "vars": [
      {
        "name": "--rating-color",
        "description": "Color of the filled stars (defaults to --accent-color)"
      },
      {
        "name": "--rating-empty-color",
        "description": "Color of the empty stars and of the unfilled half"
      },
      {
        "name": "--rating-star-gap",
        "description": "Space between the stars"
      },
      {
        "name": "--rating-gap",
        "description": "Space between the stars and the value"
      },
      {
        "name": "--rating-value-font-size",
        "description": "Font size of the numeric value (every size)"
      },
      {
        "name": "--rating-scale-gap",
        "description": "Space between the rows of a RatingScale"
      },
      {
        "name": "--rating-empty-fill",
        "description": "Fill of the empty stars and of the unfilled half (defaults to --surface-muted-color)"
      },
      {
        "name": "--rating-hover-scale",
        "description": "Scale of the hovered star of an interactive rating (defaults to 1.15)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Rate an experience

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRating } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRating],
  template: `
<mn-rating [(value)]="value"/><output>{{value}} of 5</output>
  `,
})
export class Example {
  value = 3;
}

```

## Example: Read-only rating

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRating } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRating],
  template: `
<mn-rating [value]="4" readOnly/>
  `,
})
export class Example {

}

```
