# SegmentedControl 分段控制器

用于切换模式和筛选条件的单选分段开关，滑块会滑动到选中的分段下方。若每个选项都有各自的内容面板，请使用 Tabs。

Package: minerva-design@1.22.1

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## SegmentedControl

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "SegmentedControl"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "options",
    "source": "packages/native/src/components/SegmentedControl/SegmentedControl.tsx",
    "kind": "array",
    "typeText": "readonly SegmentedControlOption<NoInfer<T>>[]",
    "typeRef": "type:d2cc62f4469460f4ed4c",
    "required": true,
    "description": "The segments: strings or option objects"
  },
  {
    "name": "value",
    "source": "packages/native/src/components/SegmentedControl/SegmentedControl.tsx",
    "kind": "object",
    "typeText": "NoInfer<T> | undefined",
    "typeRef": "type:0a3cd3e425b13b6714df",
    "required": false,
    "description": "Selected value (controlled; pair with onChange)"
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/SegmentedControl/SegmentedControl.tsx",
    "kind": "object",
    "typeText": "NoInfer<T> | undefined",
    "typeRef": "type:0a3cd3e425b13b6714df",
    "required": false,
    "description": "Initially selected value (uncontrolled)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/SegmentedControl/SegmentedControl.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "SegmentedControlSize | undefined",
    "typeRef": "type:aba180377d3532dc0a95",
    "default": "medium",
    "required": false,
    "description": "Segment density"
  },
  {
    "name": "color",
    "source": "packages/native/src/components/SegmentedControl/SegmentedControl.tsx",
    "kind": "enum",
    "values": [
      "neutral",
      "primary"
    ],
    "typeText": "SegmentedControlColor | undefined",
    "typeRef": "type:ba97261bfc73d42d6181",
    "default": "neutral",
    "required": false,
    "description": "Thumb color"
  },
  {
    "name": "fullWidth",
    "source": "packages/native/src/components/SegmentedControl/SegmentedControl.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Fills the width of the container with equal-width segments (otherwise each segment is as wide as its content)"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/SegmentedControl/SegmentedControl.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Blocks every segment"
  },
  {
    "name": "aria-label",
    "source": "packages/native/src/components/SegmentedControl/SegmentedControl.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the group"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/SegmentedControl/SegmentedControl.tsx",
    "kind": "function",
    "typeText": "((value: T) => void) | undefined",
    "typeRef": "type:88a1d80bb61447eea98b",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "T",
        "typeRef": "type:ed2cb2e2be913bf0bba5"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the selected value"
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
  "native:SegmentedControlProps": {
    "source": "native/src/components/SegmentedControl/SegmentedControl.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "options",
        "type": "readonly SegmentedControlOption<NoInfer<T>>[]",
        "required": true,
        "description": "The segments: strings or option objects"
      },
      {
        "name": "value",
        "type": "NoInfer<T>",
        "required": false,
        "description": "Selected value (controlled; pair with onChange)"
      },
      {
        "name": "defaultValue",
        "type": "NoInfer<T>",
        "required": false,
        "description": "Initially selected value (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: T) => void",
        "required": false,
        "description": "Called with the selected value"
      },
      {
        "name": "size",
        "type": "SegmentedControlSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Segment density"
      },
      {
        "name": "color",
        "type": "SegmentedControlColor",
        "required": false,
        "default": "\"neutral\"",
        "description": "Thumb color"
      },
      {
        "name": "fullWidth",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Fills the width of the container with equal-width segments (otherwise each segment is as wide as its content)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Blocks every segment"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label of the group"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the track"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:SegmentedControl": {
    "kind": "cssVars",
    "source": "react/src/components/SegmentedControl",
    "vars": [
      {
        "name": "--segmented-control-height",
        "description": "Height of the control (defaults to the density's control height)"
      },
      {
        "name": "--segmented-control-padding",
        "description": "Space between the track and the segments (defaults to 2px)"
      },
      {
        "name": "--segmented-control-radius",
        "description": "Corner radius of the track (defaults to --radius-md); the thumb follows it"
      },
      {
        "name": "--segmented-control-background",
        "description": "Background of the track (defaults to --surface-muted-color)"
      },
      {
        "name": "--segmented-control-color",
        "description": "Text color of the unselected segments"
      },
      {
        "name": "--segmented-control-item-padding-x",
        "description": "Inline padding of a segment"
      },
      {
        "name": "--segmented-control-thumb-background",
        "description": "Background of the thumb (defaults to --surface-elevated-color; --primary-color with color=\"primary\")"
      },
      {
        "name": "--segmented-control-thumb-shadow",
        "description": "Shadow of the thumb (defaults to --shadow-sm; none with color=\"primary\")"
      },
      {
        "name": "--segmented-control-selected-color",
        "description": "Text color of the selected segment"
      },
      {
        "name": "--segmented-control-duration",
        "description": "Duration of the thumb slide (defaults to --transition-base)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

受控值（value / onChange；值的类型是泛型）。控件是由 radio 分段组成的 radiogroup，只有一个 Tab 停靠点：方向键移动并选中（跳过禁用分段并循环），Home / End 跳到两端。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/segmented-control/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { SegmentedControl } from "minerva-design/native";

type Mode = "day" | "week" | "month";

export default function Basic() {
  const [view, setView] = useState<Mode>("week");
  return (
    <View style={{ gap: 12 }}>
      <SegmentedControl<Mode>
        aria-label="Calendar view"
        options={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
        ]}
        value={view}
        onChange={setView}
      />
      <SegmentedControl
        fullWidth
        color="primary"
        aria-label="Status filter"
        options={["All", "Open", "Closed"]}
        defaultValue="All"
      />
      <Text>Showing the {view} view</Text>
    </View>
  );
}

```
