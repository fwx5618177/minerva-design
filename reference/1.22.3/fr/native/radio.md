# Radio

Permet de choisir une seule option parmi plusieurs. Utilisez RadioGroup pour gérer la sélection de plusieurs boutons radio.

Package: minerva-design@1.22.3

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Radio

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Radio"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "checked",
    "source": "packages/native/src/components/Radio/Radio.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Whether the radio is checked (controlled). Ignored inside a RadioGroup"
  },
  {
    "name": "defaultChecked",
    "source": "packages/native/src/components/Radio/Radio.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Initial checked state (uncontrolled). Ignored inside a RadioGroup"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Radio/Radio.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the radio (also set by a disabled group)"
  },
  {
    "name": "value",
    "source": "packages/native/src/components/Radio/Radio.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Value of the radio; identifies it within a RadioGroup"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Radio/Radio.tsx",
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
    "description": "Radio size (the RadioGroup size overrides it)"
  },
  {
    "name": "color",
    "source": "packages/native/src/components/Radio/Radio.tsx",
    "kind": "enum",
    "values": [
      "danger",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "RadioColor | undefined",
    "typeRef": "type:3fa57b39653f0fba3631",
    "default": "primary",
    "required": false,
    "description": "Semantic color of the checked radio (the RadioGroup color overrides it)"
  },
  {
    "name": "label",
    "source": "packages/native/src/components/Radio/Radio.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Label displayed next to the radio (a string also names it)"
  },
  {
    "name": "error",
    "source": "packages/native/src/components/Radio/Radio.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Error state: danger border (also set by an invalid group)"
  },
  {
    "name": "labelPlacement",
    "source": "packages/native/src/components/Radio/Radio.tsx",
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
    "description": "Position of the label relative to the circle"
  },
  {
    "name": "labelStyle",
    "source": "packages/native/src/components/Radio/Radio.tsx",
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
    "source": "packages/native/src/components/Radio/Radio.tsx",
    "kind": "function",
    "typeText": "((checked: boolean, value?: string | undefined) => void) | undefined",
    "typeRef": "type:a829f02b3762172d27cf",
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
    "description": "Called when a press checks the radio, with its `value`"
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

## RadioGroup

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "RadioGroup"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/native/src/components/Radio/RadioGroup.tsx",
    "kind": "string",
    "typeText": "string | null | undefined",
    "typeRef": "type:5d93807f845ffb9259f1",
    "required": false,
    "description": "Value of the selected radio (controlled; `null`: none selected)"
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/Radio/RadioGroup.tsx",
    "kind": "string",
    "typeText": "string | null | undefined",
    "typeRef": "type:5d93807f845ffb9259f1",
    "default": null,
    "required": false,
    "description": "Initially selected value (uncontrolled)"
  },
  {
    "name": "direction",
    "source": "packages/native/src/components/Radio/RadioGroup.tsx",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "\"horizontal\" | \"vertical\" | undefined",
    "typeRef": "type:4e4ac2a46972f482e8a6",
    "default": "vertical",
    "required": false,
    "description": "Layout direction of the radios"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Radio/RadioGroup.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables every radio in the group"
  },
  {
    "name": "readOnly",
    "source": "packages/native/src/components/Radio/RadioGroup.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Radios show the value but presses do not change it"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Radio/RadioGroup.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "NativeSize | undefined",
    "typeRef": "type:3e1597e03bb6f7f3269e",
    "required": false,
    "description": "Size of every radio"
  },
  {
    "name": "color",
    "source": "packages/native/src/components/Radio/RadioGroup.tsx",
    "kind": "enum",
    "values": [
      "danger",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "RadioColor | undefined",
    "typeRef": "type:3fa57b39653f0fba3631",
    "required": false,
    "description": "Color of every checked radio"
  },
  {
    "name": "label",
    "source": "packages/native/src/components/Radio/RadioGroup.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Visible label of the group; a string is also its accessible name"
  },
  {
    "name": "error",
    "source": "packages/native/src/components/Radio/RadioGroup.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Error state of every radio"
  },
  {
    "name": "options",
    "source": "packages/native/src/components/Radio/RadioGroup.tsx",
    "kind": "array",
    "typeText": "readonly (string | RadioGroupOption)[] | undefined",
    "typeRef": "type:adc89398022b050ddae8",
    "required": false,
    "description": "Radios built from data (else pass `<Radio value>` children)"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/Radio/RadioGroup.tsx",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:703d0c984ae2bf9ac25e",
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
    "description": "Called with the value of the radio the user selected"
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
  "native:RadioProps": {
    "source": "native/src/components/Radio/Radio.tsx",
    "kind": "interface",
    "extends": [
      "Omit<PressableProps, \"children\" | \"style\" | \"disabled\" | \"onPress\">"
    ],
    "props": [
      {
        "name": "checked",
        "type": "boolean",
        "required": false,
        "description": "Whether the radio is checked (controlled). Ignored inside a RadioGroup"
      },
      {
        "name": "defaultChecked",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Initial checked state (uncontrolled). Ignored inside a RadioGroup"
      },
      {
        "name": "onChange",
        "type": "(checked: boolean, value?: string) => void",
        "required": false,
        "description": "Called when a press checks the radio, with its `value`"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the radio (also set by a disabled group)"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Value of the radio; identifies it within a RadioGroup"
      },
      {
        "name": "size",
        "type": "RadioSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Radio size (the RadioGroup size overrides it)"
      },
      {
        "name": "color",
        "type": "RadioColor",
        "required": false,
        "default": "\"primary\"",
        "description": "Semantic color of the checked radio (the RadioGroup color overrides it)"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false,
        "description": "Label displayed next to the radio (a string also names it)"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Label content, when `label` is not set"
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
        "type": "RadioLabelPlacement",
        "required": false,
        "default": "\"end\"",
        "description": "Position of the label relative to the circle"
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
  },
  "native:RadioGroupProps": {
    "source": "native/src/components/Radio/RadioGroup.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\">"
    ],
    "props": [
      {
        "name": "value",
        "type": "string | null",
        "required": false,
        "description": "Value of the selected radio (controlled; `null`: none selected)"
      },
      {
        "name": "defaultValue",
        "type": "string | null",
        "required": false,
        "default": "null",
        "description": "Initially selected value (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called with the value of the radio the user selected"
      },
      {
        "name": "direction",
        "type": "\"vertical\" | \"horizontal\"",
        "required": false,
        "default": "\"vertical\"",
        "description": "Layout direction of the radios"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables every radio in the group"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Radios show the value but presses do not change it"
      },
      {
        "name": "size",
        "type": "RadioSize",
        "required": false,
        "default": "each radio's own",
        "description": "Size of every radio"
      },
      {
        "name": "color",
        "type": "RadioColor",
        "required": false,
        "default": "each radio's own",
        "description": "Color of every checked radio"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false,
        "description": "Visible label of the group; a string is also its accessible name"
      },
      {
        "name": "error",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Error state of every radio"
      },
      {
        "name": "options",
        "type": "readonly (string | RadioGroupOption)[]",
        "required": false,
        "description": "Radios built from data (else pass `<Radio value>` children)"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "`<Radio value>` children"
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
  "css:Radio": {
    "kind": "cssVars",
    "source": "react/src/components/Radio",
    "vars": [
      {
        "name": "--radio-checked-color",
        "description": "Color of the checked mark (defaults to the color prop's accent)"
      },
      {
        "name": "--radio-dot-color",
        "description": "Color of the inner dot of the checked mark"
      },
      {
        "name": "--radio-border-color",
        "description": "Border of the unchecked mark"
      },
      {
        "name": "--radio-background",
        "description": "Background of the unchecked mark"
      },
      {
        "name": "--radio-size",
        "description": "Width and height of the mark (every size)"
      },
      {
        "name": "--radio-gap",
        "description": "Space between the mark and the label"
      },
      {
        "name": "--radio-label-font-size",
        "description": "Font size of the label (every size)"
      },
      {
        "name": "--radio-group-gap",
        "description": "Space between the radios of a RadioGroup"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

Apple est sélectionnée au départ ; Banana ou Cherry remplace ce choix.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/radio/native/basic.tsx

```tsx
import { Radio, RadioGroup } from "minerva-design/native";
export default function Basic() {
  return (
    <RadioGroup label="Favourite fruit" defaultValue="apple">
      <Radio value="apple" label="Apple" />
      <Radio value="banana" label="Banana" />
      <Radio value="cherry" label="Cherry" />
    </RadioGroup>
  );
}

```

## Example: Mode contrôlé

Pro est sélectionné au départ. Un autre choix met à jour le résultat affiché.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/radio/native/controlled.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { Radio, RadioGroup, useTheme } from "minerva-design/native";
export default function Controlled() {
  const [plan, setPlan] = useState("pro");
  const { colors } = useTheme();
  return (
    <View style={{ gap: 12, alignItems: "flex-start" }}>
      <RadioGroup label="Plan" value={plan} onChange={setPlan}>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
        <Radio value="team" label="Team" />
      </RadioGroup>
      <Text role="status" style={{ color: colors["text-color"] }}>
        Selected plan: {plan}
      </Text>
    </View>
  );
}

```

## Example: Désactivé

Sold out est désactivé et Available reste sélectionné. Le groupe désactivé conserve Option A.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/radio/native/disabled.tsx

```tsx
import { View } from "react-native";
import { Radio, RadioGroup } from "minerva-design/native";

export default function DisabledDemo() {
  return (
    <View style={{ gap: 12 }}>
      <RadioGroup
        label="Partly disabled"
        defaultValue="a"
        direction="horizontal"
      >
        <Radio value="a" label="Available" />
        <Radio value="b" label="Sold out" disabled />
      </RadioGroup>
      <RadioGroup
        label="Disabled group"
        defaultValue="a"
        direction="horizontal"
        disabled
      >
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>
    </View>
  );
}

```
