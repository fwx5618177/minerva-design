# NavBar 导航栏

使用原生移动控件和共享设计变量构建的导航栏。

Package: minerva-design@1.20.4

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## NavBar

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "NavBar"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "title",
    "source": "packages/native/src/components/NavBar/NavBar.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Title in the middle (a string is rendered as a header Text)"
  },
  {
    "name": "leftText",
    "source": "packages/native/src/components/NavBar/NavBar.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Text of the left (back) button"
  },
  {
    "name": "leftArrow",
    "source": "packages/native/src/components/NavBar/NavBar.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a back chevron in the left button"
  },
  {
    "name": "left",
    "source": "packages/native/src/components/NavBar/NavBar.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Custom left content, replacing the back button"
  },
  {
    "name": "rightText",
    "source": "packages/native/src/components/NavBar/NavBar.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Text of the right button (pressable with `onPressRight`)"
  },
  {
    "name": "right",
    "source": "packages/native/src/components/NavBar/NavBar.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Custom right content (e.g. icon buttons), replacing `rightText`"
  },
  {
    "name": "backLabel",
    "source": "packages/native/src/components/NavBar/NavBar.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the back button"
  },
  {
    "name": "safeAreaInsetTop",
    "source": "packages/native/src/components/NavBar/NavBar.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Pads the bar with the top safe-area inset (status bar / notch) of `MinervaProvider`"
  },
  {
    "name": "border",
    "source": "packages/native/src/components/NavBar/NavBar.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Hairline border under the bar"
  },
  {
    "name": "titleStyle",
    "source": "packages/native/src/components/NavBar/NavBar.tsx",
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
    "name": "onBack",
    "source": "packages/native/src/components/NavBar/NavBar.tsx",
    "kind": "function",
    "typeText": "((event: GestureResponderEvent) => void) | undefined",
    "typeRef": "type:5f18245d4e02f28d79e5",
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
    "description": "Called by the left (back) button"
  },
  {
    "name": "onPressRight",
    "source": "packages/native/src/components/NavBar/NavBar.tsx",
    "kind": "function",
    "typeText": "((event: GestureResponderEvent) => void) | undefined",
    "typeRef": "type:23429eebd3fcbba82f20",
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
    "description": "Called by the right text button"
  }
]
```

## API

```json
{
  "native:NavBarProps": {
    "source": "native/src/components/NavBar/NavBar.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "title",
        "type": "ReactNode",
        "required": false,
        "description": "Title in the middle (a string is rendered as a header Text)"
      },
      {
        "name": "leftText",
        "type": "ReactNode",
        "required": false,
        "description": "Text of the left (back) button"
      },
      {
        "name": "leftArrow",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a back chevron in the left button"
      },
      {
        "name": "left",
        "type": "ReactNode",
        "required": false,
        "description": "Custom left content, replacing the back button"
      },
      {
        "name": "rightText",
        "type": "ReactNode",
        "required": false,
        "description": "Text of the right button (pressable with `onPressRight`)"
      },
      {
        "name": "right",
        "type": "ReactNode",
        "required": false,
        "description": "Custom right content (e.g. icon buttons), replacing `rightText`"
      },
      {
        "name": "onBack",
        "type": "(event: GestureResponderEvent) => void",
        "required": false,
        "description": "Called by the left (back) button"
      },
      {
        "name": "onPressRight",
        "type": "(event: GestureResponderEvent) => void",
        "required": false,
        "description": "Called by the right text button"
      },
      {
        "name": "backLabel",
        "type": "string",
        "required": false,
        "default": "`leftText` when a string, else the \"navBar.back\" message",
        "description": "Accessible label of the back button"
      },
      {
        "name": "safeAreaInsetTop",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Pads the bar with the top safe-area inset (status bar / notch) of `MinervaProvider`"
      },
      {
        "name": "border",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Hairline border under the bar"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the bar"
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: actions

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/nav-bar/native/actions.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { IconButton, NavBar, useTheme } from "minerva-design/native";

export default function Actions() {
  const { colors } = useTheme();
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(0);
  const icon = { fontSize: 20, color: colors["text-color"], padding: 8 };
  return (
    <View style={{ gap: 16 }}>
      <NavBar
        safeAreaInsetTop={false}
        leftArrow
        backLabel="Back to search"
        title={
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: colors["text-color"], fontWeight: "600" }}>
              Sunny Café
            </Text>
            <Text style={{ color: colors["text-muted-color"], fontSize: 12 }}>
              ★ 4.8 · 20–30 min
            </Text>
          </View>
        }
        right={
          <>
            <IconButton
              accessibilityRole="button"
              label={liked ? "Remove favorite" : "Add favorite"}
              onPress={() => setLiked((v) => !v)}
            >
              <Text style={[icon, liked && { color: colors["danger-color"] }]}>
                {liked ? "♥" : "♡"}
              </Text>
            </IconButton>
            <IconButton
              accessibilityRole="button"
              label="Share"
              onPress={() => setShared((n) => n + 1)}
            >
              <Text style={icon}>⇪</Text>
            </IconButton>
          </>
        }
      />
      <Text style={{ color: colors["text-secondary-color"] }}>
        {liked ? "Saved to favorites" : "Not in favorites"} · shared {shared}{" "}
        times
      </Text>
    </View>
  );
}

```

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/nav-bar/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { NavBar, useTheme } from "minerva-design/native";

export default function Basic() {
  const { colors } = useTheme();
  const [last, setLast] = useState("Nothing pressed yet");
  return (
    <View style={{ gap: 16 }}>
      <NavBar title="Order details" safeAreaInsetTop={false} />
      <NavBar
        title="Checkout"
        leftArrow
        leftText="Cart"
        onBack={() => setLast("Back to cart")}
        rightText="Help"
        onPressRight={() => setLast("Opened help")}
        safeAreaInsetTop={false}
      />
      <NavBar
        title="Settings"
        leftArrow
        onBack={() => setLast("Back to profile")}
        border={false}
        safeAreaInsetTop={false}
      />
      <Text style={{ color: colors["text-secondary-color"] }}>{last}</Text>
    </View>
  );
}

```
