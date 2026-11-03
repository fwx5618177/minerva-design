# Card

Un conteneur qui regroupe du contenu et des actions liés, composé de CardHeader, CardTitle, CardDescription, CardContent et CardFooter.

Package: minerva-design@1.19.3

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Card

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Card"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "variant",
    "source": "packages/native/src/components/Card/Card.tsx",
    "kind": "enum",
    "values": [
      "default",
      "elevated",
      "filled",
      "ghost",
      "outline"
    ],
    "typeText": "CardVariant | undefined",
    "typeRef": "type:5d20318adea570c6676c",
    "default": "default",
    "required": false,
    "description": "Visual style: bordered (`default`, `outline` with a stronger border), shadowed (`elevated`), a muted block (`filled`) or borderless (`ghost`)"
  },
  {
    "name": "padding",
    "source": "packages/native/src/components/Card/Card.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "none",
      "small"
    ],
    "typeText": "CardPadding | undefined",
    "typeRef": "type:e634401793582eb9944c",
    "default": "medium",
    "required": false,
    "description": "Inner padding of the header, body and footer"
  },
  {
    "name": "interactive",
    "source": "packages/native/src/components/Card/Card.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Pressable card (`accessibilityRole=\"button\"`, pressed feedback); implied by `onPress`"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Card/Card.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables an interactive card"
  },
  {
    "name": "title",
    "source": "packages/native/src/components/Card/Card.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Title of the header"
  },
  {
    "name": "description",
    "source": "packages/native/src/components/Card/Card.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Supporting text under the title"
  },
  {
    "name": "extra",
    "source": "packages/native/src/components/Card/Card.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Content at the end of the header (action, tag, menu button...)"
  },
  {
    "name": "cover",
    "source": "packages/native/src/components/Card/Card.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Media shown flush at the top of the card (e.g. an Image)"
  },
  {
    "name": "footer",
    "source": "packages/native/src/components/Card/Card.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Footer below a hairline (actions, meta)"
  },
  {
    "name": "contentStyle",
    "source": "packages/native/src/components/Card/Card.tsx",
    "kind": "union",
    "typeText": "StyleProp<ViewStyle>",
    "typeRef": "type:e697903ddc58ec54def0",
    "required": false,
    "description": "Style of the body"
  },
  {
    "name": "titleStyle",
    "source": "packages/native/src/components/Card/Card.tsx",
    "kind": "union",
    "typeText": "StyleProp<TextStyle>",
    "typeRef": "type:175f7626ef7c69988283",
    "required": false,
    "description": "Style of the title text"
  }
]
```

### events

```json
[
  {
    "name": "onPress",
    "source": "packages/native/src/components/Card/Card.tsx",
    "kind": "function",
    "typeText": "((event: GestureResponderEvent) => void) | undefined",
    "typeRef": "type:7b804ed398c0a0e202b5",
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
    "description": "Called when an interactive card is pressed"
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

## CardContent

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "CardContent"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## CardDescription

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "CardDescription"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## CardFooter

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "CardFooter"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## CardHeader

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "CardHeader"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## CardTitle

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "CardTitle"
  ],
  "kind": "named"
}
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
  "native:CardProps": {
    "source": "native/src/components/Card/Card.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "variant",
        "type": "CardVariant",
        "required": false,
        "default": "\"default\"",
        "description": "Visual style: bordered (`default`, `outline` with a stronger border), shadowed (`elevated`), a muted block (`filled`) or borderless (`ghost`)"
      },
      {
        "name": "padding",
        "type": "CardPadding",
        "required": false,
        "default": "\"medium\"",
        "description": "Inner padding of the header, body and footer"
      },
      {
        "name": "interactive",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Pressable card (`accessibilityRole=\"button\"`, pressed feedback); implied by `onPress`"
      },
      {
        "name": "onPress",
        "type": "(event: GestureResponderEvent) => void",
        "required": false,
        "description": "Called when an interactive card is pressed"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables an interactive card"
      },
      {
        "name": "title",
        "type": "ReactNode",
        "required": false,
        "description": "Title of the header"
      },
      {
        "name": "description",
        "type": "ReactNode",
        "required": false,
        "description": "Supporting text under the title"
      },
      {
        "name": "extra",
        "type": "ReactNode",
        "required": false,
        "description": "Content at the end of the header (action, tag, menu button...)"
      },
      {
        "name": "cover",
        "type": "ReactNode",
        "required": false,
        "description": "Media shown flush at the top of the card (e.g. an Image)"
      },
      {
        "name": "footer",
        "type": "ReactNode",
        "required": false,
        "description": "Footer below a hairline (actions, meta)"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Body content"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the card"
      },
      {
        "name": "contentStyle",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the body"
      },
      {
        "name": "titleStyle",
        "type": "StyleProp<TextStyle>",
        "required": false,
        "description": "Style of the title text"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Card": {
    "kind": "cssVars",
    "source": "react/src/components/Card",
    "vars": [
      {
        "name": "--card-bg-color",
        "description": "Background color of the card"
      },
      {
        "name": "--card-bg-color-content",
        "description": "Background color of the content section (sections layout)"
      },
      {
        "name": "--card-border-color",
        "description": "Color of the border and of the section dividers"
      },
      {
        "name": "--card-radius",
        "description": "Corner radius (defaults to --radius-sm, --radius-lg with the padding prop)"
      },
      {
        "name": "--card-shadow",
        "description": "Shadow of the default and elevated variants (defaults to --shadow-sm / --shadow-lg)"
      },
      {
        "name": "--card-padding",
        "description": "Padding of the header, content and footer sections (sections layout; the padding props win)"
      },
      {
        "name": "--card-header-bg-color",
        "description": "Background color of the header section (sections layout)"
      },
      {
        "name": "--card-title-font-size",
        "description": "Font size of the title"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

Ouvrir Project Apollo affiche « Opened Project Apollo » sous la carte.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/card/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { Button, Card, useTheme } from "minerva-design/native";
export default function Basic() {
  const [opened, setOpened] = useState(false);
  const { colors } = useTheme();
  return (
    <View style={{ gap: 12 }}>
      <Card
        title="Project Apollo"
        description="Updated 2 hours ago"
        footer={
          <Button size="small" onPress={() => setOpened(true)}>
            Open
          </Button>
        }
      >
        <Text style={{ color: colors["text-color"] }}>
          A design system for building accessible, themeable interfaces.
        </Text>
      </Card>
      {opened && (
        <Text role="status" style={{ color: colors["text-color"] }}>
          Opened Project Apollo
        </Text>
      )}
    </View>
  );
}

```

## Example: product

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/card/native/product.tsx

```tsx
import { useState } from "react";
import { Image, Text, View } from "react-native";
import { Button, Card, useTheme } from "minerva-design/native";

export default function Product() {
  const { colors } = useTheme();
  const [inCart, setInCart] = useState(0);
  return (
    <Card
      variant="elevated"
      cover={
        <Image
          source={{ uri: "https://picsum.photos/id/1080/600/400" }}
          style={{ width: "100%", height: 180 }}
          accessibilityLabel="Fresh strawberries"
        />
      }
      title="Organic strawberries"
      description="500 g · Farm Valley"
      extra={
        <Text style={{ color: colors["primary-color"], fontWeight: "600" }}>
          $5.90
        </Text>
      }
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: colors["text-secondary-color"] }}>
          {inCart ? `${inCart} in cart` : "★ 4.9 (1.2k reviews)"}
        </Text>
        <Button size="small" onPress={() => setInCart((n) => n + 1)}>
          Add to cart
        </Button>
      </View>
    </Card>
  );
}

```

## Example: Variantes

Comparer elevated, outlined, filled, ghost et glass avec la même structure de contenu.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/card/native/variants.tsx

```tsx
import { Text, View } from "react-native";
import { Card, useTheme } from "minerva-design/native";
const variants = ["default", "outline", "elevated", "filled", "ghost"] as const;
export default function Variants() {
  const { colors } = useTheme();
  return (
    <View style={{ gap: 16 }}>
      {variants.map((variant) => (
        <Card key={variant} variant={variant} title={variant}>
          <Text style={{ color: colors["text-color"] }}>
            variant="{variant}"
          </Text>
        </Card>
      ))}
    </View>
  );
}

```
