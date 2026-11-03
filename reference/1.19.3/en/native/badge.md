# Badge

A small count or status indicator attached to the corner of another element.

Package: minerva-design@1.19.3

Renderer: native

Locale: en

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

## Badge

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Badge"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "content",
    "source": "packages/native/src/components/Badge/Badge.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Content of the badge: a count (capped at `max`) or a short text. When omitted, `children` is the badge content of a standalone badge"
  },
  {
    "name": "max",
    "source": "packages/native/src/components/Badge/Badge.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 99,
    "required": false,
    "description": "Counts above it show as `{max}+`"
  },
  {
    "name": "dot",
    "source": "packages/native/src/components/Badge/Badge.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Renders a small dot instead of content"
  },
  {
    "name": "showZero",
    "source": "packages/native/src/components/Badge/Badge.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the badge when the count is 0"
  },
  {
    "name": "color",
    "source": "packages/native/src/components/Badge/Badge.tsx",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "neutral",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "NativeColor | undefined",
    "typeRef": "type:c1c4fb1afcf9f8ec5869",
    "default": "primary",
    "required": false,
    "description": "Semantic color of the badge"
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/Badge/Badge.tsx",
    "kind": "enum",
    "values": [
      "outline",
      "solid",
      "subtle"
    ],
    "typeText": "BadgeVariant | undefined",
    "typeRef": "type:0ebc2435f8d4760a470f",
    "default": "solid",
    "required": false,
    "description": "Visual style: `solid` (filled), `subtle` (tinted background) or `outline` (bordered)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Badge/Badge.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "BadgeSize | undefined",
    "typeRef": "type:9905df67d6d970facf96",
    "default": "medium",
    "required": false,
    "description": "Badge size"
  },
  {
    "name": "position",
    "source": "packages/native/src/components/Badge/Badge.tsx",
    "kind": "enum",
    "values": [
      "bottom-left",
      "bottom-right",
      "top-left",
      "top-right"
    ],
    "typeText": "BadgePosition | undefined",
    "typeRef": "type:034f7bff3a586c019d6a",
    "default": "top-right",
    "required": false,
    "description": "Corner of the children the badge is placed on (ignored by standalone badges)"
  },
  {
    "name": "offset",
    "source": "packages/native/src/components/Badge/Badge.tsx",
    "kind": "array",
    "typeText": "[number, number] | undefined",
    "typeRef": "type:e4bdfc457972809a67b5",
    "required": false,
    "description": "Extra offset `[x, y]` of an attached badge, in dp (x moves inwards)"
  },
  {
    "name": "icon",
    "source": "packages/native/src/components/Badge/Badge.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Icon displayed before the content"
  },
  {
    "name": "aria-label",
    "source": "packages/native/src/components/Badge/Badge.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the badge, e.g. \"5 unread messages\""
  },
  {
    "name": "badgeStyle",
    "source": "packages/native/src/components/Badge/Badge.tsx",
    "kind": "union",
    "typeText": "StyleProp<ViewStyle>",
    "typeRef": "type:e697903ddc58ec54def0",
    "required": false,
    "description": "Style of the badge itself"
  },
  {
    "name": "textStyle",
    "source": "packages/native/src/components/Badge/Badge.tsx",
    "kind": "union",
    "typeText": "StyleProp<TextStyle>",
    "typeRef": "type:175f7626ef7c69988283",
    "required": false,
    "description": "Style of the content text"
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
  "native:BadgeProps": {
    "source": "native/src/components/Badge/Badge.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "content",
        "type": "ReactNode",
        "required": false,
        "description": "Content of the badge: a count (capped at `max`) or a short text. When omitted, `children` is the badge content of a standalone badge"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "default": "99",
        "description": "Counts above it show as `{max}+`"
      },
      {
        "name": "dot",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Renders a small dot instead of content"
      },
      {
        "name": "showZero",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the badge when the count is 0"
      },
      {
        "name": "color",
        "type": "NativeColor",
        "required": false,
        "default": "\"primary\"",
        "description": "Semantic color of the badge"
      },
      {
        "name": "variant",
        "type": "BadgeVariant",
        "required": false,
        "default": "\"solid\"",
        "description": "Visual style: `solid` (filled), `subtle` (tinted background) or `outline` (bordered)"
      },
      {
        "name": "size",
        "type": "BadgeSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Badge size"
      },
      {
        "name": "position",
        "type": "BadgePosition",
        "required": false,
        "default": "\"top-right\"",
        "description": "Corner of the children the badge is placed on (ignored by standalone badges)"
      },
      {
        "name": "offset",
        "type": "[number, number]",
        "required": false,
        "description": "Extra offset `[x, y]` of an attached badge, in dp (x moves inwards)"
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Icon displayed before the content"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "The element the badge is attached to. Without `content` / `dot`, a string child is the content of a standalone badge"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label of the badge, e.g. \"5 unread messages\""
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the root view"
      },
      {
        "name": "badgeStyle",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the badge itself"
      },
      {
        "name": "textStyle",
        "type": "StyleProp<TextStyle>",
        "required": false,
        "description": "Style of the content text"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Badge": {
    "kind": "cssVars",
    "source": "react/src/components/Badge",
    "vars": [
      {
        "name": "--badge-bg",
        "description": "Background color (overrides the color and variant)"
      },
      {
        "name": "--badge-fg",
        "description": "Text color (overrides the color and variant)"
      },
      {
        "name": "--badge-border",
        "description": "Border color of the subtle and outline variants"
      },
      {
        "name": "--badge-radius",
        "description": "Corner radius (defaults to --radius-sm)"
      },
      {
        "name": "--badge-padding-y",
        "description": "Vertical padding (every size)"
      },
      {
        "name": "--badge-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--badge-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--badge-dot-size",
        "description": "Diameter of the dot badge"
      },
      {
        "name": "--badge-ring-color",
        "description": "Color of the ring separating an attached (corner) badge from its content (defaults to --surface-color)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

Notification and message badges show 5 and 99+; inline badges mark Inbox 12 and a New changelog.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/badge/native/basic.tsx

```tsx
import { Text, View } from "react-native";
import { Badge, useTheme } from "minerva-design/native";
export default function Basic() {
  const { colors } = useTheme();
  return (
    <View
      style={{
        gap: 16,
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Badge content={5} aria-label="5 unread notifications">
        <Text aria-label="Notifications" style={{ fontSize: 24 }}>
          ♧
        </Text>
      </Badge>
      <Badge content="99+" aria-label="More than 99 messages">
        <Text aria-label="Messages" style={{ fontSize: 24 }}>
          ✉
        </Text>
      </Badge>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        <Text style={{ color: colors["text-color"] }}>Inbox</Text>
        <Badge content={12} color="info" aria-label="12 unread" />
        <Text style={{ color: colors["text-color"] }}>and changelog</Text>
        <Badge color="success">New</Badge>
      </View>
    </View>
  );
}

```

## Example: colors-variants

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/badge/native/colors-variants.tsx

```tsx
import { View } from "react-native";
import { Badge } from "minerva-design/native";

const COLORS = [
  "primary",
  "neutral",
  "success",
  "warning",
  "danger",
  "info",
] as const;
const VARIANTS = ["solid", "subtle", "outline"] as const;

export default function ColorsVariants() {
  return (
    <View style={{ gap: 12 }}>
      {VARIANTS.map((variant) => (
        <View
          key={variant}
          style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}
        >
          {COLORS.map((color) => (
            <Badge key={color} color={color} variant={variant}>
              {color}
            </Badge>
          ))}
        </View>
      ))}
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Badge size="small">Small</Badge>
        <Badge size="medium">Medium</Badge>
        <Badge size="large" icon="⚡" color="warning">
          Flash sale
        </Badge>
      </View>
    </View>
  );
}

```

## Example: dot-max

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/badge/native/dot-max.tsx

```tsx
import { Text, View } from "react-native";
import { Avatar, Badge, useTheme } from "minerva-design/native";

export default function DotMax() {
  const { colors } = useTheme();
  const bell = (
    <Text style={{ fontSize: 28, color: colors["text-color"] }}>🔔</Text>
  );
  return (
    <View style={{ flexDirection: "row", gap: 28, alignItems: "center" }}>
      <Badge dot color="danger" aria-label="New notifications">
        {bell}
      </Badge>
      <Badge content={128}>{bell}</Badge>
      <Badge content={1200} max={999} color="danger">
        {bell}
      </Badge>
      <Badge content={0} showZero color="neutral">
        {bell}
      </Badge>
      <Badge
        dot
        size="large"
        color="success"
        position="bottom-right"
        offset={[6, 6]}
        aria-label="Online"
      >
        <Avatar
          name="Lena Park"
          src="https://randomuser.me/api/portraits/women/68.jpg"
        />
      </Badge>
    </View>
  );
}

```
