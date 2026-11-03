# Checkbox 复选框

允许用户选择一个或多个选项，支持半选、错误状态和自定义样式。

Package: minerva-design@1.19.3

Renderer: native

Locale: zh

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

## Checkbox

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Checkbox"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "checked",
    "source": "packages/native/src/components/Checkbox/Checkbox.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Checked state (controlled). Ignored inside a CheckboxGroup"
  },
  {
    "name": "defaultChecked",
    "source": "packages/native/src/components/Checkbox/Checkbox.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Initial checked state (uncontrolled)"
  },
  {
    "name": "indeterminate",
    "source": "packages/native/src/components/Checkbox/Checkbox.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the indeterminate (partially checked) state; a press checks the box (and reports `onChange(true)`) while the prop stays in charge"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Checkbox/Checkbox.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the checkbox (also set by a disabled group)"
  },
  {
    "name": "label",
    "source": "packages/native/src/components/Checkbox/Checkbox.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Label content (a string becomes Text and names the checkbox)"
  },
  {
    "name": "color",
    "source": "packages/native/src/components/Checkbox/Checkbox.tsx",
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
    "description": "Semantic color of the checked / indeterminate box (a CheckboxGroup color overrides it)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Checkbox/Checkbox.tsx",
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
    "description": "Box and label size (a CheckboxGroup size overrides it)"
  },
  {
    "name": "shape",
    "source": "packages/native/src/components/Checkbox/Checkbox.tsx",
    "kind": "enum",
    "values": [
      "circle",
      "rounded",
      "square"
    ],
    "typeText": "CheckboxShape | undefined",
    "typeRef": "type:da94cbfaf3bae65cca73",
    "default": "square",
    "required": false,
    "description": "Box shape (a CheckboxGroup shape overrides it)"
  },
  {
    "name": "value",
    "source": "packages/native/src/components/Checkbox/Checkbox.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Value of the checkbox: identifies it inside a CheckboxGroup"
  },
  {
    "name": "error",
    "source": "packages/native/src/components/Checkbox/Checkbox.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Error state: danger border (also set by an invalid group)"
  },
  {
    "name": "labelPlacement",
    "source": "packages/native/src/components/Checkbox/Checkbox.tsx",
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
    "description": "Position of the label relative to the box"
  },
  {
    "name": "icon",
    "source": "packages/native/src/components/Checkbox/Checkbox.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Custom glyph shown in the checked box"
  },
  {
    "name": "labelStyle",
    "source": "packages/native/src/components/Checkbox/Checkbox.tsx",
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
    "source": "packages/native/src/components/Checkbox/Checkbox.tsx",
    "kind": "function",
    "typeText": "((checked: boolean, value?: string | undefined) => void) | undefined",
    "typeRef": "type:21d11caba2d9de86e709",
    "parameters": [
      {
        "name": "checked",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      },
      {
        "name": "value",
        "position": 1,
        "required": false,
        "rest": false,
        "typeText": "string | undefined",
        "typeRef": "type:c59382f9551703242861"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the requested state and the checkbox `value`"
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
  "native:CheckboxProps": {
    "source": "native/src/components/Checkbox/Checkbox.tsx",
    "kind": "interface",
    "extends": [
      "Omit<PressableProps, \"children\" | \"style\" | \"disabled\" | \"onPress\">"
    ],
    "props": [
      {
        "name": "checked",
        "type": "boolean",
        "required": false,
        "description": "Checked state (controlled). Ignored inside a CheckboxGroup"
      },
      {
        "name": "defaultChecked",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Initial checked state (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(checked: boolean, value?: string) => void",
        "required": false,
        "description": "Called with the requested state and the checkbox `value`"
      },
      {
        "name": "indeterminate",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the indeterminate (partially checked) state; a press checks the box (and reports `onChange(true)`) while the prop stays in charge"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the checkbox (also set by a disabled group)"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false,
        "description": "Label content (a string becomes Text and names the checkbox)"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Label content, when `label` is not set"
      },
      {
        "name": "color",
        "type": "CheckboxColor",
        "required": false,
        "default": "\"primary\"",
        "description": "Semantic color of the checked / indeterminate box (a CheckboxGroup color overrides it)"
      },
      {
        "name": "size",
        "type": "CheckboxSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Box and label size (a CheckboxGroup size overrides it)"
      },
      {
        "name": "shape",
        "type": "CheckboxShape",
        "required": false,
        "default": "\"square\"",
        "description": "Box shape (a CheckboxGroup shape overrides it)"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Value of the checkbox: identifies it inside a CheckboxGroup"
      },
      {
        "name": "error",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Error state: danger border (also set by an invalid group)"
      },
      {
        "name": "labelPlacement",
        "type": "CheckboxLabelPlacement",
        "required": false,
        "default": "\"end\"",
        "description": "Position of the label relative to the box"
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Custom glyph shown in the checked box"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the pressable root"
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
  "css:Checkbox": {
    "kind": "cssVars",
    "source": "react/src/components/Checkbox",
    "vars": [
      {
        "name": "--checkbox-checked-color",
        "description": "Background / border of the checked or indeterminate box (defaults to the color prop's accent)"
      },
      {
        "name": "--checkbox-checkmark-color",
        "description": "Color of the checkmark / indeterminate dash"
      },
      {
        "name": "--checkbox-box-color",
        "description": "Background of the unchecked box"
      },
      {
        "name": "--checkbox-border-color",
        "description": "Border of the unchecked box"
      },
      {
        "name": "--checkbox-size",
        "description": "Width and height of the box (every size)"
      },
      {
        "name": "--checkbox-radius",
        "description": "Corner radius of the box for the square and rounded shapes"
      },
      {
        "name": "--checkbox-gap",
        "description": "Space between the box and the label"
      },
      {
        "name": "--checkbox-label-font-size",
        "description": "Font size of the label (every size)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

Remember me 初始未选中，Checked by default 初始选中；两个选项独立切换。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/native/basic.tsx

```tsx
import { View } from "react-native";
import { Checkbox } from "minerva-design/native";
export default function Basic() {
  return (
    <View style={{ gap: 12, alignItems: "flex-start" }}>
      <Checkbox label="Remember me" />
      <Checkbox label="Checked by default" defaultChecked />
    </View>
  );
}

```

## Example: 受控模式

订阅选项初始选中；切换后，下方同步显示订阅状态。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/native/controlled.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { Checkbox, useTheme } from "minerva-design/native";
export default function Controlled() {
  const [checked, setChecked] = useState(true);
  const { colors } = useTheme();
  return (
    <View style={{ gap: 12, alignItems: "flex-start" }}>
      <Checkbox
        label="Subscribe to the newsletter"
        checked={checked}
        onChange={setChecked}
      />
      <Text role="status" style={{ color: colors["text-color"] }}>
        {checked ? "Subscribed" : "Not subscribed"}
      </Text>
    </View>
  );
}

```

## Example: 半选状态

初始仅选中 Apple，全选框显示部分选中；点击全选，再次点击清空。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/native/indeterminate.tsx

```tsx
import { View } from "react-native";
import { useState } from "react";
import { Checkbox } from "minerva-design/native";

const fruits = ["Apple", "Banana", "Cherry"];

export default function IndeterminateDemo() {
  const [selected, setSelected] = useState<string[]>(["Apple"]);
  const allChecked = selected.length === fruits.length;
  const someChecked = selected.length > 0 && !allChecked;

  const toggle = (fruit: string, checked: boolean) =>
    setSelected((prev) =>
      checked ? [...prev, fruit] : prev.filter((f) => f !== fruit),
    );

  return (
    <View style={{ gap: 8 }}>
      <Checkbox
        label="Select all"
        checked={allChecked}
        indeterminate={someChecked}
        onChange={(checked) => setSelected(checked ? fruits : [])}
      />
      <View
        style={{
          gap: 8,
          paddingLeft: 24,
        }}
      >
        {fruits.map((fruit) => (
          <Checkbox
            key={fruit}
            label={fruit}
            checked={selected.includes(fruit)}
            onChange={(checked) => toggle(fruit, checked)}
          />
        ))}
      </View>
    </View>
  );
}

```
