# Switch スイッチ

単一の設定をオン／オフで切り替え、即座に反映します。

Package: minerva-design@1.21.0

Renderer: native

Locale: ja

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

## Switch

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Switch"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "checked",
    "source": "packages/native/src/components/Switch/Switch.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Whether the switch is on (controlled)"
  },
  {
    "name": "defaultChecked",
    "source": "packages/native/src/components/Switch/Switch.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Initial state (uncontrolled)"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Switch/Switch.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the switch"
  },
  {
    "name": "loading",
    "source": "packages/native/src/components/Switch/Switch.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a spinner in the thumb and blocks interaction (`accessibilityState.busy`)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Switch/Switch.tsx",
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
    "description": "Switch size (track height from the control-height tokens)"
  },
  {
    "name": "color",
    "source": "packages/native/src/components/Switch/Switch.tsx",
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
    "default": "primary",
    "required": false,
    "description": "Semantic color of the \"on\" track"
  },
  {
    "name": "shape",
    "source": "packages/native/src/components/Switch/Switch.tsx",
    "kind": "enum",
    "values": [
      "round",
      "square"
    ],
    "typeText": "SwitchShape | undefined",
    "typeRef": "type:7fea58723bbd2d5ed4c8",
    "default": "round",
    "required": false,
    "description": "Shape of the track and thumb"
  },
  {
    "name": "label",
    "source": "packages/native/src/components/Switch/Switch.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Label displayed next to the switch (a string also names it)"
  },
  {
    "name": "labelPlacement",
    "source": "packages/native/src/components/Switch/Switch.tsx",
    "kind": "enum",
    "values": [
      "bottom",
      "end",
      "start",
      "top"
    ],
    "typeText": "LabelPlacement | undefined",
    "typeRef": "type:6686aa99dfdd3afb9058",
    "default": "end",
    "required": false,
    "description": "Position of the label relative to the switch"
  },
  {
    "name": "onLabel",
    "source": "packages/native/src/components/Switch/Switch.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Text shown inside the track while on (e.g. \"ON\")"
  },
  {
    "name": "offLabel",
    "source": "packages/native/src/components/Switch/Switch.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Text shown inside the track while off (e.g. \"OFF\")"
  },
  {
    "name": "value",
    "source": "packages/native/src/components/Switch/Switch.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Value of the switch (reported by forms)"
  },
  {
    "name": "trackStyle",
    "source": "packages/native/src/components/Switch/Switch.tsx",
    "kind": "union",
    "typeText": "StyleProp<ViewStyle>",
    "typeRef": "type:e697903ddc58ec54def0",
    "required": false,
    "description": "Style of the track"
  },
  {
    "name": "thumbStyle",
    "source": "packages/native/src/components/Switch/Switch.tsx",
    "kind": "union",
    "typeText": "StyleProp<ViewStyle>",
    "typeRef": "type:e697903ddc58ec54def0",
    "required": false,
    "description": "Style of the thumb"
  },
  {
    "name": "labelStyle",
    "source": "packages/native/src/components/Switch/Switch.tsx",
    "kind": "union",
    "typeText": "StyleProp<TextStyle>",
    "typeRef": "type:175f7626ef7c69988283",
    "required": false,
    "description": "Style of the label text"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/Switch/Switch.tsx",
    "kind": "function",
    "typeText": "((checked: boolean) => void) | undefined",
    "typeRef": "type:2fa211791b2746d5fbd4",
    "parameters": [
      {
        "name": "checked",
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
    "description": "Called with the requested state"
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
  "native:SwitchProps": {
    "source": "native/src/components/Switch/Switch.tsx",
    "kind": "interface",
    "extends": [
      "Omit<PressableProps, \"children\" | \"style\" | \"disabled\" | \"onPress\">"
    ],
    "props": [
      {
        "name": "checked",
        "type": "boolean",
        "required": false,
        "description": "Whether the switch is on (controlled)"
      },
      {
        "name": "defaultChecked",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Initial state (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(checked: boolean) => void",
        "required": false,
        "description": "Called with the requested state"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the switch"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a spinner in the thumb and blocks interaction (`accessibilityState.busy`)"
      },
      {
        "name": "size",
        "type": "SwitchSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Switch size (track height from the control-height tokens)"
      },
      {
        "name": "color",
        "type": "SwitchColor",
        "required": false,
        "default": "\"primary\"",
        "description": "Semantic color of the \"on\" track"
      },
      {
        "name": "shape",
        "type": "SwitchShape",
        "required": false,
        "default": "\"round\"",
        "description": "Shape of the track and thumb"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false,
        "description": "Label displayed next to the switch (a string also names it)"
      },
      {
        "name": "labelPlacement",
        "type": "SwitchLabelPlacement",
        "required": false,
        "default": "\"end\"",
        "description": "Position of the label relative to the switch"
      },
      {
        "name": "onLabel",
        "type": "ReactNode",
        "required": false,
        "description": "Text shown inside the track while on (e.g. \"ON\")"
      },
      {
        "name": "offLabel",
        "type": "ReactNode",
        "required": false,
        "description": "Text shown inside the track while off (e.g. \"OFF\")"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Value of the switch (reported by forms)"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the pressable root"
      },
      {
        "name": "trackStyle",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the track"
      },
      {
        "name": "thumbStyle",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the thumb"
      },
      {
        "name": "labelStyle",
        "type": "StyleProp<TextStyle>",
        "required": false,
        "description": "Style of the label text"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Switch": {
    "kind": "cssVars",
    "source": "react/src/components/Switch",
    "vars": [
      {
        "name": "--switch-track-width",
        "description": "Width of the track (every size)"
      },
      {
        "name": "--switch-track-height",
        "description": "Height of the track (every size)"
      },
      {
        "name": "--switch-thumb-size",
        "description": "Width and height of the thumb (every size)"
      },
      {
        "name": "--switch-track-color",
        "description": "Background of the unchecked track"
      },
      {
        "name": "--switch-thumb-color",
        "description": "Background of the unchecked thumb"
      },
      {
        "name": "--switch-checked-color",
        "description": "Accent of the checked thumb, track and active segment (defaults to the color prop's accent)"
      },
      {
        "name": "--switch-label-gap",
        "description": "Space between the switch and its label"
      },
      {
        "name": "--switch-label-font-size",
        "description": "Font size of the label (every size)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

ラベル付きの非制御スイッチ。defaultChecked で初期状態を設定します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/switch/native/basic.tsx

```tsx
import { View } from "react-native";
import { Switch } from "minerva-design/native";

export default function BasicDemo() {
  return (
    <View style={{ gap: 12 }}>
      <Switch label="Wi-Fi" defaultChecked />
      <Switch label="Bluetooth" />
    </View>
  );
}

```

## Example: カラー

color でオン状態のセマンティックカラーを指定します：primary（既定）、success、info、warning、danger。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/switch/native/colors.tsx

```tsx
import { View } from "react-native";
import { Switch } from "minerva-design/native";

const colors = ["primary", "success", "info", "warning", "danger"] as const;

export default function ColorsDemo() {
  return (
    <View style={{ gap: 12 }}>
      {colors.map((color) => (
        <Switch key={color} color={color} label={color} defaultChecked />
      ))}
    </View>
  );
}

```

## Example: 制御モード

checked と onChange を組み合わせ、state からスイッチを制御します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/switch/native/controlled.tsx

```tsx
import { View, Text } from "react-native";
import { useState } from "react";
import { Switch } from "minerva-design/native";

export default function ControlledDemo() {
  const [enabled, setEnabled] = useState(false);

  return (
    <View style={{ gap: 12 }}>
      <Switch
        label="Email notifications"
        checked={enabled}
        onChange={(checked) => setEnabled(checked)}
      />
      <Text>Notifications are {enabled ? "on" : "off"}</Text>
    </View>
  );
}

```

## Example: ラベルの位置

labelPlacement でラベルをスイッチの前（"start"）、後ろ（"end"、デフォルト）、上（"top"）、下（"bottom"）に配置します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/switch/native/label-placement.tsx

```tsx
import { View } from "react-native";
import { Switch } from "minerva-design/native";

const placements = ["start", "end", "top", "bottom"] as const;

export default function LabelPlacementDemo() {
  return (
    <View style={{ gap: 12 }}>
      {placements.map((placement) => (
        <Switch
          key={placement}
          label={`Label at ${placement}`}
          labelPlacement={placement}
          defaultChecked
        />
      ))}
    </View>
  );
}

```

## Example: サイズ

small、medium（既定）、large の 3 サイズ。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/switch/native/sizes.tsx

```tsx
import { View } from "react-native";
import { Switch } from "minerva-design/native";

export default function SizesDemo() {
  return (
    <View style={{ gap: 12 }}>
      <Switch size="small" label="Small" defaultChecked />
      <Switch size="medium" label="Medium" defaultChecked />
      <Switch size="large" label="Large" defaultChecked />
    </View>
  );
}

```

## Example: 読み込み中と無効状態

loading は処理中の状態を表示し、disabled と同様に操作をブロックします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/switch/native/states.tsx

```tsx
import { View } from "react-native";
import { Switch } from "minerva-design/native";

export default function StatesDemo() {
  return (
    <View style={{ gap: 12 }}>
      <Switch label="Loading" loading defaultChecked />
      <Switch label="Disabled" disabled />
      <Switch label="Disabled (on)" disabled defaultChecked />
    </View>
  );
}

```
