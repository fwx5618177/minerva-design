# List

Listes opérationnelles sobres sur ul / li natifs, avec texte principal et secondaire, icône décorative et actions en fin de ligne.

Package: minerva-design@1.22.3

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Cell

Support: beta

Cell: settings-style row

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Cell"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "title",
    "source": "packages/native/src/components/Cell/Cell.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Main text (left)"
  },
  {
    "name": "value",
    "source": "packages/native/src/components/Cell/Cell.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Value shown on the right (muted)"
  },
  {
    "name": "label",
    "source": "packages/native/src/components/Cell/Cell.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Supporting text under the title"
  },
  {
    "name": "icon",
    "source": "packages/native/src/components/Cell/Cell.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Leading element (icon, avatar...)"
  },
  {
    "name": "rightIcon",
    "source": "packages/native/src/components/Cell/Cell.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Trailing element after the value (replaces the `isLink` chevron)"
  },
  {
    "name": "isLink",
    "source": "packages/native/src/components/Cell/Cell.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Navigation row: shows a chevron and makes the row pressable"
  },
  {
    "name": "required",
    "source": "packages/native/src/components/Cell/Cell.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Adds a required mark (`*`) before the title"
  },
  {
    "name": "center",
    "source": "packages/native/src/components/Cell/Cell.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Vertically centers the content (top-aligned otherwise, for long labels)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Cell/Cell.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium"
    ],
    "typeText": "CellSize | undefined",
    "typeRef": "type:ad83e5710a0ee8146a3c",
    "default": "medium",
    "required": false,
    "description": "Row size (`large`: taller row, larger title)"
  },
  {
    "name": "clickable",
    "source": "packages/native/src/components/Cell/Cell.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Pressable row with pressed feedback (`accessibilityRole=\"button\"`); implied by `onPress` and `isLink`"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Cell/Cell.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables a pressable row"
  },
  {
    "name": "border",
    "source": "packages/native/src/components/Cell/Cell.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Draws the inset hairline under the row (never under the last row of a CellGroup)"
  },
  {
    "name": "titleStyle",
    "source": "packages/native/src/components/Cell/Cell.tsx",
    "kind": "union",
    "typeText": "StyleProp<TextStyle>",
    "typeRef": "type:175f7626ef7c69988283",
    "required": false,
    "description": "Style of the title text"
  },
  {
    "name": "valueStyle",
    "source": "packages/native/src/components/Cell/Cell.tsx",
    "kind": "union",
    "typeText": "StyleProp<TextStyle>",
    "typeRef": "type:175f7626ef7c69988283",
    "required": false,
    "description": "Style of the value text"
  }
]
```

### events

```json
[
  {
    "name": "onPress",
    "source": "packages/native/src/components/Cell/Cell.tsx",
    "kind": "function",
    "typeText": "((event: GestureResponderEvent) => void) | undefined",
    "typeRef": "type:642ebf954d60ace0971a",
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
    "description": "Called when the row is pressed"
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

## CellGroup

Support: beta

CellGroup: grouped settings-style rows

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "CellGroup"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "title",
    "source": "packages/native/src/components/Cell/Cell.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Header text above the group"
  },
  {
    "name": "footer",
    "source": "packages/native/src/components/Cell/Cell.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Footer text below the group (hint, explanation)"
  },
  {
    "name": "inset",
    "source": "packages/native/src/components/Cell/Cell.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Inset card style (margins and rounded corners, like iOS inset grouped lists); full-width rows with top / bottom hairlines otherwise"
  },
  {
    "name": "border",
    "source": "packages/native/src/components/Cell/Cell.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Draws the hairlines between the rows and around a full-width group"
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

## List

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "List"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "density",
    "source": "packages/native/src/components/Display/index.tsx",
    "kind": "enum",
    "values": [
      "comfortable",
      "compact",
      "default"
    ],
    "typeText": "ListDensity | undefined",
    "typeRef": "type:a6dbabc2f84a66e7026d",
    "default": "default",
    "required": false
  },
  {
    "name": "bordered",
    "source": "packages/native/src/components/Display/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "dividers",
    "source": "packages/native/src/components/Display/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false
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

## ListItem

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "ListItem"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "primary",
    "source": "packages/native/src/components/Display/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true
  },
  {
    "name": "secondary",
    "source": "packages/native/src/components/Display/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "icon",
    "source": "packages/native/src/components/Display/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "actions",
    "source": "packages/native/src/components/Display/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
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
  "native:CellProps": {
    "source": "native/src/components/Cell/Cell.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "title",
        "type": "ReactNode",
        "required": false,
        "description": "Main text (left)"
      },
      {
        "name": "value",
        "type": "ReactNode",
        "required": false,
        "description": "Value shown on the right (muted)"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false,
        "description": "Supporting text under the title"
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Leading element (icon, avatar...)"
      },
      {
        "name": "rightIcon",
        "type": "ReactNode",
        "required": false,
        "description": "Trailing element after the value (replaces the `isLink` chevron)"
      },
      {
        "name": "isLink",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Navigation row: shows a chevron and makes the row pressable"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Adds a required mark (`*`) before the title"
      },
      {
        "name": "center",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Vertically centers the content (top-aligned otherwise, for long labels)"
      },
      {
        "name": "size",
        "type": "CellSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Row size (`large`: taller row, larger title)"
      },
      {
        "name": "clickable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Pressable row with pressed feedback (`accessibilityRole=\"button\"`); implied by `onPress` and `isLink`"
      },
      {
        "name": "onPress",
        "type": "(event: GestureResponderEvent) => void",
        "required": false,
        "description": "Called when the row is pressed"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables a pressable row"
      },
      {
        "name": "border",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Draws the inset hairline under the row (never under the last row of a CellGroup)"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Custom right content (a Switch, a Tag...), shown after the value"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the row"
      },
      {
        "name": "titleStyle",
        "type": "StyleProp<TextStyle>",
        "required": false,
        "description": "Style of the title text"
      },
      {
        "name": "valueStyle",
        "type": "StyleProp<TextStyle>",
        "required": false,
        "description": "Style of the value text"
      }
    ]
  },
  "native:CellGroupProps": {
    "source": "native/src/components/Cell/Cell.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "title",
        "type": "ReactNode",
        "required": false,
        "description": "Header text above the group"
      },
      {
        "name": "footer",
        "type": "ReactNode",
        "required": false,
        "description": "Footer text below the group (hint, explanation)"
      },
      {
        "name": "inset",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Inset card style (margins and rounded corners, like iOS inset grouped lists); full-width rows with top / bottom hairlines otherwise"
      },
      {
        "name": "border",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Draws the hairlines between the rows and around a full-width group"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "The Cell elements"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the group (the rows container)"
      }
    ]
  },
  "native:ListProps": {
    "source": "native/src/components/Display/index.tsx",
    "kind": "interface",
    "extends": [
      "ViewProps"
    ],
    "props": [
      {
        "name": "density",
        "type": "ListDensity",
        "required": false,
        "default": "\"default\""
      },
      {
        "name": "bordered",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "dividers",
        "type": "boolean",
        "required": false,
        "default": "true"
      }
    ]
  },
  "native:ListItemProps": {
    "source": "native/src/components/Display/index.tsx",
    "kind": "interface",
    "extends": [
      "ViewProps"
    ],
    "props": [
      {
        "name": "primary",
        "type": "ReactNode",
        "required": true
      },
      {
        "name": "secondary",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "actions",
        "type": "ReactNode",
        "required": false
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:List": {
    "kind": "cssVars",
    "source": "react/src/components/List",
    "vars": [
      {
        "name": "--list-item-min-height",
        "description": "Minimum height of an item (follows the density; compact lists are shorter)"
      },
      {
        "name": "--list-item-padding-y",
        "description": "Vertical padding of an item (follows the density's row padding)"
      },
      {
        "name": "--list-item-padding-x",
        "description": "Horizontal padding of an item (follows the density's row padding)"
      },
      {
        "name": "--list-item-gap",
        "description": "Space between the icon, the content and the actions"
      },
      {
        "name": "--list-divider-color",
        "description": "Color of the dividers between items"
      },
      {
        "name": "--list-icon-size",
        "description": "Size of the leading icon slot"
      },
      {
        "name": "--list-border-color",
        "description": "Border color of a bordered list (defaults to --border-color)"
      },
      {
        "name": "--list-radius",
        "description": "Corner radius of a bordered list (defaults to --radius-lg)"
      },
      {
        "name": "--list-background",
        "description": "Background of a bordered list (defaults to --surface-color)"
      },
      {
        "name": "--list-item-hover-background",
        "description": "Background of a row of a bordered list on hover / while a control inside it has the focus"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

La liste contient iPhone 16 et MacBook Air. Chaque action Delete retire uniquement son appareil.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/list/native/basic.tsx

```tsx
import { useState } from "react";
import { Text } from "react-native";
import { Cell, CellGroup, IconButton } from "minerva-design/native";
const initialDevices = [
  { id: "phone", name: "iPhone 16", lastUsed: "Used 2 hours ago" },
  { id: "laptop", name: "MacBook Air", lastUsed: "Used yesterday" },
];
export default function Basic() {
  const [devices, setDevices] = useState(initialDevices);
  return (
    <CellGroup aria-label="Registered devices">
      {devices.map((device) => (
        <Cell
          key={device.id}
          title={device.name}
          label={device.lastUsed}
          icon={<Text>▣</Text>}
          rightIcon={
            <IconButton
              label={`Delete ${device.name}`}
              onPress={() =>
                setDevices((prev) => prev.filter((d) => d.id !== device.id))
              }
              icon={(color, size) => (
                <Text style={{ color, fontSize: size }}>⌫</Text>
              )}
            />
          }
        />
      ))}
    </CellGroup>
  );
}

```

## Example: inset-groups

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/list/native/inset-groups.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { Cell, CellGroup, Switch, useTheme } from "minerva-design/native";

export default function InsetGroups() {
  const { colors } = useTheme();
  const [push, setPush] = useState(true);
  const icon = (glyph: string) => <Text style={{ fontSize: 18 }}>{glyph}</Text>;
  return (
    <View
      style={{
        backgroundColor: colors["surface-muted-color"],
        marginHorizontal: -16,
        paddingBottom: 16,
      }}
    >
      <CellGroup
        inset
        title="Notifications"
        footer="Order updates are always sent."
      >
        <Cell icon={icon("🔔")} title="Push notifications">
          <Switch
            checked={push}
            onChange={setPush}
            accessibilityLabel="Push notifications"
          />
        </Cell>
        <Cell icon={icon("✉️")} title="Email" value="Weekly" isLink />
      </CellGroup>
      <CellGroup inset title="Privacy">
        <Cell icon={icon("📍")} title="Location" value="While using" isLink />
        <Cell icon={icon("🔒")} title="Face ID" isLink />
        <Cell
          title="Delete account"
          titleStyle={{ color: colors["danger-color"] }}
          clickable
        />
      </CellGroup>
    </View>
  );
}

```

## Example: rich-rows

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/list/native/rich-rows.tsx

```tsx
import { Text } from "react-native";
import { Avatar, Badge, Cell, CellGroup, Tag } from "minerva-design/native";

export default function RichRows() {
  return (
    <CellGroup title="Messages">
      <Cell
        size="large"
        icon={
          <Avatar
            size="small"
            name="Sofia Martinez"
            src="https://randomuser.me/api/portraits/women/44.jpg"
          />
        }
        title="Sofia Martinez"
        label="Is the jacket still available in M?"
        rightIcon={<Badge content={3} />}
        clickable
      />
      <Cell
        size="large"
        icon={<Avatar size="small" name="Pizza Roma" />}
        title="Pizza Roma"
        label="Your order is out for delivery, arriving in 10 minutes."
        center={false}
        value="12:40"
      />
      <Cell
        icon={<Text style={{ fontSize: 18 }}>🎁</Text>}
        title="Gift cards"
        isLink
      >
        <Tag color="danger" size="small">
          New
        </Tag>
      </Cell>
      <Cell title="Archived chats" disabled clickable border={false} />
    </CellGroup>
  );
}

```
