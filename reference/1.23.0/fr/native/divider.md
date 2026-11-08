# Divider

Une fine ligne qui sépare du contenu, horizontalement ou verticalement, éventuellement avec du texte.

Package: minerva-design@1.23.0

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Divider

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Divider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "orientation",
    "source": "packages/native/src/components/Divider/Divider.tsx",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "DividerOrientation | undefined",
    "typeRef": "type:a43f1cfe4f5f39a5ea1b",
    "default": "horizontal",
    "required": false,
    "description": "Divider direction"
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/Divider/Divider.tsx",
    "kind": "enum",
    "values": [
      "dashed",
      "dotted",
      "solid"
    ],
    "typeText": "DividerVariant | undefined",
    "typeRef": "type:8fbf4858d9d96a607668",
    "default": "solid",
    "required": false,
    "description": "Line style"
  },
  {
    "name": "thickness",
    "source": "packages/native/src/components/Divider/Divider.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false,
    "description": "Line thickness in dp (1 renders a device hairline)"
  },
  {
    "name": "spacing",
    "source": "packages/native/src/components/Divider/Divider.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 16,
    "required": false,
    "description": "Margin around the divider in dp (top / bottom when horizontal, left / right when vertical)"
  },
  {
    "name": "length",
    "source": "packages/native/src/components/Divider/Divider.tsx",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false,
    "description": "Length of the line (width when horizontal, height when vertical)"
  },
  {
    "name": "textAlign",
    "source": "packages/native/src/components/Divider/Divider.tsx",
    "kind": "enum",
    "values": [
      "center",
      "left",
      "right"
    ],
    "typeText": "\"right\" | \"left\" | \"center\" | undefined",
    "typeRef": "type:2522b792dbdd05175d56",
    "default": "center",
    "required": false,
    "description": "Position of the text of a horizontal divider"
  },
  {
    "name": "elevation",
    "source": "packages/native/src/components/Divider/Divider.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Adds a subtle shadow"
  },
  {
    "name": "textStyle",
    "source": "packages/native/src/components/Divider/Divider.tsx",
    "kind": "union",
    "typeText": "StyleProp<TextStyle>",
    "typeRef": "type:175f7626ef7c69988283",
    "required": false,
    "description": "Style of the text"
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
  "native:DividerProps": {
    "source": "native/src/components/Divider/Divider.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "orientation",
        "type": "DividerOrientation",
        "required": false,
        "default": "\"horizontal\"",
        "description": "Divider direction"
      },
      {
        "name": "variant",
        "type": "DividerVariant",
        "required": false,
        "default": "\"solid\"",
        "description": "Line style"
      },
      {
        "name": "thickness",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Line thickness in dp (1 renders a device hairline)"
      },
      {
        "name": "spacing",
        "type": "number",
        "required": false,
        "default": "16",
        "description": "Margin around the divider in dp (top / bottom when horizontal, left / right when vertical)"
      },
      {
        "name": "length",
        "type": "DimensionValue",
        "required": false,
        "description": "Length of the line (width when horizontal, height when vertical)"
      },
      {
        "name": "textAlign",
        "type": "\"left\" | \"center\" | \"right\"",
        "required": false,
        "default": "\"center\"",
        "description": "Position of the text of a horizontal divider"
      },
      {
        "name": "elevation",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Adds a subtle shadow"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Text (or element) shown within a horizontal divider"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the root view"
      },
      {
        "name": "textStyle",
        "type": "StyleProp<TextStyle>",
        "required": false,
        "description": "Style of the text"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Divider": {
    "kind": "cssVars",
    "source": "react/src/components/Divider",
    "vars": [
      {
        "name": "--divider-color",
        "description": "Line color (defaults to --border-color)"
      },
      {
        "name": "--divider-thickness",
        "description": "Line thickness"
      },
      {
        "name": "--divider-spacing",
        "description": "Inline margin around a vertical divider"
      },
      {
        "name": "--divider-text-gap",
        "description": "Space between the text and the lines"
      },
      {
        "name": "--divider-text-font-size",
        "description": "Font size of the text"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

Un séparateur horizontal distingue les première et deuxième sections.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/divider/native/basic.tsx

```tsx
import { Text, View } from "react-native";
import { Divider, useTheme } from "minerva-design/native";

export default function Demo() {
  const { colors } = useTheme();
  return (
    <View style={{ width: "100%" }}>
      <Text style={{ color: colors["text-color"] }}>
        Content above the divider.
      </Text>
      <Divider />
      <Text style={{ color: colors["text-color"] }}>
        Content below the divider.
      </Text>
    </View>
  );
}

```

## Example: Vertical

Des séparateurs verticaux distinguent Home, Products et About.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/divider/native/vertical.tsx

```tsx
import { Text, View } from "react-native";
import { Divider, useTheme } from "minerva-design/native";

export default function Demo() {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={{ color: colors["text-color"] }}>Home</Text>
      <Divider orientation="vertical" length={16} spacing={12} />
      <Text style={{ color: colors["text-color"] }}>Products</Text>
      <Divider orientation="vertical" length={16} spacing={12} />
      <Text style={{ color: colors["text-color"] }}>About</Text>
    </View>
  );
}

```

## Example: Avec texte

Comparer les libellés Left, Center et Right ; le séparateur aligné à droite est en pointillés.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/divider/native/with-text.tsx

```tsx
import { View } from "react-native";
import { Divider } from "minerva-design/native";

export default function Demo() {
  return (
    <View style={{ width: "100%" }}>
      <Divider textAlign="left">Left</Divider>
      <Divider>Center</Divider>
      <Divider textAlign="right" variant="dashed" thickness={3}>
        Right
      </Divider>
    </View>
  );
}

```
