# ProgressIndicator 加载指示器

表示进度：以旋转图标、圆环、波浪、进度条或点状进度条呈现的不确定进度 progressbar；设置 value 后，进度条和圆环变为确定进度。

Package: minerva-design@1.20.4

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## ProgressIndicator

Support: beta

Value-based line / circle progress

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Progress"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/native/src/components/Progress/Progress.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Completion, from 0 to 100 (clamped); ignored while `indeterminate`"
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/Progress/Progress.tsx",
    "kind": "enum",
    "values": [
      "circle",
      "line"
    ],
    "typeText": "ProgressVariant | undefined",
    "typeRef": "type:94931007aab3fad61c02",
    "default": "line",
    "required": false,
    "description": "Shape: a horizontal bar or a ring"
  },
  {
    "name": "color",
    "source": "packages/native/src/components/Progress/Progress.tsx",
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
    "description": "Color of the filled part"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Progress/Progress.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "ProgressSize | undefined",
    "typeRef": "type:2eb6a0bb7131c92d9438",
    "default": "medium",
    "required": false,
    "description": "Thickness of the bar / diameter of the ring"
  },
  {
    "name": "strokeWidth",
    "source": "packages/native/src/components/Progress/Progress.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Thickness of the bar or ring stroke in dp, overriding the size"
  },
  {
    "name": "showValue",
    "source": "packages/native/src/components/Progress/Progress.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the value as text (after the bar, inside the ring)"
  },
  {
    "name": "format",
    "source": "packages/native/src/components/Progress/Progress.tsx",
    "kind": "node",
    "typeText": "((value: number) => ReactNode) | undefined",
    "typeRef": "type:8233afc1317fc609c480",
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
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "Formats the shown value"
  },
  {
    "name": "label",
    "source": "packages/native/src/components/Progress/Progress.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Visible label above the bar (beside the ring); also the accessible name"
  },
  {
    "name": "indeterminate",
    "source": "packages/native/src/components/Progress/Progress.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Unknown completion: an animated looping indicator without a value"
  }
]
```

## API

```json
{
  "native:ProgressProps": {
    "source": "native/src/components/Progress/Progress.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "value",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Completion, from 0 to 100 (clamped); ignored while `indeterminate`"
      },
      {
        "name": "variant",
        "type": "ProgressVariant",
        "required": false,
        "default": "\"line\"",
        "description": "Shape: a horizontal bar or a ring"
      },
      {
        "name": "color",
        "type": "NativeColor",
        "required": false,
        "default": "\"primary\"",
        "description": "Color of the filled part"
      },
      {
        "name": "size",
        "type": "ProgressSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Thickness of the bar / diameter of the ring"
      },
      {
        "name": "strokeWidth",
        "type": "number",
        "required": false,
        "description": "Thickness of the bar or ring stroke in dp, overriding the size"
      },
      {
        "name": "showValue",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the value as text (after the bar, inside the ring)"
      },
      {
        "name": "format",
        "type": "(value: number) => ReactNode",
        "required": false,
        "default": "`${value}%`",
        "description": "Formats the shown value"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false,
        "description": "Visible label above the bar (beside the ring); also the accessible name"
      },
      {
        "name": "indeterminate",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Unknown completion: an animated looping indicator without a value"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the root view"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:ProgressIndicator": {
    "kind": "cssVars",
    "source": "react/src/components/ProgressIndicator",
    "vars": [
      {
        "name": "--progress-width",
        "description": "Width of a linear indicator with the default width"
      },
      {
        "name": "--progress-bar-height",
        "description": "Thickness of the bar (every size)"
      },
      {
        "name": "--progress-track-color",
        "description": "Color of the bar track (and of the determinate circle track)"
      },
      {
        "name": "--progress-radius",
        "description": "Corner radius of the bar track (defaults to --radius-sm)"
      },
      {
        "name": "--progress-size",
        "description": "Size of the round indicators (spinner / circle / wave; every size)"
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

### apps/docs/src/docs/pages/progress/native/basic.tsx

```tsx
import { useState } from "react";
import { View } from "react-native";
import { ProgressIndicator, Button } from "minerva-design/native";
export default function Basic() {
  const [value, setValue] = useState(40);
  return (
    <View style={{ gap: 12 }}>
      <ProgressIndicator value={value} />
      <Button
        onPress={() =>
          setValue((current) => (current >= 100 ? 0 : current + 20))
        }
      >
        Advance
      </Button>
    </View>
  );
}

```
