# Checkbox

Lets users select one or more options, with indeterminate, error and custom styling support.

Package: minerva-design@1.20.3

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

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

## Example: Basic usage

Remember me starts unchecked; Checked by default starts checked. Each checkbox toggles independently.

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

## Example: Controlled

The newsletter starts subscribed. Toggling it updates the subscription status below.

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

## Example: Indeterminate

Apple is initially selected. Select all starts mixed, selects every fruit, and clears them on the next activation.

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
