# Grid

Grille avec commandes natives et variables de design partagées.

Package: minerva-design@1.21.1

Renderer: native

Locale: fr

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

## Grid

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Grid"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "columnNum",
    "source": "packages/native/src/components/Grid/Grid.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 4,
    "required": false,
    "description": "Number of columns"
  },
  {
    "name": "square",
    "source": "packages/native/src/components/Grid/Grid.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Square cells (height = width)"
  },
  {
    "name": "gutter",
    "source": "packages/native/src/components/Grid/Grid.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Space between the cells, in dp (cells get their own border and radius when set)"
  },
  {
    "name": "border",
    "source": "packages/native/src/components/Grid/Grid.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Hairline borders between the cells"
  },
  {
    "name": "center",
    "source": "packages/native/src/components/Grid/Grid.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Centers the content of the cells"
  },
  {
    "name": "direction",
    "source": "packages/native/src/components/Grid/Grid.tsx",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "GridDirection | undefined",
    "typeRef": "type:8a3b7028d96d7da289f0",
    "default": "vertical",
    "required": false,
    "description": "Layout of icon and text in a cell: `vertical` (icon above) or `horizontal` (icon before)"
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

## GridItem

Support: beta

Native GridItem supports fullWidth rows in ResponsiveGrid, asChild layout/press composition, and icon/text shortcuts in Grid; it renders actual native content and optional press actions.

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "GridItem"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "fullWidth",
    "source": "packages/native/src/components/Grid/Grid.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Span every column inside ResponsiveGrid or Grid."
  },
  {
    "name": "asChild",
    "source": "packages/native/src/components/Grid/Grid.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Apply layout and press behavior to a single child."
  },
  {
    "name": "icon",
    "source": "packages/native/src/components/Grid/Grid.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Icon (any element)"
  },
  {
    "name": "text",
    "source": "packages/native/src/components/Grid/Grid.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Text under (or next to) the icon"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Grid/Grid.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the cell's press"
  }
]
```

### events

```json
[
  {
    "name": "onPress",
    "source": "packages/native/src/components/Grid/Grid.tsx",
    "kind": "function",
    "typeText": "((event: GestureResponderEvent) => void) | undefined",
    "typeRef": "type:0e2d006d81fe888d6442",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GestureResponderEvent",
        "typeRef": "type:2a25eb9466bc75075bdf"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called on press: the cell becomes a button"
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

## API

```json
{
  "native:GridProps": {
    "source": "native/src/components/Grid/Grid.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "columnNum",
        "type": "number",
        "required": false,
        "default": "4",
        "description": "Number of columns"
      },
      {
        "name": "square",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Square cells (height = width)"
      },
      {
        "name": "gutter",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Space between the cells, in dp (cells get their own border and radius when set)"
      },
      {
        "name": "border",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Hairline borders between the cells"
      },
      {
        "name": "center",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Centers the content of the cells"
      },
      {
        "name": "direction",
        "type": "GridDirection",
        "required": false,
        "default": "\"vertical\"",
        "description": "Layout of icon and text in a cell: `vertical` (icon above) or `horizontal` (icon before)"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "`GridItem` elements"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the grid"
      }
    ]
  },
  "native:GridItemProps": {
    "source": "native/src/components/Grid/Grid.tsx",
    "kind": "interface",
    "extends": [
      "Omit<PressableProps, \"children\" | \"style\" | \"disabled\">"
    ],
    "props": [
      {
        "name": "fullWidth",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Span every column inside ResponsiveGrid or Grid."
      },
      {
        "name": "asChild",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Apply layout and press behavior to a single child."
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Icon (any element)"
      },
      {
        "name": "text",
        "type": "ReactNode",
        "required": false,
        "description": "Text under (or next to) the icon"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Custom content, replacing icon and text"
      },
      {
        "name": "onPress",
        "type": "(event: GestureResponderEvent) => void",
        "required": false,
        "description": "Called on press: the cell becomes a button"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the cell's press"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the cell content"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/grid/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { Grid, GridItem, useTheme } from "minerva-design/native";

const ENTRIES = [
  ["🍔", "Food"],
  ["🛒", "Grocery"],
  ["☕", "Coffee"],
  ["💊", "Pharmacy"],
  ["🌸", "Flowers"],
  ["🐶", "Pets"],
  ["🎁", "Gifts"],
  ["⋯", "More"],
];

export default function Basic() {
  const { colors } = useTheme();
  const [picked, setPicked] = useState("none");
  return (
    <View style={{ gap: 16 }}>
      <Grid>
        {ENTRIES.map(([icon, text]) => (
          <GridItem
            key={text}
            icon={<Text style={{ fontSize: 24 }}>{icon}</Text>}
            text={text}
            onPress={() => setPicked(text)}
          />
        ))}
      </Grid>
      <Grid columnNum={2} direction="horizontal" border={false}>
        <GridItem
          icon={<Text>🎟️</Text>}
          text="Coupons"
          onPress={() => setPicked("Coupons")}
        />
        <GridItem
          icon={<Text>⭐</Text>}
          text="Points"
          disabled
          onPress={() => setPicked("Points")}
        />
      </Grid>
      <Text style={{ color: colors["text-secondary-color"] }}>
        Category: {picked}
      </Text>
    </View>
  );
}

```

## Example: square-columns

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/grid/native/square-columns.tsx

```tsx
import { Image, Text, View } from "react-native";
import { Grid, GridItem, useTheme } from "minerva-design/native";

const PHOTOS = [10, 11, 12, 13, 14, 15];

export default function SquareColumns() {
  const { colors } = useTheme();
  return (
    <View style={{ gap: 16 }}>
      <Grid columnNum={3} square gutter={8}>
        {PHOTOS.map((id) => (
          <GridItem key={id} style={{ padding: 0, overflow: "hidden" }}>
            <Image
              source={{ uri: `https://picsum.photos/id/${id}/300/300` }}
              style={{ width: "100%", height: "100%" }}
              accessibilityLabel={`Trip photo ${id}`}
            />
          </GridItem>
        ))}
      </Grid>
      <Grid columnNum={5} square center>
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
          <GridItem key={day}>
            <Text style={{ color: colors["text-muted-color"], fontSize: 12 }}>
              {day}
            </Text>
            <Text style={{ color: colors["text-color"], fontWeight: "600" }}>
              {12 + i}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </View>
  );
}

```
