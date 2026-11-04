# Rating

Displays a score as five stars on any scale, and collects scores with mouse or keyboard.

Package: minerva-design@1.21.0

Renderer: react

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

## Rating

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Rating/types.ts",
    "kind": "number",
    "typeText": "number",
    "typeRef": "type:7d1137535c313783dadd",
    "required": true,
    "description": "Current score, from 0 to max"
  },
  {
    "name": "max",
    "source": "packages/react/src/components/Rating/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 10,
    "required": false,
    "description": "Highest score; the score is always drawn on 5 stars (half stars for fractions between 0.25 and 0.75 of a star)"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Rating/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "RatingSize | undefined",
    "typeRef": "type:a75cf6c4c3d1a2b790a7",
    "default": "medium",
    "required": false,
    "description": "Star size: 12px, 16px or 20px"
  },
  {
    "name": "showValue",
    "source": "packages/react/src/components/Rating/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the score (one decimal) after the stars"
  },
  {
    "name": "ratingCount",
    "source": "packages/react/src/components/Rating/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Number of ratings, shown after the score when showValue is set"
  },
  {
    "name": "readOnly",
    "source": "packages/react/src/components/Rating/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Forces display mode even when onChange is set"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Rating/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "<value> / <max>",
    "required": false,
    "description": "Accessible label of the rating"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/Rating/types.ts",
    "kind": "function",
    "typeText": "((value: number) => void) | undefined",
    "typeRef": "type:5986448596d1902a79c0",
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
    "description": "Makes the rating interactive: hover previews, clicking the left / right half of a star picks a half / full star, and the root becomes a slider (arrow keys step by max / 10, Home / End jump to 0 / max)"
  },
  {
    "name": "onKeyDown",
    "source": "packages/react/src/components/Rating/types.ts",
    "kind": "function",
    "typeText": "((event: KeyboardEvent<HTMLSpanElement>) => void) | undefined",
    "typeRef": "type:d00307d8de9153207c9a",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "KeyboardEvent<HTMLSpanElement>",
        "typeRef": "type:07edb4f0d37b5b0a97d1"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called on key down (interactive mode) before the built-in stepping; call preventDefault() to take over a key"
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

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "dimensions",
    "source": "packages/react/src/components/Rating/types.ts",
    "kind": "array",
    "typeText": "readonly RatingDimension[]",
    "typeRef": "type:902b281a0cd93040eefe",
    "required": true,
    "description": "Dimensions to rate, one row each"
  },
  {
    "name": "max",
    "source": "packages/react/src/components/Rating/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 10,
    "required": false,
    "description": "Highest score shared by every dimension"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Rating/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "RatingSize | undefined",
    "typeRef": "type:a75cf6c4c3d1a2b790a7",
    "default": "medium",
    "required": false,
    "description": "Star size"
  },
  {
    "name": "readOnly",
    "source": "packages/react/src/components/Rating/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Forces display mode even when onChange is set"
  },
  {
    "name": "showValue",
    "source": "packages/react/src/components/Rating/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the score at the end of each row"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/Rating/types.ts",
    "kind": "function",
    "typeText": "((key: string, value: number) => void) | undefined",
    "typeRef": "type:cc9ec235e364cef54409",
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
    "required": false,
    "description": "Makes the rows interactive; called with the dimension key and its new score"
  }
]
```

## API

```json
{
  "RatingProps": {
    "source": "react/src/components/Rating/types.ts",
    "description": "Props of the Rating component. Other HTML attributes (data-*, title, ...) are forwarded to the root <span>.",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Current score, from 0 to max"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "default": "10",
        "description": "Highest score; the score is always drawn on 5 stars (half stars for fractions between 0.25 and 0.75 of a star)"
      },
      {
        "name": "size",
        "type": "RatingSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Star size: 12px, 16px or 20px"
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
        "description": "Number of ratings, shown after the score when showValue is set"
      },
      {
        "name": "onChange",
        "type": "(value: number) => void",
        "required": false,
        "description": "Makes the rating interactive: hover previews, clicking the left / right half of a star picks a half / full star, and the root becomes a slider (arrow keys step by max / 10, Home / End jump to 0 / max)"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Forces display mode even when onChange is set"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "\"<value> / <max>\"",
        "description": "Accessible label of the rating"
      },
      {
        "name": "onKeyDown",
        "type": "(event: React.KeyboardEvent<HTMLSpanElement>) => void",
        "required": false,
        "description": "Called on key down (interactive mode) before the built-in stepping; call preventDefault() to take over a key"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "style",
        "type": "React.CSSProperties",
        "required": false,
        "description": "Inline styles of the root element"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLSpanElement>",
        "required": false,
        "description": "Ref to the root <span>"
      }
    ]
  },
  "RatingScaleProps": {
    "source": "react/src/components/Rating/types.ts",
    "description": "Props of the RatingScale component (several labelled ratings)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "dimensions",
        "type": "readonly RatingDimension[]",
        "required": true,
        "description": "Dimensions to rate, one row each"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "default": "10",
        "description": "Highest score shared by every dimension"
      },
      {
        "name": "size",
        "type": "RatingSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Star size"
      },
      {
        "name": "onChange",
        "type": "(key: string, value: number) => void",
        "required": false,
        "description": "Makes the rows interactive; called with the dimension key and its new score"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Forces display mode even when onChange is set"
      },
      {
        "name": "showValue",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the score at the end of each row"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root element"
      }
    ]
  },
  "RatingDimension": {
    "source": "react/src/components/Rating/types.ts",
    "description": "One dimension of a RatingScale",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "key",
        "type": "string",
        "required": true,
        "description": "Stable key, passed back to onChange"
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Displayed label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Current score of the dimension"
      },
      {
        "name": "hint",
        "type": "React.ReactNode",
        "required": false,
        "description": "Optional description (a string is shown as the row's title tooltip)"
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

## Example: Display

Read-only ratings on a 10- or 5-point scale, with the value and the number of ratings.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/rating/demos/basic.tsx

```tsx
import { Rating } from "minerva-design";

export default function BasicDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Rating value={8.6} size="small" />
      <Rating value={7} showValue ratingCount={3214} />
      <Rating value={3.5} max={5} size="large" showValue />
    </div>
  );
}

```

## Example: Interactive

With onChange the rating becomes a slider: hover to preview, click the left or right half of a star, or use the keyboard: arrows step half a star (in RTL Arrow Left increases), Page Up / Page Down one whole star (max / 5), Home / End jump to 0 / max.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/rating/demos/interactive.tsx

```tsx
import { useState } from "react";
import { Rating } from "minerva-design";

export default function InteractiveDemo() {
  const [value, setValue] = useState(6);

  return <Rating value={value} onChange={setValue} showValue size="large" />;
}

```

## Example: Rating scale

RatingScale rates several dimensions on one shared scale.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/rating/demos/scale.tsx

```tsx
import { useState } from "react";
import { RatingScale } from "minerva-design";

export default function ScaleDemo() {
  const [scores, setScores] = useState({
    plot: 8.2,
    characters: 7.5,
    writing: 9,
  });

  return (
    <RatingScale
      dimensions={[
        {
          key: "plot",
          label: "Plot",
          value: scores.plot,
          hint: "Story and pacing",
        },
        { key: "characters", label: "Characters", value: scores.characters },
        { key: "writing", label: "Writing", value: scores.writing },
      ]}
      onChange={(key, value) =>
        setScores((prev) => ({ ...prev, [key]: value }))
      }
    />
  );
}

```
