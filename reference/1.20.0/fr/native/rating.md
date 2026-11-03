# Rating

Affiche une note sur cinq étoiles quelle que soit l’échelle et permet de noter à la souris ou au clavier.

Package: minerva-design@1.20.0

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Rating

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Rating"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/native/src/components/Rating/Rating.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Current score, from 0 to max (controlled)"
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/Rating/Rating.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Initial score (uncontrolled)"
  },
  {
    "name": "max",
    "source": "packages/native/src/components/Rating/Rating.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 10,
    "required": false,
    "description": "Highest score; the score is always drawn on 5 stars (a star is `max / 5` points)"
  },
  {
    "name": "readOnly",
    "source": "packages/native/src/components/Rating/Rating.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Display only: presses and screen reader adjustments are ignored"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Rating/Rating.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "allowHalf",
    "source": "packages/native/src/components/Rating/Rating.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Pressing the left half of a star picks half a star; screen reader steps are half stars"
  },
  {
    "name": "clearable",
    "source": "packages/native/src/components/Rating/Rating.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Picking the current score again clears it to 0"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Rating/Rating.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "NativeSize | undefined",
    "typeRef": "type:3e1597e03bb6f7f3269e",
    "default": "medium",
    "required": false,
    "description": "Star size: 18, 24 or 32 dp (larger than the web's 12 / 16 / 20 px: touch targets)"
  },
  {
    "name": "color",
    "source": "packages/native/src/components/Rating/Rating.tsx",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "SemanticColor | undefined",
    "typeRef": "type:fb510f224f696f21d0ad",
    "default": "warning",
    "required": false,
    "description": "Semantic color of the filled stars"
  },
  {
    "name": "showValue",
    "source": "packages/native/src/components/Rating/Rating.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the score (one decimal) after the stars"
  },
  {
    "name": "ratingCount",
    "source": "packages/native/src/components/Rating/Rating.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Number of ratings, shown after the score when `showValue` is set"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/Rating/Rating.tsx",
    "kind": "function",
    "typeText": "((value: number) => void) | undefined",
    "typeRef": "type:6cf2c711e3db7c57d904",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the score the user picked"
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

### bindings

```json
[
  {
    "prop": "value",
    "event": "onChange",
    "syntax": "value={value} onChange={handler}"
  }
]
```

## RatingScale

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "RatingScale"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "showValue",
    "source": "packages/native/src/components/Parts/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the score (one decimal) after the stars"
  },
  {
    "name": "dimensions",
    "source": "packages/native/src/components/Parts/index.tsx",
    "kind": "array",
    "typeText": "readonly RatingDimension[]",
    "typeRef": "type:038a70c88a2aa72721fb",
    "required": true
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Rating/Rating.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Rating/Rating.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "NativeSize | undefined",
    "typeRef": "type:3e1597e03bb6f7f3269e",
    "default": "medium",
    "required": false,
    "description": "Star size: 18, 24 or 32 dp (larger than the web's 12 / 16 / 20 px: touch targets)"
  },
  {
    "name": "color",
    "source": "packages/native/src/components/Rating/Rating.tsx",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "SemanticColor | undefined",
    "typeRef": "type:fb510f224f696f21d0ad",
    "default": "warning",
    "required": false,
    "description": "Semantic color of the filled stars"
  },
  {
    "name": "readOnly",
    "source": "packages/native/src/components/Rating/Rating.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Display only: presses and screen reader adjustments are ignored"
  },
  {
    "name": "max",
    "source": "packages/native/src/components/Rating/Rating.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 10,
    "required": false,
    "description": "Highest score; the score is always drawn on 5 stars (a star is `max / 5` points)"
  },
  {
    "name": "clearable",
    "source": "packages/native/src/components/Rating/Rating.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Picking the current score again clears it to 0"
  },
  {
    "name": "allowHalf",
    "source": "packages/native/src/components/Rating/Rating.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Pressing the left half of a star picks half a star; screen reader steps are half stars"
  },
  {
    "name": "ratingCount",
    "source": "packages/native/src/components/Rating/Rating.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Number of ratings, shown after the score when `showValue` is set"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/Parts/index.tsx",
    "kind": "function",
    "typeText": "((key: string, value: number) => void) | undefined",
    "typeRef": "type:9e4ffe740e9f924b4d43",
    "parameters": [
      {
        "name": "key",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      },
      {
        "name": "value",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  }
]
```

## API

```json
{
  "native:RatingProps": {
    "source": "native/src/components/Rating/Rating.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\">"
    ],
    "props": [
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Current score, from 0 to max (controlled)"
      },
      {
        "name": "defaultValue",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Initial score (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: number) => void",
        "required": false,
        "description": "Called with the score the user picked"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "default": "10",
        "description": "Highest score; the score is always drawn on 5 stars (a star is `max / 5` points)"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Display only: presses and screen reader adjustments are ignored"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false
      },
      {
        "name": "allowHalf",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Pressing the left half of a star picks half a star; screen reader steps are half stars"
      },
      {
        "name": "clearable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Picking the current score again clears it to 0"
      },
      {
        "name": "size",
        "type": "RatingSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Star size: 18, 24 or 32 dp (larger than the web's 12 / 16 / 20 px: touch targets)"
      },
      {
        "name": "color",
        "type": "SemanticColor",
        "required": false,
        "default": "\"warning\"",
        "description": "Semantic color of the filled stars"
      },
      {
        "name": "showValue",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the score (one decimal) after the stars"
      },
      {
        "name": "ratingCount",
        "type": "number",
        "required": false,
        "description": "Number of ratings, shown after the score when `showValue` is set"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the root view"
      }
    ]
  },
  "native:RatingScaleProps": {
    "source": "native/src/components/Parts/index.tsx",
    "kind": "interface",
    "extends": [
      "Omit<RatingProps, \"value\" | \"defaultValue\" | \"onChange\" | \"children\">"
    ],
    "props": [
      {
        "name": "showValue",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "dimensions",
        "type": "readonly RatingDimension[]",
        "required": true
      },
      {
        "name": "onChange",
        "type": "(key: string, value: number) => void",
        "required": false
      }
    ]
  }
}
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

## Example: Affichage

Notes en lecture seule sur 10 ou 5, avec la valeur et le nombre d’avis.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/rating/native/basic.tsx

```tsx
import { useState } from "react";
import { View } from "react-native";
import { Rating, RatingScale } from "minerva-design/native";
export default function Basic() {
  const [scores, setScores] = useState({ quality: 8, speed: 6 });
  return (
    <View style={{ gap: 16 }}>
      <Rating defaultValue={7} showValue />
      <RatingScale
        dimensions={[
          { key: "quality", label: "Quality", value: scores.quality },
          { key: "speed", label: "Speed", value: scores.speed },
        ]}
        onChange={(key, value) =>
          setScores((current) => ({ ...current, [key]: value }))
        }
      />
    </View>
  );
}

```
