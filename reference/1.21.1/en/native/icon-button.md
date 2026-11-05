# IconButton

A compact button that only shows an icon. With pressed / defaultPressed it becomes a toggle button (favorite, like, mute...).

Package: minerva-design@1.21.1

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## IconButton

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "IconButton"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "icon",
    "source": "packages/native/src/components/IconButton/IconButton.tsx",
    "kind": "node",
    "typeText": "ReactNode | IconRender",
    "typeRef": "type:e18da7fade12da1a933c",
    "parameters": [
      {
        "name": "color",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      },
      {
        "name": "size",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "Icon element to display (children are used when omitted), or a function of the foreground color and icon size returning it"
  },
  {
    "name": "label",
    "source": "packages/native/src/components/IconButton/IconButton.tsx",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Accessible name of the button (required: the button only shows an icon)"
  },
  {
    "name": "color",
    "source": "packages/native/src/components/IconButton/IconButton.tsx",
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
    "default": "neutral",
    "required": false,
    "description": "Semantic color of the button"
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/IconButton/IconButton.tsx",
    "kind": "enum",
    "values": [
      "ghost",
      "outline",
      "solid"
    ],
    "typeText": "IconButtonVariant | undefined",
    "typeRef": "type:2d54549943420fcf4cd2",
    "default": "ghost",
    "required": false,
    "description": "Visual style: `ghost` (transparent, tinted while pressed), `solid` (filled with the color) or `outline` (bordered)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/IconButton/IconButton.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small",
      "xsmall"
    ],
    "typeText": "IconButtonSize | undefined",
    "typeRef": "type:133f17e3bad926d4b16e",
    "default": "medium",
    "required": false,
    "description": "Button size (the `--control-height-*` tokens); the touch area always reaches 44pt"
  },
  {
    "name": "shape",
    "source": "packages/native/src/components/IconButton/IconButton.tsx",
    "kind": "enum",
    "values": [
      "circle",
      "square"
    ],
    "typeText": "IconButtonShape | undefined",
    "typeRef": "type:cbe10cc41351f84db295",
    "default": "circle",
    "required": false,
    "description": "Button shape"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/IconButton/IconButton.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the button"
  },
  {
    "name": "loading",
    "source": "packages/native/src/components/IconButton/IconButton.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Replaces the icon with a spinner and ignores presses"
  },
  {
    "name": "pressed",
    "source": "packages/native/src/components/IconButton/IconButton.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Pressed state of a toggle button (controlled; pair with onPressedChange). Setting pressed, defaultPressed or onPressedChange makes the button a toggle (`accessibilityState.selected`)"
  },
  {
    "name": "defaultPressed",
    "source": "packages/native/src/components/IconButton/IconButton.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Initial pressed state of an uncontrolled toggle button"
  }
]
```

### events

```json
[
  {
    "name": "onPressedChange",
    "source": "packages/native/src/components/IconButton/IconButton.tsx",
    "kind": "function",
    "typeText": "((pressed: boolean) => void) | undefined",
    "typeRef": "type:a4cf97700c1bfaf398c6",
    "parameters": [
      {
        "name": "pressed",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the requested pressed state of a toggle button"
  },
  {
    "name": "onPress",
    "source": "packages/native/src/components/IconButton/IconButton.tsx",
    "kind": "function",
    "typeText": "((event: GestureResponderEvent) => void) | undefined",
    "typeRef": "type:b7a94620b09b861d2cc0",
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
    "description": "Called on press (not while disabled or loading)"
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
    "prop": "pressed",
    "event": "onPressedChange",
    "syntax": "pressed={pressed} onPressedChange={handler}"
  }
]
```

## API

```json
{
  "native:IconButtonProps": {
    "source": "native/src/components/IconButton/IconButton.tsx",
    "kind": "interface",
    "extends": [
      "Omit<PressableProps, \"children\" | \"style\" | \"disabled\" | \"onPress\">"
    ],
    "props": [
      {
        "name": "icon",
        "type": "ReactNode | IconRender",
        "required": false,
        "description": "Icon element to display (children are used when omitted), or a function of the foreground color and icon size returning it"
      },
      {
        "name": "children",
        "type": "ReactNode | IconRender",
        "required": false,
        "description": "Icon element (when `icon` is not set)"
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Accessible name of the button (required: the button only shows an icon)"
      },
      {
        "name": "color",
        "type": "NativeColor",
        "required": false,
        "default": "\"neutral\"",
        "description": "Semantic color of the button"
      },
      {
        "name": "variant",
        "type": "IconButtonVariant",
        "required": false,
        "default": "\"ghost\"",
        "description": "Visual style: `ghost` (transparent, tinted while pressed), `solid` (filled with the color) or `outline` (bordered)"
      },
      {
        "name": "size",
        "type": "IconButtonSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Button size (the `--control-height-*` tokens); the touch area always reaches 44pt"
      },
      {
        "name": "shape",
        "type": "IconButtonShape",
        "required": false,
        "default": "\"circle\"",
        "description": "Button shape"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the button"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Replaces the icon with a spinner and ignores presses"
      },
      {
        "name": "pressed",
        "type": "boolean",
        "required": false,
        "description": "Pressed state of a toggle button (controlled; pair with onPressedChange). Setting pressed, defaultPressed or onPressedChange makes the button a toggle (`accessibilityState.selected`)"
      },
      {
        "name": "defaultPressed",
        "type": "boolean",
        "required": false,
        "description": "Initial pressed state of an uncontrolled toggle button"
      },
      {
        "name": "onPressedChange",
        "type": "(pressed: boolean) => void",
        "required": false,
        "description": "Called with the requested pressed state of a toggle button"
      },
      {
        "name": "onPress",
        "type": "(event: GestureResponderEvent) => void",
        "required": false,
        "description": "Called on press (not while disabled or loading)"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the button"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:IconButton": {
    "kind": "cssVars",
    "source": "react/src/components/IconButton",
    "vars": [
      {
        "name": "--icon-button-color",
        "description": "Icon color"
      },
      {
        "name": "--icon-button-hover-bg",
        "description": "Background on hover"
      },
      {
        "name": "--icon-button-pressed-color",
        "description": "Icon color of a pressed toggle"
      },
      {
        "name": "--icon-button-pressed-bg",
        "description": "Background of a pressed toggle"
      },
      {
        "name": "--icon-button-size",
        "description": "Width and height of the button (every size; defaults follow the density's control heights)"
      },
      {
        "name": "--icon-button-icon-size",
        "description": "Font size of the icon (every size)"
      },
      {
        "name": "--icon-button-radius",
        "description": "Corner radius of the square shape (defaults to --radius-lg)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

Add increases the item counter. Settings and Delete illustrate accessible icon action labels.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { IconButton, useTheme } from "minerva-design/native";
export default function Basic() {
  const [count, setCount] = useState(0);
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <IconButton
        label="Add"
        onPress={() => setCount((n) => n + 1)}
        icon={(color, size) => <Text style={{ color, fontSize: size }}>+</Text>}
      />
      <IconButton
        label="Settings"
        icon={(color, size) => <Text style={{ color, fontSize: size }}>⚙</Text>}
      />
      <IconButton
        label="Delete"
        icon={(color, size) => <Text style={{ color, fontSize: size }}>⌫</Text>}
      />
      <Text role="status" style={{ color: colors["text-color"] }}>
        {count === 0 ? "Nothing added yet" : `Added ${count} item(s)`}
      </Text>
    </View>
  );
}

```

## Example: Toggle button

Like starts off and updates its feedback; Bookmark starts on and Mute starts off.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/native/toggle.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { IconButton, useTheme } from "minerva-design/native";
export default function Toggle() {
  const [liked, setLiked] = useState(false);
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <IconButton
        label="Like"
        color="danger"
        pressed={liked}
        onPressedChange={setLiked}
        icon={(color, size) => <Text style={{ color, fontSize: size }}>♥</Text>}
      />
      <Text style={{ color: colors["text-color"] }}>
        {liked ? "Liked" : "Not liked yet"}
      </Text>
      <IconButton
        label="Bookmark"
        defaultPressed
        icon={(color, size) => <Text style={{ color, fontSize: size }}>◆</Text>}
      />
      <IconButton
        label="Mute"
        shape="square"
        defaultPressed={false}
        icon={(color, size) => <Text style={{ color, fontSize: size }}>♩</Text>}
      />
    </View>
  );
}

```

## Example: variants-sizes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/native/variants-sizes.tsx

```tsx
import { Text, View } from "react-native";
import { IconButton } from "minerva-design/native";

const VARIANTS = ["ghost", "outline", "solid"] as const;
const SIZES = ["xsmall", "small", "medium", "large"] as const;

const star = (color: string, size: number) => (
  <Text style={{ color, fontSize: size }}>★</Text>
);

export default function VariantsSizes() {
  return (
    <View style={{ gap: 16 }}>
      {VARIANTS.map((variant) => (
        <View key={variant} style={{ flexDirection: "row", gap: 12 }}>
          <IconButton label="Rate" variant={variant} icon={star} />
          <IconButton
            label="Rate"
            variant={variant}
            color="primary"
            icon={star}
          />
          <IconButton
            label="Rate"
            variant={variant}
            color="warning"
            shape="square"
            icon={star}
          />
        </View>
      ))}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        {SIZES.map((size) => (
          <IconButton
            key={size}
            label={`Favorite (${size})`}
            size={size}
            variant="solid"
            color="primary"
            icon={star}
          />
        ))}
      </View>
    </View>
  );
}

```
