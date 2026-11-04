# TabBar 标签栏

使用原生移动控件和共享设计变量构建的标签栏。

Package: minerva-design@1.21.0

Renderer: native

Locale: zh

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

## TabBar

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "TabBar"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/native/src/components/TabBar/TabBar.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Value of the selected item (controlled; pair with `onChange`)"
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/TabBar/TabBar.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Value of the initially selected item (uncontrolled)"
  },
  {
    "name": "activeColor",
    "source": "packages/native/src/components/TabBar/TabBar.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Icon / label color of the selected item"
  },
  {
    "name": "inactiveColor",
    "source": "packages/native/src/components/TabBar/TabBar.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Icon / label color of the other items"
  },
  {
    "name": "safeAreaInsetBottom",
    "source": "packages/native/src/components/TabBar/TabBar.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Pads the bar with the bottom safe-area inset (home indicator) of `MinervaProvider`"
  },
  {
    "name": "border",
    "source": "packages/native/src/components/TabBar/TabBar.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Hairline border above the bar"
  },
  {
    "name": "accessibilityLabel",
    "source": "packages/native/src/components/TabBar/TabBar.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the tab list"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/TabBar/TabBar.tsx",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:f280e05b92fc300ac49a",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the value of the item the user selects"
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

## API

```json
{
  "native:TabBarProps": {
    "source": "native/src/components/TabBar/TabBar.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Value of the selected item (controlled; pair with `onChange`)"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "default": "the first enabled item's value",
        "description": "Value of the initially selected item (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called with the value of the item the user selects"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Items: `TabBarItem` elements"
      },
      {
        "name": "activeColor",
        "type": "string",
        "required": false,
        "default": "the \"primary-color\" token",
        "description": "Icon / label color of the selected item"
      },
      {
        "name": "inactiveColor",
        "type": "string",
        "required": false,
        "default": "the \"text-muted-color\" token",
        "description": "Icon / label color of the other items"
      },
      {
        "name": "safeAreaInsetBottom",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Pads the bar with the bottom safe-area inset (home indicator) of `MinervaProvider`"
      },
      {
        "name": "border",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Hairline border above the bar"
      },
      {
        "name": "accessibilityLabel",
        "type": "string",
        "required": false,
        "default": "the \"tabBar.label\" message",
        "description": "Accessible label of the tab list"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the bar"
      }
    ]
  },
  "native:TabBarItemProps": {
    "source": "native/src/components/TabBar/TabBar.tsx",
    "kind": "interface",
    "extends": [
      "Omit<PressableProps, \"children\" | \"style\" | \"disabled\">"
    ],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": true,
        "description": "Value identifying the item (reported by `onChange`)"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false,
        "description": "Label under the icon"
      },
      {
        "name": "icon",
        "type": "ReactNode | ((active: boolean, color: string) => ReactNode)",
        "required": false,
        "description": "Icon: an element, or a function of the selected state and the current item color returning one (e.g. a filled icon when active)"
      },
      {
        "name": "badge",
        "type": "number | string",
        "required": false,
        "description": "Badge content (a count or a short text) on the icon's corner"
      },
      {
        "name": "badgeMax",
        "type": "number",
        "required": false,
        "default": "99",
        "description": "Largest count shown in the badge (`99+` beyond)"
      },
      {
        "name": "dot",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a small dot on the icon's corner instead of a badge"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the item"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the item"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: badges

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/tab-bar/native/badges.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { Button, TabBar, TabBarItem, useTheme } from "minerva-design/native";

export default function Badges() {
  const { colors } = useTheme();
  const [cart, setCart] = useState(3);
  const [unread, setUnread] = useState(128);
  const glyph = (char: string) => (_active: boolean, color: string) => (
    <Text style={{ fontSize: 20, color }}>{char}</Text>
  );
  return (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Button size="small" onPress={() => setCart((n) => n + 1)}>
          Add to cart
        </Button>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onPress={() => setUnread(0)}
        >
          Read all
        </Button>
      </View>
      <Text style={{ color: colors["text-secondary-color"] }}>
        {cart} items in cart · {unread} unread messages
      </Text>
      <TabBar defaultValue="shop" safeAreaInsetBottom={false}>
        <TabBarItem value="shop" label="Shop" icon={glyph("⌂")} dot />
        <TabBarItem
          value="chat"
          label="Chat"
          icon={glyph("✉")}
          badge={unread || undefined}
        />
        <TabBarItem
          value="cart"
          label="Cart"
          icon={glyph("🛒")}
          badge={cart}
          badgeMax={9}
        />
        <TabBarItem value="me" label="Me" icon={glyph("☺")} badge="New" />
      </TabBar>
    </View>
  );
}

```

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/tab-bar/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { TabBar, TabBarItem, useTheme } from "minerva-design/native";

const TABS = [
  { value: "home", label: "Home", icon: "🏠" },
  { value: "search", label: "Search", icon: "🔍" },
  { value: "orders", label: "Orders", icon: "🧾" },
  { value: "me", label: "Me", icon: "👤" },
];

export default function Basic() {
  const { colors } = useTheme();
  const [tab, setTab] = useState("home");
  return (
    <View style={{ gap: 16 }}>
      <Text style={{ color: colors["text-secondary-color"] }}>
        Current screen: {tab}
      </Text>
      <TabBar value={tab} onChange={setTab} safeAreaInsetBottom={false}>
        {TABS.map((item) => (
          <TabBarItem
            key={item.value}
            value={item.value}
            label={item.label}
            icon={(active) => (
              <Text style={{ fontSize: 20, opacity: active ? 1 : 0.5 }}>
                {item.icon}
              </Text>
            )}
          />
        ))}
      </TabBar>
      <TabBar
        defaultValue="discover"
        activeColor={colors["danger-color"]}
        safeAreaInsetBottom={false}
      >
        <TabBarItem value="discover" label="Discover" />
        <TabBarItem value="deals" label="Deals" />
        <TabBarItem value="saved" label="Saved" disabled />
      </TabBar>
    </View>
  );
}

```
